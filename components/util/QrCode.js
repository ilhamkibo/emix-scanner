import { QRCode } from "react-qrcode-logo";

export default function BarcodeComponent({ packCode, material, quantity }) {
  return (
    <div className="flex flex-col items-center">
      <QRCode
        value={`Pack Code: ${packCode}, Material: ${material}, Quantity: ${quantity}`}
        size={200} // Ukuran QR Code
        bgColor={"#ffffff"}
        fgColor={"#000000"}
      />
      <div className="mt-4 text-center">
        <p>Pack Code: {packCode}</p>
        <p>Material: {material}</p>
        <p>Quantity: {quantity}</p>
      </div>
    </div>
  );
}
