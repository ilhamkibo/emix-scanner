import Image from "next/image";

export default function Home({ children, sidebarState }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Main Content</h1>
      <p>
        This is the main content area. It automatically adjusts its width based
        on the sidebar state.
      </p>
    </div>
  );
}
