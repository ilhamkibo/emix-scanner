"use client";

import { useState } from "react";
import ClientForm from "../util/ClientForm";
import { useRouter } from "next/navigation";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function BomContainer() {
  const [bomData, setBomData] = useState(null);
  const [packData, setPackData] = useState(null);
  const [kumpulanPack, setKumpulanPack] = useState([]);
  console.log("🚀 ~ BomContainer ~ kumpulanPack:", kumpulanPack);
  const router = useRouter();

  // Fungsi untuk menambahkan data ke kumpulanPack
  const handleAddPack = (newPack) => {
    if (newPack && newPack.data) {
      setKumpulanPack((prev) => [...prev, newPack.data]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 mx-2">
      {bomData ? (
        <ClientForm
          api="/api/pack"
          setData={(data) => {
            setPackData(data);
            handleAddPack(data); // Tambahkan ke kumpulanPack
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
                  Code: {bomData.data?.bom_code} / Product:{" "}
                  {bomData.data?.product?.name}
                </h1>
              </div>
              {/* Daftar kumpulan pack */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {kumpulanPack.map((pack, index) => (
                  <div
                    key={index}
                    className="w-full min-w-64 p-3 max-w-sm justify-between flex items-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                  >
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {pack.pack_code}
                    </h3>
                    <h5 className="text-sm font-normal text-gray-900 dark:text-gray-400">
                      {pack.quantity} {pack.batch?.material?.unit}
                    </h5>

                    {/* <div className="w-full min-w-72 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                      <h3 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                        Foam
                      </h3>
                      <h5 className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        80 kg / 100 kg
                      </h5>
                      <ul className="my-4 space-y-1">
                        <li>
                          <h4 className="flex p-1 font-semibold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            <span className="ms-1 whitespace-nowrap">
                              Pack 1
                            </span>
                          </h4>
                        </li>
                        <li>
                          <h4 className="flex p-1 font-semibold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            <span className="ms-1 whitespace-nowrap">
                              pack 2
                            </span>
                          </h4>
                        </li>
                        <li>
                          <h4 className="flex p-1 font-semibold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            <span className="ms-1 whitespace-nowrap">
                              pack 3
                            </span>
                          </h4>
                        </li>
                        <li>
                          <h4 className="flex items-center p-1 font-semibold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            <span className="ms-1 flex-1 py-1 text-sm bg-green-200 whitespace-nowrap rounded-sm">
                              rub-220725-1-p1
                            </span>
                            <span className="inline-flex items-center justify-center mx-2 text-xs font-medium text-green-600 dark:bg-gray-700 dark:text-gray-400">
                              <AiOutlineCheckCircle size={20} />
                            </span>
                          </h4>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
