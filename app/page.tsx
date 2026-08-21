import { HomeCatalogue } from "@/components/home/HomeCatalogue";

export default function HomePage() {
  return <main className="home-content"><section className="hero"><div className="wrap"><span className="eyebrow">◆ 100% free · no sign-up</span><h1>Every tool you reach for.<br/><span>None of the noise.</span></h1><p className="sub">Calculators, converters, generators, checkers and developer utilities that load instantly and work in your browser — nothing to install, nothing to sign up for.</p></div></section><HomeCatalogue/><footer><div className="wrap"><p>© 2026 Toolbench. Free tools, built to be fast.</p><div className="foot-links"><a href="#">About</a><a href="#">Privacy</a><a href="#">Contact</a></div></div></footer></main>;
}
