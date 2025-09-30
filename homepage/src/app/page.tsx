import Cta from "@/sections/Cta";
import Hero from "@/sections/Hero";
import Markets from "@/sections/Markets";
import Problem from "@/sections/Problem";
import Solution from "@/sections/Solution";
import Stats from "@/sections/Stats";
import TrustChain from "@/sections/TrustChain";

export default function Home() {
  return (
    <main className="space-y-4">
      <Hero />
      <Problem />
      <Solution />
      <TrustChain />
      <Stats />
      <Markets />
      <Cta />
    </main>
  );
}
