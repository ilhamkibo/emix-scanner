"use client";

import { useState } from "react";
import BatchList from "../batchList/BatchList";

export default function ClientForm({ setData, api }) {
  const [currentText, setCurrentText] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State untuk loading

  // Handle API call
  const handleApiCall = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${api}/${data}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
      setData({ error: "Error fetching batch data." });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentText.trim()) {
      handleApiCall(currentText);
      setCurrentText("");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setCurrentText(e.target.value);
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
          value={currentText}
          onChange={handleChange}
          placeholder="Enter barcode"
          className="w-60 sm:w-100 md:w-[500px] lg:w-[600px] xl:w-[800px] h-14 rounded-xl border border-gray-300 px-4 py-2 shadow-sm transition-all duration-300 ease-in-out focus:shadow-md focus:outline-none"
        />
      </form>

      {/* Display Batch Data */}
      {/* {batchData && (
        <div className="mt-4 text-center">
          {batchData.error ? (
            <p className="text-red-600 font-semibold">{batchData.error}</p>
          ) : (
            <>
              

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
      )} */}

      {/* Loading Indicator */}
      {isLoading && <p className="text-gray-500 font-medium">Loading...</p>}
    </div>
  );
}
