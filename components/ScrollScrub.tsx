"use client";
import { useEffect, useRef, useState } from "react";
export default function ScrollScrub() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current; const v = videoRef.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setProgress(p);
      if (v && v.duration && !Number.isNaN(v.duration)) { try { v.currentTime = p * v.duration; } catch {} }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ready]);
  return (
    <section ref={wrapRef} style={{ height: "300vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", background: "#F7F4EF", overflow: "hidden" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 32, alignItems: "center" }}>
          <div>
            <p className="eyebrow">Scroll to scrub the film</p>
            <h2 className="serif" style={{ fontSize: 52, lineHeight: 1.05, margin: "12px 0" }}>From thread<br />to silhouette.</h2>
            <p style={{ color: "#6E6A63", lineHeight: 1.7 }}>Keep scrolling — the hero film is tied to your scroll position. If the video metadata has not loaded yet, the progress bar below still tracks your scroll, and the film plays normally in the hero.</p>
            <div style={{ height: 8, background: "#EDE8DF", borderRadius: 999, marginTop: 20 }}><div style={{ width: `${progress * 100}%`, height: "100%", background: "#B89768", borderRadius: 999 }} /></div>
            <p className="mono">{Math.round(progress * 100)}% scrubbed</p>
          </div>
          <video ref={videoRef} src="/media/hero.mp4" poster="/media/craft.webp" muted playsInline preload="metadata" onLoadedMetadata={() => setReady(true)} style={{ width: "100%", borderRadius: 4, border: "1px solid #E5E0D8", background: "#fff" }} />
        </div>
      </div>
    </section>
  );
}
