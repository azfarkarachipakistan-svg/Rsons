"use client";
import { useState } from "react";
import { Product } from "../../../lib/products";
import { useCart, useCurrency } from "../../../lib/store";
export default function AddToBag({ p }: { p: Product }) {
  const { add } = useCart(); const { fmt } = useCurrency(); const [size, setSize] = useState("M"); const [color, setColor] = useState(p.colors[0]?.name || "");
  return (<div style={{ display: "grid", gap: 12, marginTop: 16 }}>
    <label>Size <select className="field" value={size} onChange={(e) => setSize(e.target.value)}>{p.sizes.map((s) => <option key={s}>{s}</option>)}</select></label>
    <label>Colour <select className="field" value={color} onChange={(e) => setColor(e.target.value)}>{p.colors.map((c) => <option key={c.name}>{c.name}</option>)}</select></label>
    <button className="btn" onClick={() => add({ id: `${p.slug}-${size}-${color}`, name: p.name, price: p.price, qty: 1, meta: `${size} · ${color}` })}>Add to Bag — {fmt(p.price)}</button>
  </div>);
}
