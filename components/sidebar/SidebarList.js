import Link from "next/link";

export default function SidebarList({
  isOpen,
  name,
  icon,
  path,
  pathname,
  onClick,
}) {
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={`flex items-center justify-start mb-2 mx-3 hover:bg-blue-200 p-2 rounded ${
        isActive ? "bg-blue-400 text-white" : "text-black"
      }`}
      onClick={onClick}
    >
      {icon}
      {isOpen && <span className="ml-2">{name}</span>}
    </Link>
  );
}
