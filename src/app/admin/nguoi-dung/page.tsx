"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Users, Search, Shield, ShieldOff, Trash2, UserCheck, UserX, Loader2, RefreshCw, ChevronDown } from "lucide-react";

interface User { id: string; name: string | null; email: string; role: string; isActive: boolean; createdAt: string; }

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data.users || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const filtered = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const updateUser = async (id: string, patch: Partial<User>) => {
    setActionId(id);
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    await loadUsers();
    setActionId(null);
  };

  const deleteUser = async (id: string) => {
    setActionId(id);
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setConfirmDelete(null);
    await loadUsers();
    setActionId(null);
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" />
            Quản lý người dùng
          </h1>
          <p className="text-sm text-zinc-400 mt-1">Tổng: <span className="text-white font-semibold">{users.length}</span> tài khoản</p>
        </div>
        <button onClick={loadUsers} className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl text-sm font-medium transition-all">
          <RefreshCw className="w-4 h-4" />Làm mới
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm theo tên hoặc email..."
          className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all" />
      </div>

      {/* Table */}
      <div className="bg-zinc-900/80 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-zinc-400 text-sm">Không tìm thấy người dùng nào</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-zinc-950/50">
                  <th className="text-left px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wide">Người dùng</th>
                  <th className="text-left px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wide hidden md:table-cell">Ngày tạo</th>
                  <th className="text-left px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wide">Quyền</th>
                  <th className="text-left px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wide hidden sm:table-cell">Trạng thái</th>
                  <th className="text-right px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wide">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-bold text-white shrink-0">
                          {(u.name || u.email).charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate">{u.name || <span className="text-zinc-500 italic">Chưa đặt tên</span>}</p>
                          <p className="text-xs text-zinc-400 truncate">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400 hidden md:table-cell text-xs">{formatDate(u.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${u.role === "admin" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-zinc-700/80 text-zinc-300"}`}>
                        {u.role === "admin" ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${u.isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                        {u.isActive ? "Hoạt động" : "Bị khoá"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {actionId === u.id ? (
                          <Loader2 className="w-4 h-4 text-green-400 animate-spin" />
                        ) : (
                          <>
                            {/* Toggle role */}
                            <button onClick={() => updateUser(u.id, { role: u.role === "admin" ? "user" : "admin" })}
                              className={`p-2 rounded-lg transition-all ${u.role === "admin" ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30" : "bg-zinc-700/80 text-zinc-300 hover:bg-zinc-600"}`}
                              title={u.role === "admin" ? "Hạ xuống user" : "Nâng lên admin"}>
                              {u.role === "admin" ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                            </button>
                            {/* Toggle active */}
                            <button onClick={() => updateUser(u.id, { isActive: !u.isActive })}
                              className={`p-2 rounded-lg transition-all ${u.isActive ? "bg-zinc-700/80 text-zinc-300 hover:bg-red-500/20 hover:text-red-400" : "bg-green-500/20 text-green-400 hover:bg-green-500/30"}`}
                              title={u.isActive ? "Khoá tài khoản" : "Mở khoá"}>
                              {u.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                            </button>
                            {/* Delete */}
                            {confirmDelete === u.id ? (
                              <div className="flex items-center gap-1.5">
                                <button onClick={() => deleteUser(u.id)} className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-all">Xoá</button>
                                <button onClick={() => setConfirmDelete(null)} className="px-2.5 py-1 bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-all">Huỷ</button>
                              </div>
                            ) : (
                              <button onClick={() => setConfirmDelete(u.id)}
                                className="p-2 rounded-lg bg-zinc-700/80 text-zinc-400 hover:bg-red-500/20 hover:text-red-400 transition-all" title="Xoá">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
