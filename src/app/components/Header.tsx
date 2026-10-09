"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const Header = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const banglaDate = new Date().toLocaleDateString("bn-BD", options);

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("সাইন আউট করা যায়নি!");
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছে!");

    router.replace("/");
    router.refresh();
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex items-center justify-between gap-3 px-3 py-3 sm:px-6 sm:py-4">
        {/* Logo + Brand */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={48}
              height={48}
              className="h-10 w-10 rounded-xl bg-green-800 p-2 sm:h-12 sm:w-12"
            />
          </Link>

          <div className="min-w-0">
            <Link href="/" className="block">
              <h1 className="truncate text-base font-bold text-gray-900 sm:text-xl md:text-2xl">
                বাজার দর
              </h1>
            </Link>

            <p className="truncate text-[10px] text-gray-500 sm:text-xs md:text-sm">
              {banglaDate}
            </p>
          </div>
        </div>

        {/* Authentication */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-green-700" />
          ) : user ? (
            <>
              {/* Desktop User Info */}
              <div className="hidden items-center gap-2 rounded-xl bg-green-50 px-3 py-2 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 font-bold text-white">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <div className="max-w-32">
                  <p className="text-xs text-gray-500">স্বাগতম</p>
                  <p className="truncate text-sm font-bold text-gray-900">
                    {user.name || "ব্যবহারকারী"}
                  </p>
                </div>
              </div>

              {/* Mobile User Name */}
              <span className="max-w-24 truncate text-sm font-semibold text-gray-800 sm:hidden">
                {user.name || "ব্যবহারকারী"}
              </span>

              {/* Sign Out */}
              <button
                type="button"
                onClick={handleSignOut}
                className="btn btn-sm border-red-200 bg-white text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white sm:btn-md"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="btn btn-ghost btn-sm font-semibold text-gray-700 hover:bg-green-50 sm:btn-md"
              >
                সাইন ইন
              </Link>

              <Link
                href="/sign-up"
                className="btn btn-sm border-green-700 bg-green-700 font-semibold text-white hover:border-green-800 hover:bg-green-800 sm:btn-md"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;