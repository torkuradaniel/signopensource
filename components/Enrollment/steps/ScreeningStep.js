import {
  Actions,
  Card,
  CardTitle,
  DocPill,
  EligibilityBadge,
  EligibilityPanel,
  Field,
  FormGrid,
  HelperText,
  PrimaryButton,
  Screen,
  ScreenHeader,
  ScreenSubtitle,
  ScreenTitle,
  SecondaryButton,
} from "../styles";

export default function ScreeningStep({
  docStatus,
  screening,
  eligible,
  onScreeningChange,
  onBack,
  onContinue,
}) {
  return (
    <Screen>
      <ScreenHeader>
        <div>
          <ScreenTitle>Screening</ScreenTitle>
          <ScreenSubtitle>Quick eligibility check before sending consent.</ScreenSubtitle>
        </div>
        <DocPill>
          Document status: <strong>{docStatus}</strong>
        </DocPill>
      </ScreenHeader>

      <Card>
        <CardTitle>Eligibility questions</CardTitle>
        <FormGrid>
          <Field>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              min="0"
              placeholder="18"
              value={screening.age}
              onChange={onScreeningChange("age")}
            />
          </Field>
          <Field>
            <label htmlFor="condition">Pre-existing condition?</label>
            <select
              id="condition"
              value={screening.hasCondition}
              onChange={onScreeningChange("hasCondition")}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>
          <Field>
            <label htmlFor="meds">On medications?</label>
            <select
              id="meds"
              value={screening.excludedMeds}
              onChange={onScreeningChange("excludedMeds")}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </Field>
        </FormGrid>
      </Card>

      <EligibilityPanel data-eligible={eligible}>
        <div>
          <h3>{eligible ? "Eligible" : "Not eligible yet"}</h3>
          <p>
            Eligible if age is 18 or older, the condition applies, and no excluded
            medications are taken.
          </p>
        </div>
        <EligibilityBadge data-eligible={eligible}>
          {eligible ? "Meets criteria" : "Does not meet criteria"}
        </EligibilityBadge>
      </EligibilityPanel>

      {!eligible && (
        <HelperText>
          Please confirm the participant meets the criteria before continuing.
        </HelperText>
      )}

      <Actions>
        <SecondaryButton type="button" onClick={onBack}>
          Back
        </SecondaryButton>
        <PrimaryButton type="button" disabled={!eligible} onClick={onContinue}>
          Save &amp; continue
        </PrimaryButton>
      </Actions>
    </Screen>
  );
}
