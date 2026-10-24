import statement from "./how-to-read-your-processing-statement";
export const guides = [statement];
export const getGuide = (slug: string) => guides.find((guide) => guide.slug === slug);
