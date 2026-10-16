"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { RioflixLogo } from "@/components/icons";

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>Link không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu link mới.</span>
        </div>
        <Link href="/quen-mat-khau" className="text-green-400 hover:text-green-300 font-semibold text-sm">Yêu cầu link mới →</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Mật khẩu xác nhận không khớp."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setSuccess(true);
      setTimeout(() => router.push("/dang-nhap"), 2500);
    } catch {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-sm text-green-400">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Mật khẩu đã được đặt lại thành công! Đang chuyển đến trang đăng nhập...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-5 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Mật khẩu mới</label>
          <div className="relative">
            <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Tối thiểu 6 ký tự"
              className="w-full bg-zinc-800/80 border border-white/10 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20 transition-all" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Xác nhận mật khẩu</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required placeholder="Nhập lại mật khẩu mới"
            className="w-full bg-zinc-800/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20 transition-all" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-green-600/50 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-green-500/20">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
          {loading ? "Đang cập nhật..." : "Đặt lại mật khẩu"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-green-500/5 rounded-full blur-[120px]" />
      </div>
      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-8"><Link href="/"><RioflixLogo /></Link></div>
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-7 h-7 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Đặt lại mật khẩu</h1>
            <p className="text-sm text-zinc-400">Tạo mật khẩu mới cho tài khoản của bạn</p>
          </div>
          <Suspense fallback={<div className="text-center text-zinc-400 text-sm">Đang tải...</div>}>
            <ResetForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
