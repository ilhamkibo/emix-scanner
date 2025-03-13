import MasterTable from "@/components/master/MasterTable";

export default function Page({ children }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Main Content</h1>
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
    </div>
  );
}
