import Link from "next/link";
import { IProduct } from "../type";

const ProductCard = ({ product }: { product: IProduct }) => {
  const isUp = product.change.dir === "up";

  return (
    <Link href={`/product/${product.id}`} className="block">
    <div className="rounded-2xl border border-gray-200 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md sm:p-4">
      {/* Product info */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Product icon */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-2xl">
            {product.image || product.categoryIcon}
          </div>

          {/* Name */}
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-gray-900 sm:text-base">
              {product.nameBn}
            </h3>

            <p className="text-xs text-gray-400">
              প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
            </p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-400">আজকের দাম</p>

          <p className="mt-0.5 text-lg font-bold text-gray-900 sm:text-xl">
            ৳{product.today}
            <span className="ml-1 text-xs font-normal text-gray-500">
              টাকা
            </span>
          </p>
        </div>

        {/* Change */}
        <div
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            isUp
              ? "bg-red-50 text-red-600"
              : "bg-green-50 text-green-600"
          }`}
        >
          {isUp ? "▲" : "▼"} {product.change.pct}%
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;