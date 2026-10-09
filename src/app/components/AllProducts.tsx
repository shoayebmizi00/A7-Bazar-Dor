import React from 'react';
import ProductCard from './ProductCard';
import { IProduct } from '../type';

const AllProducts = ({ products }: { products: IProduct[] }) => {
    return (
        <section className="mt-12" id="all-products">
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
    );
};

export default AllProducts;