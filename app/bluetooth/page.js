"use client";

import { useState } from "react";

export default function BluetoothDeviceControl() {
  const [device, setDevice] = useState(null);
  const [server, setServer] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [error, setError] = useState(null);

  const connectToDevice = async () => {
    try {
      // Request a Bluetooth device
      const selectedDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["battery_service"],
      });

      console.log("Selected Device:", selectedDevice);

      // Connect to GATT server
      const gattServer = await selectedDevice.gatt.connect();
      console.log("Connected to GATT server");

      setDevice(selectedDevice);
      setServer(gattServer);

      // Access battery service and characteristic
      const batteryService = await gattServer.getPrimaryService(
        "battery_service"
      );
      const batteryLevelCharacteristic = await batteryService.getCharacteristic(
        "battery_level"
      );

      // Read battery level
      const value = await batteryLevelCharacteristic.readValue();
      setBatteryLevel(value.getUint8(0));

      console.log("Battery Level:", value.getUint8(0), "%");
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error(err);
    }
  };

  const disconnectDevice = () => {
    if (device?.gatt.connected) {
      device.gatt.disconnect();
      console.log("Device disconnected");
      setDevice(null);
      setServer(null);
    } else {
      console.log("No device connected");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bluetooth Device Control</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
        onClick={connectToDevice}
      >
        Connect to Bluetooth Device
      </button>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={disconnectDevice}
      >
        Disconnect
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {device && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Device Information:</h2>
          <p>Name: {device.name || "No name provided"}</p>
          <p>ID: {device.id}</p>
          <p>
            Battery Level: {batteryLevel !== null ? `${batteryLevel}%` : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}
