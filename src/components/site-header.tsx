import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import Link from "next/link";
import { entity } from "@/content/entity";
import { navigation, utilityNavigation } from "@/lib/navigation";
export function SiteHeader() {
  const items = [...navigation(), ...utilityNavigation()];
  const links = items.map((item) => (
    <div key={item.path}>
      <a href={item.path}>{item.label}</a>
      {"children" in item &&
        item.children?.map((child) => (
          <a key={child.path} href={child.path}>
            {child.label}
          </a>
        ))}
    </div>
  ));
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links}
        </nav>
        <a className="header-phone" href={entity.phone.href}>
          {entity.phone.display}
        </a>
        <Link
          className="button outline header-review"
          data-cta="statement-review"
          href="/#review"
        >
          Get my free statement review
        </Link>
        <MobileMenu>
          {links}
          <a href={entity.phone.href}>Call {entity.phone.display}</a>
          <Link href="/#review" data-cta="statement-review">
            Get my free statement review
          </Link>
        </MobileMenu>
      </div>
    </header>
  );
}
