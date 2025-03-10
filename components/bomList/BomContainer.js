"use client";

import { useState } from "react";
import ClientForm from "../util/ClientForm";
import { useRouter } from "next/navigation";
import { AiOutlineCheckCircle } from "react-icons/ai";
import MessageToast from "../util/MessageToast";

export default function BomContainer() {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [bomData, setBomData] = useState(null);
  const [packData, setPackData] = useState(null);
  const [kumpulanPack, setKumpulanPack] = useState([]);
  const [apiResponses, setApiResponses] = useState({ success: [], failed: [] });
  const router = useRouter();

  // Fungsi untuk menambahkan data ke kumpulanPack
  const handleAddPack = (newPack) => {
    if (newPack && newPack.data) {
      setKumpulanPack((prev) => {
        const isDuplicate = prev.some(
          (pack) => pack.pack_code === newPack.data.pack_code
        );

        if (!isDuplicate) {
          return [...prev, newPack.data];
        }

        return prev;
      });
    }
  };

  // Fungsi untuk mengecek apakah semua material sudah terpenuhi
  const isAllMaterialComplete = () => {
    if (!bomData || !bomData.data?.bommaterial) return false;

    return bomData.data.bommaterial.every((material) => {
      const totalQuantity = kumpulanPack
        .filter(
          (pack) => pack.batch?.material?.name === material.material?.name
        )
        .reduce((sum, pack) => sum + (Number(pack.quantity) || 0), 0);

      const requiredQty = Number(material.required_qty) || 0;

      return totalQuantity >= requiredQty;
    });
  };

  const handleSubmitData = async () => {
    try {
      const payload = {
        bom_id: bomData.data.id, // Atau gunakan ID BOM yang sesuai
        packs: kumpulanPack.map((pack) => pack.pack_code),
      };
      console.log("🚀 ~ handleSubmitData ~ payload:", payload);

      const response = await fetch("http://localhost:3000/api/bom/bom-pack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setApiResponses({
          success: result.success || [],
          failed: result.failed || [],
        });
        setMessage("Data successfully submitted!");
        setShowMessage(!showMessage);
        setTimeout(() => {
          setShowMessage(false);
          setMessage("");
          setKumpulanPack([]);
          setBomData(null);
          router.push("/bom-list"); // Redirect jika diperlukan
        }, 1000);
      } else {
        setApiResponses({
          success: result.success || [],
          failed: result.failed || [],
        });
        setMessage("Terjadi kesalahan, coba lagi.");
        setShowMessage(!showMessage);
        setTimeout(() => {
          setShowMessage(false);
          setMessage("");
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setMessage("Terjadi kesalahan, coba lagi.");
      setShowMessage(!showMessage);
      setTimeout(() => {
        setShowMessage(false);
        setMessage("");
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 mx-2">
      <MessageToast message={message} showMessage={showMessage} />
      {bomData ? (
        <ClientForm
          api="/api/pack"
          setData={(data) => {
            setPackData(data);
            handleAddPack(data);
          }}
        />
      ) : (
        <ClientForm api="/api/bom" setData={setBomData} />
      )}
      {bomData && (
        <div className="mt-4">
          {bomData.error ? (
            <p className="text-red-600 font-semibold">{bomData.error}</p>
          ) : (
            <div>
              <div className="flex items-center flex-col mb-4">
                <h1 className="text-xl font-semibold">
                  Code: {bomData.data?.bom_code}
                </h1>
              </div>

              <div className="flex items-start justify-center gap-3 mb-3">
                {bomData.data?.bommaterial.map((material, index) => {
                  const totalQuantity = kumpulanPack
                    .filter(
                      (pack) =>
                        pack.batch?.material?.name === material.material?.name
                    )
                    .reduce(
                      (sum, pack) => sum + (Number(pack.quantity) || 0),
                      0
                    );

                  const requiredQty = Number(material.required_qty) || 0;
                  const isCompleted = totalQuantity >= requiredQty;

                  return (
                    <div
                      key={index}
                      className={`w-full min-w-56 p-3 max-w-sm flex flex-col items-center border ${
                        isCompleted ? "border-green-500" : "border-gray-200"
                      } rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-300`}
                    >
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {material.material?.name}
                      </h3>
                      <h5 className="text-sm font-normal text-gray-900 dark:text-gray-400">
                        {Number(totalQuantity).toFixed(2)}{" "}
                        {material.material?.unit} / {requiredQty.toFixed(2)}{" "}
                        {material.material?.unit}
                      </h5>
                      <div className="mt-2 flex flex-col gap-1 px-3">
                        {kumpulanPack
                          .filter(
                            (pack) =>
                              pack.batch?.material?.name ===
                              material.material?.name
                          )
                          .map((pack, index) => (
                            <div
                              key={index}
                              className="w-full min-w-56 p-3 max-w-sm justify-between flex items-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                            >
                              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                {pack.pack_code}
                              </h3>
                              <h5 className="text-sm font-normal text-gray-900 dark:text-gray-400">
                                {Number(pack.quantity).toFixed(2)}{" "}
                                {pack.batch?.material?.unit}
                              </h5>
                            </div>
                          ))}

                        {kumpulanPack.filter(
                          (pack) =>
                            pack.batch?.material?.name ===
                            material.material?.name
                        ).length === 0 && (
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                            -
                          </h3>
                        )}
                      </div>
                      {isCompleted && (
                        <div className="mt-2 text-green-500 flex items-center gap-2">
                          <AiOutlineCheckCircle size={20} />
                          <span>Complete</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      {isAllMaterialComplete() && (
        <button
          onClick={handleSubmitData}
          className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
        >
          Submit Data
        </button>
      )}
      <div className="w-full max-w-2xl text-center mt-6">
        {apiResponses.success.length > 0 && (
          <div className="mb-4">
            <h3 className="text-green-600 font-semibold">Success:</h3>
            <ul className="list-disc list-inside">
              {apiResponses.success.map((item, index) => (
                <li key={index}>
                  <strong>{item.pack_code}:</strong> {item.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {apiResponses.failed.length > 0 && (
          <div>
            <h3 className="text-red-600 font-semibold">Failed:</h3>
            <ul className="list-disc list-inside">
              {apiResponses.failed.map((item, index) => (
                <li key={index}>
                  <strong>{item.pack_code}:</strong> {item.error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
