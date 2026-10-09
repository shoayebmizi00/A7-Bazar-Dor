import { IProduct } from "@/app/type";
import Link from "next/link";
import { notFound } from "next/navigation";

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  hali: "হালি",
};

// whole numbers -> "৫২", fractions -> "৪৩.৫০"
const toBn = (n: number) =>
  Number.isInteger(n)
    ? n.toLocaleString("bn-BD")
    : n.toLocaleString("bn-BD", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

const toBnPct = (n: number) =>
  n.toLocaleString("bn-BD", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${productId}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) notFound();

  const product: IProduct = await res.json();
  const unit = unitBn[product.unit] ?? product.unit;

  // ---- price summary ----
  const markets = product.markets.map((m) => ({
    ...m,
    avg: (m.min + m.max) / 2,
  }));

  const lowest = Math.min(...markets.map((m) => m.min));
  const highest = Math.max(...markets.map((m) => m.max));
  const average = markets.reduce((sum, m) => sum + m.avg, 0) / markets.length;

  // cheapest market first
  const sortedMarkets = [...markets].sort((a, b) => a.avg - b.avg);

  // ---- change styling ----
  const { dir, pct } = product.change;
  const changeColor =
    dir === "up" ? "text-red-600" : dir === "down" ? "text-green-600" : "text-gray-500";
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  const changeText =
    dir === "up" ? "বেড়েছে" : dir === "down" ? "কমেছে" : "অপরিবর্তিত";

  return (
    <div className="container mx-auto space-y-6 px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-green-700">হোম</Link>
        <span className="text-gray-400">›</span>
        <Link href={`/category/${product.category}`} className="hover:text-green-700">
          {product.categoryNameBn}
        </Link>
        <span className="text-gray-400">›</span>
        <span className="font-semibold text-gray-900">{product.nameBn}</span>
      </nav>

      {/* Header card */}
      <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-5xl">
            {product.image}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="text-sm text-gray-500">
              প্রতি {unit} · {product.categoryNameBn}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              গতকালের তুলনায় আজ দাম <strong>{changeText}</strong>{" "}
              {dir !== "flat" && `${toBnPct(pct)}%`}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-green-50 px-8 py-4 text-center">
          <p className="text-sm text-gray-500">আজকের দাম</p>
          <p className="text-4xl font-extrabold text-gray-900">
            {toBn(product.today)}
          </p>
          <p className="text-sm text-gray-600">টাকা / {unit}</p>
          <p className={`mt-1 text-sm font-bold ${changeColor}`}>
            {arrow} {toBnPct(pct)}%
          </p>
        </div>
      </div>

      {/* Summary + table */}
      <div className="rounded-3xl border border-gray-200 bg-white/70 p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-2xl font-extrabold text-green-700">
              {toBn(lowest)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">সবচেয়ে কম দামের বাজার</p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
            <p className="mt-1 text-2xl font-extrabold text-red-600">
              {toBn(highest)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="mt-1 text-2xl font-extrabold text-green-700">
              {toBn(Math.round(average))}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">প্রতি {unit}-এর হিসাবে</p>
          </div>
        </div>

        <h2 className="mb-4 mt-8 text-lg font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600">
                <th className="px-4 py-3 text-left font-semibold">বাজার</th>
                <th className="px-4 py-3 text-left font-semibold">বিভাগ</th>
                <th className="px-4 py-3 text-right font-semibold">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-semibold">সর্বাধিক</th>
                <th className="px-4 py-3 text-right font-semibold">গড়</th>
              </tr>
            </thead>
            <tbody>
              {sortedMarkets.map((m, i) => (
                <tr
                  key={`${m.market}-${m.division}`}
                  className={i % 2 === 1 ? "bg-green-50/60" : ""}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{m.market}</td>
                  <td className="px-4 py-3 text-gray-500">{m.division}</td>
                  <td className="px-4 py-3 text-right">{toBn(m.min)} টাকা</td>
                  <td className="px-4 py-3 text-right">{toBn(m.max)} টাকা</td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">
                    {toBn(m.avg)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;