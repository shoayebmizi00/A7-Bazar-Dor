import { notFound } from "next/navigation";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string; // an emoji in your data
  today: number;
  yesterday: number;
  change: { dir: "up" | "down"; pct: number };
}

const DynamicCategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  // 👇 change this URL if your API uses a different category endpoint
  const response = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`,
    { next: { revalidate: 60 } },
  );

  if (!response.ok) notFound();

  const products: IProduct[] = await response.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">
        {products[0]?.categoryIcon} {products[0]?.categoryNameBn ?? categoryId}
      </h1>

      {products.length === 0 ? (
        <p className="mt-6 text-gray-500">কোনো পণ্য পাওয়া যায়নি।</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border border-gray-200 p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-2 text-5xl">{product.image}</div>
              <h2 className="font-semibold">{product.nameBn}</h2>
              <p className="mt-1 text-xl font-bold text-green-700">
                ৳{product.today}
                <span className="text-sm font-normal text-gray-500">
                  {" "}/ {product.unit}
                </span>
              </p>
              <p
                className={`text-sm ${
                  product.change.dir === "up" ? "text-red-600" : "text-green-600"
                }`}
              >
                {product.change.dir === "up" ? "▲" : "▼"} {product.change.pct}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicCategoryPage;