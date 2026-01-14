import { Badge, Callout, Rail, RailCard, RailTitle, StatusLabel, StatusRow, StatusStack, Step, StepDot, StepLabel, Stepper } from "./styles";

export default function ProgressRail({ steps, currentStep, enrollmentStatus, docStatus }) {
  return (
    <Rail>
      <RailCard>
        <RailTitle>Progress</RailTitle>
        <Stepper>
          {steps.map((step, index) => (
            <Step key={step} data-active={index === currentStep}>
              <StepDot data-active={index <= currentStep} />
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </RailCard>

      <RailCard>
        <RailTitle>Enrollment status</RailTitle>
        <StatusStack>
          <StatusRow>
            <StatusLabel>Application</StatusLabel>
            <Badge $tone={enrollmentStatus}>{enrollmentStatus}</Badge>
          </StatusRow>
          <StatusRow>
            <StatusLabel>Documentation</StatusLabel>
            <Badge $tone={docStatus}>{docStatus}</Badge>
          </StatusRow>
        </StatusStack>
        <Callout>
          <strong>Tip:</strong> We won’t include sensitive details in emails—only a secure signing link.
        </Callout>
      </RailCard>
    </Rail>
  );
}
