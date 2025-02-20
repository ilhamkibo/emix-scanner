"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

export default function WeightValue({ batchCode, pageNumber }) {
  const [weight, setWeight] = useState(0); // State untuk menyimpan berat

  useEffect(() => {
    // Inisialisasi WebSocket
    const socket = new WebSocket("ws://localhost:3001/echo"); // Sesuaikan URL WebSocket
    console.log("🚀 ~ useEffect ~ socket:", socket);

    // Ketika koneksi berhasil
    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    // Ketika menerima pesan dari server
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data); // Asumsikan data diterima dalam format JSON
      console.log("🚀 ~ useEffect ~ data:", data);
      if (data.type === "weightUpdate") {
        setWeight(data.weight); // Update berat berdasarkan data dari server
      }
    };

    // Ketika koneksi ditutup
    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Bersihkan koneksi WebSocket ketika komponen unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <Link
        className="-mt-20 text-center py-2 font-semibold hover:scale-105 transition-all duration-300 ease-in-out text-blue-600"
        href={`/print-barcode/${batchCode}?process=${Number(pageNumber) + 1}`}
      >
        Next Process &#x279C;
      </Link>
      <div className="flex gap-4 items-center justify-center">
        <h3 className="text-center text-2xl font-semibold">
          Weight = <span className="text-red-500">{weight}</span> kg
        </h3>
        <div className="flex gap-2 items-center justify-start border border-red-400 rounded p-2 text-red-600">
          <FaTimes />
          <h1>NG</h1>
        </div>
        {/* <div className="flex gap-2 items-center justify-start border border-green-400 rounded p-2 text-green-600">
          <FaCheck />
          <h1>OK</h1>
        </div> */}
      </div>
    </>
  );
}
