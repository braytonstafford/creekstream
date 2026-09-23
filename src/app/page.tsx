import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WatchLive } from "@/components/WatchLive";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <WatchLive />
        <About />
      </main>
      <SiteFooter />
    </>
  );
}
