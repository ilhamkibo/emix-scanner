import WeightValue from "@/components/util/WeightValue";

export default function Print({ params, searchParams }) {
  const batchCode = 1; // Tidak perlu await untuk params
  const pageNumber = 1; // Gunakan properti langsung, default ke "1" jika tidak ada

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <WeightValue weight={0} pageNumber={pageNumber} batchCode={batchCode} />
      <hr className="mt-4 w-1/2 border-gray-400" />
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="mt-4 flex flex-col justify-center items-start">
          <h1 className="text-center text-lg">
            Pack No: <span className="font-semibold">{pageNumber}</span>
          </h1>
          <h1 className="text-center text-lg">
            Batch Code: <span className="font-semibold">{batchCode}</span>
          </h1>
          <h1 className="text-center text-lg">Target Qty: 20 Kg</h1>
        </div>
      </div>
    </div>
  );
}
