"use client";
import React, { useEffect, useState } from "react";
import { BsBag } from "react-icons/bs";
import Link from "next/link";

const Header = ({openSideBar}:{openSideBar:any}) => {
  // header state
  const [isActive, setIsActive] = useState(false);
  const itemAmount = 0;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });
  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link href={"/"}>
          <div className="w-[40px]">
            <img src={"/logo.png"} alt="" />
          </div>
        </Link>
        {<h2 className="text-2xl text-primary">CoffeeBlend</h2>}
        {/* cart */}
        <div onClick={() => {}} className="cursor-pointer flex relative">
          <BsBag className="text-2xl" onClick={openSideBar}/>
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
