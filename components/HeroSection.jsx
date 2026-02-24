import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const objectRef = useRef(null);
  const headlineRef = useRef(null);
  const bgShiftRef = useRef(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);
  const p3Ref = useRef(null);
  const [imgError, setImgError] = useState(false);

  const word1 = "WELCOME".split("");
  const word2 = "ITZFIZZ".split("");
  const fallbackSVG =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="420" viewBox="0 0 800 420">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#66d9ff"/>
            <stop offset="100%" stop-color="#a78bfa"/>
          </linearGradient>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.8"/>
          </filter>
        </defs>
        <rect x="0" y="0" width="800" height="420" fill="none"/>
        <g filter="url(#soft)">
          <path d="M120 250 C160 200, 240 160, 340 160 L520 160 C620 160, 700 220, 720 270 L720 290 L100 290 Z"
                fill="url(#g)" opacity="0.45"/>
        </g>
        <g>
          <path d="M140 260 C190 210, 280 180, 360 180 L500 180 C590 180, 690 230, 700 270
                   L700 285 C620 285, 540 285, 120 285 Z"
                fill="#d6e8ff" opacity="0.22"/>
          <circle cx="240" cy="290" r="26" fill="#9dd6ff" opacity="0.5"/>
          <circle cx="580" cy="290" r="26" fill="#c7b7ff" opacity="0.5"/>
        </g>
      </svg>
    `);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      const tl = gsap.timeline();
      tl.from(q(".char"), {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: { each: 0.055, from: "center" }
      }).from(q(".stat"), {
        autoAlpha: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15
      }, "+=0.2");

      gsap.set(objectRef.current, { xPercent: 0 });
      gsap.to(objectRef.current, {
        xPercent: -180,
        scale: 1.06,
        force3D: true,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });

      gsap.to(bgShiftRef.current, {
        xPercent: -6,
        force3D: true,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.9
        }
      });

      gsap.to(headlineRef.current, {
        opacity: 0.82,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.9
        }
      });

      gsap.to(p1Ref.current, { y: -18, x: 12, duration: 16, yoyo: true, repeat: -1, ease: "power1.inOut" });
      gsap.to(p2Ref.current, { y: -12, x: -10, duration: 14, yoyo: true, repeat: -1, ease: "power1.inOut" });
      gsap.to(p3Ref.current, { y: -8, x: 8, duration: 18, yoyo: true, repeat: -1, ease: "power1.inOut" });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen premium-gradient overflow-hidden"
    >
      <div ref={bgShiftRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <div className="vignette-overlay"></div>
        <div className="noise-overlay"></div>
      </div>

      <div className="absolute inset-0">
        <span ref={p1Ref} className="absolute left-[15%] top-[25%] w-1.5 h-1.5 rounded-full bg-cyan-200/25 will-change-transform"></span>
        <span ref={p2Ref} className="absolute left-[70%] top-[40%] w-1 h-1 rounded-full bg-cyan-100/20 will-change-transform"></span>
        <span ref={p3Ref} className="absolute left-[45%] top-[70%] w-1.5 h-1.5 rounded-full bg-cyan-100/20 will-change-transform"></span>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="text-center mb-12 -mt-8 max-w-4xl mx-auto">
        <h1 ref={headlineRef} className="font-playfair text-4xl sm:text-6xl md:text-7xl tracking-[0.45em] font-medium text-neutral-200">
          <span className="inline-flex items-center justify-center select-none">
            {word1.map((l, i) => (
              <span
                key={`char-${i}-${l}`}
                className="char inline-block mx-[0.20em]"
                style={{ willChange: "transform, opacity" }}
              >
                {l}
              </span>
            ))}
            <span className="inline-block w-8 sm:w-12 md:w-16" aria-hidden="true" />
            {word2.map((l, i) => (
              <span
                key={`char2-${i}-${l}`}
                className="char inline-block mx-[0.20em]"
                style={{ willChange: "transform, opacity" }}
              >
                {l}
              </span>
            ))}
          </span>
        </h1>
        </div>

        <div className="mt-12 flex justify-center items-center gap-16 max-w-5xl mx-auto">
          <div className="stat text-center px-8 py-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:scale-105 hover:border-white/20 transition-transform duration-300 ease-out will-change-transform min-w-[180px]">
            <div className="text-[#f3f4f6] text-4xl md:text-5xl font-semibold tracking-wide drop-shadow-[0_2px_6px_rgba(255,255,255,0.08)] leading-none">120%</div>
            <div className="mt-2 text-sm uppercase tracking-widest text-gray-400">Growth</div>
          </div>
          <div className="stat text-center px-8 py-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:scale-105 hover:border-white/20 transition-transform duration-300 ease-out will-change-transform min-w-[180px]">
            <div className="text-[#f3f4f6] text-4xl md:text-5xl font-semibold tracking-wide drop-shadow-[0_2px_6px_rgba(255,255,255,0.08)] leading-none">98%</div>
            <div className="mt-2 text-sm uppercase tracking-widest text-gray-400">Satisfaction</div>
          </div>
          <div className="stat text-center px-8 py-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:scale-105 hover:border-white/20 transition-transform duration-300 ease-out will-change-transform min-w-[180px]">
            <div className="text-[#f3f4f6] text-4xl md:text-5xl font-semibold tracking-wide drop-shadow-[0_2px_6px_rgba(255,255,255,0.08)] leading-none">250+</div>
            <div className="mt-2 text-sm uppercase tracking-widest text-gray-400">Projects</div>
          </div>
        </div>
        <div className="pointer-events-none mt-8 h-24 w-[60%] max-w-xl mx-auto"
             style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0))", filter: "blur(12px)" }} />
      </div>

      <img
        ref={objectRef}
        alt="Premium vehicle"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] pointer-events-none will-change-transform"
        style={{
          width: "46vw",
          maxWidth: 780,
          minWidth: 320,
          opacity: 0.92,
          filter: "drop-shadow(0 40px 55px rgba(0,0,0,0.65))"
        }}
        src={imgError ? fallbackSVG : "/car.png"}
        onError={() => setImgError(true)}
      />
      <div className="absolute left-1/2 top-[58%] -translate-x-1/2 w-[46vw] max-w-[780px] h-24 rounded-full"
           style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(82,141,255,0.35), rgba(0,0,0,0))", filter: "blur(18px)" }} />
      <div className="absolute left-1/2 top-[60%] -translate-x-1/2 w-[42vw] max-w-[720px] h-10 opacity-35"
           style={{ background: "linear-gradient(180deg, rgba(200,220,255,0.22), rgba(0,0,0,0))", filter: "blur(10px)" }} />
    </section>
  );
}
