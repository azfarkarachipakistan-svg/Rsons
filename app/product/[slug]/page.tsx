import { notFound } from "next/navigation";
import { PRODUCTS } from "../../../lib/products";
import AddToBag from "./AddToBag";
export function generateStaticParams() { return PRODUCTS.map((p) => ({ slug: p.slug })); }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) notFound();
  return (<section className="container" style={{ padding: "40px 24px" }}>
    <p className="eyebrow"><a href="/shop">Shop</a> / {p.collection} / {p.name}</p>
    <div className="grid2" style={{ marginTop: 20 }}>
      <img src={p.image} alt={p.name} style={{ width: "100%", borderRadius: 4, border: "1px solid #E5E0D8", height: 420, objectFit: "cover" }} />
      <div>
        <h1 className="serif" style={{ fontSize: 48, margin: "8px 0" }}>{p.name}</h1>
        <p style={{ color: "#6E6A63", lineHeight: 1.7 }}>{p.blurb} Silhouette: {p.silhouette}. Material: {p.material}. League style: {p.league}. Drop: {p.drop}.</p>
        <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>{p.colors.map((c) => <span key={c.hex} title={c.name} style={{ width: 28, height: 28, borderRadius: "50%", background: c.hex, border: "1px solid #E5E0D8", display: "inline-block" }} />)}</div>
        <p className="mono">Sizes: {p.sizes.join(" · ")} · In stock: {p.stock} (demo inventory)</p>
        <AddToBag p={p} />
        <p style={{ marginTop: 20 }}><a href="/custom-studio" className="btn btn-light">Customize this style in 3D →</a></p>
        <img src="/media/lookbook.webp" alt="Original lifestyle photograph" style={{ width: "100%", marginTop: 24, borderRadius: 4, height: 220, objectFit: "cover" }} />
      </div>
    </div>
  </section>);
}
