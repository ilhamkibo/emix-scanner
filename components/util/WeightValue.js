"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function WeightValue({ batchCode, process, totalPack }) {
  const [weight, setWeight] = useState(0); // State untuk menyimpan berat
  const [isConnected, setIsConnected] = useState(false); // Status koneksi
  const [isFinished, setIsFinished] = useState(false); // Status selesai
  const router = useRouter();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001/echo"); // Sesuaikan URL WebSocket

    socket.onopen = () => {
      console.log("WebSocket connection established");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data); // Asumsikan data diterima dalam format JSON
      if (data.type === "weightUpdate") {
        setWeight(data.weight); // Update berat berdasarkan data dari server
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  // Gunakan useEffect untuk memeriksa apakah proses selesai
  useEffect(() => {
    if (totalPack == process) {
      setIsFinished(true);
    } else {
      setIsFinished(false);
    }
  }, [totalPack, process]);

  const isOK = weight > 0.9; // Contoh: Berat di atas 0.9 dianggap OK

  return (
    <>
      {isOK &&
        (isFinished ? (
          <Link
            className="-mt-20 text-center py-2 font-semibold hover:scale-105 transition-all duration-300 ease-in-out text-blue-600"
            href={`/print-barcode`}
          >
            Finish Process
          </Link>
        ) : (
          <Link
            className="-mt-20 text-center py-2 font-semibold hover:scale-105 transition-all duration-300 ease-in-out text-blue-600"
            href={`/print-barcode/${batchCode}?process=${Number(process) + 1}`}
          >
            Next Process &#x279C;
          </Link>
        ))}

      <div
        className={`${
          isOK ? "" : "-mt-20"
        } flex gap-4 items-center justify-center`}
      >
        <h3 className="text-center text-2xl font-semibold">
          Weight ={" "}
          <span className={`${isOK ? "text-green-600" : "text-red-600"}`}>
            {weight === null ? "Loading..." : `${weight} kg`}
          </span>
        </h3>
        <div
          className={`flex gap-2 items-center justify-start border rounded p-2 ${
            isOK
              ? "border-green-400 text-green-600"
              : "border-red-400 text-red-600"
          }`}
        >
          {isOK ? <FaCheck /> : <FaTimes />}
          <h1>{isOK ? "OK" : "NG"}</h1>
        </div>
      </div>
    </>
  );
}
