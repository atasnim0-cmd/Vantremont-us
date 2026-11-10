"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * The certification pathway: how a client moves from gap assessment to certificate,
 * and who does each step. The first three steps are advisory; the last three belong
 * to an accredited body that is independent of the advisor.
 *
 * The full diagram is server-rendered and visible without JavaScript. On wide screens,
 * anime.js (loaded lazily) draws the path from step to step in a slow loop. The loop
 * has a pause button, stops when the diagram is off screen, and never runs when the
 * visitor prefers reduced motion. Only transform and opacity are animated.
 */

const STEPS = [
  {
    title: "Gap assessment",
    body: "We compare what you do today with the standard and rate each gap by effort and audit risk.",
  },
  { title: "Remediation", body: "Your team closes the gaps with our help: policies, controls, tooling and evidence." },
  {
    title: "Readiness review",
    body: "We test the controls the way an auditor would and tell you plainly whether you are ready.",
  },
  {
    title: "Stage 1 audit",
    body: "The certification body reviews your documentation and confirms you are ready for the full audit.",
  },
  { title: "Stage 2 audit", body: "The auditor tests whether the management system works in practice." },
  { title: "Certificate", body: "A certificate valid for three years, kept current by surveillance audits each year." },
];

type Playable = { pause: () => unknown; play: () => unknown; revert?: () => unknown };

export function CertificationPathway() {
  const root = useRef<HTMLDivElement>(null);
  const anim = useRef<Playable | null>(null);
  const userPaused = useRef(false);
  const [paused, setPaused] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    let cancelled = false;
    let io: IntersectionObserver | undefined;
    let revert: (() => void) | undefined;

    import("animejs").then(({ createScope, createTimeline }) => {
      if (cancelled || !root.current) return;
      setAnimated(true);
      const scope = createScope({ root: root.current }).add(() => {
        const segs = Array.from(el.querySelectorAll<HTMLElement>("[data-seg]"));
        const dots = Array.from(el.querySelectorAll<HTMLElement>("[data-dot]"));
        const tl = createTimeline({ loop: true, loopDelay: 2600, defaults: { ease: "inOutQuad" } });
        tl.add(segs, { scaleX: [1, 0], duration: 1 }).add(dots, { opacity: [1, 0], scale: [1, 1], duration: 1 }, "<");
        dots.forEach((dot, i) => {
          tl.add(dot, { opacity: [0, 1], scale: [0.4, 1], duration: 420, ease: "outBack" });
          if (segs[i]) tl.add(segs[i], { scaleX: [0, 1], duration: i === 2 ? 1100 : 750 });
        });
        anim.current = tl;
      });
      revert = () => scope.revert();

      io = new IntersectionObserver(([entry]) => {
        if (userPaused.current || !anim.current) return;
        if (entry.isIntersecting) anim.current.play();
        else anim.current.pause();
      });
      io.observe(el);
    });

    return () => {
      cancelled = true;
      io?.disconnect();
      revert?.();
    };
  }, []);

  const toggle = () => {
    const next = !paused;
    userPaused.current = next;
    setPaused(next);
    if (next) anim.current?.pause();
    else anim.current?.play();
  };

  return (
    <div ref={root} className="relative">
      {/* Lane headings */}
      <div className="hidden grid-cols-6 lg:grid">
        <p className="col-span-3 border-t-2 border-claret pt-4 pr-8 text-sm font-semibold tracking-[0.12em] text-claret uppercase">
          Advisory <span className="ml-2 font-normal tracking-normal text-slate normal-case">by Vantremont</span>
        </p>
        <p className="col-span-3 border-t-2 border-ink pt-4 pl-8 text-sm font-semibold tracking-[0.12em] text-ink uppercase">
          Certification{" "}
          <span className="ml-2 font-normal tracking-normal text-slate normal-case">
            by an accredited body independent of your advisor
          </span>
        </p>
      </div>

      <div className="relative lg:mt-10">
        {/* The independence boundary between the two lanes. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[-2.5rem] bottom-0 left-1/2 hidden w-px bg-ink/30 lg:block"
        />
        <ol className="grid lg:grid-cols-6">
          {STEPS.map((s, i) => {
            const certification = i >= 3;
            const last = i === STEPS.length - 1;
            // Each segment runs from this node to the next node. Step 3 has extra right
            // padding and step 4 extra left padding around the lane boundary.
            const segWidth = i === 2 ? "lg:w-[calc(100%+4rem)]" : "lg:w-[calc(100%+1.5rem)]";
            return (
              <li
                key={s.title}
                className={cn(
                  "relative pb-10 pl-10 lg:pb-0 lg:pl-0",
                  i === 3 && "lg:pl-8",
                  i === 2 ? "lg:pr-8" : "lg:pr-6",
                )}
              >
                {/* Mobile lane label at the first step of each lane. */}
                {(i === 0 || i === 3) && (
                  <p
                    className={cn(
                      "mb-4 text-xs font-semibold tracking-[0.12em] uppercase lg:hidden",
                      certification ? "text-ink" : "text-claret",
                    )}
                  >
                    {certification ? "Certification, by an independent accredited body" : "Advisory, by Vantremont"}
                  </p>
                )}

                {/* Track: node plus the segment to the next node. */}
                <div aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-6 lg:relative lg:h-6 lg:w-auto">
                  {!last && (
                    <>
                      <span
                        className={cn(
                          "absolute top-3 left-[11px] h-full w-0.5 bg-stone-dark lg:top-[11px] lg:left-3 lg:h-0.5",
                          segWidth,
                        )}
                      />
                      <span
                        data-seg=""
                        className={cn(
                          "absolute top-3 left-[11px] h-full w-0.5 origin-top lg:top-[11px] lg:left-3 lg:h-0.5 lg:origin-left",
                          segWidth,
                          i < 2 ? "bg-claret" : "bg-ink",
                        )}
                      />
                    </>
                  )}
                  <span
                    className={cn(
                      "absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-ivory",
                      certification ? "border-ink" : "border-claret",
                    )}
                  >
                    <span
                      data-dot=""
                      className={cn("h-2.5 w-2.5 rounded-full", certification ? "bg-ink" : "bg-claret")}
                    />
                  </span>
                </div>

                <p className="tabular text-sm font-semibold text-slate lg:mt-6">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 font-serif text-[1.375rem] leading-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed">{s.body}</p>
              </li>
            );
          })}
        </ol>
      </div>

      {animated && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          aria-label={paused ? "Play pathway animation" : "Pause pathway animation"}
          className="press absolute -top-14 right-0 hidden h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink hover:border-ink lg:inline-flex"
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
}
