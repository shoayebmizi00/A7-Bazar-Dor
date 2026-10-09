import React from "react";

const DynamicCategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const response = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${categoryId}`,
  );


  const category = await response.json();

  console.log("Category ID:", categoryId);
  console.log("Category details:", category);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">
        {categoryId}
      </h1>

      <pre className="mt-4">
        {JSON.stringify(category, null, 2)}
      </pre>
    </div>
  );
};

export default DynamicCategoryPage;