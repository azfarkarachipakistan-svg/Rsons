"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TECHNIQUES } from "../lib/products";
import { useCart, useCurrency } from "../lib/store";

const SILHOUETTES = ["Snapback", "59FIFTY Fitted", "A-Frame Trucker", "Classic Washed Dad Cap", "8-Wale Corduroy", "Fisherman Beanie", "Bucket Hat"];
const CROWN_COLORS = [
  { name: "Espresso", hex: "#3B2F2A" }, { name: "Alabaster", hex: "#EDE8DF" }, { name: "Navy", hex: "#1F2A44" },
  { name: "Olive", hex: "#5A5B3A" }, { name: "Camel", hex: "#B89768" }, { name: "Terracotta", hex: "#9E472A" }, { name: "Black", hex: "#141312" },
];
const VISOR_COLORS = [
  { name: "Espresso", hex: "#3B2F2A" }, { name: "Suede Tan", hex: "#A67C52" }, { name: "Cork", hex: "#C9A86A" },
  { name: "Navy", hex: "#1F2A44" }, { name: "Alabaster", hex: "#EDE8DF" }, { name: "Olive", hex: "#5A5B3A" },
];
const UNDERBILLS = [
  { name: "Classic Kelly Green", hex: "#1E6B4A" }, { name: "Alabaster", hex: "#EDE8DF" }, { name: "Espresso", hex: "#3B2F2A" },
];
const THREADS = [
  { name: "Champagne Gold", hex: "#B89768" }, { name: "Metallic Gold", hex: "#D4AF37" }, { name: "Espresso", hex: "#3B2F2A" },
  { name: "Cream", hex: "#F5F0E6" }, { name: "Navy", hex: "#1F2A44" }, { name: "Terracotta", hex: "#9E472A" }, { name: "Sage", hex: "#2E6F40" },
];
const FONTS: Record<string, string> = { "Sartorial Serif": "Georgia, serif", "Varsity Block": "Impact, Arial Black, sans-serif", "Old English": "Georgia, serif", "Vintage Script": "cursive", "Minimal Sans": "Arial, sans-serif" };
const ZONES = ["Front Crown", "Back Strap Arch", "Left Side Panel", "Right Side Panel"];
const VIEWS = ["Front Crown", "Back Arch", "Left Temple", "Right Temple", "Underbill", "Interior Label", "360° Orbit"] as const;

function drawCapText(canvas: HTMLCanvasElement, cfg: { line1: string; line2: string; font: string; arch: number; spacing: number; thread: string; technique: string }) {
  const ctx = canvas.getContext("2d"); if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const family = FONTS[cfg.font] || "Arial, sans-serif";
  const isPatch = cfg.technique === "patch";
  const isPrintPatch = cfg.technique === "print-patch";
  if (isPatch) { ctx.fillStyle = "#7A4A2B"; ctx.beginPath(); ctx.roundRect(52, 92, 920, 328, 28); ctx.fill(); }
  if (isPrintPatch) { ctx.fillStyle = "#FFFFFF"; ctx.strokeStyle = "#141312"; ctx.lineWidth = 6; ctx.beginPath(); ctx.roundRect(52, 92, 920, 328, 28); ctx.fill(); ctx.stroke(); }
  const drawLine = (text: string, centerY: number, size: number) => {
    if (!text) return;
    ctx.font = `${cfg.font === "Varsity Block" ? "900" : "700"} ${size}px ${family}`;
    ctx.fillStyle = cfg.thread; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const widths = [...text].map((ch) => ctx.measureText(ch).width);
    const total = widths.reduce((s, w) => s + w + cfg.spacing, 0) - cfg.spacing;
    let x = 512 - total / 2;
    [...text].forEach((ch, i) => {
      const w = widths[i];
      const norm = total > 0 ? ((x + w / 2 - 512) / (total / 2 || 1)) : 0;
      const yOff = -cfg.arch * 0.9 * norm * norm;
      const angle = -cfg.arch * 0.004 * norm;
      ctx.save(); ctx.translate(x + w / 2, centerY + yOff); ctx.rotate(angle);
      if (cfg.technique === "puff") { ctx.shadowColor = "rgba(0,0,0,.25)"; ctx.shadowBlur = 6; ctx.lineWidth = 3; ctx.strokeStyle = cfg.thread; ctx.strokeText(ch, 0, 0); }
      ctx.fillText(ch, 0, 0); ctx.restore();
      x += w + cfg.spacing;
    });
  };
  drawLine(cfg.line1, cfg.line2 ? 190 : 256, 118);
  if (cfg.line2) drawLine(cfg.line2, 330, 96);
}

