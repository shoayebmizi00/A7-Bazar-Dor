"use client";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignInPage = () => {
  const router = useRouter();

  const handleSocialSignIn = async (provider: "google" | "github") => {
    await signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const { error } = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      rememberMe: formData.get("rememberMe") === "on",
    });

    if (error) {
      toast.error(error.message || "Sign in failed!");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে!");

    router.replace("/");
    router.refresh();
  };
  return (
    <main className="flex min-h-[85vh] items-center justify-center bg-base-100 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Sign In Card */}
        <div className="rounded-2xl border border-base-300 bg-base-200 p-6 shadow-xl sm:p-8">
          {/* Header */}
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-700 text-3xl text-white shadow-md">
              🛒
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
              Welcome Back!
            </h1>

            <p className="mt-2 text-sm text-base-content/60">
              Sign in to বাজার দর to explore daily market prices.
            </p>
          </div>

          {/* Sign In Form */}
          <form className="space-y-4" onSubmit={onSubmit}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">Email address</legend>

              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="input input-bordered w-full bg-base-100 focus:border-green-600 focus:outline-none"
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <div className="flex items-center justify-between">
                <legend className="fieldset-legend text-sm">Password</legend>

                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-green-700 hover:text-green-800 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="input input-bordered w-full bg-base-100 focus:border-green-600 focus:outline-none"
                required
              />
            </fieldset>

            {/* Remember Me */}
            <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-base-content/70">
              <input
                type="checkbox"
                name="rememberMe"
                defaultChecked
                className="checkbox checkbox-success checkbox-sm"
              />
              Remember me
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="btn mt-2 w-full border-green-700 bg-green-700 text-base font-semibold text-white hover:border-green-800 hover:bg-green-800"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="divider my-6 text-xs text-base-content/50">
            OR CONTINUE WITH
          </div>

          {/* Social Sign In */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Google */}
            <button
              type="button"
              className="btn btn-outline border-base-300 bg-base-100 text-base-content hover:border-base-content/30 hover:bg-base-300"
              onClick={() => handleSocialSignIn("google")}
            >
              <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5">
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
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.62-5.91c-2.12 1.42-4.84 2.26-8.28 2.26-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                  transform="translate(0 -4)"
                />
              </svg>
              Google
            </button>

            {/* GitHub */}
            <button
              type="button"
              className="btn btn-outline border-base-300 bg-base-100 text-base-content hover:border-base-content/30 hover:bg-base-300"
              onClick={() => handleSocialSignIn("github")}
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

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-base-content/60">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-bold text-green-700 hover:text-green-800 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-base-content/50">
          Your daily market updates, all in one place.
        </p>
      </div>
    </main>
  );
};

export default SignInPage;
