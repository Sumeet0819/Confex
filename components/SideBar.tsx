'use client'
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <section className="fixed left-4 top-[92px] h-[calc(100vh-108px)] flex w-fit flex-col justify-between glassmorphism p-4 text-white hidden sm:flex lg:w-[264px] border border-white/10 rounded-2xl shadow-2xl z-40">
      <div className="flex flex-col gap-4">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || (link.route !== "/" && pathname.startsWith(link.route));
          const Icon = link.icon;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center p-3.5 rounded-md justify-start transition-all duration-300 group",
                isActive
                  ? "bg-white/10 text-white shadow-lg"
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
              <p className="text-base font-semibold max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SideBar;
