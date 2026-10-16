"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Mail, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { RioflixLogo } from "@/components/icons";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Đã xảy ra lỗi."); return; }
      setSent(true);
    } catch {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

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
              <Mail className="w-7 h-7 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Quên mật khẩu</h1>
            <p className="text-sm text-zinc-400">Nhập email để nhận link đặt lại mật khẩu</p>
          </div>

          {sent ? (
            <div className="text-center space-y-4">
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-sm text-green-400">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Chúng tôi đã gửi email đặt lại mật khẩu đến <strong>{email}</strong>. Vui lòng kiểm tra hộp thư (kể cả Spam).</span>
              </div>
              <Link href="/dang-nhap" className="block text-sm text-green-400 hover:text-green-300 font-semibold transition-colors mt-4">← Quay lại đăng nhập</Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-5 text-sm text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Địa chỉ email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="example@email.com"
                    className="w-full bg-zinc-800/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20 transition-all" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-green-600/50 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/20">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                  {loading ? "Đang gửi..." : "Gửi link đặt lại mật khẩu"}
                </button>
              </form>
              <p className="text-center text-sm text-zinc-500 mt-6">
                <Link href="/dang-nhap" className="text-green-400 font-semibold hover:text-green-300 transition-colors">← Quay lại đăng nhập</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
