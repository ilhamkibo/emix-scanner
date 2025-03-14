"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import MessageToast from "./MessageToast";

export default function WeightValue({
  pack_code,
  batchCode,
  process,
  totalPack,
  batch_id,
  quantity,
  material,
  packUnit,
}) {
  const [weight, setWeight] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001/echo");

    socket.onopen = () => {
      console.log("WebSocket connection established");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "weightUpdate") setWeight(data.weight);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    setIsFinished(totalPack == process);
  }, [totalPack, process]);

  const isOK = weight > quantity;

  const postPackData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/pack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pack_code,
          quantity: weight,
          batch_id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Unknown error");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 1000);
        return result;
      }

      setMessage(result.message);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        handlePrint(); // Panggil fungsi cetak setelah berhasil POST
      }, 1000);

      return result;
    } catch (error) {
      setMessage("Error posting data. Please try again.");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1000);
      console.error("Error posting data:", error);
      return { error: error.message || "Unknown error" };
    }
  };

  const handleLinkClick = async (e) => {
    e.preventDefault();

    const result = await postPackData();

    if (result?.error) {
      console.error("Error posting data:", result.error);
      return;
    }
    if (isFinished) {
      // Tunggu 1 detik sebelum mengarahkan ke "/print-barcode"
      setTimeout(() => {
        router.push("/print-barcode");
      }, 1000);
    } else {
      // Redirect langsung ke URL baru
      const nextUrl = `/print-barcode/${batchCode}?process=${
        Number(process) + 1
      }`;
      router.push(nextUrl);
    }
  };

  // Fungsi untuk mencetak barcode ke PDF
  const handlePrint = () => {
    const printContents = document.getElementById("print-barcode").innerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Barcode</title>
          <style>
            body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
          </style>
        </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <>
      <div className="-mt-20 mb-4">
        {/* Template untuk mencetak barcode */}
        <div
          id="print-barcode"
          style={{
            padding: "8px",
            display: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px", // Gap between elements
            }}
          >
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "8px", marginBottom: "4px" }}>
                {pack_code}
              </p>
              <QRCode value={pack_code} size={65} />
            </div>
            <div style={{ marginTop: "8px" }}>
              <p style={{ margin: "4px 0" }}>
                Batch No: <span style={{ fontWeight: "600" }}>{batchCode}</span>
              </p>
              <p style={{ margin: "4px 0" }}>
                Material: <span style={{ fontWeight: "600" }}>{material}</span>
              </p>
              <p style={{ margin: "4px 0" }}>
                Weight:{" "}
                <span style={{ fontWeight: "600" }}>
                  {weight} {packUnit}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* <h1 className="text-4xl font-thin text-center">
          Now Process: {process}
        </h1> */}
        <MessageToast message={message} showMessage={showMessage} />
      </div>
      {isOK && (
        <Link
          onClick={handleLinkClick}
          className="text-center py-2 font-semibold hover:scale-105 transition-all duration-300 ease-in-out text-blue-600"
          href="#"
        >
          {isFinished ? "Finish Process" : "Next Process ➜"}
        </Link>
      )}

      <div
        className={`flex gap-4 items-center justify-center p-2 rounded border ${
          isOK ? "border-green-600" : "border-red-600"
        }`}
      >
        <h3 className="text-center text-2xl font-semibold">
          Weight: {weight === null ? "Loading..." : `${weight} kg`}
        </h3>
        <div
          className={`flex gap-1 items-center ${
            isOK ? "text-green-600" : "text-red-600"
          }`}
        >
          {isOK ? <FaCheck size={20} /> : <FaTimes size={20} />}
          <h1 className="text-xl">{isOK ? "OK" : "NG"}</h1>
        </div>
      </div>
    </>
  );
}
