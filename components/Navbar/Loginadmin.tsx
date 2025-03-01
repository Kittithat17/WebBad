"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Dropdownn from "./Dropdownn";
import LoginDia from "./LoginDia";


const Loginadmin = () => {
  const [open, setOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // โหลดค่า isAdminLoggedIn จาก localStorage เมื่อหน้าโหลด
  useEffect(() => {
    const storedAdminStatus = localStorage.getItem("isAdminLoggedIn");
    if (storedAdminStatus === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isAdminLoggedIn ? (
        <Dropdownn onLogout={() => setIsAdminLoggedIn(false)} />
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
        onLoginSuccess={() => setIsAdminLoggedIn(true)}
      />
    </div>
  );
};

export default Loginadmin;
