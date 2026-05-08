'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";
import { MenuIcon, Video } from "lucide-react";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px] sm:hidden">
      <Sheet>
        <SheetTrigger >
          <MenuIcon size={24} className="text-white cursor-pointer" />
        </SheetTrigger>
        <SheetContent side='left' className='border-none bg-[#1c1f2e] px-6'>
          <Link href="/" className='flex items-center gap-2 px-4 py-2'>
            <Video className='text-[#0E78F9]' size={32} />
            <p className='text-[26px] font-extrabold text-white'>Confex</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <section className="flex h-full flex-col gap-6 pt-16 text-white">
              {sidebarLinks.map((link) => {
                const isActive =
                  pathname === link.route || (link.route !== "/" && pathname.startsWith(link.route));
                const Icon = link.icon;

                return (
                  <SheetClose
                    key={link.route}
                    render={
                      <Link
                        href={link.route}
                        className={`flex gap-4 items-center p-4 rounded-xl w-full max-w-60 transition-all duration-300 group ${isActive
                          ? "bg-[#0E78F9] text-white shadow-lg"
                          : "text-zinc-400 hover:bg-[#1e2130] hover:text-white"
                          }`}
                      />
                    }
                  >
                    {Icon && (
                      <Icon
                        size={24}
                        className={`${isActive ? "text-white" : "text-zinc-400 group-hover:text-white"} transition-colors`}
                      />
                    )}
                    <p className="text-lg font-semibold">{link.label}</p>
                  </SheetClose>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
