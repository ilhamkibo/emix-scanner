"use client";

import { useState } from "react";
import ClientForm from "../util/ClientForm";
import BatchList from "./BatchList";
import { useRouter } from "next/navigation";

export default function BatchContainer() {
  const [batchData, setBatchData] = useState(null);

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <ClientForm api="/api/batch" setData={setBatchData} />
      {batchData && (
        <div className="mt-4">
          {batchData.error ? (
            <p className="text-red-600 font-semibold">{batchData.error}</p>
          ) : (
            <div className="flex items-center flex-col">
              <BatchList title="Batch No:" data={batchData.data.batch_code} />
              <BatchList
                title="Material:"
                data={batchData.data.material?.name}
              />
              <BatchList
                title="Quantity:"
                data={`${batchData.data.quantity} ${batchData.data.material?.unit}`}
              />
              <BatchList
                title="Total Pack:"
                data={`${batchData.data.total_pack} pcs (${
                  batchData.data.quantity / batchData.data.total_pack
                } ${batchData.data.material?.unit}/pc)`}
              />
              <button
                onClick={() =>
                  router.push(
                    `/print-barcode/${batchData.data.batch_code}?process=1`
                  )
                }
                className="mt-4 hover:bg-blue-700/60 text-gray-700 border border-gray-400 hover:text-white py-2 px-4 rounded transition-all"
              >
                Process &#x279C;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
