import styled, { keyframes } from "styled-components";

const statusStyles = {
  Started: "#c4320a",
  Screening: "#1b4d89",
  "Ready to sign": "#3b5b7b",
  Sent: "#0f766e",
  Signed: "#027a48",
  Declined: "#b42318",
  Expired: "#b54708",
  None: "#667085",
  Draft: "#344054",
  Creating: "#344054",
  Sending: "#0b5a47",
  Viewed: "#2c5282",
  Completed: "#027a48",
};

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Page = styled.div`
  padding: 32px clamp(16px, 4vw, 48px) 64px;
  min-height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: var(--panel);
  border-radius: var(--radius-lg);
  padding: 24px 28px;
  box-shadow: var(--shadow-soft);
`;

export const Title = styled.h1`
  font-size: clamp(1.8rem, 3vw, 2.6rem);
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: 1rem;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const HeaderPill = styled.div`
  background: #eef2f3;
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const TextLink = styled.a`
  font-weight: 600;
`;

export const Body = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 28px;

  @media (min-width: 960px) {
    grid-template-columns: 280px 1fr;
    align-items: start;
  }
`;

export const Rail = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RailCard = styled.section`
  background: var(--panel);
  border-radius: var(--radius-md);
  padding: 20px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-soft);
`;

export const RailTitle = styled.h3`
  font-size: 1.1rem;
`;

export const Stepper = styled.div`
  display: grid;
  gap: 14px;
  margin-top: 14px;
`;

export const Step = styled.div`
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 12px;
  align-items: center;
`;

export const StepDot = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 999px;
  border: 2px solid var(--border);
  background: #ffffff;

  &[data-active="true"] {
    background: var(--accent);
    border-color: var(--accent);
  }
`;

export const StepLabel = styled.span`
  font-weight: 600;
`;

export const StatusStack = styled.div`
  display: grid;
  gap: 14px;
`;

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const StatusLabel = styled.span`
  color: var(--muted);
`;

export const Badge = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  color: #ffffff;
  background: ${({ $tone }) => statusStyles[$tone] || "#667085"};
`;

export const Callout = styled.p`
  margin-top: 18px;
  background: #f0f7f4;
  border-radius: var(--radius-sm);
  padding: 14px;
  color: #0f3d33;
  font-size: 0.9rem;
`;

export const Content = styled.section`
  display: grid;
  gap: 24px;
`;

export const Banner = styled.div`
  padding: 14px 18px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  border: 1px solid var(--border);
  background: #ecfdf3;
  color: var(--success);

  &[data-tone="error"] {
    background: #fef3f2;
    color: var(--danger);
  }
`;

export const Screen = styled.section`
  background: rgba(255, 255, 255, 0.6);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(228, 231, 236, 0.8);
  display: grid;
  gap: 20px;
`;

export const ScreenHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

export const ScreenTitle = styled.h2`
  font-size: 2rem;
`;

export const ScreenSubtitle = styled.p`
  margin: 0;
`;

export const DocPill = styled.span`
  align-self: flex-start;
  background: #f4f5f7;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.9rem;
`;

export const Grid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Card = styled.section`
  background: var(--panel);
  border-radius: var(--radius-md);
  padding: 20px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-soft);
`;

export const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 12px;
`;

export const TrialList = styled.div`
  display: grid;
  gap: 12px;
`;

export const TrialItem = styled.button`
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  cursor: pointer;
  text-align: left;
  min-height: 64px;
  box-shadow: var(--shadow-soft);

  &[data-active="true"] {
    border-color: var(--accent);
    background: #f1fbf6;
  }

  span {
    display: block;
    color: var(--muted);
    font-size: 0.85rem;
  }
`;

export const DetailGrid = styled.div`
  display: grid;
  gap: 12px;
`;

export const DetailItem = styled.div`
  display: grid;
  gap: 4px;

  span {
    color: var(--muted);
    font-size: 0.9rem;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 720px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const Field = styled.div`
  display: grid;
  gap: 8px;

  label {
    font-weight: 600;
    color: var(--muted);
  }

  input,
  select {
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid var(--border);
    font-size: 1rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
`;

export const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(16, 24, 40, 0.2);
  border-top-color: currentColor;
  display: inline-block;
  margin-right: 8px;
  animation: ${spin} 0.8s linear infinite;
`;

export const PrimaryButton = styled.button`
  padding: 14px 22px;
  border-radius: 999px;
  border: none;
  background: var(--accent);
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  min-width: 180px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  padding: 14px 22px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: #ffffff;
  color: var(--ink);
  font-weight: 600;
  cursor: pointer;
`;

export const GhostButton = styled.button`
  padding: 14px 22px;
  border-radius: 999px;
  border: 1px dashed var(--border);
  background: transparent;
  color: var(--muted);
  font-weight: 600;
  cursor: pointer;
`;

export const TextButton = styled.button`
  padding: 12px 0;
  border: none;
  background: none;
  color: var(--accent-2);
  font-weight: 600;
  cursor: pointer;
`;

export const EligibilityPanel = styled.section`
  border-radius: var(--radius-md);
  padding: 18px 20px;
  border: 1px solid ${({ "data-eligible": eligible }) => (eligible ? "#c6f6d5" : "#fed7d7")};
  background: ${({ "data-eligible": eligible }) => (eligible ? "#ecfdf3" : "#fff5f5")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const EligibilityBadge = styled.span`
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 600;
  background: ${({ "data-eligible": eligible }) => (eligible ? "#027a48" : "#b42318")};
  color: #ffffff;
`;

export const HelperText = styled.p`
  margin-top: 8px;
  color: var(--warning);
  font-weight: 600;
`;

export const SummaryGrid = styled.div`
  display: grid;
  gap: 14px;

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const SummaryItem = styled.div`
  display: grid;
  gap: 6px;

  span {
    color: var(--muted);
    font-size: 0.85rem;
  }
`;

export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  input {
    width: 20px;
    height: 20px;
  }

  label {
    font-weight: 600;
  }
`;

export const Hero = styled.section`
  background: linear-gradient(120deg, #f1f5f2, #e7f0ee);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  border: 1px solid #d2ede5;
`;

export const HeroTitle = styled.h2`
  font-size: 2rem;
`;

export const HeroPill = styled.div`
  background: #ffffff;
  padding: 14px 18px;
  border-radius: 999px;
  border: 1px solid var(--border);
  display: grid;
  gap: 4px;
  font-weight: 600;

  span {
    font-size: 0.8rem;
    color: var(--muted);
  }
`;

export const Timeline = styled.div`
  display: grid;
  gap: 12px;
`;

export const TimelineItem = styled.div`
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  border: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  background: #ffffff;

  &[data-active="true"] {
    border-color: var(--accent);
    background: #f1fbf6;
  }

  small {
    color: var(--muted);
    font-weight: 600;
  }
`;

export const InfoNote = styled.p`
  margin-top: 12px;
  background: #eef4ff;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  color: #1b4d89;
`;

export const SuccessNote = styled.p`
  margin-top: 12px;
  background: #ecfdf3;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  color: var(--success);
`;

export const WarningNote = styled.p`
  margin-top: 12px;
  background: #fff4ed;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  color: var(--warning);
  display: grid;
  gap: 10px;
`;

export const InlineButton = styled.button`
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
`;

export const List = styled.ul`
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: 8px;
  color: var(--muted);
`;

export const ContactCard = styled.div`
  display: grid;
  gap: 16px;

  span {
    color: var(--muted);
  }
`;

export const InlineForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 12px;

  ${Field} {
    flex: 1 1 240px;
  }
`;

export { statusStyles };
