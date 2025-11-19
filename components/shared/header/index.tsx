import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";
const Header = () => {
  return (
    <header className="w-full border-b px-4">
      <div className="flex justify-between items-center p-2 max-w-7xl mx-auto">
        <div className="flex justify-start">
          <Link href="/" className="flex justify-start items-center">
            <Image
              src="/images/logo.svg"
              alt={APP_NAME}
              width={48}
              height={48}
              priority={true}
            />
            <span className="hidden lg:block font-bold text-2xl ml-3">
              {APP_NAME}
            </span>
          </Link>
        </div>

        <Menu />
      </div>
    </header>
  );
};

export default Header;
