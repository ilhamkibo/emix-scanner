"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientForm() {
  const [currentBarcode, setCurrentBarcode] = useState("");
  const [batchNumber, setBatchNumber] = useState(""); // State untuk menyimpan batch number
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const router = useRouter();

  // Handle API call
  const handleApiCall = async (barcode) => {
    setIsLoading(true); // Set loading state
    try {
      const response = await fetch(`/api/batch?batchCode=${barcode}`);
      const data = await response.json();

      // Jika ada batch number dalam data, set ke state batchNumber
      if (data?.data?.batch_code) {
        setBatchNumber(data?.data?.batch_code);
      } else {
        setBatchNumber("Batch number not found.");
      }
    } catch (error) {
      console.error(error);
      setBatchNumber("Error fetching batch.");
    } finally {
      setIsLoading(false); // Set loading selesai
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentBarcode.trim() === "") return; // Prevent empty submission
    handleApiCall(currentBarcode);
    setCurrentBarcode(""); // Clear the input field
  };

  // Handle input change
  const handleChange = (e) => {
    setCurrentBarcode(e.target.value); // Update state as user types
  };

  const processSubmit = () => {};

  return (
    <div className="flex flex-col items-center justify-center gap-4">
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
          onChange={handleChange} // Handle user input
          placeholder="Enter barcode"
          className="w-60 sm:w-100 md:w-[500px] lg:w-[600px] xl:w-[800px] h-14 rounded-xl border border-gray-300 px-4 py-2 shadow-sm transition-all duration-300 ease-in-out focus:shadow-md focus:outline-none"
        />
      </form>

      {/* Display Batch Number after successful scan */}
      {batchNumber && (
        <>
          <div className="mt-4 text-center text-xl font-semibold">
            <h2>Batch Number: {batchNumber}</h2>
          </div>
          <div className="text-center text-xl font-semibold">
            <button
              onClick={() =>
                router.push(`/print-barcode/${batchNumber}?process=1`)
              }
              className=" hover:bg-blue-700/60 text-gray-700 border border-gray-400 hover:border-none hover:text-white font-normal py-1 px-3 rounded"
            >
              Process &#x279C;
            </button>
          </div>
        </>
      )}
    </div>
  );
}
