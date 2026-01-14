import {
  Actions,
  Card,
  CardTitle,
  DocPill,
  HeroTitle,
  List,
  PrimaryButton,
  Screen,
  ScreenHeader,
  ScreenSubtitle,
  ScreenTitle,
  SecondaryButton,
} from "../styles";

export default function DoneStep({ docStatus, onBackToTrials }) {
  return (
    <Screen>
      <ScreenHeader>
        <div>
          <ScreenTitle>Done</ScreenTitle>
          <ScreenSubtitle>Your consent is complete.</ScreenSubtitle>
        </div>
        <DocPill>
          Document status: <strong>{docStatus}</strong>
        </DocPill>
      </ScreenHeader>

      <Card>
        <HeroTitle>Consent completed</HeroTitle>
        <p>A coordinator will contact you within 24–48 hours.</p>
      </Card>

      <Card>
        <CardTitle>Next steps</CardTitle>
        <List>
          <li>Add availability for call times.</li>
          <li>Prepare any recent lab or medication details.</li>
        </List>
      </Card>

      <Actions>
        <SecondaryButton type="button" onClick={onBackToTrials}>
          Back to trials
        </SecondaryButton>
        <PrimaryButton type="button">View my documents</PrimaryButton>
      </Actions>
    </Screen>
  );
}
