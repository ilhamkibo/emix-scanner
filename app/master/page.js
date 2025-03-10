import TableContainer from "@/components/master/TableContainer";

export default function Master({ children }) {
  const userData = [
    {
      id: 23123,
      name: "Jude abaga",
      email: "jude.abaga@abaga.com",
      date: 1237682923189813,
      status: "pending",
    },
    {
      id: 23128,
      name: "Dev abaga",
      email: "devabaga@abaga.com",
      date: 111237682923189813,
      status: "verified",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Data Master</h1>
      <div className="flex flex-col space-y-2">
        <TableContainer
          title="BOM Code Data Master"
          link="/master/bom"
          api="http://localhost:3000/api/bom"
        />
        <TableContainer
          title="Batch Code Data Master"
          link="/master/batch"
          api="http://localhost:3000/api/batch"
        />
        <TableContainer
          title="Pack Code Data Master"
          link="/master/pack"
          api="http://localhost:3000/api/pack"
        />
      </div>
    </div>
  );
}
