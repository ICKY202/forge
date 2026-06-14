'use client'

import { useState, useRef, useEffect } from "react";
import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole";
import { BlueTitle, GrayTitle, SectionHeading, SectionLabel } from "@/components/reusables";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { PricingTable, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FEATURES, PLACEHOLDERS, STEPS, SUGGESTIONS } from "@/lib/data";

export default function Home() {

  const { isSignedIn } = useAuth();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [placeholderInd, setPlaceholderInd] = useState<number>(0);
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleSubmit = () => {
    if(!isSignedIn && prompt.trim()) return;
    router.push(`/workspace?prompt=${encodeURIComponent(prompt.trim())}`);

  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const handleSuggestions = (prompt: string) => {
    setPrompt(prompt);
    textareaRef?.current?.focus();
  }

  useEffect(() => {

    if(isFocused || prompt.trim()) return;
    const placeholderInterval = setInterval(() => {
      setPlaceholderInd((ind) => ((ind + 1 ) % PLACEHOLDERS.length));
    }, 3000);

    return () => clearInterval(placeholderInterval);

  }, [isFocused, prompt]);

  useEffect(() => {
    const el = textareaRef.current;
    if(!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [prompt])

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-white/20">
      <section className="relative flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center">
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
        {/* textarea */}
        <div className="relative mx-auto w-full max-w-2xl mt-12">
          <div className="rounded-2xl border bg-[#111111] duration-200 border-white/8">
            <textarea placeholder={PLACEHOLDERS[placeholderInd]}
            ref={textareaRef} 

            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            rows={1}
            className="w-full resize-none bg-transparent px-5 pb-4 pt-5 text-sm placeholder:text-white/20 focus:outline-none sm:text-base" 
            style={{ minHeight: "56px", maxHeight: "200px", height: "60px" }}>
            </textarea>
            <div className="flex items-center justify-between border-t border-white/6 px-4 py-2.5">
              <span className="text-xs text-white/20">Press ⏎ to generate · Shift+⏎ for new line</span>
              {isSignedIn ? <Button onClick={handleSubmit} disabled={!prompt.trim()} className="h-8 rounded-full px-5 font-semibold" variant={`${isSignedIn ? 'default': 'secondary'}`}>Generate</Button> 
                : 
                <SignUpButton mode='modal'>
                  <Button size="sm" className={"h-8 rounded-full font-semibold active:scale-95 px-4 pt-0.5"}>
                      Generate <ArrowRight className='h-3 w-3 opacity-60'></ArrowRight>
                  </Button>
                </SignUpButton>
              }
            </div>
          </div>
        </div>
        {/* Text suggestions */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((suggestion:string, index:number) => {
            return (
              <Button
              key={index}
              onClick={() => handleSuggestions(suggestion)}
              className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs text-white/40 hover:border-white/15 hover:bg-white/8 hover:text-white/70"              
              >
                {suggestion}
              </Button>
            );
          })}
        </div>
        <p className="mt-10 text-xs text-white/20"> No credit card required · 10 free generations on sign up</p>
      </section>
          {/* Workspace preview */}
      <section className="px-4 pb-32">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/8 bg-[#0f0f0f] shadow-2xl shadow-black/60">
          <div className="flex items-center gap-2 border-b border-white/6 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-white/10" />
              <div className="h-3 w-3 rounded-full bg-white/10" />
              <div className="h-3 w-3 rounded-full bg-white/10" />
            </div>
            <div className="mx-auto flex h-6 w-64 items-center justify-center rounded-md bg-white/5 px-3">
              <span className="text-xs text-white/25">forge.app/workspace</span>
            </div>
          </div>

          <div className="flex h-105">
            <div className="flex w-80 flex-col border-r border-white/6 bg-[#0d0d0d]">
              <div className="border-b border-white/6 px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-white/30">Chat</p>
              </div>

              <div className="flex-1 space-y-4 px-4 py-4">
                <div className="flex justify-end">
                  <div className="max-w-55 rounded-2xl rounded-br-sm bg-white/10 px-3.5 py-2.5">
                    <p className="text-xs text-white/80">Build a kanban board with 3 columns and drag-and-drop</p>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap h-3 w-3 fill-black text-black" aria-hidden="true">
                      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                    </svg>
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/5 px-3.5 py-2.5">
                    <p className="text-xs text-white/60">I&apos;ll build a Kanban board with Todo, In Progress, and Done columns. I&apos;ll use <code className="text-blue-400/80">@dnd-kit/core</code> for smooth drag-and-drop…</p>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap h-3 w-3 fill-black text-black" aria-hidden="true">
                      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white/5 px-3.5 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" style={{ animationDelay: '0s' }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" style={{ animationDelay: '0.15s' }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/6 px-3 py-3">
                <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
                  <span className="flex-1 text-xs text-white/20">Ask AI to modify…</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-3.5 w-3.5 text-white/20" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-1 border-b border-white/6 px-4">
                <button className="border-b-2 border-blue-400 px-3 py-2.5 text-xs text-white">Preview</button>
                <button className="px-3 py-2.5 text-xs text-white/30">Code</button>
              </div>

              <div className="flex flex-1 gap-3 overflow-hidden bg-[#141414] p-5">
                <div className="flex w-1/3 flex-col gap-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-white/40">Todo</span>
                    <span className="rounded-full bg-white/8 px-1.5 py-0.5 text-xs text-white/30">3</span>
                  </div>

                  <div className="rounded-lg border border-white/8 bg-[#1a1a1a] p-2.5">
                    <div className="mb-1.5 h-2 rounded-full bg-white/15" style={{ width: '60%' }} />
                    <div className="h-1.5 w-3/4 rounded-full bg-white/8" />
                  </div>

                  <div className="rounded-lg border border-white/8 bg-[#1a1a1a] p-2.5">
                    <div className="mb-1.5 h-2 rounded-full bg-white/15" style={{ width: '75%' }} />
                    <div className="h-1.5 w-3/4 rounded-full bg-white/8" />
                  </div>

                  <div className="rounded-lg border border-white/8 bg-[#1a1a1a] p-2.5">
                    <div className="mb-1.5 h-2 rounded-full bg-white/15" style={{ width: '90%' }} />
                    <div className="h-1.5 w-3/4 rounded-full bg-white/8" />
                  </div>
                </div>

                <div className="flex w-1/3 flex-col gap-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-white/40">In Progress</span>
                    <span className="rounded-full bg-white/8 px-1.5 py-0.5 text-xs text-white/30">2</span>
                  </div>

                  <div className="rounded-lg border border-white/8 bg-[#1a1a1a] p-2.5">
                    <div className="mb-1.5 h-2 rounded-full bg-white/15" style={{ width: '60%' }} />
                    <div className="h-1.5 w-3/4 rounded-full bg-white/8" />
                  </div>

                  <div className="rounded-lg border border-white/8 bg-[#1a1a1a] p-2.5">
                    <div className="mb-1.5 h-2 rounded-full bg-white/15" style={{ width: '75%' }} />
                    <div className="h-1.5 w-3/4 rounded-full bg-white/8" />
                  </div>
                </div>

                <div className="flex w-1/3 flex-col gap-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-white/40">Done</span>
                    <span className="rounded-full bg-white/8 px-1.5 py-0.5 text-xs text-white/30">1</span>
                  </div>

                  <div className="rounded-lg border border-white/8 bg-[#1a1a1a] p-2.5">
                    <div className="mb-1.5 h-2 rounded-full bg-white/15" style={{ width: '60%' }} />
                    <div className="h-1.5 w-3/4 rounded-full bg-white/8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features */}
      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <SectionLabel>Everything you need</SectionLabel>
          <SectionHeading gray="From Prompt" blue="to Production"></SectionHeading>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/6 bg-white/6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({icon: Icon, desc, label}) => {
              return <div className="group bg-[#0a0a0a] p-7 hover:bg-[#0f0f0f]" key={label}>
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/4 group-hover:border-white/15 group-hover:bg-white/8">
                    <Icon className="lucide lucide-zap h-4 w-4 text-white/60 group-hover:text-blue-400/70"></Icon>
                  </div>
                  <p className="mb-2 text-sm font-semibold">{label}</p>
                  <p className="text-sm leading-relaxed text-white/40">{desc}</p>
              </div>
          })}
        </div>
      </section>
      {/* Steps */}
      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <SectionLabel>How it works</SectionLabel>
          <SectionHeading gray="Four steps" blue="to a working app"></SectionHeading>
        </div>
        <div className="mx-auto max-w-3xl">
          {STEPS.map(({label, desc, number}, ind) => {
            return <div className="flex gap-6" key={label}>
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/4">
                  <span className="font-mono text-xs font-semibold text-white/50">{number}</span>
                </div>
                {ind < STEPS.length -1 && <div className="mt-2 h-full w-px bg-white/6"></div>}
              </div>
              <div className="pb-10 pt-1.5">
                <p className="mb-1.5 text-sm font-semibold sm:text-base">{label}</p>
                <p className="text-sm leading-relaxed text-white/40">{desc}</p>
              </div>
            </div> 
          })}
        </div>
      </section>
      {/* Plans */}
      <section className="px-4 pb-32">
          <div className="mx-auto mb-14 max-w-5xl text-center">
            <SectionLabel>SIMPLE PRICING</SectionLabel>
            <SectionHeading gray="Starts free" blue="scale when ready"></SectionHeading>
            <p className="mx-auto mt-4 max-w-sm text-sm text-white/35">No credit card required. Upgrade or downgrade anytime.</p>
          </div>
          {/* plan cards */}
          <div className="mx-auto max-w-5xl">
            <PricingTable 
              checkoutProps={
                {
                  appearance: {
                    elements: {
                      drawerRoot: {
                        zIndex: 2000
                      }
                    }
                  }
                }
              }
            />
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="relative flex flex-col rounded-2xl border p-7 transition-colors border-white/8 bg-[#0f0f0f]">
              <div className="mb-1 flex items-center gap-2"><p className="text-sm font-semibold text-white/90">Free</p></div>
              <p className="mb-6 text-xs leading-relaxed text-white/35">Start building. No credit card required.</p>
              <div className="mb-1 flex items-baseline gap-1"><span className="font-serif text-4xl"><span className="text-white/90">$0</span></span></div>
              <p className="mb-6 text-xs text-white/25">Always free</p>
              <div className="mb-8 space-y-3 border-t border-white/6 pt-6">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/8">
                    <Check className="text-white/50 h-2.5 w-2.5"></Check>
                  </div>
                  <span className="text-xs text-white/55">10 generations / month</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/8">
                    <Check className="text-white/50 h-2.5 w-2.5"></Check>
                  </div>
                  <span className="text-xs text-white/55">Live preview</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/8">
                    <Check className="text-white/50 h-2.5 w-2.5"></Check>
                  </div>
                  <span className="text-xs text-white/55">Export to zip</span>
                </div>
              </div>
              <div className="mt-auto">
                <Button variant="outline" 
                  className="group/button inline-flex shrink-0 items-center justify-center bg-clip-padding whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([className*='size-'])]:size-4 aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50 h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 w-full rounded-full text-sm font-semibold border border-white/10 bg-transparent text-white/60 hover:bg-white/6 hover:text-white/90"
                  >
                    Get Started Free
                    <ArrowRight className="h-3 w-5 opacity-60 group-hover/button:translate-x-0.5 transition-transform"></ArrowRight>
                </Button>
              </div>
            </div>
            <div className="relative flex flex-col rounded-2xl border p-7 transition-colors border-blue-500/25 bg-blue-500/4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2"><span className="rounded-full border border-blue-500/20 bg-[#0a0a0a] px-3 py-1 text-[11px] font-medium text-blue-400">Most popular</span></div>
              <div className="mb-1 flex items-center gap-2"><p className="text-sm font-semibold text-white/90">Starter</p></div>
              <p className="mb-6 text-xs leading-relaxed text-white/35">For developers who build regularly.</p>
              <div className="mb-1 flex items-baseline gap-1">
                <span className="font-serif text-4xl">
                  <span className="bg-linear-to-br font-serif from-blue-300 via-blue-400 to-blue-600 bg-clip-text text-transparent ">$9</span>
                </span>
                <span className="text-sm text-white/30">/mo</span>
              </div>
              <p className="mb-6 text-xs text-white/25">Only billed monthly</p>

              <div className="mb-8 space-y-3 border-t border-white/6 pt-6">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-500/15">
                    <Check className="text-white/50 h-2.5 w-2.5"></Check>
                  </div>
                  <span className="text-xs text-white/55">50 generations / month</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-500/15">
                    <Check className="text-white/50 h-2.5 w-2.5"></Check>
                  </div>
                  <span className="text-xs text-white/55">Image uploads</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-500/15">
                    <Check className="text-white/50 h-2.5 w-2.5"></Check>
                  </div>
                  <span className="text-xs text-white/55">Live preview</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-500/15">
                    <Check className="text-white/50 h-2.5 w-2.5"></Check>
                  </div>
                  <span className="text-xs text-white/55">Export to zip</span>
                </div>
              </div>
              <div className="mt-auto">
                <Button variant="default" className="group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding whitespace-nowrap outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([className*='size-'])]:size-4 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50 h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 w-full rounded-full text-sm font-semibold transition-all bg-blue-500 text-white hover:bg-blue-400 active:scale-95">
                    Get Started 
                    <ArrowRight className="h-3.5 w-3.5"></ArrowRight>
                </Button>
              </div>
            </div>
            <div className="relative flex flex-col rounded-2xl border p-7 transition-colors border-white/8 bg-[#0f0f0f]">
              <div className="mb-1 flex items-center gap-2"><p className="text-sm font-semibold text-white/90">Pro</p></div>
              <p className="mb-6 text-xs leading-relaxed text-white/35">For power users who ship fast.</p>
              <div className="mb-1 flex items-baseline gap-1">
                <span className="font-serif text-4xl">
                  <span className="bg-linear-to-br font-serif from-blue-300 via-blue-400 to-blue-600 bg-clip-text text-transparent ">$29</span>
                  </span>
                <span className="text-sm text-white/30">/mo</span>
              </div>
              <p className="mb-6 text-xs text-white/25">Only billed monthly</p>
              <div className="mb-8 space-y-3 border-t border-white/6 pt-6">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/8">
                    <Check className="text-white/50 h-2.5 w-2.5"></Check>
                  </div>
                  <span className="text-xs text-white/55">150 generations / month</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/8">
                    <Check className="text-white/50 h-2.5 w-2.5"></Check>
                  </div>
                  <span className="text-xs text-white/55">Priority AI (faster response)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/8">
                    <Check className="text-white/50 h-2.5 w-2.5"></Check>
                  </div>
                  <span className="text-xs text-white/55">Live preview</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/8">
                    <Check className="text-white/50 h-2.5 w-2.5"></Check>
                  </div>
                  <span className="text-xs text-white/55">Export to zip</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/8">
                    <Check className="text-white/50 h-2.5 w-2.5"></Check>
                  </div>
                  <span className="text-xs text-white/55">Image uploads</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/8">
                    <Check className="text-white/50 h-2.5 w-2.5"></Check>
                  </div>
                  <span className="text-xs text-white/55">Access to Forge Pro Agent</span>
                </div>
              </div>
              <div className="mt-auto">
                <Button variant="outline" className="">
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5"></ArrowRight>
                </Button>
              </div>
            </div>
          </div>
      </section>
      {/* CTA Section */}
      <section className="relative mx-auto mb-32 max-w-5xl overflow-hidden rounded-2xl border border-white/8 px-10 py-24 text-center">
          <HoleBackground strokeColor="rgba(255, 255, 255, 0.05)" className="absolute inset-0 h-full w-full" style={{ maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)", 
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)" }}></HoleBackground>
          <div className="mx-auto mb-14 max-w-5xl text-center">
            <SectionHeading gray="Starts building" blue="for free"></SectionHeading>
            <p className="mb-8 text-sm leading-relaxed text-white/40">Get 10 free generations on sign up. No credit card required. <br /> Upgrade when you&apos;re ready.</p>
            <SignInButton mode="modal">
              <Button size="lg" className="relative h-11 px-8 bg-white rounded-full">Get Started <ChevronRight className="h-4 w-4"></ChevronRight></Button>
            </SignInButton>
          </div>
      </section>
      <footer className="relative z-10 border-t border-white/7 py-12 mx-auto px-6 flex flex-wrap items-center justify-center text-stone-400">Made By Vignesh M</footer>
    </main>
  );
}
