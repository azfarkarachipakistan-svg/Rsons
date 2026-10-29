import fs from 'node:fs'
import path from 'node:path'

const pagesDir = 'C:/Users/Dell/Downloads/esspl-premium/src/pages/esstrack'
const compDir = path.join(pagesDir, 'components')

// 1. ESSTrackVideoScrub.jsx
const videoScrubCode = `import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Radio, Navigation, CheckCircle2, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ESSTrackVideoScrub() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const phase1Ref = useRef(null)
  const phase2Ref = useRef(null)
  const barRef = useRef(null)
  const [progressVal, setProgressVal] = useState(0)

  useLayoutEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    video.play().catch(() => {})

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgressVal(Math.round(self.progress * 100))
            if (barRef.current) {
              barRef.current.style.transform = \`scaleX(\${self.progress})\`
            }
            if (video && !video.paused) {
              const speed = Math.min(2.5, Math.max(0.7, 1 + Math.abs(self.getVelocity() / 1500)))
              video.playbackRate = speed
            }
          },
        },
      })

      // Smooth camera scale scrub
      tl.fromTo(video, { scale: 1.15 }, { scale: 1.0, ease: 'none' }, 0)

      // Phase 1: Tracking in Transit fades out
      tl.fromTo(
        phase1Ref.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -30, duration: 0.35, ease: 'power2.inOut' },
        0.18
      )

      // Phase 2: Remote Cutoff & SOC Intercept fades in
      tl.fromTo(
        phase2Ref.current,
        { opacity: 0, y: 30, pointerEvents: 'none' },
        { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35, ease: 'power2.inOut' },
        0.45
      )
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative bg-[#0B192C] text-white overflow-hidden w-full">
      <div className="relative h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Background Scrubbed Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            src="./videos/hero-car.mp4"
            className="w-full h-full object-cover will-change-transform"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          {/* Subtle vignette gradient for legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(11,25,44,0.85) 0%, rgba(11,25,44,0.52) 45%, rgba(11,25,44,0.92) 100%)',
            }}
          />
        </div>

        {/* Top Telemetry Scrub Bar */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-10 w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-slate-300 font-mono">
              Live Satellite Telemetry Sequence
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider text-slate-400">
              Scroll to scrub telematics
            </span>
            <div className="w-28 h-[3px] bg-white/20 rounded-full overflow-hidden">
              <div
                ref={barRef}
                className="h-full w-full bg-blue-500 origin-left transition-transform duration-75"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
            <span className="font-mono text-[12px] font-bold text-blue-400 w-9 text-right">
              {progressVal}%
            </span>
          </div>
        </div>

        {/* Center Content Viewport */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full my-auto">
          {/* Phase 1: Highway Telemetry */}
          <div ref={phase1Ref} className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-blue-200 font-semibold font-mono">
              <Radio size={14} className="text-blue-400" />
              <span>GNSS ACTIVE • 5-SEC POLLING</span>
            </div>

            <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] text-white">
              Pinpoint tracking at highway speeds.
            </h2>

            <p className="text-[16px] text-slate-300 leading-relaxed max-w-xl">
              From the M-9 motorway to remote freight corridors, multi-network roaming SIMs maintain uninterrupted telematics feeding directly into the Karachi SOC.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="px-4 py-2.5 rounded-[12px] bg-white/10 backdrop-blur-md border border-white/15">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Position Error</span>
                <strong className="text-white text-[15px] font-mono">&lt; 2.5 meters</strong>
              </div>
              <div className="px-4 py-2.5 rounded-[12px] bg-white/10 backdrop-blur-md border border-white/15">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Telemetry Latency</span>
                <strong className="text-white text-[15px] font-mono">1.2 seconds</strong>
              </div>
            </div>
          </div>

          {/* Phase 2: Instant Remote Cutoff */}
          <div
            ref={phase2Ref}
            className="max-w-2xl space-y-5"
            style={{ opacity: 0, pointerEvents: 'none' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 font-semibold font-mono">
              <Shield size={14} className="text-emerald-400" />
              <span>EMERGENCY IMMOBILIZER ARMED</span>
            </div>

            <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] text-white">
              Safe-speed engine cutoff. Guaranteed recovery.
            </h2>

            <p className="text-[16px] text-slate-300 leading-relaxed max-w-xl">
              In a confirmed snatching or route deviation event, the 40A solid-state relay immobilizes the engine safely upon deceleration, while police units intercept via live satellite coordinates.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/ess-track/packages"
                className="font-display font-bold px-7 py-3.5 rounded-[10px] bg-blue-600 hover:bg-blue-500 text-white text-[14px] shadow-lg flex items-center gap-2"
              >
                <span>Protect Your Vehicle</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/ess-track/stories"
                className="font-display font-bold px-6 py-3.5 rounded-[10px] bg-white/10 hover:bg-white/20 text-white text-[14px] border border-white/20"
              >
                View Recovery Chronicles
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Status Ticker */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pb-8 w-full flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>PTA Operator Licence: ESSPL Telematics</span>
          <span className="hidden sm:inline">24/7 SOC Emergency Desk: 021-34330887</span>
        </div>
      </div>
    </section>
  )
}
`

