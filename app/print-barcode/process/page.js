import ClientForm from "@/components/util/ClientForm";

export default async function Print() {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      {/* Heading Section */}
      <div className="-mt-24">
        <h1 className="text-center text-2xl font-semibold">
          Scan the barcode to print
        </h1>
      </div>

      {/* Form Section */}
      <div className="mt-4">
        <ClientForm />
      </div>
    </div>
  );
}
