"use client";

import { useState } from "react";

export default function ClientForm() {
  const [currentBarcode, setCurrentBarcode] = useState("");
  const [batchNumber, setBatchNumber] = useState(""); // State untuk menyimpan batch number
  const [isLoading, setIsLoading] = useState(false); // State untuk loading

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
          value={currentBarcode}
          onChange={handleChange} // Handle user input
          placeholder="Enter barcode"
          className="w-60 sm:w-100 md:w-[500px] lg:w-[600px] xl:w-[800px] h-14 rounded-xl border border-gray-300 px-4 py-2 shadow-sm transition-all duration-300 ease-in-out focus:shadow-md focus:outline-none"
        />
        <button
          type="submit"
          className="h-14 px-6 rounded-xl bg-blue-500 text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-blue-600 focus:outline-none"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>

      {/* Display Batch Number after successful scan */}
      {batchNumber && (
        <div className="mt-4 text-center text-xl font-semibold">
          <h2>Batch Number: {batchNumber}</h2>
        </div>
      )}
    </div>
  );
}
