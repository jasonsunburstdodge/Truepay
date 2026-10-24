import { test } from "node:test";
import assert from "node:assert/strict";
import {
  routes,
  getRoute,
  SITE_URL,
  sitemapRoutes,
} from "../../src/content/routes";
import { buildMetadata } from "../../src/lib/seo";
import { entity, people } from "../../src/content/entity";
import {
  organizationNode,
  websiteNode,
  webPageNode,
  serviceNode,
  personNode,
  articleNode,
  breadcrumbNode,
} from "../../src/lib/schema";
import { navigation, utilityNavigation } from "../../src/lib/navigation";
import { getClaim } from "../../src/lib/claims";
import robots from "../../src/app/robots";
import sitemap from "../../src/app/sitemap";

test("metadata and crawl controls respect environment, route status and indexability", () => {
  const original = process.env.SITE_ENV;
  const route = getRoute("/")!;
  const status = route.status;
  const indexable = route.indexable;
  try {
    for (const env of ["preview", "development", "production"]) {
      process.env.SITE_ENV = env;
      for (const r of routes) {
        const metadata = buildMetadata(r.path);
        assert.equal(metadata.title, r.title);
        assert.equal(metadata.description, r.description);
        assert.equal(metadata.alternates?.canonical, SITE_URL + r.path);
        assert.deepEqual(metadata.robots, {
          index:
            env === "production" &&
            r.indexable &&
            ["ready", "live"].includes(r.status),
          follow:
            env === "production" &&
            r.indexable &&
            ["ready", "live"].includes(r.status),
        });
      }
      assert.deepEqual(
        sitemap(),
        env === "production"
          ? sitemapRoutes().map((r) => ({
              url: SITE_URL + r.path,
              lastModified: r.path === "/" ? "2026-10-23" : undefined,
            }))
          : [],
      );
      assert.deepEqual(
        robots().rules,
        env === "production"
          ? { userAgent: "*", allow: "/" }
          : { userAgent: "*", disallow: "/" },
      );
    }
    // In-memory fixture only; never persists or promotes a manifest route.
    process.env.SITE_ENV = "production";
    route.status = "live";
    assert.deepEqual(buildMetadata("/").robots, { index: true, follow: true });
    assert.equal(sitemap()[0].lastModified, "2026-10-23");
    route.indexable = false;
    assert.deepEqual(buildMetadata("/").robots, {
      index: false,
      follow: false,
    });
    assert.deepEqual(sitemap(), []);
    process.env.SITE_ENV = "preview";
    route.indexable = true;
    assert.deepEqual(buildMetadata("/").robots, {
      index: false,
      follow: false,
    });
    assert.deepEqual(sitemap(), []);
  } finally {
    route.status = status;
    route.indexable = indexable;
    if (original === undefined) delete process.env.SITE_ENV;
    else process.env.SITE_ENV = original;
  }
});
test("schema graph connects the business, people, services, breadcrumbs and articles", () => {
  const org = organizationNode(),
    site = websiteNode(),
    person = personNode(people[0]);
  assert.deepEqual(org.founder, { "@id": person["@id"] });
  assert.equal(org.name, entity.name);
  assert.deepEqual(site.publisher, { "@id": org["@id"] });
  assert.deepEqual(webPageNode(getRoute("/")!).isPartOf, {
    "@id": site["@id"],
  });
  assert.equal(webPageNode(getRoute("/contact/")!)["@type"], "ContactPage");
  assert.equal(webPageNode(getRoute("/about/")!)["@type"], "AboutPage");
  assert.equal(
    webPageNode(getRoute("/about/jon-wilson/")!)["@type"],
    "ProfilePage",
  );
  assert.deepEqual(serviceNode(getRoute("/statement-review/")!).provider, {
    "@id": org["@id"],
  });
  const article = articleNode(
    getRoute("/resources/how-to-read-your-processing-statement/")!,
    people[0],
    // A guide record is structurally compatible with the dates argument. Its
    // author slug must not overwrite the graph's registered Person reference.
    { ...{ author: "jon-wilson", publisher: "untrusted record field" }, datePublished: "2026-10-23", dateModified: "2026-10-23" },
  );
  assert.deepEqual(article.author, { "@id": person["@id"] });
  assert.deepEqual(article.publisher, { "@id": org["@id"] });
  assert.deepEqual(
    breadcrumbNode("/pricing/membership/").itemListElement.map((n) => n.item),
    [SITE_URL + "/", SITE_URL + "/pricing/", SITE_URL + "/pricing/membership/"],
  );
  const types = [org, site, person, article, ...routes.map(webPageNode)].map(
    (n) => n["@type"],
  );
  assert.ok(
    !types.some((t) =>
      ["Review", "AggregateRating", "FAQPage", "HowTo"].includes(t),
    ),
  );
});
test("navigation suppresses planned routes, and banned claims fail closed", () => {
  for (const item of [...navigation(), ...utilityNavigation()])
    assert.notEqual(getRoute(item.path)!.status, "planned");
  assert.throws(() => getClaim("moore-expanded-quote"));
  assert.throws(() => getClaim("not-a-claim"));
});
