import HeroSection from "./components/Hero";
import ProductCard from "./components/ProductCard";
import { IProduct } from "./type";

export default async function Home() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: IProduct[] = await res.json();

  // First 6 products whose price increased
  const increasedProducts = products
    .filter((product) => product.change.dir === "up")
    .slice(0, 6);

  // First 6 products whose price decreased
  const decreasedProducts = products
    .filter((product) => product.change.dir === "down")
    .slice(0, 6);

  return (
    <div>
      <HeroSection />

      <main className="container mx-auto px-4 py-8">
        {/* PRICE INCREASED */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-red-600">▲</span>

            <h2 className="text-xl font-bold text-green-800 sm:text-4xl">
              আজ দাম বেড়েছে
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {increasedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        {/* PRICE DECREASED */}
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-green-600">▼</span>

            <h2 className="text-xl font-bold text-green-800 sm:text-4xl">
              আজ দাম কমেছে
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {decreasedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        {/* ALL PRODUCTS */}
        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-green-800 sm:text-4xl">
                সব পণ্য
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                মোট {products.length}টি পণ্য দেখানো হচ্ছে
              </p>
            </div>

            <select
              defaultValue="default"
              className="select select-sm w-auto border-gray-200 bg-white"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">দাম: কম → বেশি</option>
              <option value="high">দাম: বেশি → কম</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}