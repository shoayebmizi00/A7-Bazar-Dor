import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const banglaDate = new Date().toLocaleDateString("bn-BD", options);

  return (
    <header className="border-b-1 border-gray-200">
        <div className="flex items-center justify-between px-3 py-3 sm:px-6 sm:py-4 container mx-auto">
          {/* Logo + Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={48}
                height={48}
                className="h-10 w-10 rounded-xl bg-green-800 p-2 sm:h-12 sm:w-12"
              />
            </Link>

            {/* Brand */}
            <div className="min-w-0">
              <Link href="/" className="block">
                <h1 className="truncate text-base font-bold text-base-content sm:text-xl md:text-2xl">
                  বাজার দর
                </h1>
              </Link>

              <p className="truncate text-[10px] text-base-content/60 sm:text-xs md:text-sm">
                {banglaDate}
              </p>
            </div>
          </div>

          {/* Authentication Buttons */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3">
            {/* Sign In */}
            <Link
              href="/sign-in"
              className="
              btn btn-ghost
              h-9 min-h-9
              px-2
              text-sm font-semibold
              text-base-content/80
              hover:text-base-content
              sm:h-10 sm:min-h-10 sm:px-3 sm:text-base
              md:h-11 md:min-h-11 md:px-4
            "
            >
              সাইন ইন
            </Link>

            {/* Sign Up */}
            <Link
              href="/sign-up"
              className="
              btn
              h-9 min-h-9
              border-green-700
              bg-green-700
              px-2
              text-sm font-semibold text-white
              hover:border-green-800
              hover:bg-green-800
              sm:h-10 sm:min-h-10 sm:px-3 sm:text-base
              md:h-11 md:min-h-11 md:px-4
            "
            >
              সাইন আপ
            </Link>
          </div>
        </div>
    </header>
  );
};

export default Header;
