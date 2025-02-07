"use client";
import { useState } from "react";
import { GoSidebarExpand } from "react-icons/go";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-200 bg-yellow-200 shadow-md transition-all duration-300 ${
          isOpen ? "w-60" : "w-16"
        }`}
      >
        <div className="p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center"
          >
            <GoSidebarExpand size={30} />
            {isOpen && <span className="ml-2">Close</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
