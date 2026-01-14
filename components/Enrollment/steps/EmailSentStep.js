import {
  Actions,
  Card,
  CardTitle,
  ContactCard,
  DocPill,
  Field,
  GhostButton,
  Grid,
  Hero,
  HeroPill,
  HeroTitle,
  InlineForm,
  List,
  PrimaryButton,
  Screen,
  ScreenHeader,
  ScreenSubtitle,
  ScreenTitle,
  SecondaryButton,
  Spinner,
  SuccessNote,
  TextButton,
} from "../styles";

export default function EmailSentStep({
  docStatus,
  participantEmail,
  sending,
  isCheckingStatus,
  resendCooldown,
  isEditingEmail,
  onToggleEditingEmail,
  onResend,
  onRefreshStatus,
  onTrackStatus,
  onEmailChange,
  onEmailUpdate,
}) {
  const canTrackStatus = [
    "Sent",
    "Viewed",
    "Completed",
    "Waiting approval",
    "Approved",
    "Waiting pay",
    "Paid",
    "External review",
  ].includes(docStatus);

  return (
    <Screen>
      <ScreenHeader>
        <div>
          <ScreenTitle>Consent</ScreenTitle>
          <ScreenSubtitle>Check your email to consent to the liability waiver.</ScreenSubtitle>
        </div>
        <DocPill>
          Document status: <strong>{docStatus}</strong>
        </DocPill>
      </ScreenHeader>

      {isCheckingStatus && (
        <Card>
          <CardTitle>Preparing your document</CardTitle>
          <p>
            <Spinner aria-hidden="true" /> We're finalizing the consent packet and will send it
            shortly.
          </p>
        </Card>
      )}

         {docStatus === "Sent" && (
        <SuccessNote>
          Email sent successfully. You can proceed to give consent by signing the document.
        </SuccessNote>
      )}

      <Actions>
        <PrimaryButton as="a" href="mailto:" role="button">
          Open email app
        </PrimaryButton>
        <SecondaryButton
          type="button"
          onClick={onTrackStatus}
          disabled={isCheckingStatus || !canTrackStatus}
        >
          Track status
        </SecondaryButton>
      </Actions>


      <Grid>
        <Card>
          <CardTitle>Didn’t receive it?</CardTitle>
          <List>
            <li>Check spam or junk folders.</li>
            <li>Verify the email address is correct.</li>
            <li>Contact the study team if still missing.</li>
          </List>
        </Card>
        <Card>
          <CardTitle>Contact study team</CardTitle>
          <ContactCard>
            <div>
              <strong>Message study team</strong>
              <span>support@front-range-study.com</span>
            </div>
            <div>
              <strong>Phone</strong>
              <span>(555) 420-2020</span>
            </div>
          </ContactCard>
        </Card>
      </Grid>
    </Screen>
  );
}
