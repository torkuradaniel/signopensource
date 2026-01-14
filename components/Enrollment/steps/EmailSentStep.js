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
  InfoNote,
  InlineButton,
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
  Timeline,
  TimelineItem,
  WarningNote,
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
  onEmailChange,
  onEmailUpdate,
  onRestartScreening,
}) {
  return (
    <Screen>
      <ScreenHeader>
        <div>
          <ScreenTitle>Email Sent</ScreenTitle>
          <ScreenSubtitle>Track delivery and signing progress.</ScreenSubtitle>
        </div>
        <DocPill>
          Document status: <strong>{docStatus}</strong>
        </DocPill>
      </ScreenHeader>

      <Hero>
        <div>
          <HeroTitle>Check your email to sign</HeroTitle>
          <p>
            We sent your consent form to {participantEmail || "your email"}. Open the
            email and follow the secure link to sign.
          </p>
        </div>
        <HeroPill>
          <span>Document</span>
          <strong>{docStatus}</strong>
        </HeroPill>
      </Hero>

      {isCheckingStatus && (
        <Card>
          <CardTitle>Preparing your document</CardTitle>
          <p>
            <Spinner aria-hidden="true" /> We're finalizing the consent packet and will send it
            shortly.
          </p>
        </Card>
      )}

      <Actions>
        <PrimaryButton as="a" href="mailto:" role="button">
          Open email app
        </PrimaryButton>
        <SecondaryButton
          type="button"
          onClick={onResend}
          disabled={sending || resendCooldown > 0 || isCheckingStatus}
        >
          {sending ? (
            <>
              <Spinner aria-hidden="true" />
              Sending...
            </>
          ) : resendCooldown > 0 ? (
            `Resend in ${resendCooldown}s`
          ) : (
            "Resend email"
          )}
        </SecondaryButton>
        <GhostButton type="button" onClick={onToggleEditingEmail}>
          Change email address
        </GhostButton>
        <TextButton type="button" onClick={onRefreshStatus}>
          I already signed — refresh status
        </TextButton>
      </Actions>

      {isEditingEmail && (
        <Card>
          <CardTitle>Update email address</CardTitle>
          <InlineForm>
            <Field>
              <label htmlFor="email-update">New email</label>
              <input
                id="email-update"
                type="email"
                placeholder="jordan@email.com"
                value={participantEmail}
                onChange={onEmailChange}
              />
            </Field>
            <PrimaryButton type="button" onClick={onEmailUpdate}>
              Update &amp; resend
            </PrimaryButton>
          </InlineForm>
        </Card>
      )}

      <Card>
        <CardTitle>Status timeline</CardTitle>
        <Timeline>
          {[
            { label: "Sent", active: ["Sent", "Viewed", "Completed"].includes(docStatus) },
            { label: "Viewed", active: ["Viewed", "Completed"].includes(docStatus) },
            { label: "Completed", active: docStatus === "Completed" },
          ].map((item) => (
            <TimelineItem key={item.label} data-active={item.active}>
              <span>{item.label}</span>
              <small>{item.active ? "Complete" : "Pending"}</small>
            </TimelineItem>
          ))}
        </Timeline>
        {docStatus === "Viewed" && (
          <InfoNote>We noticed you opened the document.</InfoNote>
        )}
        {docStatus === "Completed" && (
          <SuccessNote>
            Consent completed. You can continue to the Done step.
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
      </Card>

      <Grid>
        <Card>
          <CardTitle>Didn’t receive it?</CardTitle>
          <List>
            <li>Check spam or junk folders.</li>
            <li>Verify the email address is correct.</li>
            <li>Use the resend button above after the cooldown.</li>
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
