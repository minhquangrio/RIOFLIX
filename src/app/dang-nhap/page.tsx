"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, LogIn, AlertCircle, Loader2 } from "lucide-react";
import { RioflixLogo } from "@/components/icons";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError(res.error === "CredentialsSignin" ? "Email hoặc mật khẩu không đúng." : res.error);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-1">Đăng nhập</h1>
        <p className="text-sm text-zinc-400">Chào mừng bạn quay lại RIOFLIX</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-5 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@email.com"
            className="w-full bg-zinc-800/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Mật khẩu</label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-zinc-800/80 border border-white/10 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex justify-end mt-1.5">
            <Link href="/quen-mat-khau" className="text-xs text-zinc-400 hover:text-green-400 transition-colors">
              Quên mật khẩu?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-green-600/50 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/20 mt-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LogIn className="w-4 h-4" />
          )}
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-500 mt-6">
        Chưa có tài khoản?{" "}
        <Link href="/dang-ky" className="text-green-400 font-semibold hover:text-green-300 transition-colors">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <RioflixLogo />
          </Link>
        </div>

        <Suspense fallback={
          <div className="bg-zinc-900/80 p-8 rounded-3xl flex justify-center items-center">
            <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          </div>
        }>
          <LoginForm />
        </Suspense>

        <p className="text-center text-xs text-zinc-600 mt-6">
          <Link href="/" className="hover:text-zinc-400 transition-colors">← Về trang chủ</Link>
        </p>
      </div>
    </div>
  );
}
