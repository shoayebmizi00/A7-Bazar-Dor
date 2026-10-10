"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, updateUser, useSession } from "@/lib/auth-client"; // adjust to your path
import { toast } from "react-toastify";

const MyProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  if (isPending) {
    return (
      <div className="container mx-auto max-w-2xl space-y-6 px-4 py-8">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-40 animate-pulse rounded-3xl bg-gray-200" />
        <div className="h-56 animate-pulse rounded-3xl bg-gray-200" />
      </div>
    );
  }

  const user = session?.user;
  const currentName = user?.name ?? "";
  const trimmed = newName.trim();
  const canSave = trimmed.length >= 2 && trimmed !== currentName && !saving;
  const initial = currentName.trim().charAt(0).toUpperCase() || "?";

  const handleUpdateName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSave) return;

    setSaving(true);
    setMessage(null);

    const { error } = await updateUser({ name: trimmed });

    if (error) {
      setMessage({
        type: "error",
        text: error.message || "নাম হালনাগাদ করা যায়নি। আবার চেষ্টা করুন।",
      });
      toast.error(
        error.message || "নাম হালনাগাদ করা যায়নি। আবার চেষ্টা করুন।"
      );
    } else {
      setNewName("");
      setMessage({ type: "success", text: "নাম সফলভাবে হালনাগাদ হয়েছে।" });
      toast.success("নাম সফলভাবে হালনাগাদ হয়েছে।");
    }

    setSaving(false);
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
        onError: () => setSigningOut(false),
      },
    });
    toast.success("সাইন আউট সফল হয়েছে।");
  };

  return (
    <div className="container mx-auto max-w-2xl space-y-6 px-4 py-8">
      {/* Page heading */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Profile card */}
      <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-green-100 p-6 shadow-sm">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-green-200/40" />

        <div className="relative flex flex-col items-center gap-5 sm:flex-row">
          {user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={currentName}
              className="h-24 w-24 rounded-full object-cover shadow-md ring-4 ring-white"
            />
          ) : (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-green-700 text-4xl font-bold text-white shadow-md ring-4 ring-white">
              {initial}
            </div>
          )}

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <h2 className="truncate text-2xl font-bold text-gray-900">
              {currentName}
            </h2>
            <p className="mt-1 truncate text-sm text-gray-600">{user?.email}</p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
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

      {/* Update name card */}
      <form
        onSubmit={handleUpdateName}
        className="rounded-3xl border border-gray-200 bg-white/70 p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold text-gray-900">নাম হালনাগাদ করুন</h2>
        <p className="mt-1 text-sm text-gray-500">
          বর্তমান নাম: <span className="font-semibold">{currentName}</span>
        </p>

        <label
          htmlFor="name"
          className="mt-5 block text-sm font-medium text-gray-700"
        >
          নাম
        </label>
        <input
          id="name"
          type="text"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
            setMessage(null);
          }}
          placeholder="নতুন নাম লিখুন"
          maxLength={50}
          className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
        />

        {trimmed.length > 0 && trimmed.length < 2 && (
          <p className="mt-2 text-xs text-red-600">
            নাম কমপক্ষে ২ অক্ষরের হতে হবে।
          </p>
        )}
        {trimmed.length >= 2 && trimmed === currentName && (
          <p className="mt-2 text-xs text-gray-500">এটি আপনার বর্তমান নামই।</p>
        )}

        {message && (
          <div
            role="status"
            className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message.type === "success" ? "✓ " : "⚠ "}
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={!canSave}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
        >
          {saving && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {saving ? "সংরক্ষণ হচ্ছে..." : "নাম হালনাগাদ করুন"}
        </button>
      </form>
    </div>
  );
};

export default MyProfilePage;