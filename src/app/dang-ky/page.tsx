"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { RioflixLogo } from "@/components/icons";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const pwStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Yếu", "Trung bình", "Mạnh"];
  const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-green-500"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Đăng ký thất bại.");
        return;
      }
      setSuccess(true);
      // Auto login
      await signIn("credentials", { email: form.email, password: form.password, redirect: false });
      setTimeout(() => router.push("/"), 1200);
    } catch {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/"><RioflixLogo /></Link>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-1">Tạo tài khoản</h1>
            <p className="text-sm text-zinc-400">Tham gia RIOFLIX để xem phim không giới hạn</p>
          </div>

          {success && (
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl p-3 mb-5 text-sm text-green-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Đăng ký thành công! Đang chuyển hướng...</span>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-5 text-sm text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Họ và tên</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Nguyễn Văn A"
                className="w-full bg-zinc-800/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="example@email.com"
                className="w-full bg-zinc-800/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Mật khẩu</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required placeholder="Tối thiểu 6 ký tự"
                  className="w-full bg-zinc-800/80 border border-white/10 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20 transition-all" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1,2,3].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= pwStrength ? strengthColor[pwStrength] : "bg-zinc-700"}`} />
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-400">{strengthLabel[pwStrength]}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Xác nhận mật khẩu</label>
              <input type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required placeholder="Nhập lại mật khẩu"
                className={`w-full bg-zinc-800/80 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition-all ${form.confirm && form.confirm !== form.password ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:border-green-500/60 focus:ring-green-500/20"}`} />
              {form.confirm && form.confirm !== form.password && (
                <p className="text-xs text-red-400 mt-1">Mật khẩu không khớp</p>
              )}
            </div>

            <button type="submit" disabled={loading || success}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-green-600/50 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/20 mt-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-6">
            Đã có tài khoản?{" "}
            <Link href="/dang-nhap" className="text-green-400 font-semibold hover:text-green-300 transition-colors">Đăng nhập</Link>
          </p>
        </div>

        <p className="text-center text-xs text-zinc-600 mt-6">
          <Link href="/" className="hover:text-zinc-400 transition-colors">← Về trang chủ</Link>
        </p>
      </div>
    </div>
  );
}
