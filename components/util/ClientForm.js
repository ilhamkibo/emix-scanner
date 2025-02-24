"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientForm() {
  const [currentBarcode, setCurrentBarcode] = useState("");
  const [batchData, setBatchData] = useState(null); // State untuk menyimpan data batch
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const router = useRouter();

  // Handle API call
  const handleApiCall = async (barcode) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/batch?batchCode=${barcode}`);
      const data = await response.json();
      if (data?.data) {
        const weightPerPack = data.data.quantity / data.data.total_pack;
        setBatchData({
          batchNumber: data.data.batch_code,
          material: data.data.material?.name,
          quantity: data.data.quantity,
          unit: data.data.material?.unit,
          totalPack: data.data.total_pack,
          weightPerPack,
        });
      } else {
        setBatchData({ error: "Batch number not found." });
      }
    } catch (error) {
      console.error(error);
      setBatchData({ error: "Error fetching batch data." });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentBarcode.trim()) {
      handleApiCall(currentBarcode);
      setCurrentBarcode("");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setCurrentBarcode(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Input Form */}
      <form
        className="flex items-center justify-center gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="barcode"
          id="barcode"
          autoFocus
          value={currentBarcode}
          onChange={handleChange}
          placeholder="Enter barcode"
          className="w-60 sm:w-100 md:w-[500px] lg:w-[600px] xl:w-[800px] h-14 rounded-xl border border-gray-300 px-4 py-2 shadow-sm transition-all duration-300 ease-in-out focus:shadow-md focus:outline-none"
        />
      </form>

      {/* Display Batch Data */}
      {batchData && (
        <div className="mt-4 text-center">
          {batchData.error ? (
            <p className="text-red-600 font-semibold">{batchData.error}</p>
          ) : (
            <>
              <div className="text-lg font-medium">
                <p>
                  Batch:{" "}
                  <span className="font-semibold">{batchData.batchNumber}</span>
                </p>
                <p>Material: {batchData.material}</p>
                <p>
                  Quantity: {batchData.quantity} {batchData.unit}
                </p>
                <p>
                  Total Pack: {batchData.totalPack} pcs (
                  {batchData.weightPerPack.toFixed(2)} {batchData.unit}/pc)
                </p>
              </div>
              <button
                onClick={() =>
                  router.push(
                    `/print-barcode/${batchData.batchNumber}?process=1`
                  )
                }
                className="mt-4 hover:bg-blue-700/60 text-gray-700 border border-gray-400 hover:text-white py-2 px-4 rounded transition-all"
              >
                Process &#x279C;
              </button>
            </>
          )}
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && <p className="text-gray-500 font-medium">Loading...</p>}
    </div>
  );
}
