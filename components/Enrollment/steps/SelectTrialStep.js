import {
  Actions,
  Card,
  CardTitle,
  DetailGrid,
  DetailItem,
  DocPill,
  Grid,
  PrimaryButton,
  Screen,
  ScreenHeader,
  ScreenSubtitle,
  ScreenTitle,
  TrialItem,
  TrialList,
} from "../styles";

export default function SelectTrialStep({
  docStatus,
  selectedTrial,
  trials,
  onSelectTrial,
  onStartScreening,
}) {
  return (
    <Screen>
      <ScreenHeader>
        <div>
          <ScreenTitle>Select Trial</ScreenTitle>
          <ScreenSubtitle>Choose a study to enroll.</ScreenSubtitle>
        </div>
        {/* <DocPill>
          Document status: <strong>{docStatus}</strong>
        </DocPill> */}
      </ScreenHeader>

      <Grid>
        <Card>
          <CardTitle>Available trials</CardTitle>
          <TrialList>
            {trials.map((trial) => (
              <TrialItem
                key={trial.id}
                data-active={selectedTrial.id === trial.id}
                onClick={() => onSelectTrial(trial)}
              >
                <div>
                  <strong>{trial.name}</strong>
                  <span>{trial.condition}</span>
                </div>
                <div>
                  <strong>{trial.compensation}</strong>
                  <span>{trial.location}</span>
                </div>
              </TrialItem>
            ))}
          </TrialList>
        </Card>

        <Card>
          <CardTitle>Trial details</CardTitle>
          <DetailGrid>
            <DetailItem>
              <span>Site</span>
              <strong>{selectedTrial.site}</strong>
            </DetailItem>
            <DetailItem>
              <span>Visits</span>
              <strong>{selectedTrial.visits}</strong>
            </DetailItem>
            <DetailItem>
              <span>Location</span>
              <strong>{selectedTrial.location}</strong>
            </DetailItem>
            <DetailItem>
              <span>Consent packet</span>
              <strong>{selectedTrial.packet}</strong>
            </DetailItem>
          </DetailGrid>
        </Card>
      </Grid>

      <Actions>
        <PrimaryButton type="button" onClick={onStartScreening}>
          Continue
        </PrimaryButton>
      </Actions>
    </Screen>
  );
}
