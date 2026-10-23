import { entity } from "@/content/entity";
import { getRoute } from "@/content/routes";
import { navigation, utilityNavigation, isBuilt } from "@/lib/navigation";
import { Logo } from "./logo";
export function SiteFooter() {
  const links = [
    ...navigation(),
    ...utilityNavigation(),
    ...["/privacy-policy/", "/terms/"]
      .filter(isBuilt)
      .map((path) => getRoute(path)!),
  ];
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>{entity.descriptor}</p>
          <address>
            {entity.address.streetAddress}
            <br />
            {entity.address.addressLocality}, {entity.address.addressRegion}{" "}
            {entity.address.postalCode}
          </address>
          <p>
            <a href={entity.phone.href}>{entity.phone.display}</a>
            <br />
            <a href={`mailto:${entity.email}`}>{entity.email}</a>
          </p>
        </div>
        <nav aria-label="Footer navigation">
          {links.map((link) => (
            <a key={link.path} href={link.path}>
              {link.label}
            </a>
          ))}
        </nav>
        <div>
          <p className="eyebrow">Stay connected</p>
          <ul className="link-list">
            {entity.sameAs.map((url, i) => (
              <li key={url}>
                <a href={url}>{["Facebook", "Instagram", "X", "TikTok"][i]}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container copyright">
        © {new Date().getFullYear()} {entity.name}
      </div>
    </footer>
  );
}
