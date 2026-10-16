"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, ShieldAlert, ShieldCheck, RefreshCw, CheckCircle2, 
  AlertTriangle, Globe, Lock, Info
} from "lucide-react";

export default function AdminSettingsPage() {
  const [blockSearchIndexing, setBlockSearchIndexing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setBlockSearchIndexing(!!data.blockSearchIndexing);
      }
    } catch (err) {
      console.error("Lỗi khi tải cài đặt:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    const newValue = !blockSearchIndexing;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blockSearchIndexing: newValue }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setBlockSearchIndexing(newValue);
        setMessage({
          type: "success",
          text: data.message || "Cập nhật cài đặt thành công!",
        });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Không thể lưu cài đặt. Vui lòng thử lại.",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Có lỗi xảy ra khi kết nối máy chủ.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <Globe className="w-7 h-7 text-green-500" />
          Cài Đặt Hệ Thống & SEO
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Quản lý quyền thu thập dữ liệu của công cụ tìm kiếm (Google, Bing...) và các thiết lập toàn hệ thống.
        </p>
      </div>

      {/* Alert message */}
      {message && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
            message.type === "success"
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          )}
          <div className="text-sm font-medium">{message.text}</div>
        </div>
      )}

      {/* Main Settings Card */}
      <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-white">Chặn Tìm Kiếm Trên Google (SEO Indexing)</h2>
              {loading ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin" /> Đang tải...
                </span>
              ) : blockSearchIndexing ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> Đang Chặn (Noindex)
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Cho Phép Index
                </span>
              )}
            </div>
            <p className="text-xs lg:text-sm text-zinc-400">
              Khi bật tùy chọn này, tất cả các trang web và đường dẫn sẽ bổ sung chỉ thị <code className="bg-zinc-800 text-amber-400 px-1.5 py-0.5 rounded text-xs font-mono">noindex, nofollow</code> và chặn <code className="bg-zinc-800 text-amber-400 px-1.5 py-0.5 rounded text-xs font-mono">robots.txt</code> đối với Googlebot.
            </p>
          </div>

          {/* Switch Toggle Button */}
          <button
            onClick={handleToggle}
            disabled={loading || saving}
            className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            } ${blockSearchIndexing ? "bg-amber-500" : "bg-zinc-700"}`}
          >
            <span className="sr-only">Chặn tìm kiếm Google</span>
            <span
              className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out flex items-center justify-center ${
                blockSearchIndexing ? "translate-x-6 text-amber-600" : "translate-x-0 text-zinc-400"
              }`}
            >
              {saving ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : blockSearchIndexing ? (
                <Lock className="w-3.5 h-3.5" />
              ) : (
                <Search className="w-3.5 h-3.5" />
              )}
            </span>
          </button>
        </div>

        {/* Detailed Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className={`p-4 rounded-xl border transition-all ${blockSearchIndexing ? "bg-amber-500/5 border-amber-500/30" : "bg-zinc-800/40 border-white/5"}`}>
            <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4" /> BẬT - Chặn công cụ tìm kiếm
            </h3>
            <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
              <li>Thêm thẻ <code className="text-amber-300 font-mono text-[11px]">&lt;meta name="robots" content="noindex, nofollow"&gt;</code> vào thẻ &lt;head&gt;</li>
              <li>Thêm thẻ <code className="text-amber-300 font-mono text-[11px]">&lt;meta name="googlebot" content="noindex, nofollow"&gt;</code></li>
              <li>File <code className="text-amber-300 font-mono text-[11px]">/robots.txt</code> sẽ chứa quy tắc <code className="text-amber-300 font-mono text-[11px]">Disallow: /</code></li>
              <li>Googlebot sẽ <strong>không thu thập dữ liệu</strong> và không hiển thị trang web trên kết quả tìm kiếm Google.</li>
            </ul>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${!blockSearchIndexing ? "bg-green-500/5 border-green-500/30" : "bg-zinc-800/40 border-white/5"}`}>
            <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4" /> TẮT - Cho phép công cụ tìm kiếm
            </h3>
            <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
              <li>Mở quyền cho phép thẻ Meta Robots (<code className="text-green-300 font-mono text-[11px]">index, follow</code>)</li>
              <li>File <code className="text-green-300 font-mono text-[11px]">/robots.txt</code> sẽ cho phép crawl (<code className="text-green-300 font-mono text-[11px]">Allow: /</code>)</li>
              <li>Googlebot và các công cụ tìm kiếm có thể index các trang và hiển thị kết quả tìm kiếm bình thường.</li>
            </ul>
          </div>
        </div>

        {/* Note */}
        <div className="flex items-start gap-2 text-xs text-zinc-400 bg-zinc-800/50 p-3.5 rounded-xl border border-white/5">
          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <span>
            <strong>Lưu ý:</strong> Khi bạn thay đổi cài đặt này, các thẻ Meta và file <code className="text-zinc-300 font-mono">/robots.txt</code> sẽ cập nhật lập tức trên hệ thống. Tuy nhiên, việc Google cập nhật lại kết quả tìm kiếm trên máy chủ của họ có thể mất từ vài giờ đến vài ngày tùy thuộc vào tần suất Googlebot quét trang web.
          </span>
        </div>
      </div>
    </div>
  );
}
