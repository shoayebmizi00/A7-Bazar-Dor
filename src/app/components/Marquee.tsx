import MarqueeText from "react-fast-marquee";
import { IProduct } from "../type";

const Marquee = async () => {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: IProduct[] = await response.json();

  return (
    <div className="h-9 overflow-hidden border-b border-gray-200">
      <MarqueeText
        direction="left"
        speed={150}
        gradient={false}
        pauseOnHover
        className="h-full"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex h-9 items-center gap-2 px-3 text-sm leading-none"
          >
            {/* Icon */}
            <span className="text-base">
              {product.categoryIcon}
            </span>

            {/* Product name */}
            <span className="font-semibold text-gray-800">
              {product.nameBn}
            </span>

            {/* Price */}
            <span className="font-bold text-green-700">
              ৳{product.today} টাকা/
              {product.unit === "kg" && " কেজি"}
              {product.unit === "litre" && " লিটার"}
              {product.unit !== "kg" && product.unit !== "litre" && ` ${product.unit}`}
            </span>

            {/* Change */}
            <span
              className={
                product.change.dir === "up"
                  ? "font-semibold text-red-600"
                  : "font-semibold text-green-600"
              }
            >
              {product.change.dir === "up" ? "▲" : "▼"}{" "}
              {product.change.pct}%
            </span>

            {/* Separator */}
            <span className="mx-2 text-gray-300">|</span>
          </div>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;