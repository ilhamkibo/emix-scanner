import Link from "next/link";

export default function SidebarList({
  isOpen,
  name,
  icon,
  path,
  pathname,
  onClick,
}) {
  const isActive = pathname === path || pathname.startsWith(`${path}/`);

  const baseClasses =
    "flex items-center justify-start mb-1 mx-3 p-2 rounded transition-all duration-300 ease-in-out";
  const activeClasses = "bg-blue-400 text-white hover:text-black";
  const inactiveClasses = "text-black hover:bg-blue-200 hover:text-blue-600";

  return (
    <Link
      href={path}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      <div
        className={`${baseClasses} ${
          isActive ? activeClasses : inactiveClasses
        }`}
      >
        <div className="flex-shrink-0">{icon}</div>
        <span
          className={`ml-2 transition-opacity whitespace-nowrap overflow-hidden text-ellipsis ${
            isOpen ? "opacity-100 max-w-[200px]" : "opacity-0 hidden max-w-0"
          }`}
        >
          {name}
        </span>
      </div>
    </Link>
  );
}
