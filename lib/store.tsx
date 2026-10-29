"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
export type CartItem = { id: string; name: string; price: number; qty: number; meta?: string };
type CartCtx = { items: CartItem[]; add: (i: CartItem) => void; remove: (id: string) => void; clear: () => void; open: boolean; setOpen: (v: boolean) => void; promo: string; setPromo: (v: string) => void; subtotal: number; discount: number; total: number };
const Ctx = createContext<CartCtx | null>(null);
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [promo, setPromo] = useState("");
  useEffect(() => { try { const raw = localStorage.getItem("rsons-cart"); if (raw) setItems(JSON.parse(raw)); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem("rsons-cart", JSON.stringify(items)); } catch {} }, [items]);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = promo.trim().toUpperCase() === "ATELIER10" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;
  const value = useMemo(() => ({
    items, open, setOpen, promo, setPromo, subtotal, discount, total,
    add: (i: CartItem) => { setItems((prev) => { const ex = prev.find((x) => x.id === i.id); return ex ? prev.map((x) => x.id === i.id ? { ...x, qty: x.qty + i.qty } : x) : [...prev, i]; }); setOpen(true); },
    remove: (id: string) => setItems((prev) => prev.filter((x) => x.id !== id)),
    clear: () => setItems([]),
  }), [items, open, promo, subtotal, discount, total]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useCart() { const c = useContext(Ctx); if (!c) throw new Error("useCart outside provider"); return c; }
export type Currency = "GBP" | "EUR" | "USD" | "PKR";
export const RATES: Record<Currency, { rate: number; symbol: string }> = { GBP: { rate: 1, symbol: "£" }, EUR: { rate: 1.17, symbol: "€" }, USD: { rate: 1.27, symbol: "$" }, PKR: { rate: 355, symbol: "Rs " } };
const CurCtx = createContext<{ cur: Currency; setCur: (c: Currency) => void; fmt: (gbp: number) => string } | null>(null);
export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [cur, setCur] = useState<Currency>("GBP");
  const value = useMemo(() => ({ cur, setCur, fmt: (gbp: number) => { const r = RATES[cur]; const v = gbp * r.rate; return cur === "PKR" ? `Rs ${Math.round(v).toLocaleString()}` : `${r.symbol}${v.toFixed(2)}`; } }), [cur]);
  return <CurCtx.Provider value={value}>{children}</CurCtx.Provider>;
}
export function useCurrency() { const c = useContext(CurCtx); if (!c) throw new Error("useCurrency outside provider"); return c; }
