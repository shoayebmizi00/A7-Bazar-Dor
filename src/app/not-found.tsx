import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        {/* 404 */}
        <h1 className="text-8xl font-black tracking-tight text-green-700 sm:text-9xl">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold text-base-content sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-base-content/60 sm:text-base">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি হয়তো মুছে ফেলা হয়েছে,
          সরানো হয়েছে অথবা ঠিকানাটি ভুল হয়েছে।
        </p>

        {/* Button */}
        <Link
          href="/"
          className="btn mt-6 border-green-700 bg-green-700 px-6 text-white hover:border-green-800 hover:bg-green-800"
        >
          🏠 হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;