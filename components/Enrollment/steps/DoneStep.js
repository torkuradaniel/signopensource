import {
  Actions,
  Card,
  CardTitle,
  Badge,
  DocPill,
  HeroTitle,
  InfoNote,
  InlineButton,
  List,
  PrimaryButton,
  Screen,
  ScreenHeader,
  ScreenSubtitle,
  ScreenTitle,
  SecondaryButton,
  StatusLabel,
  StatusRow,
  StatusStack,
  SuccessNote,
  Timeline,
  TimelineItem,
  WarningNote,
} from "../styles";

export default function DoneStep({
  docStatus,
  applicationStatus,
  documentationStatus,
  onBackToTrials,
  onRefreshStatus,
  onResend,
  onRestartScreening,
}) {
  const formatStatus = (value) =>
    value.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const sentStatuses = [
    "Sent",
    "Viewed",
    "Completed",
    "Waiting approval",
    "Approved",
    "Waiting pay",
    "Paid",
    "External review",
  ];

  const viewedStatuses = ["Viewed", "Completed"];

  const isCompleted = docStatus === "Completed";

  return (
    <Screen>
      <ScreenHeader>
        <div>
          <ScreenTitle>Application status tracking</ScreenTitle>
          <ScreenSubtitle>Follow the application status and next steps.</ScreenSubtitle>
        </div>
        <DocPill>
          Document status: <strong>{docStatus}</strong>
        </DocPill>
      </ScreenHeader>

      <Card>
        <HeroTitle>{isCompleted ? "Consent completed" : "Consent in progress"}</HeroTitle>
        <p>
          {isCompleted
            ? "A coordinator will contact you within 24–48 hours."
            : "We’re tracking your consent progress and will update this status."}
        </p>
      </Card>


      <Card>
        <CardTitle>Status timeline</CardTitle>
        <Timeline>
          {[
            { label: "Sent", active: sentStatuses.includes(docStatus) },
            { label: "Viewed", active: viewedStatuses.includes(docStatus) },
            { label: "Completed", active: isCompleted },
          ].map((item) => (
            <TimelineItem key={item.label} data-active={item.active}>
              <span>{item.label}</span>
              <small>{item.active ? "Complete" : "Pending"}</small>
            </TimelineItem>
          ))}
        </Timeline>
        {docStatus === "Viewed" && <InfoNote>We noticed you opened the document.</InfoNote>}
        {isCompleted && (
          <SuccessNote>
            Consent completed. Your enrollment is now finalized.
          </SuccessNote>
        )}
        {docStatus === "Declined" && (
          <WarningNote>
            The participant declined the document. Contact the study team or restart the
            enrollment flow.
            <InlineButton type="button" onClick={onRestartScreening}>
              Restart screening
            </InlineButton>
          </WarningNote>
        )}
        {docStatus === "Expired" && (
          <WarningNote>
            The link expired. Request a new email to continue.
            <InlineButton type="button" onClick={onResend}>
              Request a new email
            </InlineButton>
          </WarningNote>
        )}
        {docStatus === "Voided" && (
          <WarningNote>
            The document was voided. Request a new email to continue.
            <InlineButton type="button" onClick={onResend}>
              Request a new email
            </InlineButton>
          </WarningNote>
        )}
      </Card>

      <Card>
        <CardTitle>Possible Next steps</CardTitle>
        <List>
          <li>Add availability for call times.</li>
          <li>Prepare any recent lab or medication details.</li>
        </List>
      </Card>

      <Actions>
        <SecondaryButton type="button" onClick={onBackToTrials}>
          Back to trials
        </SecondaryButton>
        <SecondaryButton type="button" onClick={onRefreshStatus}>
          Refresh now
        </SecondaryButton>
      </Actions>
    </Screen>
  );
}
