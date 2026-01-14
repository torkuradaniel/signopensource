const PANDADOC_API_BASE = "https://api.pandadoc.com/public/v1";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }
  const apiKey = process.env.PANDADOC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Missing PandaDoc configuration",
      details: "Set PANDADOC_API_KEY in the environment.",
    });
  }

  const documentId = req.method === "GET" ? req.query.documentId : req.body?.documentId;

  if (!documentId) {
    return res.status(400).json({ error: "documentId is required." });
  }

  try {
    const statusResponse = await fetch(
      `${PANDADOC_API_BASE}/documents/${documentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `API-Key ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const statusBody = await statusResponse.json();

    if (!statusResponse.ok) {
      return res.status(statusResponse.status).json({
        error: "Failed to fetch PandaDoc document status",
        details: statusBody,
      });
    }

    return res.status(200).json({
      documentId: statusBody.id,
      status: statusBody.status || null,
      details: statusBody,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected server error",
      details: error?.message || String(error),
    });
  }
}
