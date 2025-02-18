export default async function handler(req, res) {
  if (req.method === "POST") {
    const { barcode } = req.body;

    if (!barcode) {
      return res.status(400).json({ error: "Barcode is required" });
    }

    // Simulate API call (replace with your logic)
    console.log("Received barcode:", barcode);

    // Example response
    return res
      .status(200)
      .json({ message: `Barcode ${barcode} printed successfully` });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
