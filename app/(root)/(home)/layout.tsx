import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <SideBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-24 max-md:pb-14 sm:px-14 sm:ml-[80px] lg:ml-[280px]">
          <div className="w-full max-w-7xl mx-auto">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
