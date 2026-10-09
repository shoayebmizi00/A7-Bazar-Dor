"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const Header = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const banglaDate = new Date().toLocaleDateString("bn-BD", options);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const handleSignOut = async () => {
    setSigningOut(true);

    const { error } = await authClient.signOut();

    if (error) {
      toast.error("সাইন আউট করা যায়নি!");
      setSigningOut(false);
      return;
    }

    setOpen(false);
    setSigningOut(false);
    toast.success("সফলভাবে সাইন আউট হয়েছে!");

    router.replace("/");
    router.refresh();
  };

  const initial = user?.name?.charAt(0).toUpperCase() || "U";

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
            <div ref={menuRef} className="relative">
              {/* Trigger */}
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="flex items-center gap-2 rounded-xl bg-green-50 px-2 py-1.5 transition hover:bg-green-100 sm:px-3 sm:py-2"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 font-bold text-white">
                    {initial}
                  </div>
                )}

                <div className="hidden max-w-32 text-left sm:block">
                  <p className="text-xs text-gray-500">স্বাগতম</p>
                  <p className="truncate text-sm font-bold text-gray-900">
                    {user.name || "ব্যবহারকারী"}
                  </p>
                </div>

                {/* Chevron */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-4 w-4 text-gray-600 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown */}
              {open && (
                <div
                  role="menu"
                  className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
                >
                  {/* User info (shows on mobile too) */}
                  <div className="border-b border-gray-100 bg-green-50 px-4 py-3">
                    <p className="truncate text-sm font-bold text-gray-900">
                      {user.name || "ব্যবহারকারী"}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/my-profile"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-800"
                    >
                      <span>👤</span>
                      আমার প্রোফাইল
                    </Link>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {signingOut ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-300 border-t-red-600" />
                      ) : (
                        <span>⎋</span>
                      )}
                      {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                    </button>
                  </div>
                </div>
              )}
            </div>
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