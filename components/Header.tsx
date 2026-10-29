"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart, useCurrency, RATES } from "../lib/store";
import { SILHOUETTES, MATERIALS, COLLECTIONS } from "../lib/products";
export default function Header() {
  const { items, open, setOpen, subtotal, promo, setPromo, discount, total, remove } = useCart();
  const { cur, setCur, fmt } = useCurrency();
  const [menu, setMenu] = useState(false);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const progress = Math.min(100, (subtotal / 50) * 100);
  return (<>
    <div style={{ background: "#F4F0EA", borderBottom: "1px solid #E5E0D8", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase" }}>
      <div className="container" style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between", minHeight: 34, flexWrap: "wrap", paddingTop: 6, paddingBottom: 6 }}>
        <span><select aria-label="Currency" value={cur} onChange={(e) => setCur(e.target.value as keyof typeof RATES)} style={{ background: "transparent", border: "none", fontSize: 11, letterSpacing: ".12em" }}>{Object.keys(RATES).map((c) => <option key={c} value={c}>{c}</option>)}</select> · English</span>
        <span style={{ textAlign: "center" }}>Complimentary express courier on orders over {fmt(50)} · Zero minimum order in the Atelier</span>
        <span style={{ display: "flex", gap: 14 }}><Link href="/cap-finder">Cap Finder</Link><Link href="/b2b">B2B Bulk</Link><Link href="/admin">Concierge</Link></span>
      </div>
    </div>
    <header style={{ position: "sticky", top: 0, background: "rgba(251,249,245,.88)", backdropFilter: "blur(16px)", borderBottom: "1px solid #E5E0D8", zIndex: 50 }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, minHeight: 76, flexWrap: "wrap" }}>
        <button onClick={() => setMenu(!menu)} style={{ background: "none", border: "1px solid #E5E0D8", borderRadius: 4, padding: "8px 12px" }}>☰ Menu</button>
        <nav style={{ display: "flex", gap: 18, fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", flexWrap: "wrap" }}>
          <Link href="/shop">New &amp; Drops</Link>
          <span className="mega" style={{ position: "relative", cursor: "pointer" }}>Caps ▾
            <span className="mega-panel"><span className="container mega-grid">
              <span><strong>By Silhouette</strong><br />{SILHOUETTES.map((s) => <span key={s}><Link href={`/shop?silhouette=${encodeURIComponent(s)}`}>{s}</Link><br /></span>)}</span>
              <span><strong>By Material</strong><br />{MATERIALS.map((s) => <span key={s}><Link href={`/shop?material=${encodeURIComponent(s)}`}>{s}</Link><br /></span>)}</span>
              <span><strong>Collections</strong><br />{COLLECTIONS.map((c) => <span key={c.slug}><Link href={`/collections/${c.slug}`}>{c.name}</Link><br /></span>)}</span>
              <span><strong>Atelier</strong><br /><Link href="/custom-studio">3D Custom Studio</Link><br /><Link href="/cap-finder">Cap Finder Quiz</Link><br /><Link href="/b2b">Bulk &amp; Organizations</Link></span>
              <span style={{ background: "#F4F0EA", padding: 16, borderRadius: 4 }}><strong>Bespoke 3D Studio</strong><br />Design with 3D Puff, Flat Embroidery, or Laser Leather Patches.<br /><br /><Link href="/custom-studio" className="btn">Craft Yours →</Link></span>
            </span></span>
          </span>
          <Link href="/collections/essentials">Beanies &amp; Hats</Link>
          <Link href="/shop">Leagues &amp; Teams</Link>
          <Link href="/custom-studio">3D Custom Studio ✦</Link>
          <Link href="/b2b">Bulk &amp; Organizations</Link>
        </nav>
        <Link href="/" style={{ textAlign: "center" }}><span className="serif" style={{ fontSize: 28, letterSpacing: ".28em" }}>R &amp; S O N S</span><br /><span style={{ fontSize: 10, letterSpacing: ".2em", color: "#6E6A63" }}>EST. ATELIER</span></Link>
        <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link href="/shop" className="pill">⌕ Search</Link>
          <Link href="/cap-finder" className="pill">Cap Finder</Link>
          <button className="pill" onClick={() => setOpen(true)}>Bag ({count}) · {fmt(total)}</button>
        </span>
      </div>
      {menu && <div className="container" style={{ paddingBottom: 16, display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13 }}>
        <Link href="/">Home</Link><Link href="/shop">Shop</Link><Link href="/custom-studio">Custom Studio</Link><Link href="/cap-finder">Cap Finder</Link><Link href="/b2b">B2B</Link><Link href="/admin">Admin Preview</Link>
        {COLLECTIONS.map((c) => <Link key={c.slug} href={`/collections/${c.slug}`}>{c.name}</Link>)}
      </div>}
    </header>
    {open && <div className="overlay" onClick={() => setOpen(false)} />}
    <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      <div style={{ display: "flex", justifyContent: "space-between" }}><h2 className="serif">Your Bag</h2><button onClick={() => setOpen(false)}>✕</button></div>
      <p className="mono">Free express courier over {fmt(50)} — {progress.toFixed(0)}% there</p>
      <div style={{ height: 8, background: "#EDE8DF", borderRadius: 999 }}><div style={{ width: `${progress}%`, height: "100%", background: "#B89768", borderRadius: 999 }} /></div>
      <div style={{ marginTop: 20, display: "grid", gap: 12 }}>
        {items.length === 0 && <p style={{ color: "#6E6A63" }}>Your bag is empty.</p>}
        {items.map((i) => <div key={i.id} className="card" style={{ padding: 14, display: "flex", justifyContent: "space-between", gap: 12 }}><span><strong>{i.name}</strong><br /><span className="mono">{i.meta} · ×{i.qty}</span></span><span>{fmt(i.price * i.qty)} <button onClick={() => remove(i.id)}>Remove</button></span></div>)}
      </div>
      <div style={{ marginTop: 20 }}><label className="eyebrow">Promo code</label><input className="field" value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Try ATELIER10" /><p className="mono">Subtotal {fmt(subtotal)} · Discount −{fmt(discount)} · Total {fmt(total)}</p><button className="btn" style={{ width: "100%", justifyContent: "center" }}>Stripe Express Checkout — demo only</button><p className="mono" style={{ color: "#6E6A63" }}>Checkout is a placeholder in this build. See README for the Stripe TODO.</p></div>
    </aside>
  </>);
}
