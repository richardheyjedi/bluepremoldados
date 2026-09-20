import Image from "next/image";

type LogoProps = { light?: boolean; compact?: boolean };

export function Logo({ light = false, compact = false }: LogoProps) {
  return (
    <span className={`brand-logo ${light ? "brand-logo--light" : ""}`}>
      <Image src={light ? "/images/brand-mark-white.png" : "/images/brand-mark.png"} alt="" width={44} height={54} className="brand-logo__mark" priority />
      {!compact && <span className="brand-logo__type"><strong>Blue</strong><span>Premoldados</span></span>}
    </span>
  );
}
