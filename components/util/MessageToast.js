export default function MessageToast({ message, showMessage }) {
  return (
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
  );
}
