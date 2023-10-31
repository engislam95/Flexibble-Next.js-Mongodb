import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "@/constant";
import { AuthProviders, Button, ProfileMenu } from ".";
import { signOut } from "next-auth/react";
import { getCurrentUser } from "@/lib/session";

// import Button from "./Button";
// import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={116} height={43} alt="logo" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {/* <>
          <ProfileMenu session={session} />
          <Link href="/create-project">Share work</Link>
        </> */}

        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href="/create-project">
              <Button title='Share work' />
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