// 2. Updated ESSTrackHome.jsx with Video Scrub, Rich Imagery & Mobile App Mockup
const homeCode = `import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero.jsx'
import SectionHead from '../../components/SectionHead.jsx'
import Reveal, { RevealLines, Line } from '../../components/Reveal.jsx'
import ParallaxImage from '../../components/ParallaxImage.jsx'
import ESSTrackSubNav from './components/ESSTrackSubNav.jsx'
import ESSTrackVideoScrub from './components/ESSTrackVideoScrub.jsx'
import ESSTrackChatbot from './components/ESSTrackChatbot.jsx'
import { CheckCircle2, ArrowRight, ShieldCheck, MapPin, Bell, Clock, Smartphone, Radio } from 'lucide-react'

function CheckItem({ children }) {
  return (
    <li className="flex gap-3">
      <span className="w-5 h-5 shrink-0 rounded-full flex items-center justify-center mt-0.5 bg-sky-soft text-electric">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><polyline points="20 6 9 17 4 12" /></svg>
      </span>
      <span className="text-[15px] text-ink2">{children}</span>
    </li>
  )
}

export default function ESSTrackHome() {
  const [packages, setPackages] = useState([])

  useEffect(() => {
    fetch('/api/v1/esstrack/packages')
      .then(r => r.json())
      .then(d => {
        if (d.packages) setPackages(d.packages.filter(p => p.plan_type === 'rental').slice(0, 3))
      })
      .catch(() => {})
  }, [])

  return (
    <div className="bg-white text-ink2 font-sans selection:bg-electric selection:text-white">
      <PageHero
        video="./videos/hero-car.mp4"
        poster="./img/hero-video-poster.jpg"
        crumb="ESS-Track"
        title="PTA-licensed vehicle telematics & recovery."
        lede="Satellite GPS tracking, emergency engine cut-off, and 24/7 central SOC recovery assistance across Pakistan."
        badges={['PTA Licensed Operator', 'SECP Registered', '24/7 Karachi SOC', '10+ Years in Field']}
      />

      <ESSTrackSubNav />

      {/* Overview Split with High-Res Imagery */}
      <section className="py-[90px] scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="relative">
              <ParallaxImage
                src="./img/soc-wall.jpg"
                alt="ESSPL Telematics SOC"
                className="rounded-[20px] shadow-[0_18px_50px_-12px_rgba(15,23,42,0.12)] aspect-[4/3]"
              />
              {/* Overlay Telemetry Pill */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-[14px] bg-white/95 backdrop-blur-md border border-line shadow-md flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-mute uppercase font-bold">Central Control Room</span>
                  <strong className="text-[14px] font-display text-ink block">Karachi Telematics Operations</strong>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                  24/7 LIVE
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2.5 text-[12px] font-bold tracking-[0.16em] uppercase mb-4 text-electric">
                <span className="w-[26px] h-[2px] rounded bg-electric" />
                Fleet Telematics & Recovery
              </span>
            </Reveal>
            <RevealLines className="font-display font-extrabold tracking-[-0.02em] leading-[1.1] text-[clamp(1.8rem,3vw,2.5rem)] text-ink mb-5">
              {'Every asset,\naccounted for.'}
            </RevealLines>
            <Reveal delay={0.1}>
              <p className="text-mute text-[16px] mb-7 leading-relaxed">
                Operating under a formal PTA vehicle-tracking licence since 2009, ESS-Track provides enterprise visibility over prime movers, reefer trucks, corporate fleets, and private vehicles throughout Pakistan.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="space-y-3.5 mb-8">
                <CheckItem>Live GPS tracking with 5-second polling on European server software</CheckItem>
                <CheckItem>24/7 human-staffed Karachi Security Operations Center (SOC)</CheckItem>
                <CheckItem>Direct Police 15 and CPLC liaison for stolen asset recovery</CheckItem>
                <CheckItem>Opto-isolated remote starter cutoff relay for safe engine immobilization</CheckItem>
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/ess-track/packages"
                  className="inline-flex font-display font-bold px-7 py-3.5 rounded-[10px] bg-electric hover:bg-electric-dark text-white shadow-[0_8px_20px_-6px_rgba(29,78,216,.35)] transition-all hover:-translate-y-0.5 text-[14px]"
                >
                  View Packages & Pricing
                </Link>
                <Link
                  to="/ess-track/hardware"
                  className="inline-flex font-display font-bold px-6 py-3.5 rounded-[10px] bg-white hover:bg-paper text-ink border border-line text-[14px] transition-colors"
                >
                  Hardware Specifications
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= SCROLL-DRIVEN VIDEO SCRUB SECTION ================= */}
      <ESSTrackVideoScrub />

      {/* Visual Image Grid: Capabilities */}
      <section className="py-[90px] bg-paper border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHead
            eyebrow="Capabilities"
            title={'Engineered for local road &\ncellular conditions.'}
            lede="Multi-network roaming SIMs, non-volatile memory, and military-grade GNSS receivers built to withstand heat and signal drops."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-[16px] bg-white border border-line overflow-hidden shadow-xs flex flex-col justify-between">
              <img src="./img/fleet-highway.jpg" alt="Fleet tracking" className="w-full h-48 object-cover" />
              <div className="p-7">
                <h3 className="font-display font-bold text-ink text-[18px] mb-2">Real-Time Street Mapping</h3>
                <p className="text-[14px] text-mute leading-relaxed">
                  Precise vehicle positioning on Google Maps with turn-by-turn route replay, live speed telemetry, and ignition detection.
                </p>
              </div>
            </div>

            <div className="rounded-[16px] bg-white border border-line overflow-hidden shadow-xs flex flex-col justify-between">
              <img src="./img/cctv-engineer.jpg" alt="Anti-tamper fitting" className="w-full h-48 object-cover" />
              <div className="p-7">
                <h3 className="font-display font-bold text-ink text-[18px] mb-2">Proactive Anti-Tamper Alerts</h3>
                <p className="text-[14px] text-mute leading-relaxed">
                  Instant automated phone calls if power cables are cut, vehicle leaves city boundaries, or unauthorized ignition triggers.
                </p>
              </div>
            </div>

            <div className="rounded-[16px] bg-white border border-line overflow-hidden shadow-xs flex flex-col justify-between">
              <img src="./img/genset.jpg" alt="Cold-chain and fuel monitoring" className="w-full h-48 object-cover" />
              <div className="p-7">
                <h3 className="font-display font-bold text-ink text-[18px] mb-2">Sensor & Cold-Chain Telemetry</h3>
                <p className="text-[14px] text-mute leading-relaxed">
                  Support for refrigerated truck temperature sensors and fuel level monitoring with immediate threshold breach alerts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Mobile App Mockup Section */}
      <section className="py-[90px] bg-white">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-bold tracking-[0.16em] uppercase text-electric">
              <span className="w-[26px] h-[2px] rounded bg-electric" />
              Mobile App Experience
            </span>
            <h2 className="font-display font-extrabold tracking-[-0.02em] leading-[1.1] text-[clamp(1.8rem,3vw,2.5rem)] text-ink">
              Direct telemetry & control from your pocket.
            </h2>
            <p className="text-mute text-[16px] leading-relaxed">
              Available on iOS and Android, the ESS-Track mobile app gives owners and fleet dispatchers full commanding authority over their vehicles 24 hours a day.
            </p>

            <div className="space-y-3.5 pt-2">
              <CheckItem>Live map tracking with 5-second coordinate refreshes</CheckItem>
              <CheckItem>Emergency one-touch remote engine cutoff command</CheckItem>
              <CheckItem>Custom geofence perimeter drawing with instant notification</CheckItem>
              <CheckItem>Over-speeding audio alerts and trip logs with export</CheckItem>
            </div>

            <div className="pt-4">
              <Link
                to="/ess-track/packages"
                className="inline-flex font-display font-bold px-7 py-3.5 rounded-[10px] bg-electric hover:bg-electric-dark text-white text-[14px] shadow-sm"
              >
                Choose a Package with Free Mobile App
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative max-w-[340px] p-3 rounded-[36px] bg-slate-900 shadow-2xl border-4 border-slate-800">
              <img
                src="./img/app-interface.png"
                alt="ESS-Track Mobile Application"
                className="w-full h-auto rounded-[28px] object-cover"
              />
              {/* Floating feature tag */}
              <div className="absolute -bottom-4 -left-6 bg-white p-3.5 rounded-[14px] shadow-lg border border-line text-xs space-y-0.5">
                <span className="font-bold text-ink block font-display">Engine Cutoff Ready</span>
                <span className="text-emerald-600 font-mono text-[11px] font-semibold">● Relay Online</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages Strip */}
      <section className="py-[90px] bg-paper border-t border-line">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHead
            eyebrow="Pricing"
            title={'Transparent packages.\nZero hidden fees.'}
            lede="Choose from starter tracking, European-standard gold plans, or comprehensive fleet packages."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={\`p-8 rounded-[16px] bg-white border flex flex-col justify-between transition-all shadow-xs hover:shadow-md \${
                  pkg.popular ? 'border-electric ring-1 ring-electric/20' : 'border-line'
                }\`}
              >
                <div>
                  <span className="inline-block text-[11px] font-bold text-mute uppercase tracking-wider mb-2">
                    {pkg.popular ? 'Most Selected' : 'Rental Plan'}
                  </span>
                  <h3 className="font-display font-extrabold text-ink text-[20px]">{pkg.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-[32px] font-extrabold text-ink font-mono">{pkg.price}</span>
                    <span className="text-[13px] text-mute">{pkg.unit || '/Total'}</span>
                  </div>

                  <div className="mt-6 pt-5 border-t border-line space-y-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-mute block">Includes</span>
                    {pkg.features?.slice(0, 5).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-[13.5px] text-ink2">
                        <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-line">
                  <Link
                    to="/ess-track/packages"
                    className={\`w-full py-3 rounded-[8px] font-display font-bold text-[13.5px] flex items-center justify-center gap-2 transition-colors \${
                      pkg.popular
                        ? 'bg-electric hover:bg-electric-dark text-white'
                        : 'bg-paper hover:bg-slate-200 text-ink'
                    }\`}
                  >
                    <span>View Plan & Book</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/ess-track/packages"
              className="inline-flex font-display font-bold text-electric hover:underline text-[14px]"
            >
              Compare all 9 rental & device packages →
            </Link>
          </div>
        </div>
      </section>

      <ESSTrackChatbot />
    </div>
  )
}
`

fs.writeFileSync(path.join(compDir, 'ESSTrackVideoScrub.jsx'), videoScrubCode, 'utf8')
fs.writeFileSync(path.join(pagesDir, 'ESSTrackHome.jsx'), homeCode, 'utf8')

console.log('Successfully added ESSTrackVideoScrub and enhanced ESSTrackHome visuals.')
