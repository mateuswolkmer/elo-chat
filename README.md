# EloChat

A React component that adds Elo, a financial assistant chat widget, to your website.

## Features

- 💬 Financial assistant chat powered by Google Gemini
- 🎨 Animated UI with Tailwind CSS and Motion
- 💄 Customizable colors
- 📱 Responsive design
- 📧 Email-based session management (local)
- 💾 Persistent chat sessions

## Installation

```bash
npm install @zuzu.blue/elo-chat
```

## Usage

```tsx
import { EloWidget } from "@zuzu.blue/elo-chat";

function App() {
  return (
    <div>
      <h1>My Website</h1>
      <EloWidget openaiApiKey={process.env.VITE_GOOGLE_API_KEY} />
    </div>
  );
}
```

## Configuration

### Props

- `googleApiKey` (string) \*: your Google API key
- `googleApiModel` (string): the Google API model to use. Defaults to "gemini-2.5-flash"
- `enableDevTools` (boolean): whether to show the dev tools. Defaults to `true`

### Styling

It's possible to modify the widget styles via CSS variables, powered by [Tailwind CSS theme variables](https://tailwindcss.com/docs/theme). These are the default variables:

```css
--color-primary: #6f33b7;
--color-primary-light: #d1b5ff;
--color-secondary: #eb6c52;
--color-secondary-light: #ffdfc5;
--color-success: #0fdb9b;
--color-success-light: #9fffe0;
--color-info: #53acd0;
--color-background: #faf7f2;
--color-foreground: #262623;
```

The widget initial animation can also be customized through [`motion.div`](https://motion.dev/docs/react-motion-component) props.

#### Example

```tsx
import { EloWidget } from "@zuzu.blue/elo-chat";

function App() {
  return (
    <div>
      <h1>My Website</h1>
      <EloWidget
        googleApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        style={
          {
            "--color-primary": "red",
            "--color-primary-light": "orange",
          } as CSSProperties
        }
        transition={{ duration: 0 }} // disables the initial animation
      />
    </div>
  );
}
```

## Development

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd elo-chat
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```bash
   # Google API Key for EloChat
   VITE_GOOGLE_API_KEY=...
   ```

4. **Start development server**

   There is a test page consuming the component in `src/playground/main.tsx`. To start it, run:

   ```bash
   npm run dev
   ```

### Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```
