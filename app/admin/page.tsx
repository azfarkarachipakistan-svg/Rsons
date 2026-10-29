import { PRODUCTS } from "../../lib/products";
export default function Admin() {
  const orders = [
    { id: "RS-1042", item: "Bespoke Cap — Classic Washed Dad Cap", technique: "3D Puff", stitches: 6840, files: "RS-1042.DST · RS-1042-proof.SVG", status: "In production" },
    { id: "RS-1043", item: "Bespoke Cap — 8-Wale Corduroy", technique: "Laser Patch", stitches: 5120, files: "RS-1043.DST · RS-1043-proof.SVG", status: "Proof approved" },
    { id: "RS-1044", item: "B2B Roster — 200 units", technique: "Flat + Patch", stitches: 0, files: "RS-1044-roster.JSON", status: "Quote sent" },
  ];
  return (<section className="container" style={{ padding: "40px 24px" }}>
    <p className="eyebrow">Apps / Admin · Port 3001 preview (demo data)</p><h1 className="serif" style={{ fontSize: 48 }}>Admin Portal Preview</h1>
    <h2 className="serif">Custom 3D Order Queue</h2>
    <div style={{ display: "grid", gap: 12 }}>{orders.map((o) => <div key={o.id} className="card" style={{ padding: 16 }}><strong>{o.id}</strong> · {o.item}<br /><span className="mono">{o.technique} · {o.stitches.toLocaleString()} stitches · {o.files} · {o.status}</span></div>)}</div>
    <h2 className="serif" style={{ marginTop: 32 }}>B2B Quote Requests</h2><p style={{ color: "#6E6A63" }}>Concierge forms submitted in this browser session are validated locally only. Email routing via Resend is a TODO.</p>
    <h2 className="serif">Drop Inventory (demo)</h2><div className="grid4">{PRODUCTS.slice(0, 8).map((p) => <div key={p.slug} className="card" style={{ padding: 16 }}><strong>{p.name}</strong><br /><span className="mono">{p.stock} in stock · {p.drop}</span></div>)}</div>
    <h2 className="serif" style={{ marginTop: 32 }}>Conversion Telemetry (preview)</h2><div className="grid3"><div className="card" style={{ padding: 20 }}><strong>GA4 — view_item</strong><p className="mono">Preview only. GA4 wiring is a TODO (NEXT_PUBLIC_GA_ID).</p></div><div className="card" style={{ padding: 20 }}><strong>Meta Pixel — add_to_cart</strong><p className="mono">Preview only. Pixel wiring is a TODO (NEXT_PUBLIC_META_PIXEL_ID).</p></div><div className="card" style={{ padding: 20 }}><strong>Purchase</strong><p className="mono">Preview only. Stripe wiring is a TODO.</p></div></div>
  </section>);
}
