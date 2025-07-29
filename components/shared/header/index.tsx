import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { ShoppingCart, User2, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="flex justify-between items-center p-2">
        <div className="flex justify-start">
          <Link href="/" className="flex justify-start items-center">
            <Image
              src="/images/logo.svg"
              alt={APP_NAME}
              width={48}
              height={48}
              priority={true}
            />
            <span
              className="hidden lg:block font-bold text-2xl ml-3 
"
            >
              {APP_NAME}
            </span>
          </Link>
        </div>
        <span className="space-x-2">
          <Button asChild variant={"ghost"}>
            <Link href={"/cart"}>
            <ShoppingCart/> Cart </Link>
          </Button>

          <Button asChild >
            <Link href={"/signin"}>
            <UserIcon/> SignIn </Link>
          </Button>

        </span>
      </div>
    </header>
  );
};

export default Header;
