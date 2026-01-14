const PANDADOC_API_BASE = "https://api.pandadoc.com/public/v1";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.PANDADOC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Missing PandaDoc configuration",
      details: "Set PANDADOC_API_KEY in the environment.",
    });
  }

  const { documentId, message } = req.body || {};

  if (!documentId) {
    return res.status(400).json({ error: "documentId is required." });
  }

  try {
    const sendResponse = await fetch(
      `${PANDADOC_API_BASE}/documents/${documentId}/send`,
      {
        method: "POST",
        headers: {
          Authorization: `API-Key ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message || "Please review and sign your consent form.",
        }),
      }
    );

    const sendBody = await sendResponse.json();

    if (!sendResponse.ok) {
      return res.status(sendResponse.status).json({
        error: "Failed to send PandaDoc document",
        details: sendBody,
        documentId,
      });
    }

    return res.status(200).json({
      documentId,
      status: sendBody.status || "sent",
      details: sendBody,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected server error",
      details: error?.message || String(error),
    });
  }
}
