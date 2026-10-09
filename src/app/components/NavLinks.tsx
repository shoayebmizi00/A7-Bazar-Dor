import Link from "next/link";
import { ICategory } from "../type";

const NavLinks = async () => {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    { next: { revalidate: 3600 } },
  );

  const categories: ICategory[] = await response.json();

  return (
    <div className="border-b-2 border-gray-200">
      <div className="container mx-auto flex flex-row items-center gap-2 overflow-x-auto py-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="flex shrink-0 items-center gap-2 rounded-md px-4 py-2 font-bold text-gray-700 transition-all duration-300 hover:bg-green-700 hover:text-white"
          >
            <span>{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavLinks;