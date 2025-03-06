import MasterContainer from "@/components/master/MasterContainer";

export default function Master({ children }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Data Master</h1>
      <div className="flex flex-col space-y-2">
        <MasterContainer
          title="BOM Code Data Master"
          link="/master/bom"
          api="/api/pack?page=1&limit=3"
        />
        <MasterContainer
          title="Batch Code Data Master"
          link="/master/batch"
          api="/api/pack?page=1&limit=3"
        />
        <MasterContainer
          title="Pack Code Data Master"
          link="/master/pack"
          api="/api/pack?page=1&limit=3"
        />
      </div>
    </div>
  );
}
