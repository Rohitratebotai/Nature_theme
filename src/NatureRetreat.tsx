import { useEffect, useRef, useState } from "react";
import {
    siteInfo, stats, about, rooms,
    experiences, gallery, testimonials, navLinks, footerLinks,
} from "./natureRetreatData";

declare const gsap: any;
declare const ScrollTrigger: any;

const Stars = ({ count }: { count: number }) => (
    <span className="text-amber-400 tracking-wider text-sm">{"★".repeat(count)}</span>
);

const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function NatureRetreat() {
    const [navScrolled, setNavScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeRoom, setActiveRoom] = useState(0);
    const heroRef = useRef<HTMLElement>(null);
    const heroBgRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorRingRef = useRef<HTMLDivElement>(null);

    // Nav scroll
    useEffect(() => {
        const fn = () => setNavScrolled(window.scrollY > 60);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    // Custom cursor — only on pointer:fine (desktop), native cursor stays visible underneath
    useEffect(() => {
        const dot = cursorRef.current;
        const ring = cursorRingRef.current;

        if (!dot || !ring) return;

        // Skip touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        dot.style.opacity = "1";
        ring.style.opacity = "1";

        const move = (e: MouseEvent) => {
            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.06
            });

            gsap.to(ring, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.22,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", move);

        const els = document.querySelectorAll("a, button");

        const grow = () =>
            gsap.to(ring, {
                scale: 2.4,
                borderColor: "#8aad6e",
                duration: 0.3
            });

        const shrink = () =>
            gsap.to(ring, {
                scale: 1,
                borderColor: "rgba(138,173,110,0.55)",
                duration: 0.3
            });

        els.forEach((el) => {
            el.addEventListener("mouseenter", grow);
            el.addEventListener("mouseleave", shrink);
        });

        return () => {
            window.removeEventListener("mousemove", move);

            els.forEach((el) => {
                el.removeEventListener("mouseenter", grow);
                el.removeEventListener("mouseleave", shrink);
            });
        };
    }, []);

    // GSAP animations
    useEffect(() => {
        if (typeof gsap === "undefined") return;
        gsap.registerPlugin(ScrollTrigger);

        gsap.set(heroBgRef.current, { scale: 1.18, opacity: 0 });
        const tl = gsap.timeline({ delay: 0.2 });
        tl.to(heroBgRef.current, { scale: 1.02, opacity: 1, duration: 3.2, ease: "power1.inOut" })
            .from(".nr-tag", { opacity: 0, y: 22, duration: 1.2, ease: "power2.out" }, "-=2.2")
            .from(".nr-t1", { opacity: 0, y: 60, skewY: 2, duration: 1.4, ease: "expo.out" }, "-=0.8")
            .from(".nr-t2", { opacity: 0, y: 60, skewY: -2, duration: 1.4, ease: "expo.out" }, "-=1.1")
            .from(".nr-sub", { opacity: 0, y: 30, duration: 1.1, ease: "power3.out" }, "-=0.7")
            .from(".nr-cta", { opacity: 0, y: 20, stagger: 0.15, duration: 0.9, ease: "power2.out" }, "-=0.6")
            .from(".nr-widget", { opacity: 0, x: 28, duration: 1.0, ease: "power3.out" }, "-=0.8")
            .from(".nr-scroll", { opacity: 0, duration: 0.6 }, "-=0.3");

        gsap.to(heroBgRef.current, {
            yPercent: 25, ease: "none",
            scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
        });

        gsap.from(".nr-stat", { opacity: 0, y: 40, stagger: 0.18, duration: 1.0, ease: "power3.out", scrollTrigger: { trigger: "#nr-stats", start: "top 88%" } });
        stats.forEach((s) => {
            const el = document.querySelector(`[data-stat="${s.label}"]`) as HTMLElement;
            if (!el) return;
            ScrollTrigger.create({
                trigger: el, start: "top 85%", once: true,
                onEnter: () => gsap.fromTo({ val: 0 }, { val: s.value }, {
                    duration: 2.2, ease: "power2.out",
                    onUpdate() { el.innerText = Math.round((this as any).targets()[0].val).toLocaleString() + s.suffix; },
                }),
            });
        });

        gsap.from(".nr-about-img", { opacity: 0, x: 80, rotation: 1.5, transformOrigin: "top left", duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: "#nr-about", start: "top 78%", once: true } });
        gsap.from(".nr-about-text > *", { opacity: 0, y: 35, stagger: 0.14, duration: 1.0, ease: "power3.out", scrollTrigger: { trigger: "#nr-about", start: "top 80%", once: true } });
        gsap.from(".nr-room-card", { opacity: 0, y: 70, stagger: 0.2, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: "#nr-rooms", start: "top 80%", once: true } });

        document.querySelectorAll(".nr-exp-card").forEach((el, i) => {
            gsap.from(el, { opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20, duration: 1.0, ease: "power2.out", delay: (i % 2) * 0.08, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });

        const galleryItems = document.querySelectorAll(".nr-gallery-item");
        const mid = Math.floor(galleryItems.length / 2);
        galleryItems.forEach((el, i) => {
            const d = Math.abs(i - mid);
            gsap.from(el, { opacity: 0, scale: 0.88, duration: 0.9 + d * 0.1, ease: "power2.out", delay: d * 0.12, scrollTrigger: { trigger: "#nr-gallery", start: "top 80%", once: true } });
        });

        (gsap.utils.toArray(".nr-line") as HTMLElement[]).forEach((el: HTMLElement) => {
            gsap.from(el, {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1.4,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    once: true,
                },
            });
        });

        gsap.from(".nr-testi", { opacity: 0, y: 28, stagger: 0.2, duration: 1.0, ease: "power2.out", scrollTrigger: { trigger: "#nr-testimonials", start: "top 82%", once: true } });
        gsap.from(".nr-contact-left", { opacity: 0, x: -50, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: "#nr-contact", start: "top 80%", once: true } });
        gsap.from(".nr-contact-right", { opacity: 0, x: 50, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: "#nr-contact", start: "top 80%", once: true } });
    }, []);

    return (
        <div className="bg-amber-50 text-stone-900 overflow-x-hidden">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        .fp { font-family:'Playfair Display',serif !important; }
        .fc { font-family:'Cormorant Garamond',serif; }

        /* ── CURSOR: fixed overlay, pointer-events none so native cursor shows beneath */
        .nr-dot  { opacity:0; position:fixed; top:0; left:0; width:8px; height:8px; background:#8aad6e; border-radius:50%; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); will-change:transform; }
        .nr-ring { opacity:0; position:fixed; top:0; left:0; width:36px; height:36px; border:1.5px solid rgba(138,173,110,0.55); border-radius:50%; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); will-change:transform; }

        /* scroll line */
        .nr-scroll-bar::after { content:''; position:absolute; top:-100%; left:0; width:100%; height:100%; background:#8aad6e; animation:sd 2.2s cubic-bezier(.4,0,.2,1) infinite; }
        @keyframes sd { 0%{top:-100%} 100%{top:100%} }

        /* room */
        .nr-room-img { transition:transform 0.9s cubic-bezier(.25,.46,.45,.94); }
        .nr-room-card:hover .nr-room-img { transform:scale(1.07); }
        .nr-reveal-btn { opacity:0; transform:translateY(8px); transition:opacity .35s,transform .35s; }
        .nr-room-card:hover .nr-reveal-btn { opacity:1; transform:translateY(0); }

        /* gallery */
        .nr-gal-img { transition:transform 0.7s cubic-bezier(.25,.46,.45,.94); }
        .nr-gallery-item:hover .nr-gal-img { transform:scale(1.06); }

        /* exp */
        .nr-exp-card { transition:background .3s, border-color .3s; }
        .nr-exp-card:hover { border-color:rgba(138,173,110,0.35)!important; background:rgba(255,255,255,0.03); }
        .nr-exp-icon { transition:transform .4s cubic-bezier(.34,1.56,.64,1); }
        .nr-exp-card:hover .nr-exp-icon { transform:scale(1.2) rotate(-5deg); }

        /* mobile menu */
        .nr-drawer { transform:translateX(100%); transition:transform .4s cubic-bezier(.4,0,.2,1); }
        .nr-drawer.open { transform:translateX(0); }

        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#1e1208; }
        ::-webkit-scrollbar-thumb { background:#6b7f58; border-radius:2px; }
      `}</style>

            {/* cursor overlay — native cursor still visible */}
            <div ref={cursorRef} className="cursor-dot"></div>
            <div ref={cursorRingRef} className="cursor-ring"></div>

            {/* ════ NAV ════ */}
            <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-5 md:px-14 transition-all duration-500 ${navScrolled ? "py-3 bg-stone-950/92 backdrop-blur-lg shadow-xl" : "py-5 md:py-6"}`}>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fp text-xl md:text-2xl text-amber-50 bg-transparent border-none cursor-pointer z-10">
                    Aarav <em className="italic text-green-400">Retreats</em>
                </button>

                {/* Desktop links */}
                <ul className="hidden md:flex gap-9 list-none m-0 p-0">
                    {navLinks.map((l) => (
                        <li key={l.href}>
                            <button onClick={() => scrollTo(l.href)}
                                className="text-[0.65rem] tracking-[0.22em] uppercase text-amber-100/65 bg-transparent border-none cursor-pointer hover:text-amber-50 transition-colors">
                                {l.label}
                            </button>
                        </li>
                    ))}
                </ul>

                <button onClick={() => scrollTo("#nr-contact")}
                    className="hidden md:block text-[0.65rem] tracking-[0.18em] uppercase font-medium bg-green-600 hover:bg-amber-600 text-white px-6 py-3 border-none cursor-pointer transition-colors">
                    Reserve
                </button>

                {/* Hamburger */}
                <button onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1 z-10" aria-label="Menu">
                    <span className={`block w-6 h-0.5 bg-amber-50 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-amber-50 transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-amber-50 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </nav>

            {/* Mobile drawer */}
            <div className={`nr-drawer fixed inset-0 z-40 bg-stone-950/98 backdrop-blur-xl flex flex-col items-center justify-center gap-7 md:hidden ${menuOpen ? "open" : ""}`}>
                {navLinks.map((l) => (
                    <button key={l.href} onClick={() => { scrollTo(l.href); setMenuOpen(false); }}
                        className="fp text-3xl italic text-amber-50 bg-transparent border-none cursor-pointer hover:text-green-400 transition-colors">
                        {l.label}
                    </button>
                ))}
                <button onClick={() => { scrollTo("#nr-contact"); setMenuOpen(false); }}
                    className="mt-4 text-[0.7rem] tracking-[0.2em] uppercase font-medium bg-green-600 text-white px-10 py-4 border-none cursor-pointer">
                    Reserve a Stay
                </button>
            </div>

            {/* ════ HERO ════ */}
            <section ref={heroRef} className="relative h-screen overflow-hidden flex items-end">
                <div ref={heroBgRef} className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${siteInfo.heroImage}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/92 via-stone-950/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 to-transparent" />

                <div className="relative z-10 px-5 md:px-14 pb-14 md:pb-24 max-w-3xl">
                    <div className="nr-tag inline-flex items-center gap-2 text-[0.58rem] tracking-[0.28em] uppercase text-green-300 border border-green-400/35 rounded-full px-4 py-1.5 mb-5 backdrop-blur-sm">
                        🌿 {siteInfo.location} · {siteInfo.established}
                    </div>
                    <h1 className="fp font-normal leading-[1.02] text-amber-50 mb-4">
                        <span className="nr-t1 block text-[clamp(2.4rem,6vw,6.2rem)]">Where the Himalayas</span>
                        <em className="nr-t2 block text-[clamp(2.4rem,6vw,6.2rem)] italic text-green-300">Hold You Still</em>
                    </h1>
                    <p className="nr-sub fc italic text-base md:text-xl text-amber-200/65 max-w-lg mb-7 leading-relaxed">
                        {siteInfo.subTagline}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <button onClick={() => scrollTo("#nr-rooms")}
                            className="nr-cta text-[0.65rem] tracking-[0.2em] uppercase font-medium bg-green-600 hover:bg-amber-600 text-white px-7 py-3.5 border-none cursor-pointer transition-colors">
                            Explore Sanctuaries
                        </button>
                        <button onClick={() => scrollTo("#nr-about")}
                            className="nr-cta text-[0.65rem] tracking-[0.2em] uppercase text-amber-200 bg-transparent border-none border-b border-amber-200/35 hover:text-green-300 cursor-pointer pb-0.5 transition-all">
                            Our Story →
                        </button>
                    </div>
                </div>

                {/* Booking widget — desktop only */}
                {/* <div className="nr-widget hidden lg:block absolute right-14 bottom-14 z-10 bg-stone-900/88 backdrop-blur-xl border border-white/[0.09] p-6 w-[270px]">
                    <p className="text-[0.58rem] tracking-[0.32em] uppercase text-green-400 mb-4">Quick Reserve</p>
                    <div className="flex flex-col gap-2.5">
                        <input type="date" className="bg-white/[0.05] border border-white/[0.09] focus:border-green-500 outline-none text-amber-50/80 px-4 py-2.5 text-sm w-full" />
                        <input type="date" className="bg-white/[0.05] border border-white/[0.09] focus:border-green-500 outline-none text-amber-50/80 px-4 py-2.5 text-sm w-full" />
                        <select className="bg-stone-800 border border-white/[0.09] text-amber-50/45 px-4 py-2.5 text-sm w-full outline-none">
                            <option>Select Sanctuary</option>
                            {rooms.map((r) => <option key={r.id}>{r.name}</option>)}
                        </select>
                        <button className="bg-green-600 hover:bg-amber-600 text-white text-[0.63rem] tracking-[0.2em] uppercase font-medium py-3 w-full border-none cursor-pointer transition-colors">
                            Check Availability
                        </button>
                    </div>
                </div> */}

                <div className="nr-scroll hidden md:flex absolute bottom-8 right-1/2 translate-x-1/2 z-10 flex-col items-center gap-2">
                    <span className="text-[0.52rem] tracking-[0.3em] uppercase text-amber-100/25" style={{ writingMode: "vertical-rl" }}>Scroll</span>
                    <div className="w-px h-12 bg-amber-100/15 relative overflow-hidden nr-scroll-bar" />
                </div>
            </section>

            {/* ════ STATS ════ */}
            <div id="nr-stats" className="bg-stone-950 grid grid-cols-2 md:grid-cols-4">
                {stats.map((s) => (
                    <div key={s.label} className="nr-stat py-7 px-4 text-center border-r border-b md:border-b-0 border-white/[0.05] [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r last:border-r-0">
                        <span data-stat={s.label} className="fp text-3xl md:text-4xl text-green-400 block mb-1 leading-none">
                            {s.value}{s.suffix}
                        </span>
                        <span className="text-[0.55rem] tracking-[0.2em] uppercase text-amber-100/30">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* ════ ABOUT ════ */}
            <section id="nr-about" className="bg-amber-50 py-16 md:py-28 px-5 md:px-14 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div className="nr-about-text flex flex-col order-2 md:order-1">
                    <span className="text-[0.6rem] tracking-[0.3em] uppercase text-green-700 font-medium">{about.label}</span>
                    <div className="nr-line w-10 h-0.5 bg-green-500 my-4" />
                    <h2 className="fp text-[clamp(1.8rem,4vw,3.6rem)] text-stone-900 leading-tight">
                        {about.title}<br /><em className="italic text-green-700">{about.titleItalic}</em>
                    </h2>
                    <div className="nr-line w-full h-px bg-stone-200 my-6" />
                    {about.body.map((p, i) => (
                        <p key={i} className="fc text-lg text-stone-600 leading-[1.9] mb-3">{p}</p>
                    ))}
                    <blockquote className="border-l-4 border-green-500 pl-5 my-5 fp text-lg md:text-xl italic text-green-800 leading-snug">
                        "{about.quote}"
                    </blockquote>
                    <button onClick={() => scrollTo("#nr-rooms")}
                        className="mt-2 self-start text-[0.65rem] tracking-[0.2em] uppercase font-medium bg-stone-900 hover:bg-green-700 text-amber-50 px-7 py-3 border-none cursor-pointer transition-colors">
                        Discover the Rooms
                    </button>
                </div>
                <div className="relative order-1 md:order-2">
                    <img src={about.image} alt={about.imageAlt}
                        className="nr-about-img w-full h-[280px] md:h-[540px] object-cover relative z-10 block" />
                    <div className="nr-about-accent hidden md:block absolute bottom-[-1.2rem] right-[-1.2rem] w-3/5 h-3/5 border-2 border-green-500/50 z-0" />
                </div>
            </section>

            {/* ════ ROOMS ════ */}
            <section id="nr-rooms" className="bg-stone-100 py-16 md:py-28 px-5 md:px-14">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-10 md:mb-14">
                    <div>
                        <span className="text-[0.6rem] tracking-[0.3em] uppercase text-green-700 font-medium block mb-2">Sanctuaries</span>
                        <h2 className="fp text-[clamp(1.8rem,4vw,3.5rem)] text-stone-900 leading-tight">
                            Where You <em className="italic text-green-700">Rest & Return</em>
                        </h2>
                    </div>
                    <button onClick={() => scrollTo("#nr-contact")}
                        className="text-[0.63rem] tracking-[0.2em] uppercase text-stone-400 bg-transparent border-none border-b border-stone-300 hover:text-green-700 cursor-pointer pb-0.5 self-start sm:self-end transition-colors">
                        All Rooms →
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
                    {rooms.map((r, i) => (
                        <div key={r.id} className="nr-room-card relative overflow-hidden cursor-pointer"
                            style={{ height: "clamp(260px,40vw,480px)" }}
                            onMouseEnter={() => setActiveRoom(i)}>
                            <img src={r.image} alt={r.name} className="nr-room-img w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                                <span className="text-[0.57rem] tracking-[0.28em] uppercase text-green-400 block mb-1">{r.type}</span>
                                <h3 className="fp text-xl md:text-2xl text-amber-50 mb-2">{r.name}</h3>
                                {/* ── price removed ── */}
                                <p className="text-amber-100/45 text-xs leading-relaxed mb-3 max-w-[260px] hidden md:block">{r.description}</p>
                                <button onClick={() => scrollTo("#nr-contact")}
                                    className="nr-reveal-btn text-[0.6rem] tracking-[0.18em] uppercase text-green-400 bg-transparent border-none cursor-pointer">
                                    Reserve This Room →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-stone-900 px-5 md:px-8 py-4 flex flex-wrap items-center gap-4 md:gap-8 mt-0.5">
                    <span className="text-[0.58rem] tracking-[0.22em] uppercase text-green-400/70 shrink-0">
                        Included in {rooms[activeRoom]?.name}:
                    </span>
                    {rooms[activeRoom]?.amenities.map((a) => (
                        <span key={a} className="text-xs text-amber-100/40">✦ {a}</span>
                    ))}
                </div>
            </section>

            {/* ════ EXPERIENCES ════ */}
            <section id="nr-experiences" className="bg-stone-950 py-16 md:py-28 px-5 md:px-14 relative overflow-hidden">
                <span className="absolute -top-8 -right-8 text-[10rem] md:text-[18rem] opacity-[0.025] select-none pointer-events-none leading-none">🌿</span>
                <div className="max-w-6xl mx-auto relative z-10">
                    <span className="text-[0.6rem] tracking-[0.3em] uppercase text-green-500 font-medium block mb-3">What We Offer</span>
                    <h2 className="fp text-[clamp(1.8rem,4vw,3.5rem)] text-amber-50 leading-tight mb-10 md:mb-16">
                        Slow Down Into <em className="italic text-green-400">Something Real</em>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05]">
                        {experiences.map((e) => (
                            <div key={e.id}
                                className="nr-exp-card bg-stone-950 border border-transparent p-6 md:p-8 flex gap-4 items-start">
                                <span className="nr-exp-icon text-2xl md:text-3xl flex-shrink-0">{e.icon}</span>
                                <div>
                                    <h3 className="fp text-base md:text-lg text-amber-50 mb-2">{e.title}</h3>
                                    <p className="text-amber-100/40 text-sm leading-relaxed mb-3">{e.description}</p>
                                    <div className="flex gap-4">
                                        <span className="text-[0.55rem] tracking-widest uppercase text-green-500/60">⏱ {e.duration}</span>
                                        <span className="text-[0.55rem] tracking-widest uppercase text-green-500/60">🕐 {e.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════ GALLERY ════ */}
            <section id="nr-gallery" className="bg-amber-50 py-16 md:py-28 px-5 md:px-14">
                <span className="text-[0.6rem] tracking-[0.3em] uppercase text-green-700 font-medium block mb-3">Gallery</span>
                <h2 className="fp text-[clamp(1.8rem,4vw,3.5rem)] text-stone-900 mb-8 md:mb-12">
                    Life at <em className="italic text-green-700">Aarav</em>
                </h2>
                {/* Desktop */}
                <div className="hidden md:grid gap-1.5"
                    style={{ gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "280px 280px" }}>
                    {gallery.map((g, i) => (
                        <div key={g.id} className={`nr-gallery-item overflow-hidden relative group ${i === 0 ? "row-span-2" : ""}`}>
                            <img src={g.image} alt={g.caption} className="nr-gal-img w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/22 transition-colors duration-500" />
                            <span className="absolute bottom-3 left-3 text-[0.56rem] tracking-[0.22em] uppercase text-amber-50 bg-stone-950/55 px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {g.caption}
                            </span>
                        </div>
                    ))}
                </div>
                {/* Mobile */}
                <div className="grid md:hidden grid-cols-2 gap-2">
                    {gallery.map((g) => (
                        <div key={g.id} className="nr-gallery-item overflow-hidden h-40">
                            <img src={g.image} alt={g.caption} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </section>

            {/* ════ TESTIMONIALS ════ */}
            <section id="nr-testimonials" className="bg-stone-100 py-16 md:py-28 px-5 md:px-14">
                <div className="text-center mb-10 md:mb-14">
                    <span className="text-[0.6rem] tracking-[0.3em] uppercase text-green-700 font-medium block mb-3">Guest Voices</span>
                    <h2 className="fp text-[clamp(1.8rem,4vw,3.5rem)] text-stone-900">
                        What Guests <em className="italic text-green-700">Remember</em>
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {testimonials.map((t) => (
                        <div key={t.id} className="nr-testi bg-amber-50 p-6 md:p-8 border-b-2 border-transparent hover:border-green-500 transition-colors">
                            <Stars count={t.stars} />
                            <p className="fc italic text-stone-600 text-base md:text-lg leading-relaxed my-4">"{t.text}"</p>
                            <span className="text-[0.63rem] tracking-[0.15em] uppercase text-stone-400">
                                {t.author} · {t.location} · {t.date}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ════ CONTACT ════ */}
            <section id="nr-contact" className="relative py-16 md:py-28 px-5 md:px-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start overflow-hidden bg-green-900">
                <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1400&q=50"
                    alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.09]" />
                <div className="nr-contact-left relative z-10">
                    <span className="text-[0.6rem] tracking-[0.3em] uppercase text-green-300 font-medium block mb-3">Reserve Your Stay</span>
                    <h2 className="fp text-[clamp(1.8rem,4vw,3rem)] text-amber-50 leading-tight mb-4">
                        Begin Your <em className="italic">Mountain Story</em>
                    </h2>
                    <div className="nr-line w-10 h-0.5 bg-green-400 mb-5" />
                    <p className="fc italic text-lg md:text-xl text-amber-200/60 leading-relaxed mb-6">
                        Our team is ready to craft a stay that fits your pace, your breath, your dream.
                    </p>
                    {[`📍 ${siteInfo.location}`, `📞 ${siteInfo.phone}`, `✉️ ${siteInfo.email}`].map((item) => (
                        <p key={item} className="text-[0.63rem] tracking-[0.12em] uppercase text-amber-100/35 mb-2">{item}</p>
                    ))}
                </div>
                <div className="nr-contact-right relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        {
                            title: "Nature Immersion",
                            text: "Wake up to mountain air, forest silence and breathtaking sunrise views."
                        },
                        {
                            title: "Luxury Comfort",
                            text: "Beautifully crafted rooms designed to blend modern comfort with nature."
                        },
                        {
                            title: "Guided Experiences",
                            text: "Explore trails, waterfalls and local culture with curated experiences."
                        },
                        {
                            title: "Mindful Retreat",
                            text: "Disconnect from the noise and reconnect with peace and simplicity."
                        }
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="bg-white/[0.05] border border-white/[0.12] p-5 backdrop-blur-sm hover:bg-white/[0.08] transition-colors"
                        >
                            <h4 className="text-amber-50 text-sm tracking-wide mb-2">
                                {item.title}
                            </h4>
                            <p className="text-amber-200/60 text-sm leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    ))}

                    <a
                        href={`mailto:${siteInfo.email}`}
                        className="col-span-full bg-green-500 hover:bg-amber-500 text-white text-[0.65rem] tracking-[0.2em] uppercase font-medium py-4 text-center transition-colors"
                    >
                        Contact Our Team
                    </a>
                </div>
            </section>

            {/* ════ FOOTER ════ */}
            <footer className="bg-stone-950 px-5 md:px-14 pt-12 md:pt-14 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-10 border-b border-white/[0.05] mb-7">
                    <div className="col-span-2 md:col-span-1">
                        <span className="fp text-xl md:text-2xl text-amber-50 block mb-4">
                            Aarav <em className="italic text-green-400">Retreats</em>
                        </span>
                        <p className="text-amber-100/30 text-sm leading-relaxed">A mountain sanctuary where silence is the loudest sound.</p>
                    </div>
                    {Object.entries(footerLinks).map(([key, links]) => (
                        <div key={key}>
                            <span className="text-[0.57rem] tracking-[0.3em] uppercase text-green-500 block mb-3">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </span>
                            <ul className="flex flex-col gap-2 list-none m-0 p-0">
                                {links.map((l) => (
                                    <li key={l.label}>
                                        <button onClick={() => scrollTo(l.href)}
                                            className="text-amber-100/35 text-sm bg-transparent border-none cursor-pointer hover:text-amber-50 transition-colors text-left p-0">
                                            {l.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-amber-100/20 text-xs">© 2025 Aarav Retreats · Mukteshwar, Uttarakhand</p>
                    <div className="flex gap-5">
                        {["Instagram", "Pinterest", "TripAdvisor"].map((s) => (
                            <a key={s} href="#" className="text-[0.6rem] tracking-[0.18em] uppercase text-amber-100/25 no-underline hover:text-green-400 transition-colors">{s}</a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}