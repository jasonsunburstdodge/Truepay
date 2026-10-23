import type { PageContent } from "./types";
import * as core from "./core";
import * as pricing from "./pricing";
import * as solutions from "./solutions";
import * as trust from "./trust";
import * as resources from "./resources";
import * as industries from "./industries";
import * as growth from "./growth";

const all: PageContent[] = [core, pricing, solutions, trust, resources, industries, growth].flatMap((m) => Object.values(m) as PageContent[]);

/** Page content keyed by route path. */
export const pageContent: Record<string, PageContent> = Object.fromEntries(all.map((p) => [p.path, p]));
export const homeContent = core.home;
