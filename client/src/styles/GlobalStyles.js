import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  /* Sleek dark theme */
  --color-brand-50: #232946;
  --color-brand-100: #232946;
  --color-brand-200: #393e6e;
  --color-brand-500: #a1a1aa;
  --color-brand-600: #b8c1ec;
  --color-brand-700: #eebbc3;
  --color-brand-800: #232946;
  --color-brand-900: #121629;

  --color-grey-0: #181a20;
  --color-grey-50: #232946;
  --color-grey-100: #232946;
  --color-grey-200: #232946;
  --color-grey-300: #393e6e;
  --color-grey-400: #a1a1aa;
  --color-grey-500: #b8c1ec;
  --color-grey-600: #eebbc3;
  --color-grey-700: #f4f4f4;
  --color-grey-800: #eebbc3;
  --color-grey-900: #fff;

  --color-blue-100: #232946;
  --color-blue-700: #393e6e;
  --color-green-100: #393e6e;
  --color-green-700: #b8c1ec;
  --color-yellow-100: #eebbc3;
  --color-yellow-700: #eebbc3;
  --color-silver-100: #393e6e;
  --color-silver-700: #232946;
  --color-indigo-100: #393e6e;
  --color-indigo-700: #232946;

  --color-red-100: #eebbc3;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(35, 41, 70, 0.7);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.15);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.35);

  --border-radius-tiny: 6px;
  --border-radius-sm: 10px;
  --border-radius-md: 16px;
  --border-radius-lg: 24px;

  --image-grayscale: 0;
  --image-opacity: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", "Inter", "Segoe UI", Arial, sans-serif;
  color: var(--color-grey-900);
  background: linear-gradient(135deg, #181a20 0%, #232946 100%);
  transition: color 0.3s, background 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
  -webkit-font-smoothing: antialiased;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
  background: rgba(35, 41, 70, 0.7);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  transition: background 0.3s, border 0.3s, box-shadow 0.3s;
}

button {
  cursor: pointer;
  background: linear-gradient(90deg, var(--color-brand-600), var(--color-brand-700));
  color: #fff;
  border: none;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: 0.8rem 2.4rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: background 0.3s, box-shadow 0.3s, color 0.3s;
}
button:hover, button:focus {
  background: linear-gradient(90deg, var(--color-brand-700), var(--color-brand-600));
  box-shadow: var(--shadow-lg);
  color: var(--color-brand-100);
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: var(--color-brand-600);
  text-decoration: none;
  transition: color 0.2s;
}
a:hover, a:focus {
  color: var(--color-brand-700);
  text-decoration: underline;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

`;

export default GlobalStyles;
