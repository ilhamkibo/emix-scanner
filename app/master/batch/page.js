export default function Page({ children }) {
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