export default function CapSimulator() {
  const mountRef = useRef<HTMLDivElement>(null);
  const partsRef = useRef<any>(null);
  const configRef = useRef<any>(null);
  const [silhouette, setSilhouette] = useState(SILHOUETTES[0]);
  const [crown, setCrown] = useState(CROWN_COLORS[0].hex);
  const [visor, setVisor] = useState(VISOR_COLORS[0].hex);
  const [visorMat, setVisorMat] = useState("Cotton Twill");
  const [underbill, setUnderbill] = useState(UNDERBILLS[0].hex);
  const [zone, setZone] = useState(ZONES[0]);
  const [technique, setTechnique] = useState<string>("puff");
  const [line1, setLine1] = useState("R&SONS");
  const [line2, setLine2] = useState("ATELIER");
  const [font, setFont] = useState("Sartorial Serif");
  const [arch, setArch] = useState(20);
  const [spacing, setSpacing] = useState(4);
  const [thread, setThread] = useState(THREADS[0].hex);
  const [view, setView] = useState<string>("Front Crown");
  const [lighting, setLighting] = useState("Daylight");
  const [uploadUrl, setUploadUrl] = useState("");
  const { add } = useCart(); const { fmt } = useCurrency();
  const tech = TECHNIQUES.find((t) => t.id === technique) || TECHNIQUES[0];
  const extra = line2.trim() ? 5 : 0;
  const total = 28 + tech.price + extra;
  const stitches = Math.round((4200 + (line1.length + line2.length) * 380) * (technique === "puff" ? 1.4 : technique === "flat" ? 1 : 0.85));
  const config = useMemo(() => ({ silhouette, crown, visor, visorMat, underbill, zone, technique, line1, line2, font, arch, spacing, thread }), [silhouette, crown, visor, visorMat, underbill, zone, technique, line1, line2, font, arch, spacing, thread]);
  configRef.current = config;

  useEffect(() => {
    const mount = mountRef.current; if (!mount) return;
    const scene = new THREE.Scene(); scene.background = new THREE.Color("#F7F4EF");
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100); camera.position.set(0, 0.9, 3.4);
    const renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping = true; controls.target.set(0, 0.4, 0);
    const ambient = new THREE.AmbientLight(0xffffff, 0.95); scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xfff2d9, 1.4); dir.position.set(3, 5, 4); scene.add(dir);
    const fill = new THREE.DirectionalLight(0xffffff, 0.5); fill.position.set(-3, 2, -2); scene.add(fill);
    const cap = new THREE.Group(); scene.add(cap);
    const crownMats: THREE.MeshStandardMaterial[] = [];
    for (let i = 0; i < 6; i++) {
      const m = new THREE.MeshStandardMaterial({ color: "#3B2F2A", roughness: 0.92 });
      const geo = new THREE.SphereGeometry(1, 28, 16, (i * Math.PI) / 3, Math.PI / 3, 0, 1.85);
      const mesh = new THREE.Mesh(geo, m); mesh.position.y = 0.25; cap.add(mesh); crownMats.push(m);
    }
    const brimShape = new THREE.Shape();
    brimShape.moveTo(-1.05, 0); brimShape.quadraticCurveTo(-1.05, 0.55, -0.6, 0.95); brimShape.quadraticCurveTo(0, 1.35, 0.6, 0.95); brimShape.quadraticCurveTo(1.05, 0.55, 1.05, 0); brimShape.quadraticCurveTo(0.7, -0.15, 0, -0.15); brimShape.quadraticCurveTo(-0.7, -0.15, -1.05, 0);
    const brimGeo = new THREE.ExtrudeGeometry(brimShape, { depth: 0.08, bevelEnabled: false });
    const brimMat = new THREE.MeshStandardMaterial({ color: "#3B2F2A", roughness: 0.9 });
    const brim = new THREE.Mesh(brimGeo, brimMat); brim.rotation.x = Math.PI / 2; brim.position.y = 0.08; cap.add(brim);
    const underMat = new THREE.MeshStandardMaterial({ color: "#1E6B4A", roughness: 0.9 });
    const under = new THREE.Mesh(brimGeo, underMat); under.rotation.x = Math.PI / 2; under.position.y = -0.02; under.scale.set(0.98, 0.98, 1); cap.add(under);
    const ringGeo = new THREE.RingGeometry(0.92, 1.5, 48); const ringMat = new THREE.MeshStandardMaterial({ color: "#3B2F2A", roughness: 0.9, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.02; ring.visible = false; cap.add(ring);
    const button = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.08, 20), new THREE.MeshStandardMaterial({ color: "#3B2F2A", roughness: 0.6 })); button.position.y = 1.28; cap.add(button);
    const canvas = document.createElement("canvas"); canvas.width = 1024; canvas.height = 512;
    const tex = new THREE.CanvasTexture(canvas); tex.colorSpace = THREE.SRGBColorSpace;
    const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 0.68), new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.9 }));
    textMesh.position.set(0, 0.6, 0.92); textMesh.rotation.x = -0.22; cap.add(textMesh);
    const labelCanvas = document.createElement("canvas"); labelCanvas.width = 512; labelCanvas.height = 256;
    const lctx = labelCanvas.getContext("2d"); if (lctx) { lctx.fillStyle = "#EDE8DF"; lctx.fillRect(0, 0, 512, 256); lctx.fillStyle = "#141312"; lctx.font = "700 44px Georgia"; lctx.textAlign = "center"; lctx.fillText("R & SONS", 256, 110); lctx.font = "28px Arial"; lctx.fillText("PRIVATE LABEL", 256, 160); }
    const labelTex = new THREE.CanvasTexture(labelCanvas); labelTex.colorSpace = THREE.SRGBColorSpace;
    const labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.3), new THREE.MeshStandardMaterial({ map: labelTex })); labelMesh.position.set(0, 0.25, 0.62); labelMesh.rotation.x = -0.6; labelMesh.visible = false; cap.add(labelMesh);
    partsRef.current = { scene, camera, renderer, controls, cap, crownMats, brimMat, underMat, brim, under, ring, ringMat, button, textMesh, canvas, tex, labelMesh, ambient, dir };
    const resize = () => { const w = mount.clientWidth || 600; const h = 520; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    resize(); window.addEventListener("resize", resize);
    let raf = 0; const loop = () => { raf = requestAnimationFrame(loop); controls.update(); renderer.render(scene, camera); }; loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); controls.dispose(); renderer.dispose(); mount.removeChild(renderer.domElement); };
  }, []);

  useEffect(() => {
    const P = partsRef.current; if (!P) return;
    const c = configRef.current;
    P.crownMats.forEach((m: THREE.MeshStandardMaterial) => { m.color.set(c.crown); m.roughness = c.silhouette === "8-Wale Corduroy" ? 1 : 0.92; });
    P.brimMat.color.set(c.visor); P.brimMat.roughness = c.visorMat === "Suede" ? 1 : c.visorMat === "Cork" ? 0.95 : 0.85;
    P.underMat.color.set(c.underbill);
    const isBeanie = c.silhouette === "Fisherman Beanie";
    const isBucket = c.silhouette === "Bucket Hat";
    P.brim.visible = !isBeanie && !isBucket; P.under.visible = !isBeanie && !isBucket; P.ring.visible = isBucket; P.button.visible = !isBeanie;
    if (isBucket) P.ringMat.color.set(c.visor);
    P.cap.scale.set(1, c.silhouette === "Classic Washed Dad Cap" ? 0.84 : c.silhouette === "A-Frame Trucker" ? 1.12 : isBeanie ? 1.22 : 1, 1);
    drawCapText(P.canvas, c); P.tex.needsUpdate = true;
    const t = P.textMesh;
    if (c.zone === "Front Crown") { t.position.set(0, 0.6, 0.92); t.rotation.set(-0.22, 0, 0); t.scale.set(1, 1, 1); }
    if (c.zone === "Back Strap Arch") { t.position.set(0, 0.6, -0.92); t.rotation.set(0.22, Math.PI, 0); t.scale.set(1, 1, 1); }
    if (c.zone === "Left Side Panel") { t.position.set(-0.92, 0.6, 0); t.rotation.set(0, -Math.PI / 2, 0); t.scale.set(0.8, 0.8, 1); }
    if (c.zone === "Right Side Panel") { t.position.set(0.92, 0.6, 0); t.rotation.set(0, Math.PI / 2, 0); t.scale.set(0.8, 0.8, 1); }
  }, [config]);

  useEffect(() => {
    const P = partsRef.current; if (!P) return;
    const pos: Record<string, [number, number, number]> = {
      "Front Crown": [0, 0.9, 3.4], "Back Arch": [0, 0.9, -3.4], "Left Temple": [-3.4, 0.9, 0], "Right Temple": [3.4, 0.9, 0],
      "Underbill": [0, -1.4, 2.4], "Interior Label": [0, 0.35, 1.7], "360° Orbit": [2.4, 1.2, 2.4],
    };
    const p = pos[view] || pos["Front Crown"]; P.camera.position.set(p[0], p[1], p[2]);
    P.controls.autoRotate = view === "360° Orbit"; P.controls.autoRotateSpeed = 2.0;
    P.labelMesh.visible = view === "Interior Label";
    P.scene.background = new THREE.Color(lighting === "Daylight" ? "#F7F4EF" : "#FFFFFF");
    P.dir.intensity = lighting === "Daylight" ? 1.4 : 1.8; P.ambient.intensity = lighting === "Daylight" ? 0.95 : 0.75;
  }, [view, lighting]);

  const downloadTechPack = () => {
    const data = { product: "R&Sons Bespoke Cap", ...config, techniquePrice: tech.price, extraMonogram: extra, totalGBP: total, stitches, telemetry: `Front: ${tech.name} · ${stitches.toLocaleString()} stitches · Est. dispatch: 3 days`, note: "Demo tech pack generated in the browser. Production .DST files are a TODO (see README)." };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "rsons-tech-pack.json"; a.click(); URL.revokeObjectURL(a.href);
  };
  const shareCode = `RSONS-${silhouette.replace(/[^A-Za-z]/g, "").slice(0, 4).toUpperCase()}-${line1.replace(/[^A-Za-z0-9]/g, "").toUpperCase() || "CAP"}`;
  return (<section className="container" style={{ padding: "32px 24px" }}>
    <p className="eyebrow">R&Sons Atelier · Real Three.js simulator</p>
    <h1 className="serif" style={{ fontSize: 44, margin: "8px 0" }}>3D Custom Studio</h1>
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
      <div>
        <div style={{ background: "#F7F4EF", border: "1px solid #E5E0D8", borderRadius: 4, position: "relative" }}>
          <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2 }} className="pill">Front: {tech.name} · {stitches.toLocaleString()} stitches · Est. dispatch: 3 days</div>
          <div ref={mountRef} style={{ width: "100%", height: 520 }} />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: 12 }}>
            {VIEWS.map((v) => <button key={v} className={`pill ${view === v ? "active" : ""}`} onClick={() => setView(v)}>{v}</button>)}
            <button className={`pill ${lighting === "Daylight" ? "active" : ""}`} onClick={() => setLighting("Daylight")}>Daylight</button>
            <button className={`pill ${lighting === "Studio" ? "active" : ""}`} onClick={() => setLighting("Studio")}>Studio Lighting</button>
            <button className="pill" onClick={() => alert("AR Mirror Try-On is a placeholder in this build — camera AR is a TODO in the README.")}>AR Mirror Try-On</button>
          </div>
          <p className="mono" style={{ padding: "0 12px 12px", color: "#6E6A63" }}>Drag to orbit. Scroll to zoom. This is a procedural Three.js cap (crown panels, brim, button, underbill, canvas-texture lettering) — not a static illustration.</p>
        </div>
      </div>
      <div className="card" style={{ padding: 20, display: "grid", gap: 16, alignContent: "start" }}>
        <div><label className="eyebrow">Step 1 · Silhouette</label><select className="field" value={silhouette} onChange={(e) => setSilhouette(e.target.value)}>{SILHOUETTES.map((s) => <option key={s}>{s}</option>)}</select></div>
        <div><label className="eyebrow">Crown colour</label><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{CROWN_COLORS.map((c) => <button key={c.hex} title={c.name} onClick={() => setCrown(c.hex)} style={{ width: 30, height: 30, borderRadius: "50%", background: c.hex, border: crown === c.hex ? "3px solid #B89768" : "1px solid #E5E0D8" }} />)}</div></div>
        <div><label className="eyebrow">Visor colour / material</label><select className="field" value={visorMat} onChange={(e) => setVisorMat(e.target.value)}><option>Cotton Twill</option><option>Suede</option><option>Cork</option></select><div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>{VISOR_COLORS.map((c) => <button key={c.hex} title={c.name} onClick={() => setVisor(c.hex)} style={{ width: 30, height: 30, borderRadius: "50%", background: c.hex, border: visor === c.hex ? "3px solid #B89768" : "1px solid #E5E0D8" }} />)}</div></div>
        <div><label className="eyebrow">Underbill</label><select className="field" value={underbill} onChange={(e) => setUnderbill(e.target.value)}>{UNDERBILLS.map((c) => <option key={c.hex} value={c.hex}>{c.name}</option>)}</select></div>
        <div><label className="eyebrow">Step 2 · Placement zone</label><select className="field" value={zone} onChange={(e) => setZone(e.target.value)}>{ZONES.map((z) => <option key={z}>{z}</option>)}</select></div>
        <div><label className="eyebrow">Step 3 · Technique</label><select className="field" value={technique} onChange={(e) => setTechnique(e.target.value)}>{TECHNIQUES.map((t) => <option key={t.id} value={t.id}>{t.name} (+£{t.price.toFixed(2)})</option>)}</select></div>
        <div><label className="eyebrow">Step 4 · Typography</label>
          <input className="field" value={line1} onChange={(e) => setLine1(e.target.value.slice(0, 14))} placeholder="Line 1" />
          <input className="field" style={{ marginTop: 8 }} value={line2} onChange={(e) => setLine2(e.target.value.slice(0, 14))} placeholder="Line 2 (adds £5.00 monogram)" />
          <select className="field" style={{ marginTop: 8 }} value={font} onChange={(e) => setFont(e.target.value)}>{Object.keys(FONTS).map((f) => <option key={f}>{f}</option>)}</select>
          <label className="mono">Arch {arch}° <input type="range" min={-90} max={90} value={arch} onChange={(e) => setArch(Number(e.target.value))} style={{ width: "100%" }} /></label>
          <label className="mono">Letter spacing {spacing}px <input type="range" min={0} max={20} value={spacing} onChange={(e) => setSpacing(Number(e.target.value))} style={{ width: "100%" }} /></label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{THREADS.map((t) => <button key={t.hex} title={t.name} onClick={() => setThread(t.hex)} style={{ width: 28, height: 28, borderRadius: "50%", background: t.hex, border: thread === t.hex ? "3px solid #B89768" : "1px solid #E5E0D8" }} />)}</div>
        </div>
        <div><label className="eyebrow">Vector upload (preview only)</label><input type="file" accept=".svg,.ai,.eps,.png,.jpg,.jpeg,.webp" onChange={(e) => { const f = e.target.files?.[0]; if (f) setUploadUrl(URL.createObjectURL(f)); }} />{uploadUrl && <img src={uploadUrl} alt="Uploaded artwork preview" style={{ width: "100%", marginTop: 8, border: "1px solid #E5E0D8", borderRadius: 4 }} />}<p className="mono" style={{ color: "#6E6A63" }}>Preview only in this build. Saving to S3/R2 is a TODO (see README).</p></div>
        <div style={{ borderTop: "1px solid #E5E0D8", paddingTop: 12 }}>
          <p className="mono">Base £28.00 + {tech.name} £{tech.price.toFixed(2)}{extra ? ` + Monogram £5.00` : ""} = <strong>{fmt(total)}</strong></p>
          <p className="mono">Share code: {shareCode} · Zero minimum order</p>
          <button className="btn" style={{ width: "100%", justifyContent: "center" }} onClick={() => add({ id: `bespoke-${Date.now()}`, name: `Bespoke Cap — ${silhouette}`, price: total, qty: 1, meta: `${line1} ${line2} · ${tech.name}` })}>Add Bespoke Cap to Bag</button>
          <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}><button className="pill" onClick={() => navigator.clipboard?.writeText(shareCode)}>Save Shareable 3D Link</button><button className="pill" onClick={downloadTechPack}>Download Tech Pack</button><a className="pill" href="/b2b">Ordering 10+? Unlock Bulk Tiers →</a></div>
        </div>
      </div>
    </div>
  </section>);
}
