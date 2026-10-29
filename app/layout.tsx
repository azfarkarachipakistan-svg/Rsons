import "./globals.css";
import Header from "../components/Header";
import { CartProvider, CurrencyProvider } from "../lib/store";
export const metadata = { title: "R&Sons — Sartorial Headwear & Bespoke Atelier", description: "R&Sons own-label headwear, 3D custom studio and B2B bulk portal. Original photography and video, light elegant theme." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><CurrencyProvider><CartProvider><Header /><main>{children}</main>
  <footer style={{ borderTop: "1px solid #E5E0D8", marginTop: 64, padding: "40px 0", background: "#FFFFFF" }}>
    <div className="container"><p className="serif" style={{ fontSize: 24 }}>R &amp; S O N S</p><p style={{ color: "#6E6A63", maxWidth: 760 }}>Monorepo map (target architecture, not yet wired in this build): globals.css / premium.css / studio.css / campaign.css, packages/ui, @rsons/commerce, @rsons/search, @rsons/storage, @rsons/payments, @rsons/email, @rsons/analytics. See README.md for real vs placeholder.</p><p className="mono">© R&Sons Atelier — own-label products only. No licensed brands are sold here.</p></div>
  </footer></CartProvider></CurrencyProvider></body></html>);
}
