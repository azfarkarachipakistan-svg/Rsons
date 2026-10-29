"use client";
import Link from "next/link";
import { Product } from "../lib/products";
import { useCart, useCurrency } from "../lib/store";
export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart(); const { fmt } = useCurrency();
  return (<article className="card" style={{ overflow: "hidden" }}>
    <Link href={`/product/${p.slug}`}><img src={p.image} alt={p.name} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} /></Link>
    <div style={{ padding: 16 }}>
      <p className="eyebrow" style={{ margin: 0 }}>{p.collection} · {p.drop}</p>
      <h3 className="serif" style={{ margin: "8px 0" }}><Link href={`/product/${p.slug}`}>{p.name}</Link></h3>
      <p className="mono" style={{ color: "#6E6A63" }}>{p.silhouette} · {p.material}</p>
      <div style={{ display: "flex", gap: 6, margin: "10px 0" }}>{p.colors.map((c) => <span key={c.hex} title={c.name} style={{ width: 18, height: 18, borderRadius: "50%", background: c.hex, border: "1px solid #E5E0D8", display: "inline-block" }} />)}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><strong>{fmt(p.price)}</strong><button className="btn" onClick={() => add({ id: p.slug, name: p.name, price: p.price, qty: 1, meta: "M" })}>Add to Bag</button></div>
      <p style={{ marginTop: 10 }}><Link href="/custom-studio" style={{ color: "#9E472A", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase" }}>Customize in 3D →</Link></p>
    </div>
  </article>);
}
