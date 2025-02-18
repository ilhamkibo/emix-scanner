"use client";
import { useState, useEffect, useRef } from "react";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import SidebarList from "./SidebarList";
import { RxDashboard } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { AiOutlineDatabase, AiOutlinePrinter } from "react-icons/ai";
import Image from "next/image";

// Komponen ikon sebagai fungsi
const DashboardIcon = () => <RxDashboard size={25} />;

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  // Handle clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex  min-h-screen relative">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        onClick={toggleSidebar} // Open sidebar on click
        className={`bg-gray-200 shadow-md transition-all duration-300 ease-in-out ${
          isOpen ? "w-60" : "w-16"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <button className="ml-1 flex items-center">
            {isOpen ? (
              <GoSidebarExpand size={25} />
            ) : (
              <GoSidebarCollapse size={25} />
            )}
          </button>
          {isOpen && (
            <Image src="/logo.png" alt="Logo" width={22} height={22} />
          )}
        </div>
        <div className="mt-16 flex flex-col">
          <SidebarList
            isOpen={isOpen}
            name="Dashboard"
            icon={<RxDashboard size={25} />}
            path="/"
            pathname={pathname}
            onClick={closeSidebar} // Auto-close on click
          />
          <SidebarList
            isOpen={isOpen}
            name="Print"
            icon={<AiOutlinePrinter size={25} />}
            path="/print-barcode"
            pathname={pathname}
            onClick={closeSidebar} // Auto-close on click
          />
          <SidebarList
            isOpen={isOpen}
            name="Data Master"
            icon={<AiOutlineDatabase size={25} />}
            path="/master"
            pathname={pathname}
            onClick={closeSidebar} // Auto-close on click
          />
        </div>
      </div>
    </div>
  );
}
