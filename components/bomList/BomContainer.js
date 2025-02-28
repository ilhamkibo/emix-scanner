"use client";

import { useState } from "react";
import ClientForm from "../util/ClientForm";
import { useRouter } from "next/navigation";
import BatchList from "../batchList/BatchList";

export default function BomContainer() {
  const [bomData, setBomData] = useState(null);
  console.log("🚀 ~ BomContainer ~ bomData:", bomData);

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-6 mx-2">
      <ClientForm api="/api/bom" setData={setBomData} />
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
                {/* <BatchList title="Batch No:" data={bomData.data?.bom_code} />
                <BatchList
                  title="Product:"
                  data={bomData.data?.product?.name}
                /> */}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                  <h3 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                    Rubber
                  </h3>
                  <h5 className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    0 kg / 100 kg
                  </h5>
                  <ul className="my-4 space-y-1">
                    <li>
                      <h4 className="flex p-1 font-semibold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                        <span className="ms-1 whitespace-nowrap">Pack 1</span>
                      </h4>
                    </li>
                    <li>
                      <h4 className="flex p-1 font-semibold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                        <span className="ms-1 whitespace-nowrap">pack 2</span>
                      </h4>
                    </li>
                    <li>
                      <h4 className="flex p-1 font-semibold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                        <span className="ms-1 whitespace-nowrap">pack 3</span>
                      </h4>
                    </li>
                    <li>
                      <h4 className="flex p-1 font-semibold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                        <span className="ms-1 whitespace-nowrap">pack 4</span>
                      </h4>
                    </li>
                  </ul>
                </div>
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                    Connect wallet
                  </h5>
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Connect with one of our available wallet providers or create
                    a new one.
                  </p>
                  <ul className="my-4 space-y-3">
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          MetaMask
                        </span>
                        <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded-sm dark:bg-gray-700 dark:text-gray-400">
                          Popular
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div>
                    <a
                      href="#"
                      className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                    >
                      Why do I need to connect with my wallet?
                    </a>
                  </div>
                </div>
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                    Connect wallet
                  </h5>
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Connect with one of our available wallet providers or create
                    a new one.
                  </p>
                  <ul className="my-4 space-y-3">
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          MetaMask
                        </span>
                        <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded-sm dark:bg-gray-700 dark:text-gray-400">
                          Popular
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div>
                    <a
                      href="#"
                      className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                    >
                      Why do I need to connect with my wallet?
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
