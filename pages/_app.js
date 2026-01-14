import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Newsreader:wght@400;500;600&display=swap");

  :root {
    color-scheme: light;
    --bg: #f6f7f8;
    --panel: #ffffff;
    --ink: #101828;
    --muted: #475467;
    --border: #e4e7ec;
    --accent: #0b5a47;
    --accent-2: #0f766e;
    --warning: #b54708;
    --danger: #b42318;
    --success: #027a48;
    --shadow: 0 18px 40px rgba(16, 24, 40, 0.08);
    --shadow-soft: 0 8px 20px rgba(16, 24, 40, 0.08);
    --radius-lg: 22px;
    --radius-md: 16px;
    --radius-sm: 12px;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "Manrope", "Segoe UI", sans-serif;
    background: radial-gradient(circle at top left, #f1f5f2, #f6f7f8 40%, #f1f4f7 100%);
    color: var(--ink);
  }

  h1, h2, h3, h4 {
    font-family: "Newsreader", "Times New Roman", serif;
    margin: 0 0 0.4rem;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0 0 0.8rem;
    color: var(--muted);
  }

  a {
    color: var(--accent-2);
    text-decoration: none;
  }

  button {
    font-family: "Manrope", "Segoe UI", sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
