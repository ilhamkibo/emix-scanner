import CombinedTables from "@/components/master/CombinedTables";

export default function Master({ children }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Data Master</h1>
      <CombinedTables />
    </div>
  );
}
