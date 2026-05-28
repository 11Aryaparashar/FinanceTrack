import React from "react";
import { Menu, Moon, Sun, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

const Header = ({ onMenuClick }) => {
  const { role, setRole, theme, setTheme } = useAppContext();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isLight = theme === "light";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className={`border-b shadow-sm ${
        isLight ? "border-gray-200 bg-white" : "border-slate-800 bg-slate-900"
      }`}
    >
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg md:hidden ${
                isLight
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            {/* Title */}
            <div className="min-w-0 flex-1">
              <h1
                className={`text-2xl font-semibold leading-tight sm:text-3xl ${
                  isLight ? "text-gray-800" : "text-white"
                }`}
              >
                Personal Finance Dashboard
              </h1>

              <p
                className={`mt-1 max-w-2xl text-sm sm:text-base ${
                  isLight ? "text-gray-500" : "text-slate-400"
                }`}
              >
                Track your cash flow, spending, and financial insights
              </p>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={() => setTheme(isLight ? "dark" : "light")}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
                isLight
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="hidden md:flex items-center gap-2">
              <label
                className={`text-sm font-medium ${
                  isLight ? "text-gray-600" : "text-slate-300"
                }`}
              >
                Role
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`rounded-lg border px-3 py-2 text-sm outline-none ${
                  isLight
                    ? "border-gray-300 bg-white text-gray-800"
                    : "border-slate-700 bg-slate-800 text-white"
                }`}
              >
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* User Profile & Logout */}
            {user && (
              <div className="hidden md:flex items-center gap-2 pl-3 border-l border-gray-300 dark:border-slate-700">
                <div className="text-right">
                  <p
                    className={`text-sm font-medium ${
                      isLight ? "text-gray-800" : "text-white"
                    }`}
                  >
                    {user.name}
                  </p>
                  <p
                    className={`text-xs ${
                      isLight ? "text-gray-500" : "text-slate-400"
                    }`}
                  >
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
                    isLight
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                  }`}
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
