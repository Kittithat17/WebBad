import Link from "next/link";
import { DarkMode } from "./DarkMode";
import Logo from "./Logo";
import Search from "./Search";
import { links } from "@/utils/links";

import Loginadmin from "./Loginadmin";


const Navbar = () => {
  return (
    <nav>
      <div className="flex py-5 justify-between items-center px-4 sm:px-8">
        {/* Logo */}
        <Logo />

        {/* Search Bar */}
        <Search />

        {/* รายการลิงก์ */}
        
        <div className="flex gap-14 uppercase text-neutral-500 font-semibold items-center
        md:inline-flex">
          {links.map((item, index) => {
            return (
              <div key={index}>
                <Link
                  href={item.href}
                  className="duration-300 hover:text-neutral-950 
                  transition-all ease-in-out relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-black duration-300 hover:text-neutral-950 
                  transition-all ease-in-out group-hover:w-1/2 group-hover:left-0 "/>
                   <span className="absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-black duration-300 hover:text-neutral-950 
                  transition-all ease-in-out group-hover:w-1/2 group-hover:right-0 "/>

                  
                </Link>
              </div>
            );
          })}
        </div>

        {/* Login Button */}
        <Loginadmin />

        {/* Dark Mode Toggle */}
        <DarkMode />
      
      </div>
      <hr />
    </nav>
  );
};

export default Navbar;