import {
  Actions,
  Card,
  CardTitle,
  Field,
  FormGrid,
  PrimaryButton,
  Screen,
  ScreenHeader,
  ScreenSubtitle,
  ScreenTitle,
  SecondaryButton,
} from "../styles";

export default function GuardianStep({
  docStatus,
  participant,
  guardians,
  canContinue,
  onParticipantChange,
  onGuardianChange,
  onBack,
  onContinue,
}) {
  return (
    <Screen>
      <ScreenHeader>
        <div>
          <ScreenTitle>Participant details</ScreenTitle>
          <ScreenSubtitle>Collect participant and guardian information.</ScreenSubtitle>
        </div>
       
      </ScreenHeader>

      <Card>
        <CardTitle>Participant information</CardTitle>
        <FormGrid>
          <Field>
            <label htmlFor="participant-name">Full name</label>
            <input
              id="participant-name"
              type="text"
              placeholder="Jordan Lee"
              value={participant.name}
              onChange={onParticipantChange("name")}
            />
          </Field>
          <Field>
            <label htmlFor="participant-email">Email</label>
            <input
              id="participant-email"
              type="email"
              placeholder="jordan@email.com"
              value={participant.email}
              onChange={onParticipantChange("email")}
            />
          </Field>
          <Field>
            <label htmlFor="participant-phone">Phone</label>
            <input
              id="participant-phone"
              type="tel"
              placeholder="(555) 231-2190"
              value={participant.phone}
              onChange={onParticipantChange("phone")}
            />
          </Field>
          <Field>
            <label htmlFor="participant-street">Street address</label>
            <input
              id="participant-street"
              type="text"
              placeholder="123 Maple Ave"
              value={participant.street}
              onChange={onParticipantChange("street")}
            />
          </Field>
          <Field>
            <label htmlFor="participant-city">City</label>
            <input
              id="participant-city"
              type="text"
              placeholder="Denver"
              value={participant.city}
              onChange={onParticipantChange("city")}
            />
          </Field>
          <Field>
            <label htmlFor="participant-state">State</label>
            <input
              id="participant-state"
              type="text"
              placeholder="CO"
              value={participant.state}
              onChange={onParticipantChange("state")}
            />
          </Field>
          <Field>
            <label htmlFor="participant-postal">Postal code</label>
            <input
              id="participant-postal"
              type="text"
              placeholder="80202"
              value={participant.postalCode}
              onChange={onParticipantChange("postalCode")}
            />
          </Field>
        </FormGrid>
      </Card>

      {guardians.map((guardian, index) => (
        <Card key={`guardian-${index}`}>
          <CardTitle>Guardian {index + 1}</CardTitle>
          <FormGrid>
            <Field>
              <label htmlFor={`guardian-${index}-name`}>Full name</label>
              <input
                id={`guardian-${index}-name`}
                type="text"
                placeholder="Jordan Lee"
                value={guardian.name}
                onChange={onGuardianChange(index, "name")}
              />
            </Field>
            <Field>
              <label htmlFor={`guardian-${index}-email`}>Email</label>
              <input
                id={`guardian-${index}-email`}
                type="email"
                placeholder="jordan@email.com"
                value={guardian.email}
                onChange={onGuardianChange(index, "email")}
              />
            </Field>
            <Field>
              <label htmlFor={`guardian-${index}-phone`}>Phone</label>
              <input
                id={`guardian-${index}-phone`}
                type="tel"
                placeholder="(555) 231-2190"
                value={guardian.phone}
                onChange={onGuardianChange(index, "phone")}
              />
            </Field>
            <Field>
              <label htmlFor={`guardian-${index}-street`}>Street address</label>
              <input
                id={`guardian-${index}-street`}
                type="text"
                placeholder="123 Maple Ave"
                value={guardian.street}
                onChange={onGuardianChange(index, "street")}
              />
            </Field>
            <Field>
              <label htmlFor={`guardian-${index}-city`}>City</label>
              <input
                id={`guardian-${index}-city`}
                type="text"
                placeholder="Denver"
                value={guardian.city}
                onChange={onGuardianChange(index, "city")}
              />
            </Field>
            <Field>
              <label htmlFor={`guardian-${index}-state`}>State</label>
              <input
                id={`guardian-${index}-state`}
                type="text"
                placeholder="CO"
                value={guardian.state}
                onChange={onGuardianChange(index, "state")}
              />
            </Field>
            <Field>
              <label htmlFor={`guardian-${index}-postal`}>Postal code</label>
              <input
                id={`guardian-${index}-postal`}
                type="text"
                placeholder="80202"
                value={guardian.postalCode}
                onChange={onGuardianChange(index, "postalCode")}
              />
            </Field>
          </FormGrid>
        </Card>
      ))}

      <Actions>
        <SecondaryButton type="button" onClick={onBack}>
          Back
        </SecondaryButton>
        <PrimaryButton type="button" onClick={onContinue} disabled={!canContinue}>
          Continue
        </PrimaryButton>
      </Actions>
    </Screen>
  );
}
