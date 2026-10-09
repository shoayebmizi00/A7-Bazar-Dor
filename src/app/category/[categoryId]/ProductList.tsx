"use client";

import { IProduct } from "@/app/type";
import { useMemo, useState } from "react";

type SortKey = "default" | "asc" | "desc";

const toBn = (n: number, digits = 0) =>
  n.toLocaleString("bn-BD", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  hali: "হালি",
};

const ChangeBadge = ({ change }: { change: IProduct["change"] }) => {
  const styles = {
    up: "bg-red-50 text-red-600",
    down: "bg-green-50 text-green-600",
    flat: "bg-gray-100 text-gray-500",
  }[change.dir] ?? "bg-gray-100 text-gray-500";

  const arrow = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${styles}`}
    >
      {arrow} {toBn(change.pct, 1)}%
    </span>
  );
};

const ProductList = ({ products }: { products: IProduct[] }) => {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    if (sort === "default") return products;
    return [...products].sort((a, b) =>
      sort === "asc" ? a.today - b.today : b.today - a.today,
    );
  }, [products, sort]);

  return (
    <>
      {/* Count + sort */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-gray-500">
            সাজান
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none focus:border-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border border-gray-200 bg-white/70 p-5 transition hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl">
                {product.image}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {product.nameBn}
                </h2>
                <p className="text-xs text-gray-500">
                  প্রতি {unitBn[product.unit] ?? product.unit}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">আজকের দাম</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-xl font-extrabold text-gray-900">
                {toBn(product.today)}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>
              <ChangeBadge change={product.change} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;