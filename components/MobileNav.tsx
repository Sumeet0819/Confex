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
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px] sm:hidden">
      <Sheet>
        <SheetTrigger render={<MenuIcon size={24} className="text-white cursor-pointer opacity-70 hover:opacity-100 transition-opacity" />} />
        <SheetContent side='left' className='border-none bg-[#0d0d0d] px-6 text-white'>
          <Link href="/" className='flex items-center gap-2 px-4 py-2 mb-10'>
            <div className="bg-white/5 p-2 rounded-lg border border-white/10">
              <Video className='text-white' size={24} />
            </div>
            <p className='text-2xl font-bold text-white tracking-tight'>Confex</p>
          </Link>
          <div className="flex h-[calc(100vh-100px)] flex-col justify-between overflow-y-auto scrollbar-kit">
            <section className="flex h-full flex-col gap-4 text-white">
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
                        className={cn(
                          "flex gap-4 items-center p-3.5 rounded-md w-full transition-all duration-300 group",
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-white/40 hover:bg-white/5 hover:text-white/80"
                        )}
                      >
                        {Icon && (
                          <Icon
                            size={22}
                            className={cn(
                              "transition-colors",
                              isActive ? "text-white" : "text-white/40 group-hover:text-white/80"
                            )}
                          />
                        )}
                        <p className="text-base font-semibold">{link.label}</p>
                      </Link>
                    }
                  />
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
