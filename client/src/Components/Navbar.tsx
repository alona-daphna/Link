import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import { MdLightMode } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="flex justify-center items-end lg:w-3/5 w-fit mx-auto p-5">
      <Logo />
      <Search />
      <div className="text-xl self-center">
        <MdLightMode />
      </div>
    </nav>
  );
};

export default Navbar;
