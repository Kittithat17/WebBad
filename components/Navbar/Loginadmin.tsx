"use client";

import { useAuth } from "./AuthContext"; // ✅ Import useAuth
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Dropdownn from "./Dropdownn";
import LoginDia from "./LoginDia";

const Loginadmin = () => {
  const { isAdminLoggedIn, setIsAdminLoggedIn } = useAuth(); // ✅ ดึงค่าจาก Context
  const [open, setOpen] = useState(false);

  return (
    <div>
      {isAdminLoggedIn ? (
        <Dropdownn
          onLogout={() => {
            setIsAdminLoggedIn(false);
            localStorage.removeItem("isAdminLoggedIn"); // ✅ อัปเดตค่าทันที
          }}
        />
      ) : (
        <Button
          variant="outline"
          size="lg"
          className="font-semibold uppercase text-neutral-500 hover:bg-emerald-400"
          onClick={() => setOpen(true)}
        >
          Login as Admin
        </Button>
      )}

      <LoginDia
        open={open}
        onClose={() => setOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          localStorage.setItem("isAdminLoggedIn", "true"); // ✅ อัปเดตค่าทันที
        }}
      />
    </div>
  );
};

export default Loginadmin;
