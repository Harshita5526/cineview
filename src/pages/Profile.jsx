import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Clock3,
  Flame,
  Moon,
  Bell,
  Database,
  Compass,
  Gift,
  LogOut,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white p-6 flex justify-center items-start">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="bg-[#071326] border border-slate-800 rounded-2xl p-5 flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center font-bold text-lg">
              {currentUser?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[3px] text-orange-300">
                Welcome Back
              </p>

              <h2 className="text-2xl font-bold">
                {currentUser?.name}
              </h2>

              <p className="text-sm text-slate-400">
                Member since 2025
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-sm font-medium hover:opacity-90"
          >
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mt-5">
          <StatCard
            icon={<Heart size={18} />}
            value="0"
            label="Favorite Saved"
            color="text-pink-400"
          />

          <StatCard
            icon={<Clock3 size={18} />}
            value="4h"
            label="Time Spent"
            color="text-blue-400"
          />

          <StatCard
            icon={<Flame size={18} />}
            value="7 Days"
            label="Streak"
            color="text-orange-400"
          />
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-5 mt-5">
          {/* Account Info */}
          <div className="bg-[#071326] border border-slate-800 rounded-2xl p-5">
            <h3 className="font-semibold mb-4">
              Account Information
            </h3>

            <div className="space-y-4">
              <div className="bg-[#0b1a31] rounded-xl p-3">
                <p className="text-[10px] uppercase text-slate-500 mb-1">
                  Full Name
                </p>

                <p>{currentUser?.name}</p>
              </div>

              <div className="bg-[#0b1a31] rounded-xl p-3">
                <p className="text-[10px] uppercase text-slate-500 mb-1">
                  Email Address
                </p>

                <p>{currentUser?.email}</p>
              </div>

              <div className="bg-[#0b1a31] rounded-xl p-3">
                <p className="text-[10px] uppercase text-slate-500 mb-1">
                  Account Status
                </p>

                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                  ✓ Active
                </span>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-[#071326] border border-slate-800 rounded-2xl p-5">
            <h3 className="font-semibold mb-4">Preferences</h3>

            <div className="space-y-4">
              <PreferenceItem
                icon={<Moon size={18} />}
                title="Dark Mode"
                subtitle="Always enabled"
              />

              <PreferenceItem
                icon={<Bell size={18} />}
                title="Notifications"
                subtitle="Trailer recommendations"
              />

              <PreferenceItem
                icon={<Database size={18} />}
                title="Data Storage"
                subtitle="Local browser storage"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#071326] border border-slate-800 rounded-2xl p-5 mt-5">
          <h3 className="font-semibold mb-4">Quick Actions</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ActionButton
              icon={<Heart size={20} />}
              title="My Favorites"
              subtitle="View Saved"
            />

            <ActionButton
              icon={<Compass size={20} />}
              title="Explore"
              subtitle="Discover More"
            />

            <ActionButton
              icon={<Gift size={20} />}
              title="Help Center"
              subtitle="Get Support"
            />

            <div onClick={handleLogout}>
              <ActionButton
                icon={<LogOut size={20} />}
                title="Sign Out"
                subtitle="Logout"
                danger
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Components */

function StatCard({ icon, value, label, color }) {
  return (
    <div className="bg-[#071326] border border-slate-800 rounded-2xl p-5 flex justify-between items-center">
      <div>
        <p className="text-[10px] uppercase text-slate-500">
          {label}
        </p>

        <h3 className="text-3xl font-bold mt-1">
          {value}
        </h3>
      </div>

      <div className={color}>{icon}</div>
    </div>
  );
}

function PreferenceItem({ icon, title, subtitle }) {
  return (
    <div className="bg-[#0b1a31] rounded-xl p-4 flex items-center justify-between">
      <div>
        <h4 className="font-medium">{title}</h4>

        <p className="text-xs text-slate-400">
          {subtitle}
        </p>
      </div>

      <div className="text-amber-400">{icon}</div>
    </div>
  );
}

function ActionButton({
  icon,
  title,
  subtitle,
  danger = false,
}) {
  return (
    <button
      className={`rounded-xl border p-4 transition-all text-center w-full
      ${
        danger
          ? "border-red-500/40 bg-red-500/10 hover:bg-red-500/20"
          : "border-slate-700 bg-[#0b1a31] hover:bg-[#10203b]"
      }`}
    >
      <div className="flex justify-center mb-2">
        {icon}
      </div>

      <h4 className="font-medium text-sm">
        {title}
      </h4>

      <p className="text-xs text-slate-400 mt-1">
        {subtitle}
      </p>
    </button>
  );
}