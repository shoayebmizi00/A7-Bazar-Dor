import { notFound } from "next/navigation";
import ProductList from "./ProductList";
import { IProduct } from "@/app/type";

const toBn = (n: number) => n.toLocaleString("bn-BD");

const DynamicCategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  // keep whichever category endpoint is working for you
  const response = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`,
    { next: { revalidate: 60 } },
  );

  if (!response.ok) notFound();

  const products: IProduct[] = await response.json();

  return (
    <div className="container mx-auto space-y-6 px-4 py-6">
      {/* Header card */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white/70 p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-4xl">
          {products[0]?.categoryIcon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {products[0]?.categoryNameBn ?? categoryId}
          </h1>
          <p className="text-sm text-gray-500">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <ProductList products={products} />
    </div>
  );
};

export default DynamicCategoryPage;