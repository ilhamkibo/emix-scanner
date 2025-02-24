// websocketClient.js
export function createWebSocketConnection(url, onMessage, onOpen, onClose) {
  const socket = new WebSocket(url);

  // Event listener saat koneksi berhasil
  socket.onopen = () => {
    console.log("WebSocket connection established");
    if (onOpen) onOpen();
  };

  // Event listener untuk menerima pesan
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data); // Asumsikan data dalam format JSON
    if (onMessage) onMessage(data);
  };

  // Event listener saat koneksi tertutup
  socket.onclose = () => {
    console.log("WebSocket connection closed");
    if (onClose) onClose();
  };

  // Fungsi untuk menutup koneksi WebSocket
  const close = () => socket.close();

  return { close };
}
