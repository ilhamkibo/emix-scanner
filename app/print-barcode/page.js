import BatchContainer from "@/components/batchList/BatchContainer";

export default async function Page() {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className="-mt-24">
        <h1 className="text-center text-2xl font-semibold">
          Scan the barcode to print
        </h1>
      </div>

      {/* Form Section */}
      <div className="mt-4">
        <BatchContainer />
      </div>
    </div>
  );
}
