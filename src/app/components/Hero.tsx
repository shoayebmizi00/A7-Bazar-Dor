import Image from "next/image";
import Link from "next/link";
import ScrollToButton from "./ScrollToButton";

const HeroSection = () => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const banglaDate = new Date().toLocaleDateString("bn-BD", options);

  return (
    <section className="container mx-auto px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 via-white to-green-100 shadow-lg ring-1 ring-green-100">
        
        {/* Decorative circles */}
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-green-200/40" />
        <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-green-100/60" />

        <div className="relative grid items-center gap-8 px-5 py-8 sm:px-8 sm:py-10 md:grid-cols-2 md:px-10 lg:px-14 lg:py-12">
          
          {/* Content */}
          <div className="text-center md:text-left">
            {/* Date badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-green-700 shadow-sm ring-1 ring-green-100 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-green-600" />
              {banglaDate}
            </div>

            {/* Heading */}
            <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম{" "}
              <span className="text-green-700">এক নজরে</span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
              দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA */}
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
              <ScrollToButton targetId="all-products">
                <Link
                href="/#all-products"
                className="btn w-full border-green-700 bg-green-700 px-6 text-white shadow-md hover:border-green-800 hover:bg-green-800 sm:w-auto"
              >
                সব পণ্য দেখুন
                <span>→</span>
              </Link>
              </ScrollToButton>
            </div>

          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              
              {/* Image background */}
              <div className="absolute inset-4 rounded-3xl bg-green-200/50 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl bg-white/70 p-3 shadow-xl backdrop-blur-sm ring-1 ring-white">
                <Image
                  src="/bazar-hero.png"
                  alt="বাজারের পণ্যের ছবি"
                  width={500}
                  height={300}
                  priority
                  className="h-auto w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;