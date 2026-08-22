import { HomeCatalogue } from "@/components/home/HomeCatalogue";

const chips: Array<{ label: string; jump: string }> = [
  { label: "SIP Calculator", jump: "calculators" },
  { label: "Regex Tester", jump: "dev-tools" },
  { label: "Password Generator", jump: "generators" },
  { label: "JSON Formatter", jump: "checkers" },
];

export default function HomePage() {
  return (
    <div className="home-content">
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow">◆ 100% free · no sign-up</span>
          <h1>
            Every tool you reach for.
            <br />
            <span>None of the noise.</span>
          </h1>
          <p className="sub">
            Calculators, converters, generators and checkers that load instantly and work in your browser — nothing to install, nothing to sign up for.
          </p>
          <div className="chip-row">
            {chips.map((chip) => (
              <a key={chip.jump} href={`#${chip.jump}`} className="chip">
                {chip.label}
              </a>
            ))}
          </div>
        </div>
      </section>
      <HomeCatalogue />
    </div>
  );
}
