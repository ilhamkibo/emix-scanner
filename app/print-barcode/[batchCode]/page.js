import WeightValue from "@/components/util/WeightValue";

export default async function Print({ params, searchParams }) {
  const batchCode = (await params).batchCode; // Tidak perlu await untuk params
  const process = (await searchParams).process || "1"; // Gunakan properti langsung, default ke "1" jika tidak ada

  // Function to handle API call
  const fetchBatchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/batch/${batchCode}`
      );
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      console.log("🚀 ~ fetchBatchData ~ response:", response);
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch batch data:", error);
      return null;
    }
  };

  // Call API and store response
  const batchData = await fetchBatchData();
  const packQuantity =
    batchData?.data?.quantity / batchData?.data?.total_pack || "N/A";
  const packUnit = batchData?.data?.material?.unit || "N/A";
  const totalPack = batchData?.data?.total_pack || "N/A";
  const packCode = batchCode ? `${batchCode}-P${process}` : "N/A";
  const batchId = batchData?.data?.id || "N/A";
  const material = batchData?.data?.material?.name || "N/A";

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <WeightValue
        pack_code={packCode}
        process={process}
        batchCode={batchCode}
        totalPack={totalPack}
        quantity={packQuantity}
        batch_id={batchId}
        packUnit={packUnit}
        material={material}
      />
      <hr className="mt-4 w-1/2 border-gray-400" />
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="mt-4 flex flex-col justify-center items-start">
          <h1 className="text-center text-lg">
            Pack Code: <span className="font-semibold">{packCode}</span>
          </h1>
          <h1 className="text-center text-lg">
            Batch Code: <span className="font-semibold">{batchCode}</span>
          </h1>
          <h1 className="text-center text-lg">
            Target Qty:{" "}
            <span className="font-semibold">
              {packQuantity} {packUnit}
            </span>
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-lg">Now process:</h1>
          <div className="flex items-center justify-center w-16 h-16 text-4xl rounded-full border border-black">
            {process}
          </div>
        </div>
      </div>
    </div>
  );
}
