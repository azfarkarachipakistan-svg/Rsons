import { notFound } from "next/navigation";
import { PRODUCTS, COLLECTIONS } from "../../../lib/products";
import ProductCard from "../../../components/ProductCard";
export function generateStaticParams() { return COLLECTIONS.map((c) => ({ slug: c.slug })); }
export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = COLLECTIONS.find((x) => x.slug === slug);
  if (!c) notFound();
  const list = PRODUCTS.filter((p) => p.collectionSlug === c.slug);
  return (<section className="container" style={{ padding: "40px 24px" }}>
    <p className="eyebrow">Collection</p><h1 className="serif" style={{ fontSize: 52 }}>{c.name}</h1><p style={{ color: "#6E6A63" }}>{c.blurb}</p>
    <p className="mono">{list.length} pieces</p>
    <div className="grid4" style={{ marginTop: 20 }}>{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
  </section>);
}
