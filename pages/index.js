import { useEffect, useMemo, useState } from "react";
import EnrollmentHeader from "../components/Enrollment/EnrollmentHeader";
import ProgressRail from "../components/Enrollment/ProgressRail";
import DoneStep from "../components/Enrollment/steps/DoneStep";
import EmailSentStep from "../components/Enrollment/steps/EmailSentStep";
import GuardianStep from "../components/Enrollment/steps/GuardianStep";
import ReviewStep from "../components/Enrollment/steps/ReviewStep";
import ScreeningStep from "../components/Enrollment/steps/ScreeningStep";
import SelectTrialStep from "../components/Enrollment/steps/SelectTrialStep";
import { Banner, Body, Content, Page } from "../components/Enrollment/styles";

const steps = ["Select Trial", "Participant details", "Screening", "Review", "Consent", "Tracking"];

const trials = [
  {
    id: "neuro-001",
    name: "CalmReach Study",
    condition: "Generalized Anxiety",
    location: "Denver, CO",
    site: "Front Range Medical",
    visits: "6 visits over 12 weeks",
    compensation: "$900",
    packet: "CalmReach Consent Packet v4",
  },
  {
    id: "cardio-204",
    name: "PulsePath Trial",
    condition: "Hypertension",
    location: "Austin, TX",
    site: "Redwood Clinical",
    visits: "4 visits over 8 weeks",
    compensation: "$650",
    packet: "PulsePath Consent + HIPAA",
  },
  {
    id: "metab-311",
    name: "Glide Study",
    condition: "Type 2 Diabetes",
    location: "Atlanta, GA",
    site: "Northside Research",
    visits: "8 visits over 16 weeks",
    compensation: "$1,200",
    packet: "Glide Enrollment Bundle",
  },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTrial, setSelectedTrial] = useState(trials[0]);
  const [participant, setParticipant] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [guardians, setGuardians] = useState([
    {
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
    {
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  ]);
  const [screening, setScreening] = useState({
    age: "",
    hasCondition: "yes",
    excludedMeds: "no",
  });
  const [docStatus, setDocStatus] = useState("Not started");
  const [showBanner, setShowBanner] = useState(null);
  const [sending, setSending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [documentId, setDocumentId] = useState(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [shouldPollStatus, setShouldPollStatus] = useState(true);

  const eligible = useMemo(() => {
    const ageValue = Number(screening.age);
    return ageValue >= 18 && screening.hasCondition === "yes" && screening.excludedMeds === "no";
  }, [screening]);

  const enrollmentStatus = useMemo(() => {
    if (["Declined", "Expired", "Voided", "Error", "Rejected"].includes(docStatus)) {
      return docStatus;
    }
    if (docStatus === "Completed") return "Signed";
    if (["Sent"].includes(docStatus)) return "Sent";
    if (["Draft", "Uploaded"].includes(docStatus)) return "Ready to sign";
    if (currentStep === 3) return "Ready to sign";
    if (currentStep === 2) return "Screening";
    return "Started";
  }, [currentStep, docStatus]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (!showBanner) return;
    const timer = setTimeout(() => setShowBanner(null), 2600);
    return () => clearTimeout(timer);
  }, [showBanner]);


  const handleStartGuardian = () => {
    setCurrentStep(1);
  };

  const handleContinueToScreening = () => {
    setCurrentStep(2);
  };

  const handleSaveContinue = () => {
    if (!eligible) return;
    setCurrentStep(3);
  };

  const POLL_INTERVAL_MS = 60 * 60 * 1000;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const mapPandaStatus = (status) => {
    switch (status) {
      case "document.uploaded":
        return "Uploaded";
      case "document.error":
        return "Error";
      case "document.draft":
        return "Draft";
      case "document.sent":
        return "Sent";
      case "document.viewed":
        return "Viewed";
      case "document.waiting_approval":
        return "Waiting approval";
      case "document.rejected":
        return "Rejected";
      case "document.approved":
        return "Approved";
      case "document.waiting_pay":
        return "Waiting pay";
      case "document.paid":
        return "Paid";
      case "document.completed":
        return "Completed";
      case "document.voided":
        return "Voided";
      case "document.declined":
        return "Declined";
      case "document.external_review":
        return "External review";
      case "document.expired":
        return "Expired";
      default:
        return null;
    }
  };

  const createDocument = async () => {
    const response = await fetch("/api/pandadoc/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participant,
        guardians,
        selectedTrial,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Failed to create document.");
    }
    return data;
  };

  const fetchDocumentStatus = async (docId) => {
    const response = await fetch(`/api/pandadoc/status?documentId=${docId}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Failed to check document status.");
    }
    return data?.status;
  };

  const updateDocStatusFromApi = async (docId) => {
    const status = await fetchDocumentStatus(docId);
    const mappedStatus = mapPandaStatus(status);
    if (mappedStatus) {
      setDocStatus(mappedStatus);
    }
    if (status === "document.error") {
      setShouldPollStatus(false);
    }
    return status;
  };

  const sendDocument = async (docId) => {
    const response = await fetch("/api/pandadoc/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId: docId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Failed to send document.");
    }
    return data;
  };

  const waitForDraftStatus = async (docId) => {
    const maxAttempts = 10;
    const delayMs = 1200;
    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const status = await updateDocStatusFromApi(docId);
      if (status === "document.draft") {
        return true;
      }
      await sleep(delayMs);
    }
    return false;
  };

  const handleSendEmail = async () => {
    if (!participant.email) {
      setShowBanner({ type: "error", message: "We couldn’t send the email. Try again." });
      return;
    }
    setSending(true);
    setDocStatus("Creating");
    setShouldPollStatus(true);
    try {
      const created = await createDocument();
      if (!created?.documentId) {
        throw new Error("Document created without an id.");
      }
      setDocumentId(created.documentId);
      setCurrentStep(4);
      setIsCheckingStatus(true);

      const isDraft = await waitForDraftStatus(created.documentId);
      if (!isDraft) {
        throw new Error("Document is taking longer than expected to prepare.");
      }
      setDocStatus("Draft");

      await sendDocument(created.documentId);
      const statusAfterSend = await updateDocStatusFromApi(created.documentId);
      if (statusAfterSend === "document.sent") {
        setShowBanner({
          type: "success",
          message:
            "Email sent successfully. You can proceed to give consent by signing the document.",
        });
      }
    } catch (error) {
      setShowBanner({
        type: "error",
        message: error?.message || "We couldn’t send the email. Try again.",
      });
    } finally {
      setSending(false);
      setIsCheckingStatus(false);
    }
  };

  const handleResend = async (force = false) => {
    if (!force && (resendCooldown > 0 || sending)) return;
    if (!participant.email) {
      setShowBanner({ type: "error", message: "We couldn’t send the email. Try again." });
      return;
    }
    if (!documentId) {
      setShowBanner({ type: "error", message: "No document found to resend." });
      return;
    }
    if (force) setResendCooldown(0);
    setSending(true);
    setDocStatus("Sending");
    setShouldPollStatus(true);
    try {
      await sendDocument(documentId);
      await updateDocStatusFromApi(documentId);
      setResendCooldown(30);
      setShowBanner({ type: "success", message: "Email resent." });
    } catch (error) {
      setShowBanner({
        type: "error",
        message: error?.message || "We couldn’t send the email. Try again.",
      });
    } finally {
      setSending(false);
    }
  };

  const handleRefreshStatus = async () => {
    if (!documentId) {
      setShowBanner({ type: "error", message: "No document found to refresh." });
      return;
    }
    try {
      await updateDocStatusFromApi(documentId);
    } catch (error) {
      setShowBanner({
        type: "error",
        message: error?.message || "We couldn’t refresh the status. Try again.",
      });
    }
  };

  const resetFlow = () => {
    setCurrentStep(0);
    setParticipant({
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
    });
    setGuardians([
      {
        name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
      },
      {
        name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
      },
    ]);
    setScreening({ age: "", hasCondition: "yes", excludedMeds: "no" });
    setDocStatus("None");
    setSending(false);
    setResendCooldown(0);
    setIsEditingEmail(false);
    setDocumentId(null);
    setIsCheckingStatus(false);
    setShouldPollStatus(true);
  };

  const handleEmailUpdate = () => {
    setIsEditingEmail(false);
    handleResend(true);
  };

  useEffect(() => {
    if (!documentId || !shouldPollStatus) return undefined;
    const pollStatus = async () => {
      try {
        await updateDocStatusFromApi(documentId);
      } catch (error) {
        // Ignore polling errors to avoid interrupting the flow.
      }
    };
    pollStatus();
    const interval = setInterval(pollStatus, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [documentId, shouldPollStatus, POLL_INTERVAL_MS]);

  const isFilled = (value) => String(value).trim().length > 0;

  const participantComplete = Object.values(participant).every(isFilled);
  const guardiansComplete = guardians.every((guardian) =>
    Object.values(guardian).every(isFilled)
  );
  const canContinueGuardian = participantComplete && guardiansComplete;

  const applicationStatus = useMemo(() => {
    if (docStatus === "Completed") return "Completed";
    if (
      [
        "Sent"
      ].includes(docStatus)
    ) {
      return "In progress";
    }
    if (docStatus === "Draft") return "Submitted";
    if (currentStep >= 1) return "Started";
    return "Not started";
  }, [currentStep, docStatus]);

  const documentationStatus = useMemo(() => {
    if (docStatus === "Voided") return "Expired";
    if (docStatus === "Completed") return "Completed";
    if (docStatus === "Viewed") return "Viewed";
    if (
      [
        "Sent"
      ].includes(docStatus)
    ) {
      return "Sent";
    }
    if (docStatus === "Draft") return "Started";
    return "Not started";
  }, [docStatus]);

  const handleParticipantChange = (field) => (event) => {
    setParticipant((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleScreeningChange = (field) => (event) => {
    setScreening((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleGuardianChange = (index, field) => (event) => {
    setGuardians((prev) =>
      prev.map((guardian, guardianIndex) =>
        guardianIndex === index ? { ...guardian, [field]: event.target.value } : guardian
      )
    );
  };

  const handleEmailChange = (event) => {
    setParticipant((prev) => ({ ...prev, email: event.target.value }));
  };

  return (
    <Page>
      <EnrollmentHeader docStatus={docStatus} onReset={resetFlow} />

      <Body>
        <ProgressRail
          steps={steps}
          currentStep={currentStep}
          applicationStatus={applicationStatus}
          docStatus={docStatus}
        />

        <Content>
          {showBanner && (
            <Banner data-tone={showBanner.type}>{showBanner.message}</Banner>
          )}

          {currentStep === 0 && (
            <SelectTrialStep
              docStatus={docStatus}
              selectedTrial={selectedTrial}
              trials={trials}
              onSelectTrial={setSelectedTrial}
              onStartScreening={handleStartGuardian}
            />
          )}

          {currentStep === 1 && (
            <GuardianStep
              docStatus={docStatus}
              participant={participant}
              guardians={guardians}
              canContinue={canContinueGuardian}
              onParticipantChange={handleParticipantChange}
              onGuardianChange={handleGuardianChange}
              onBack={() => setCurrentStep(0)}
              onContinue={handleContinueToScreening}
            />
          )}

          {currentStep === 2 && (
            <ScreeningStep
              docStatus={docStatus}
              screening={screening}
              eligible={eligible}
              onScreeningChange={handleScreeningChange}
              onBack={() => setCurrentStep(1)}
              onContinue={handleSaveContinue}
            />
          )}

          {currentStep === 3 && (
            <ReviewStep
              docStatus={docStatus}
              participant={participant}
              guardians={guardians}
              selectedTrial={selectedTrial}
              sending={sending}
              onEditInfo={() => setCurrentStep(0)}
              onSendEmail={handleSendEmail}
            />
          )}

          {currentStep === 4 && (
            <EmailSentStep
              docStatus={docStatus}
              participantEmail={participant.email}
              sending={sending}
              isCheckingStatus={isCheckingStatus}
              resendCooldown={resendCooldown}
              isEditingEmail={isEditingEmail}
              onToggleEditingEmail={() => setIsEditingEmail((prev) => !prev)}
              onResend={handleResend}
              onRefreshStatus={handleRefreshStatus}
              onTrackStatus={() => setCurrentStep(5)}
              onEmailChange={handleEmailChange}
              onEmailUpdate={handleEmailUpdate}
            />
          )}

          {currentStep === 5 && (
            <DoneStep
              docStatus={docStatus}
              applicationStatus={applicationStatus}
              documentationStatus={documentationStatus}
              onBackToTrials={() => setCurrentStep(0)}
              onRefreshStatus={handleRefreshStatus}
              onResend={handleResend}
              onRestartScreening={() => setCurrentStep(2)}
            />
          )}
        </Content>
      </Body>
    </Page>
  );
}
