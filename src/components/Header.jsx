import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <>
      <nav>
        <div>
          <Link href="/home">
            <div>Calorie Counter</div>
          </Link>
        </div>
        <div>
          <>
            <Link href="sign-in">Sign In</Link>
            <Link href="sign-up">Sign Up</Link>
          </>
          <div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
