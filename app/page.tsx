import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole";
import { BlueTitle, GrayTitle } from "@/components/reusables";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-white/20">
      <section className="relative h-screen flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center">
        <HoleBackground strokeColor="rgba(255, 255, 255, 0.05)" className="absolute inset-0 h-full w-full" style={{ maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)", 
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)" }}>

        </HoleBackground>
        <Badge variant={"outline"} className="gap-2 p-4 backdrop-blur-sm">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"/>
          Powered by Gemini 3. Flash
        </Badge>

        <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl leading-tight tracking-tight sm:text-5xl lg:text-7xl z-10">
          <GrayTitle>Forge your dream</GrayTitle><br />
          <BlueTitle>From a single prompt</BlueTitle>
        </h1>

        <p className="max-w-xl mx-auto mt-6 text-balance text-base leading-relaxed text-white/40 z-10">
           Describe what you want to build, ai will generate the code, picks the packages, and renders a live preview all inside your browser.
        </p>

        <div className="relative mx-auto w-full max-w-2xl mt-12">
          <div className="rounded-2xl border bg-[#111111] duration-200 border-white/8">
            <textarea placeholder="A markdown notes app with live preview…" 
            rows={1}
            className="w-full resize-none bg-transparent px-5 pb-4 pt-5 text-sm placeholder:text-white/20 focus:outline-none sm:text-base" 
            style={{ minHeight: "56px", maxHeight: "200px", height: "60px" }}>
            </textarea>
            <div className="flex items-center justify-between border-t border-white/6 px-4 py-2.5">
              <span className="text-xs text-white/20">Press ⏎ to generate · Shift+⏎ for new line</span>
              <Button size="sm" className={"h-8 rounded-full font-semibold active:scale-95 px-4 pt-0.5"}>
                    Get Started <ArrowRight className='h-3 w-3 opacity-60'></ArrowRight>
              </Button>
            </div>
          </div>
        </div>
      
      </section>
    </main>
  );
}


//badge, dialog, dropdown-menu sonner tabs textarea
