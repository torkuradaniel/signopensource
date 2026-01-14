const PANDADOC_API_BASE = "https://api.pandadoc.com/public/v1";
const DEFAULT_RECIPIENT_EMAIL = process.env.DEFAULT_RECIPIENT_EMAIL;

const buildRecipient = ({ email, firstName, lastName, role, name }) => {
  const resolvedName = name || "";
  const split = resolvedName.trim().split(/\s+/).filter(Boolean);
  const fallbackFirst = split[0] || "Signer";
  const fallbackLast = split.length > 1 ? split.slice(1).join(" ") : "";

  return {
    email,
    first_name: firstName || fallbackFirst,
    last_name: lastName || fallbackLast,
    role,
  };
};

const buildField = (value) => ({
  value: value === undefined || value === null ? "" : value,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.PANDADOC_API_KEY;
  const templateId = process.env.PANDADOC_TEMPLATE_ID;

  if (!apiKey || !templateId) {
    return res.status(500).json({
      error: "Missing PandaDoc configuration",
      details: "Set PANDADOC_API_KEY and PANDADOC_TEMPLATE_ID in the environment.",
    });
  }

  const {
    documentName,
    participant,
    guardians = [],
    selectedTrial,
    recipients,
    fields,
  } = req.body || {};

  if (!participant || !participant.name || !participant.email) {
    return res.status(400).json({ error: "Participant name and email are required." });
  }

  const resolvedRecipients =
    Array.isArray(recipients) && recipients.length > 0
      ? recipients
      : [
          {
            role: "Patient",
            email: participant.email || DEFAULT_RECIPIENT_EMAIL,
            name: participant.name,
          },
          {
            role: "Guardian1",
            email: guardians[0]?.email,
            name: guardians[0]?.name,
          },
          {
            role: "Guardian2",
            email: guardians[1]?.email,
            name: guardians[1]?.name,
          },
        ].filter((recipient) => recipient.email);

  if (!resolvedRecipients[0]?.email) {
    return res.status(400).json({
      error: "Recipients are required.",
      details:
        "Provide recipients or ensure participant email/default recipient is available.",
    });
  }

  const pandaRecipients = resolvedRecipients.map((recipient) =>
    buildRecipient({
      email: recipient.email,
      firstName: recipient.firstName,
      lastName: recipient.lastName,
      role: recipient.role,
      name: recipient.name,
    })
  );

  const docName =
    documentName ||
    `${selectedTrial?.name || "Clinical Trial"} Consent - ${participant.name}`;

  const defaultFields = {
    "Patient.Name": buildField(participant.name),
    "Patient.Email": buildField(participant.email),
    "Patient.Phone": buildField(participant.phone),
    "Patient.Street": buildField(participant.street),
    "Patient.City": buildField(participant.city),
    "Patient.State": buildField(participant.state),
    "Patient.PostalCode": buildField(participant.postalCode),
    "Trial.Name": buildField(selectedTrial?.name),
    "Trial.Site": buildField(selectedTrial?.site),
    "Trial.Location": buildField(selectedTrial?.location),
    "Trial.Packet": buildField(selectedTrial?.packet),
  };

  const guardianFields = guardians.reduce((accumulator, guardian, index) => {
    const position = index + 1;
    return {
      ...accumulator,
      [`Guardian${position}.Name`]: buildField(guardian.name),
      [`Guardian${position}.Email`]: buildField(guardian.email),
      [`Guardian${position}.Phone`]: buildField(guardian.phone),
      [`Guardian${position}.Street`]: buildField(guardian.street),
      [`Guardian${position}.City`]: buildField(guardian.city),
      [`Guardian${position}.State`]: buildField(guardian.state),
      [`Guardian${position}.PostalCode`]: buildField(guardian.postalCode),
    };
  }, {});

  const payloadFields =
    fields && typeof fields === "object"
      ? fields
      : {
          ...defaultFields,
          ...guardianFields,
        };

  try {
    const createResponse = await fetch(`${PANDADOC_API_BASE}/documents`, {
      method: "POST",
      headers: {
        Authorization: `API-Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: docName,
        template_uuid: templateId,
        recipients: pandaRecipients,
        fields: payloadFields,
      }),
    });

    const createBody = await createResponse.json();

    if (!createResponse.ok) {
      return res.status(createResponse.status).json({
        error: "Failed to create PandaDoc document",
        details: createBody,
      });
    }

    const documentId = createBody.id;

    if (!documentId) {
      return res.status(500).json({
        error: "PandaDoc response missing document id",
        details: createBody,
      });
    }

    return res.status(200).json({
      documentId,
      status: createBody.status || null,
      details: createBody,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected server error",
      details: error?.message || String(error),
    });
  }
}
