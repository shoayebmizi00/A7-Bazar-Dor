'use client';
import { signIn, signUp } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
const router = useRouter();

const handleSocialSignUp = async (
    provider: "google" | "github",
  ) => {
    await signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const { data, error } = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (error) {
      toast.info("Signup failed:");
      return;
    }

    toast.success("Signup successful!");

    router.push("/");
    router.refresh();
  };


  return (
    <main className="flex min-h-[85vh] items-center justify-center bg-base-100 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Signup Card */}
        <div className="rounded-2xl border border-base-300 bg-base-200 p-6 shadow-xl sm:p-8">
          {/* Header */}
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-700 text-3xl text-white shadow-md">
              🛒
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
              Create an account
            </h1>

            <p className="mt-2 text-sm text-base-content/60">
              Join বাজার দর and keep track of daily market prices.
            </p>
          </div>

          {/* Signup Form */}
          <form className="space-y-4" onSubmit={onSubmit}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">Full name</legend>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full bg-base-100 focus:border-green-600 focus:outline-none"
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">Email address</legend>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email address"
                className="input input-bordered w-full bg-base-100 focus:border-green-600 focus:outline-none"
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">Password</legend>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder="Enter your password"
                minLength={8}
                className="input input-bordered w-full bg-base-100 focus:border-green-600 focus:outline-none"
                required
              />
              <p className="mt-1 text-xs text-base-content/50">
                Use at least 8 characters.
              </p>
            </fieldset>

            <button
              type="submit"
              className="btn mt-2 w-full border-green-700 bg-green-700 text-base font-semibold text-white hover:border-green-800 hover:bg-green-800"
            >
              Create account
            </button>
          </form>

          {/* Divider */}
          <div className="divider my-6 text-xs text-base-content/50">
            OR SIGN UP WITH
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="btn btn-outline border-base-300 bg-base-100 text-base-content hover:border-base-content/30 hover:bg-base-300"
              onClick={() => handleSocialSignUp("google")}
            >
              <svg
                viewBox="0 0 48 48"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                  transform="translate(0 4)"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.62 5.91c4.45-4.11 7.15-10.16 7.15-17.56Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z"
                  transform="translate(0 0)"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.62-5.91c-2.12 1.42-4.84 2.26-8.28 2.26-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                  transform="translate(0 -4)"
                />
              </svg>
              Google
            </button>

            <button
              type="button"
              className="btn btn-outline border-base-300 bg-base-100 text-base-content hover:border-base-content/30 hover:bg-base-300"
              onClick={() => handleSocialSignUp("github")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.03c-3.1.68-3.75-1.32-3.75-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.63 1.21 3.27.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.24-5.1 5.51.4.35.76 1.03.76 2.08V22c0 .29.2.63.76.53A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-base-content/60">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-bold text-green-700 hover:text-green-800 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-base-content/50">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;