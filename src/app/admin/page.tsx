"use client";
import React, { useEffect, useState } from "react";
import { Users, UserCheck, UserPlus, Shield, TrendingUp, Film, Activity } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalAdmins: number;
  newUsersToday: number;
  activeUsers: number;
}

interface ChartDay { date: string; users: number; }
interface RecentUser { id: string; name: string | null; email: string; role: string; createdAt: string; }

function StatCard({ icon: Icon, label, value, color, sub }: { icon: React.ElementType; label: string; value: number | string; color: string; sub?: string }) {
  return (
    <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:border-white/20 transition-all">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-zinc-400 font-medium">{label}</p>
        <p className="text-3xl font-extrabold text-white mt-0.5">{value}</p>
        {sub && <p className="text-xs text-zinc-500 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [chart, setChart] = useState<ChartDay[]>([]);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/stats").then(r => r.json()),
      fetch("/api/admin/users").then(r => r.json()),
    ]).then(([statsData, usersData]) => {
      setStats(statsData.stats);
      setChart(statsData.chart || []);
      setRecentUsers((usersData.users || []).slice(0, 5));
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-zinc-800 rounded-xl" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-zinc-900 rounded-2xl" />)}
        </div>
        <div className="h-64 bg-zinc-900 rounded-2xl" />
      </div>
    );
  }

  const maxChart = Math.max(...chart.map(d => d.users), 1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-green-400" />
          Tổng quan hệ thống
        </h1>
        <p className="text-sm text-zinc-400 mt-1">Dữ liệu thời gian thực của RIOFLIX</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Tổng người dùng" value={stats?.totalUsers ?? 0} color="bg-blue-500/20 text-blue-400" />
        <StatCard icon={UserCheck} label="Đang hoạt động" value={stats?.activeUsers ?? 0} color="bg-green-500/20 text-green-400" sub="Tài khoản chưa khoá" />
        <StatCard icon={UserPlus} label="Đăng ký hôm nay" value={stats?.newUsersToday ?? 0} color="bg-purple-500/20 text-purple-400" />
        <StatCard icon={Shield} label="Quản trị viên" value={stats?.totalAdmins ?? 0} color="bg-yellow-500/20 text-yellow-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart - 7 ngày đăng ký */}
        <div className="lg:col-span-2 bg-zinc-900/80 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h2 className="text-base font-bold text-white">Đăng ký 7 ngày qua</h2>
          </div>
          <div className="flex items-end gap-2 h-40">
            {chart.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full relative group">
                  <div
                    className="w-full bg-green-500/80 hover:bg-green-400 rounded-t-lg transition-all cursor-default"
                    style={{ height: `${Math.max((day.users / maxChart) * 120, day.users > 0 ? 8 : 2)}px` }}
                  />
                  {day.users > 0 && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-green-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {day.users} người
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-zinc-500 whitespace-nowrap">{day.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-bold text-white">Người dùng mới nhất</h2>
          </div>
          <div className="space-y-3">
            {recentUsers.length === 0 ? (
              <p className="text-sm text-zinc-500 text-center py-4">Chưa có người dùng</p>
            ) : recentUsers.map((u) => (
              <div key={u.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {(u.name || u.email).charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{u.name || "Ẩn danh"}</p>
                  <p className="text-[11px] text-zinc-400 truncate">{u.email}</p>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${u.role === "admin" ? "bg-green-500/20 text-green-400" : "bg-zinc-700 text-zinc-400"}`}>
                  {u.role === "admin" ? "Admin" : "User"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a href="/admin/nguoi-dung" className="flex items-center gap-4 bg-zinc-900/60 border border-white/10 hover:border-green-500/40 rounded-2xl p-5 transition-all group">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="font-semibold text-white group-hover:text-green-400 transition-colors">Quản lý người dùng</p>
            <p className="text-xs text-zinc-500">Xem, sửa quyền, khoá tài khoản</p>
          </div>
        </a>
        <a href="/admin/phim" className="flex items-center gap-4 bg-zinc-900/60 border border-white/10 hover:border-green-500/40 rounded-2xl p-5 transition-all group">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Film className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="font-semibold text-white group-hover:text-green-400 transition-colors">Quản lý phim</p>
            <p className="text-xs text-zinc-500">Danh sách phim trong hệ thống</p>
          </div>
        </a>
      </div>
    </div>
  );
}
