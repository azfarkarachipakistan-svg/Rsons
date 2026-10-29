import { Suspense } from "react";
import ShopClient from "./ShopClient";
export default function ShopPage() { return <Suspense fallback={<div className="container" style={{ padding: 40 }}>Loading catalogue…</div>}><ShopClient /></Suspense>; }
