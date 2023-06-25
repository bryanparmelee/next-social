import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flex-start gap-10">
        <Link href="/"> </Link>
        <Image src="/logo.svg" width={115} height={43} alt="Next Social" />
      </div>
    </nav>
  );
};

export default Navbar;
