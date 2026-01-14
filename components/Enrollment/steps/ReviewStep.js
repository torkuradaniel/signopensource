import {
  Actions,
  Card,
  CardTitle,
  CheckboxRow,
  DocPill,
  PrimaryButton,
  Screen,
  ScreenHeader,
  ScreenSubtitle,
  ScreenTitle,
  SecondaryButton,
  Spinner,
  SummaryGrid,
  SummaryItem,
} from "../styles";

export default function ReviewStep({
  docStatus,
  participant,
  guardians,
  selectedTrial,
  sending,
  onEditInfo,
  onSendEmail,
}) {
  return (
    <Screen>
      <ScreenHeader>
        <div>
          <ScreenTitle>Review</ScreenTitle>
          <ScreenSubtitle>Confirm your details before sending consent.</ScreenSubtitle>
        </div>
        <DocPill>
          Document status: <strong>{docStatus}</strong>
        </DocPill>
      </ScreenHeader>

      <Card>
        <CardTitle>Summary</CardTitle>
        <SummaryGrid>
          <SummaryItem>
            <span>Participant</span>
            <strong>{participant.name || "Full name"}</strong>
          </SummaryItem>
          <SummaryItem>
            <span>Email</span>
            <strong>{participant.email || "Email address"}</strong>
          </SummaryItem>
          <SummaryItem>
            <span>Phone</span>
            <strong>{participant.phone || "Phone number"}</strong>
          </SummaryItem>
          <SummaryItem>
            <span>Street address</span>
            <strong>{participant.street || "Street address"}</strong>
          </SummaryItem>
          <SummaryItem>
            <span>City</span>
            <strong>{participant.city || "City"}</strong>
          </SummaryItem>
          <SummaryItem>
            <span>State</span>
            <strong>{participant.state || "State"}</strong>
          </SummaryItem>
          <SummaryItem>
            <span>Postal code</span>
            <strong>{participant.postalCode || "Postal code"}</strong>
          </SummaryItem>
          <SummaryItem>
            <span>Selected trial</span>
            <strong>{selectedTrial.name}</strong>
          </SummaryItem>
          <SummaryItem>
            <span>Doc packet</span>
            <strong>{selectedTrial.packet}</strong>
          </SummaryItem>
        </SummaryGrid>
      </Card>

      <Card>
        <CardTitle>Guardian details</CardTitle>
        <SummaryGrid>
          {guardians.map((guardian, index) => {
            const prefix = `Guardian ${index + 1}`;
            return [
              { label: `${prefix} name`, value: guardian.name || "Full name" },
              { label: `${prefix} email`, value: guardian.email || "Email address" },
              { label: `${prefix} phone`, value: guardian.phone || "Phone number" },
              { label: `${prefix} street`, value: guardian.street || "Street address" },
              { label: `${prefix} city`, value: guardian.city || "City" },
              { label: `${prefix} state`, value: guardian.state || "State" },
              { label: `${prefix} postal`, value: guardian.postalCode || "Postal code" },
            ].map((item) => (
              <SummaryItem key={`${prefix}-${item.label}`}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </SummaryItem>
            ));
          })}
        </SummaryGrid>
      </Card>

      <Card>
        <CheckboxRow>
          <input id="confirm" type="checkbox" />
          <label htmlFor="confirm">I confirm my details are correct</label>
        </CheckboxRow>
      </Card>

      <Actions>
        <SecondaryButton type="button" onClick={onEditInfo}>
          Edit info
        </SecondaryButton>
        <PrimaryButton type="button" onClick={onSendEmail} disabled={sending}>
          {sending ? (
            <>
              <Spinner aria-hidden="true" />
              Sending...
            </>
          ) : (
            "Send consent to my email"
          )}
        </PrimaryButton>
      </Actions>
    </Screen>
  );
}
