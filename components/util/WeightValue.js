"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";
import { QRCode } from "react-qrcode-logo";

export default function WeightValue({
  pack_code,
  batchCode,
  process,
  totalPack,
  batch_id,
  quantity,
  material,
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

  const isOK = weight > 0.9;

  const postPackData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/pack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pack_code,
          quantity,
          batch_id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to post data: ${response.statusText}`);
      }

      const result = await response.json();
      setMessage(`Data process-${process} successfully posted!`);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1000);

      generateQRCodePDF(); // Panggil fungsi cetak setelah berhasil POST
    } catch (error) {
      setMessage("Error posting data. Please try again.");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1000);
      console.error("Error posting data:", error);
    }
  };

  const handleLinkClick = async (e) => {
    e.preventDefault();

    await postPackData();

    const nextUrl = isFinished
      ? `/print-barcode`
      : `/print-barcode/${batchCode}?process=${Number(process) + 1}`;

    router.push(nextUrl);
  };

  // Fungsi untuk mencetak barcode ke PDF
  const generateBarcodePDF = () => {
    const doc = new jsPDF();

    // Buat elemen canvas untuk barcode
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, pack_code, {
      format: "CODE128",
      height: 40,
    });

    // Tambahkan barcode ke PDF
    const barcodeImage = canvas.toDataURL("image/png");
    doc.addImage(barcodeImage, "PNG", 10, 20, 50, 20); // X, Y, Width, Height

    // Tambahkan informasi lainnya
    doc.setFontSize(12);
    doc.text("Pack Code: " + pack_code, 70, 30);
    doc.text("Material: " + material, 70, 40);
    doc.text("Quantity: " + quantity, 70, 50);
    doc.text("Date: " + new Date().toLocaleDateString(), 70, 60);

    // Simpan PDF
    doc.save(`${pack_code}_barcode.pdf`);
  };

  const generateQRCodePDF = () => {
    const doc = new jsPDF();

    // Buat elemen canvas untuk QR code
    const canvas = document.createElement("canvas");

    const qrCodeData = `Pack Code: ${pack_code}\nMaterial: ${material}\nQuantity: ${quantity}`;

    // Generate QR code menggunakan react-qrcode-logo
    const qrCode = new QRCode({
      value: qrCodeData,
      size: 200,
      bgColor: "#000",
      fgColor: "#df1a1a",
    });

    qrCode.render(canvas);

    // Tambahkan QR code ke PDF
    const qrCodeImage = canvas.toDataURL("image/png");
    doc.addImage(qrCodeImage, "PNG", 10, 20, 50, 50); // X, Y, Width, Height

    // Tambahkan informasi lainnya ke PDF
    doc.setFontSize(12);
    doc.text("Pack Code: " + pack_code, 70, 30);
    doc.text("Material: " + material, 70, 40);
    doc.text("Quantity: " + quantity, 70, 50);
    doc.text("Date: " + new Date().toLocaleDateString(), 70, 60);

    // Simpan PDF
    doc.save(`${pack_code}_qrcode.pdf`);
  };

  return (
    <>
      <div className="-mt-20 mb-4">
        <h1 className="text-4xl font-thin text-center">
          Now Process: {process}
        </h1>
        <div
          className={`fixed right-4 top-4 transition-all duration-500 ease-in-out ${
            showMessage ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          {message && (
            <div
              className={`text-center text-md text-white font-medium rounded p-2 ${
                message.includes("successfully")
                  ? "bg-green-600/80"
                  : "bg-red-600/80"
              }`}
            >
              {message}
            </div>
          )}
        </div>
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

      <div className={`flex gap-4 items-center justify-center`}>
        <h3 className="text-center text-2xl font-semibold">
          Weight ={" "}
          <span className={`${isOK ? "text-green-600" : "text-red-600"}`}>
            {weight === null ? "Loading..." : `${weight} kg`}
          </span>
        </h3>
        <div
          className={`flex gap-2 items-center border rounded p-2 ${
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
