"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../components/ProductCard";
import { PRODUCTS, SILHOUETTES, MATERIALS, COLLECTIONS } from "../../lib/products";
export default function ShopClient() {
  const sp = useSearchParams();
  const [q, setQ] = useState("");
  const [sil, setSil] = useState(sp.get("silhouette") || "");
  const [mat, setMat] = useState(sp.get("material") || "");
  const [coll, setColl] = useState(sp.get("collection") || "");
  const [sort, setSort] = useState("featured");
  const [cols, setCols] = useState<4 | 2>(4);
  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => (!q || (p.name + p.silhouette + p.material).toLowerCase().includes(q.toLowerCase())) && (!sil || p.silhouette === sil) && (!mat || p.material === mat) && (!coll || p.collectionSlug === coll));
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [q, sil, mat, coll, sort]);
  const clear = () => { setQ(""); setSil(""); setMat(""); setColl(""); };
  return (<section className="container" style={{ padding: "40px 24px" }}>
    <p className="eyebrow">Shop · R&Sons own-label</p>
    <h1 className="serif" style={{ fontSize: 52, margin: "8px 0" }}>The Catalogue</h1>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "20px 0" }}>
      <input className="field" style={{ maxWidth: 320 }} placeholder="Search: visor, corduroy, dad cap…" value={q} onChange={(e) => setQ(e.target.value)} />
      <select className="field" style={{ maxWidth: 220 }} value={sil} onChange={(e) => setSil(e.target.value)}><option value="">All silhouettes</option>{SILHOUETTES.map((s) => <option key={s}>{s}</option>)}</select>
      <select className="field" style={{ maxWidth: 260 }} value={mat} onChange={(e) => setMat(e.target.value)}><option value="">All materials</option>{MATERIALS.map((s) => <option key={s}>{s}</option>)}</select>
      <select className="field" style={{ maxWidth: 220 }} value={coll} onChange={(e) => setColl(e.target.value)}><option value="">All collections</option>{COLLECTIONS.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select>
      <select className="field" style={{ maxWidth: 180 }} value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name A–Z</option></select>
      <button className="pill" onClick={() => setCols(2)}>2-col editorial</button>
      <button className="pill" onClick={() => setCols(4)}>4-col catalog</button>
      <button className="pill" onClick={clear}>Clear filters</button>
    </div>
    <p className="mono">{filtered.length} of {PRODUCTS.length} pieces{filtered.length !== PRODUCTS.length ? " · filters active" : ""}</p>
    <div className={cols === 4 ? "grid4" : "grid2"} style={{ marginTop: 20 }}>{filtered.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
    {filtered.length === 0 && <p style={{ color: "#6E6A63" }}>No pieces match those filters. Clear them to see the full catalogue.</p>}
  </section>);
}
