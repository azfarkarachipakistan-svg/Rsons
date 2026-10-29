"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function CapFinder() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [size, setSize] = useState("Standard 56–59cm");
  const [profile, setProfile] = useState("Mid-Profile 59FIFTY / Snapback");
  const [brim, setBrim] = useState("Pre-Curved");
  const [material, setMaterial] = useState("Cotton Twill");
  const finish = () => {
    const sil = profile.includes("Dad") ? "Dad Cap" : profile.includes("Trucker") ? "A-Frame Trucker" : "Snapback";
    const mat = material === "Cotton Twill" ? "Washed Cotton Twill" : material === "Wool" ? "Italian Merino Wool" : material === "Corduroy" ? "8-Wale Corduroy" : "Laser-Perforated Active Mesh";
    router.push(`/shop?silhouette=${encodeURIComponent(sil)}&material=${encodeURIComponent(mat)}`);
  };
  return (<section className="container" style={{ padding: "40px 24px", maxWidth: 760 }}>
    <p className="eyebrow">Cap Finder · 3 clicks</p><h1 className="serif" style={{ fontSize: 48 }}>Find your exact silhouette.</h1>
    {step === 1 && <div className="card" style={{ padding: 24 }}><h2>Step 1 · Head size</h2>{["Petite 53–55cm", "Standard 56–59cm", "XL / Big Size 60–64cm"].map((o) => <button key={o} className={`pill ${size === o ? "active" : ""}`} style={{ margin: 4 }} onClick={() => setSize(o)}>{o}</button>)}<br /><button className="btn" style={{ marginTop: 16 }} onClick={() => setStep(2)}>Next →</button></div>}
    {step === 2 && <div className="card" style={{ padding: 24 }}><h2>Step 2 · Crown profile</h2>{["Low-Profile Unstructured Dad Cap", "Mid-Profile 59FIFTY / Snapback", "High-Crown A-Frame Trucker"].map((o) => <button key={o} className={`pill ${profile === o ? "active" : ""}`} style={{ margin: 4 }} onClick={() => setProfile(o)}>{o}</button>)}<br /><button className="btn" style={{ marginTop: 16 }} onClick={() => setStep(3)}>Next →</button></div>}
    {step === 3 && <div className="card" style={{ padding: 24 }}><h2>Step 3 · Brim &amp; material</h2>
      {["Pre-Curved", "Flat Visor"].map((o) => <button key={o} className={`pill ${brim === o ? "active" : ""}`} style={{ margin: 4 }} onClick={() => setBrim(o)}>{o}</button>)}<br />
      {["Cotton Twill", "Wool", "Corduroy", "Active Mesh"].map((o) => <button key={o} className={`pill ${material === o ? "active" : ""}`} style={{ margin: 4 }} onClick={() => setMaterial(o)}>{o}</button>)}<br />
      <button className="btn" style={{ marginTop: 16 }} onClick={finish}>See my recommendations →</button></div>}
    <p className="mono" style={{ color: "#6E6A63", marginTop: 16 }}>Your answers become /shop filters: silhouette, material and fit. Size ({size}) and brim ({brim}) are shown on product pages.</p>
  </section>);
}
