import { Header, HeaderActions, SecondaryButton, Subtitle, TextLink, Title } from "./styles";

export default function EnrollmentHeader({ docStatus, onReset }) {
  return (
    <Header>
      <div>
        <Title>Clinical Trial Enrollment</Title>
        <Subtitle>Find a study and complete consent.</Subtitle>
      </div>
      <HeaderActions>
        <TextLink href="#">Help</TextLink>
        <SecondaryButton type="button" onClick={onReset}>
          Reset
        </SecondaryButton>
      </HeaderActions>
    </Header>
  );
}
