"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginDialog = ({ open, onClose, onLoginSuccess }: LoginDialogProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = () => {
    if (username.trim() === "Admin" && password.trim() === "admin6789") {
      localStorage.setItem("isAdminLoggedIn", "true");
      onLoginSuccess();
      onClose();
    } else {
      alert("Invalid Username or Password ❌");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl py-28">
        <DialogHeader className="pb-11">
          <DialogTitle className="text-center text-2xl font-bold">
            Admin Login
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-10">
          {/* Username Field */}
          <div className="relative">
            <Input
              type="text"
              id="username"
              className="peer h-12 w-full border rounded-md focus:ring-2 focus:ring-emerald-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setUsernameFocused(true)}
              onBlur={(e) => setUsernameFocused(e.target.value !== "")}
            />
            <Label
              htmlFor="username"
              className={clsx(
                "absolute left-3 top-3 text-gray-500 text-base transition-all",
                usernameFocused || username ? "-top-5 text-sm text-gray-800" : "top-3"
              )}
            >
              Username
            </Label>
          </div>

          {/* Password Field with Toggle */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              className="peer h-12 w-full border rounded-md focus:ring-2 focus:ring-emerald-400 pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={(e) => setPasswordFocused(e.target.value !== "")}
            />
            <Label
              htmlFor="password"
              className={clsx(
                "absolute left-3 top-3 text-gray-500 text-base transition-all",
                passwordFocused || password ? "-top-5 text-sm text-gray-800" : "top-3"
              )}
            >
              Password
            </Label>
            {/* Toggle Button for Password Visibility */}
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <Button className="mt-3 w-full py-7" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
