import MasterTable from "@/components/master/MasterTable";

export default function Page({ children }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Main Content</h1>
      <MasterTable
        apiEndpoint={"http://localhost:3000/api/bom?limit=10"}
        title={"Bom Number List"}
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
      />
    </div>
  );
}
