"use client";
import { useMemo, useState } from "react";
import { tierFor } from "../../lib/products";
import { useCart, useCurrency } from "../../lib/store";
type Row = { dept: string; product: string; qty: number };
export default function B2B() {
  const { add } = useCart(); const { fmt } = useCurrency();
  const [qty, setQty] = useState(200);
  const [rows, setRows] = useState<Row[]>([
    { dept: "Executive Team", product: "Navy Washed Dad Cap", qty: 80 },
    { dept: "Field Staff", product: "Alabaster A-Frame Trucker", qty: 70 },
    { dept: "Winter Kit", product: "Merino Beanie", qty: 50 },
  ]);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [org, setOrg] = useState(""); const [tier, setTier] = useState("150–499"); const [date, setDate] = useState(""); const [sample, setSample] = useState(true); const [errors, setErrors] = useState<string[]>([]); const [sent, setSent] = useState(false);
  const t = tierFor(qty); const unit = 28 * (1 - t.discount);
  const rosterQty = rows.reduce((s, r) => s + r.qty, 0); const rt = tierFor(rosterQty); const rUnit = 28 * (1 - rt.discount);
  const submit = () => {
    const errs: string[] = [];
    if (!name.trim()) errs.push("Full name is required.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.push("Enter a valid official email.");
    if (!org.trim()) errs.push("Organization / department is required.");
    if (!date) errs.push("Target delivery date is required.");
    setErrors(errs); setSent(errs.length === 0);
  };
  return (<section className="container" style={{ padding: "40px 24px" }}>
    <p className="eyebrow">Enterprise · Departments &amp; Organizations</p>
    <h1 className="serif" style={{ fontSize: 52, maxWidth: 820 }}>Bespoke headwear at scale. For departments, organizations &amp; private labels.</h1>
    <p style={{ color: "#6E6A63" }}>No minimum order on Custom Studio · Up to 55% volume tier discounts · 24-hour concierge quote · Physical pre-production samples.</p>
    <img src="/media/b2b.webp" alt="Original B2B flat-lay photograph" style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 4, margin: "20px 0" }} />
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{["Corporate & Tech Departments", "Sports Clubs & Federations", "Universities & Alumni", "Hospitality & Luxury Uniforms", "Events & Tournaments", "Private Label Retail Brands"].map((d) => <span key={d} className="pill">{d}</span>)}</div>
    <div className="grid2" style={{ marginTop: 28 }}>
      <div className="card" style={{ padding: 24 }}>
        <h2 className="serif">Bulk Tier Calculator</h2>
        <label className="mono">Quantity: {qty} <input type="range" min={10} max={5000} value={qty} onChange={(e) => setQty(Number(e.target.value))} style={{ width: "100%" }} /></label>
        <p><strong>{t.label}</strong> · {Math.round(t.discount * 100)}% off · Unit {fmt(unit)} · Total {fmt(unit * qty)}</p>
        <div style={{ display: "grid", gap: 8 }}>{[[10, 49, 0.15], [50, 149, 0.25], [150, 499, 0.35], [500, 5000, 0.5]].map(([a, b, d]) => <div key={a} className="pill" style={{ justifyContent: "space-between", background: qty >= a && qty <= b ? "#141312" : "#fff", color: qty >= a && qty <= b ? "#fff" : "#141312" }}><span>{a}–{b === 5000 ? "5000+" : b} pcs</span><span>{Math.round(d * 100)}% off</span></div>)}</div>
        <p className="mono" style={{ color: "#6E6A63" }}>Tier 3 adds a complimentary physical sample and a custom woven interior neck label. Tier 4 adds Pantone dyeing, branded taping, custom hardware and retail packaging.</p>
      </div>
      <div className="card" style={{ padding: 24 }}>
        <h2 className="serif">Multi-Department Roster Builder</h2>
        {rows.map((r, i) => <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 90px", gap: 8, marginBottom: 8 }}>
          <input className="field" value={r.dept} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, dept: e.target.value } : x))} />
          <input className="field" value={r.product} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, product: e.target.value } : x))} />
          <input className="field" type="number" min={0} value={r.qty} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, qty: Number(e.target.value) } : x))} />
        </div>)}
        <button className="pill" onClick={() => setRows([...rows, { dept: "New Department", product: "New Product", qty: 10 }])}>+ Add department</button>
        <p><strong>{rosterQty} total units · {rt.label} locked · Unit {fmt(rUnit)} · Roster total {fmt(rUnit * rosterQty)}</strong></p>
        <button className="btn" onClick={() => add({ id: `b2b-${Date.now()}`, name: "B2B Bulk Order", price: rUnit * rosterQty, qty: 1, meta: `${rosterQty} units · ${rt.label}` })}>Add roster to Bag</button>
      </div>
    </div>
    <div className="grid4" style={{ marginTop: 28 }}>
      {["Custom Damask Woven Interior Labels", "Branded Satin Interior Crown Taping", "Laser-Etched Brass & Matte Metal Closures", "Custom Recycled Packaging & Embossed Hang Tags"].map((t) => <div key={t} className="card" style={{ padding: 20 }}><strong>{t}</strong><p style={{ color: "#6E6A63" }}>Private-label finishing, shown in the B2B flat-lay above.</p></div>)}
    </div>
    <div className="grid2" style={{ marginTop: 28 }}>
      <div className="card" style={{ padding: 24 }}><h2 className="serif">Path A · Instant Self-Serve Bulk Order</h2><p style={{ color: "#6E6A63" }}>Import a saved design from the 3D Studio, enter roster quantities, and check out. Payment methods are placeholders in this build: Stripe Corporate Card, Apple Pay, or Net-30 Corporate Invoice (see README).</p><button className="btn" onClick={() => add({ id: `b2b-self-${Date.now()}`, name: "B2B Self-Serve Order", price: unit * qty, qty: 1, meta: `${qty} units · ${t.label}` })}>Checkout {qty} units — {fmt(unit * qty)}</button></div>
      <div className="card" style={{ padding: 24 }}><h2 className="serif">Path B · 24-Hour Concierge Quote &amp; Sample</h2>
        <div style={{ display: "grid", gap: 10 }}>
          <input className="field" placeholder="Full Name *" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="field" placeholder="Official Email *" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="field" placeholder="Organization / Department *" value={org} onChange={(e) => setOrg(e.target.value)} />
          <select className="field" value={tier} onChange={(e) => setTier(e.target.value)}><option>10–49</option><option>50–149</option><option>150–499</option><option>500+</option></select>
          <input className="field" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <label><input type="checkbox" checked={sample} onChange={(e) => setSample(e.target.checked)} /> Ship a physical pre-production sample before full production</label>
          <label>Vector brand guidelines / logo <input type="file" accept=".svg,.ai,.eps,.png" /></label>
          {errors.map((e) => <p key={e} style={{ color: "#9E472A" }}>{e}</p>)}
          {sent && <p style={{ color: "#2E6F40" }}>Quote request validated in the browser. Email delivery via Resend is a TODO — no email has actually been sent (see README).</p>}
          <button className="btn" onClick={submit}>Request Quote &amp; Sample</button>
        </div>
        <p className="mono" style={{ marginTop: 16 }}>01 Configure in 3D or upload brief → 02 Digital proof &amp; quote in &lt;24h → 03 Approve physical sample → 04 Production &amp; tracked global delivery</p>
      </div>
    </div>
  </section>);
}
