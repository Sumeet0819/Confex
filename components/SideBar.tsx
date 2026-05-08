'use client'
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#1c1f2e] p-6 pt-28 text-white hidden sm:flex lg:w-[264px]">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || (link.route !== "/" && pathname.startsWith(link.route));
          const Icon = link.icon;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex gap-4 items-center p-4 rounded-xl justify-start transition-all duration-300 group ${
                isActive
                  ? "bg-[#0E78F9] text-white shadow-lg"
                  : "text-zinc-400 hover:bg-[#1e2130] hover:text-white"
              }`}
            >
              {Icon && (
                <Icon
                  size={24}
                  className={`${isActive ? "text-white" : "text-zinc-400 group-hover:text-white"} transition-colors`}
                />
              )}
              <p className="text-lg font-semibold max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SideBar;
