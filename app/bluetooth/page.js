"use client";
import { useState } from "react";

export default function BluetoothPage() {
  const [device, setDevice] = useState(null);
  const [error, setError] = useState(null);

  const knownDeviceId = "jXU1fJ69W7g/5CA4TOjh0g=="; // Your target device ID

  const requestDevice = async () => {
    try {
      // Prompt the user to select a Bluetooth device
      const selectedDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true, // Accept all devices for manual filtering
        optionalServices: ["battery_service"], // Specify services you want to use
      });
      setDevice(selectedDevice);
      // Check if the selected device matches your target device ID
      //   if (selectedDevice.id === knownDeviceId) {
      //     setDevice(selectedDevice); // Save the device in state
      //     console.log("Device connected:", selectedDevice);

      //     // Optionally, initiate connection or interaction here
      //     const server = await selectedDevice.gatt.connect();
      //     console.log("Connected to GATT Server:", server);
      //   } else {
      //     console.log("Selected device does not match the known device ID.");
      //     setError("Selected device does not match the target device.");
      //   }
    } catch (err) {
      setError(`Error connecting to device: ${err.message}`);
      console.log("Error:", err);
    }
  };

  return (
    <div>
      <h1>Bluetooth Device Picker</h1>

      {/* Trigger the device selection */}
      <button onClick={requestDevice}>Pick a Bluetooth Device</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {device && (
        <div>
          <h2>Device Information:</h2>
          <p>Name: {device.name || "No name provided"}</p>
          <p>Id: {device.id}</p>
          <p>Connected: {device.gatt ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}
