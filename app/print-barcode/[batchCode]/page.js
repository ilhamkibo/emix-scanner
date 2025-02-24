import WeightValue from "@/components/util/WeightValue";

export default async function Print({ params, searchParams }) {
  const batchCode = params.batchCode; // Tidak perlu await untuk params
  const process = searchParams?.process || "1"; // Gunakan properti langsung, default ke "1" jika tidak ada

  // Function to handle API call
  const postBatchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          batchCode: batchCode,
          packIndex: parseInt(process), // Konversi process ke integer
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      return data; // Kembalikan data untuk digunakan lebih lanjut
    } catch (error) {
      console.error("Failed to post batch data:", error);
      return null;
    }
  };

  // Call API and store response
  const batchData = await postBatchData();
  const packCode = batchData?.data?.pack?.packCode || "N/A";
  const packQuantity = batchData?.data?.pack?.quantity || "N/A";
  const totalPack = batchData?.data?.pack?.total_pack || "N/A";

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <WeightValue
        weight={packQuantity}
        process={process}
        batchCode={batchCode}
        totalPack={totalPack}
      />
      <hr className="mt-4 w-1/2 border-gray-400" />
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="mt-4 flex flex-col justify-center items-start">
          <h1 className="text-center text-lg">
            Pack No: <span className="font-semibold">{packCode}</span>
          </h1>
          <h1 className="text-center text-lg">
            Batch Code: <span className="font-semibold">{batchCode}</span>
          </h1>
          <h1 className="text-center text-lg">Target Qty: {packQuantity} Kg</h1>
        </div>
      </div>
    </div>
  );
}
