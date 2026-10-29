export type Product = {
  slug: string; name: string; price: number; collection: string; collectionSlug: string;
  silhouette: string; material: string; league: string; drop: string; sizes: string[];
  colors: { name: string; hex: string }[]; stock: number; image: string; blurb: string;
};
const img = (n: number) => ["/media/lookbook.webp", "/media/craft.webp", "/media/community.webp", "/media/b2b.webp"][n % 4];
const cols = [
  { name: "Espresso", hex: "#3B2F2A" }, { name: "Alabaster", hex: "#EDE8DF" },
  { name: "Navy", hex: "#1F2A44" }, { name: "Olive", hex: "#5A5B3A" },
  { name: "Camel", hex: "#B89768" }, { name: "Terracotta", hex: "#9E472A" },
];
function p(slug: string, name: string, price: number, collection: string, collectionSlug: string, silhouette: string, material: string, league: string, drop: string, i: number): Product {
  return { slug, name, price, collection, collectionSlug, silhouette, material, league, drop, sizes: ["S", "M", "L", "XL"], colors: cols.slice(i % 3, (i % 3) + 3), stock: 12 + ((i * 17) % 180), image: img(i), blurb: "R&Sons own-label cap, made in the Atelier's light editorial range. No licensed branding." };
}
export const PRODUCTS: Product[] = [
  p("alabaster-six-panel", "Alabaster Six-Panel", 38, "Originals", "originals", "Dad Cap", "Washed Cotton Twill", "North League", "DROP 001", 0),
  p("espresso-snapback", "Espresso Snapback", 42, "Originals", "originals", "Snapback", "Washed Cotton Twill", "Harbour League", "DROP 001", 1),
  p("navy-fitted", "Navy Fitted Cap", 44, "Originals", "originals", "Fitted", "Italian Merino Wool", "North League", "DROP 002", 2),
  p("olive-trucker", "Olive A-Frame Trucker", 40, "Originals", "originals", "A-Frame Trucker", "Laser-Perforated Active Mesh", "Coastal League", "DROP 002", 3),
  p("camel-camper", "Camel Five-Panel Camper", 39, "Originals", "originals", "5-Panel Camper", "Organic Linen", "Harbour League", "DROP 003", 4),
  p("terracotta-flat-cap", "Terracotta Flat Cap", 48, "Originals", "originals", "Flat Cap", "Italian Merino Wool", "North League", "DROP 003", 5),
  p("washed-dad-cap", "Washed Dad Cap", 38, "Statements", "statements", "Dad Cap", "Washed Cotton Twill", "City League", "DROP 004", 6),
  p("statement-snapback", "Statement Snapback", 42, "Statements", "statements", "Snapback", "Raw Selvedge Denim", "City League", "DROP 004", 7),
  p("statement-trucker", "Statement Trucker", 41, "Statements", "statements", "A-Frame Trucker", "Laser-Perforated Active Mesh", "Coastal League", "DROP 005", 8),
  p("statement-camper", "Statement Camper", 39, "Statements", "statements", "5-Panel Camper", "Organic Linen", "Harbour League", "DROP 005", 9),
  p("statement-fitted", "Statement Fitted", 45, "Statements", "statements", "Fitted", "Washed Cotton Twill", "North League", "DROP 001", 10),
  p("statement-beanie", "Statement Fisherman Beanie", 34, "Statements", "statements", "Beanie", "Italian Merino Wool", "North League", "DROP 002", 11),
  p("statement-visor", "Statement Visor", 32, "Statements", "statements", "Visor", "Laser-Perforated Active Mesh", "Coastal League", "DROP 002", 12),
  p("statement-bucket", "Statement Bucket Hat", 36, "Statements", "statements", "Bucket Hat", "Washed Cotton Twill", "City League", "DROP 003", 13),
  p("icon-six-panel", "Icon Six-Panel", 38, "Icons", "icons", "Dad Cap", "Washed Cotton Twill", "North League", "DROP 001", 14),
  p("icon-corduroy", "Icon Corduroy Cap", 43, "Icons", "icons", "Dad Cap", "8-Wale Corduroy", "Harbour League", "DROP 002", 15),
  p("icon-denim", "Icon Denim Cap", 44, "Icons", "icons", "Snapback", "Raw Selvedge Denim", "City League", "DROP 003", 16),
  p("icon-stretch", "Icon Stretch-Fit", 41, "Icons", "icons", "Stretch-Fit", "Laser-Perforated Active Mesh", "Coastal League", "DROP 003", 17),
  p("icon-xl", "Icon XL Big Head Cap", 46, "Icons", "icons", "XL / Big Head", "Washed Cotton Twill", "North League", "DROP 004", 18),
  p("icon-wool", "Icon Wool Six-Panel", 49, "Icons", "icons", "Fitted", "Italian Merino Wool", "Harbour League", "DROP 004", 19),
  p("icon-suede-visor", "Icon Suede Visor Cap", 47, "Icons", "icons", "Snapback", "Suede & Cork Visor", "City League", "DROP 005", 20),
  p("essential-dad", "Essential Dad Cap", 32, "Essentials", "essentials", "Dad Cap", "Washed Cotton Twill", "City League", "DROP 001", 21),
  p("essential-snapback", "Essential Snapback", 34, "Essentials", "essentials", "Snapback", "Washed Cotton Twill", "North League", "DROP 001", 22),
  p("essential-trucker", "Essential Trucker", 33, "Essentials", "essentials", "A-Frame Trucker", "Laser-Perforated Active Mesh", "Coastal League", "DROP 002", 23),
  p("essential-beanie", "Essential Beanie", 28, "Essentials", "essentials", "Beanie", "Italian Merino Wool", "North League", "DROP 002", 24),
  p("essential-bucket", "Essential Bucket", 30, "Essentials", "essentials", "Bucket Hat", "Organic Linen", "Harbour League", "DROP 003", 25),
  p("essential-camper", "Essential Camper", 31, "Essentials", "essentials", "5-Panel Camper", "Organic Linen", "City League", "DROP 003", 26),
  p("essential-visor", "Essential Visor", 26, "Essentials", "essentials", "Visor", "Laser-Perforated Active Mesh", "Coastal League", "DROP 004", 27),
  p("custom-dad-base", "Custom Dad Cap Base", 28, "Build Your Own", "build-your-own", "Dad Cap", "Washed Cotton Twill", "Atelier", "DROP 005", 28),
  p("custom-washed-base", "Custom Washed Cap Base", 28, "Build Your Own", "build-your-own", "Dad Cap", "Washed Cotton Twill", "Atelier", "DROP 005", 29),
  p("custom-denim-base", "Custom Denim Cap Base", 30, "Build Your Own", "build-your-own", "Snapback", "Raw Selvedge Denim", "Atelier", "DROP 005", 30),
  p("custom-corduroy-base", "Custom Corduroy Cap Base", 30, "Build Your Own", "build-your-own", "Dad Cap", "8-Wale Corduroy", "Atelier", "DROP 005", 31),
  p("custom-beanie-base", "Custom Beanie Base", 26, "Build Your Own", "build-your-own", "Beanie", "Italian Merino Wool", "Atelier", "DROP 005", 32),
  p("custom-bucket-base", "Custom Bucket Base", 28, "Build Your Own", "build-your-own", "Bucket Hat", "Washed Cotton Twill", "Atelier", "DROP 005", 33),
  p("atelier-trucker-base", "Atelier Trucker Base", 29, "Build Your Own", "build-your-own", "A-Frame Trucker", "Laser-Perforated Active Mesh", "Atelier", "DROP 005", 34),
  p("atelier-fitted-base", "Atelier Fitted Base", 31, "Build Your Own", "build-your-own", "Fitted", "Italian Merino Wool", "Atelier", "DROP 005", 35),
];
export const COLLECTIONS = [
  { slug: "originals", name: "Originals", blurb: "The first R&Sons shapes, in the Atelier's own words." },
  { slug: "statements", name: "Statements", blurb: "Bold, character-led caps with something to say." },
  { slug: "icons", name: "Icons", blurb: "The shapes customers return for, refined each drop." },
  { slug: "essentials", name: "Essentials", blurb: "Everyday staples, built for every fit." },
  { slug: "build-your-own", name: "Build Your Own", blurb: "Start from a blank Atelier base and make it yours." },
];
export const SILHOUETTES = ["Snapback", "Fitted", "Stretch-Fit", "A-Frame Trucker", "Dad Cap", "5-Panel Camper", "Flat Cap", "Visor", "Beanie", "Bucket Hat", "XL / Big Head"];
export const MATERIALS = ["Washed Cotton Twill", "8-Wale Corduroy", "Raw Selvedge Denim", "Italian Merino Wool", "Suede & Cork Visor", "Laser-Perforated Active Mesh", "Organic Linen"];
export const TECHNIQUES = [
  { id: "puff", name: "3D Puff Embroidery", price: 8 },
  { id: "flat", name: "Classic Flat Embroidery", price: 6.5 },
  { id: "patch", name: "Laser-Engraved Leather / Cork Patch", price: 10 },
  { id: "print-patch", name: "Woven Print-on-Patch", price: 9 },
  { id: "hd-print", name: "Direct HD Canvas Print", price: 7.5 },
] as const;
export const TIERS = [
  { min: 10, max: 49, discount: 0.15, label: "Team / Department Starter" },
  { min: 50, max: 149, discount: 0.25, label: "Organization Pack" },
  { min: 150, max: 499, discount: 0.35, label: "Division / Event Scale" },
  { min: 500, max: 5000, discount: 0.5, label: "Enterprise & Private Label" },
];
export function tierFor(qty: number) {
  return TIERS.find((t) => qty >= t.min && qty <= t.max) || (qty < 10 ? TIERS[0] : TIERS[3]);
}
