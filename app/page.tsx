import Link from "next/link";
import ScrollScrub from "../components/ScrollScrub";
import Reveal from "../components/Reveal";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, COLLECTIONS } from "../lib/products";
export default function Home() {
  return (<>
    <section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", overflow: "hidden", background: "#F4F0EA" }}>
      <video src="/media/hero.mp4" poster="/media/craft.webp" autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
      <div className="container" style={{ position: "relative" }}>
        <div className="card" style={{ maxWidth: 620, padding: 36, background: "rgba(255,255,255,.86)", backdropFilter: "blur(16px)" }}>
          <p className="eyebrow">Drop 005 // Autumn–Winter Atelier &amp; Bespoke 3D Studio</p>
          <h1 className="serif" style={{ fontSize: 64, lineHeight: 1.02, margin: "14px 0" }}>Sartorial headwear.<br />Crafted to your proportions.</h1>
          <p style={{ color: "#6E6A63", lineHeight: 1.7 }}>Discover R&Sons own-label silhouettes or commission your own one-of-one piece in our real-time 3D customization studio. From a single bespoke cap to 5,000+ organizational runs.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}><Link href="/shop" className="btn">Explore the Collection →</Link><Link href="/custom-studio" className="btn btn-light">Launch 3D Custom Studio</Link></div>
        </div>
      </div>
    </section>
    <ScrollScrub />
    <Reveal><section className="container" style={{ padding: "64px 24px" }}>
      <p className="eyebrow">The R&Sons Standard</p>
      <h2 className="serif" style={{ fontSize: 44 }}>Craft, in four views.</h2>
      <div className="grid2" style={{ marginTop: 24 }}>
        <img src="/media/craft.webp" alt="Original craft macro photograph: embroidery stitching on a plain cream cap" style={{ width: "100%", borderRadius: 4, border: "1px solid #E5E0D8" }} />
        <div className="grid2">
          <div className="card" style={{ padding: 20 }}><strong>0° Crown</strong><p style={{ color: "#6E6A63" }}>440 GSM brushed organic cotton &amp; raised 3mm 3D Puff embroidery, up to 12,000 high-density stitches.</p></div>
          <div className="card" style={{ padding: 20 }}><strong>90° Temple</strong><p style={{ color: "#6E6A63" }}>Laser-engraved vegetable-tanned leather, suede &amp; cork patch appliqués.</p></div>
          <div className="card" style={{ padding: 20 }}><strong>180° Rear Arch</strong><p style={{ color: "#6E6A63" }}>Solid brushed brass closure and dual-line curved rear arch personalization.</p></div>
          <div className="card" style={{ padding: 20 }}><strong>Interior</strong><p style={{ color: "#6E6A63" }}>Private-label satin crown taping, moisture-wicking sweatband &amp; damask woven labels.</p></div>
        </div>
      </div>
    </section></Reveal>
    <section className="container" style={{ padding: "20px 24px 64px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 16 }}><div><p className="eyebrow">Collections</p><h2 className="serif" style={{ fontSize: 40, margin: 0 }}>Character, not hype.</h2></div><Link href="/shop" className="btn btn-light">Shop All →</Link></div>
      <div className="grid3" style={{ marginTop: 24 }}>{COLLECTIONS.map((c) => <Link key={c.slug} href={`/collections/${c.slug}`} className="card" style={{ padding: 24, display: "block" }}><p className="eyebrow">{c.slug}</p><h3 className="serif">{c.name}</h3><p style={{ color: "#6E6A63" }}>{c.blurb}</p></Link>)}</div>
      <h2 className="serif" style={{ fontSize: 36, marginTop: 56 }}>New arrivals</h2>
      <div className="grid4" style={{ marginTop: 20 }}>{PRODUCTS.slice(0, 8).map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      <h2 className="serif" style={{ fontSize: 36, marginTop: 56 }}>Lookbook — original photography</h2>
      <div className="grid4" style={{ marginTop: 20 }}>
        <img src="/media/lookbook.webp" alt="Original lookbook photograph" style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 4 }} />
        <img src="/media/community.webp" alt="Original community photograph" style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 4 }} />
        <img src="/media/craft.webp" alt="Original craft photograph" style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 4 }} />
        <img src="/media/b2b.webp" alt="Original B2B flat-lay photograph" style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 4 }} />
      </div>
      <div className="card" style={{ padding: 24, marginTop: 40 }}><p className="eyebrow">Atelier review book — illustrative only</p><p style={{ color: "#6E6A63" }}>These review lines are illustrative placeholder copy for this concept build. They are not real verified orders.</p><p>“The fit quiz finally got my size right.” — illustrative · “The corduroy base with a leather patch looks far more expensive than it cost.” — illustrative</p></div>
    </section>
  </>);
}
