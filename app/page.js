import Sidebar from "@/components/sidebar/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="bg-slate-400">Navbar</div>
      <div className="flex">
        <Sidebar />
        <div className=" bg-gray-50">Main page</div>
      </div>
    </div>
  );
}
