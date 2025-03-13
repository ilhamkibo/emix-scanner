import MasterTable from "./MasterTable";

export default function CombinedTables() {
  return (
    <div className="flex flex-col space-y-2">
      <MasterTable
        title="Bom Number List"
        apiEndpoint="http://localhost:3000/api/bom"
        columns={[
          { header: "No", key: null },
          { header: "Bom Number", key: "bom_code" },
          {
            header: "Product",
            key: null,
            render: (item) => item.product?.name || "-",
          },
          { header: "Date", key: "createdAt" },
        ]}
        link="/master/bom"
      />
      <MasterTable
        title="Batch Number List"
        apiEndpoint="http://localhost:3000/api/batch"
        columns={[
          { header: "No", key: null },
          { header: "Batch Number", key: "batch_code" },
          {
            header: "Material",
            key: null, // Tidak ada key karena akan menggunakan render
            render: (item) => item.material?.name || "-", // Tampilkan "-" jika `material` kosong
          },
          { header: "Date", key: "createdAt" },
        ]}
        link="/master/batch"
      />
      <MasterTable
        title="Pack Number List"
        apiEndpoint="http://localhost:3000/api/pack"
        columns={[
          { header: "No", key: null },
          { header: "Pack Number", key: "pack_code" },
          {
            header: "Batch",
            key: null,
            render: (item) => item.batch?.batch_code,
          },
          {
            header: "Material",
            key: null,
            render: (item) => item.batch?.material?.name,
          },
          { header: "Date", key: "createdAt" },
        ]}
        link="/master/pack"
      />
    </div>
  );
}
