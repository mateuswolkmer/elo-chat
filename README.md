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

### 1. Import the component and styles

```tsx
import { EloWidget } from "@zuzu.blue/elo-chat";
import "@zuzu.blue/elo-chat/styles";
```

### 2. Use the component

```tsx
function App() {
  return (
    <div>
      <h1>My Website</h1>
      <EloWidget googleApiKey={process.env.VITE_GOOGLE_API_KEY} />
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

It's possible to modify the widget styles via CSS variables, powered by [Tailwind CSS theme variables](https://tailwindcss.com/docs/theme). All of the variables are prefixed with `elo`, to not conflict with other project styles. These are the default variables:

```css
--elo-color-primary: #6f33b7;
--elo-color-primary-light: #d1b5ff;
--elo-color-secondary: #eb6c52;
--elo-color-secondary-light: #ffdfc5;
--elo-color-success: #0fdb9b;
--elo-color-success-light: #9fffe0;
--elo-color-info: #53acd0;
--elo-color-background: #faf7f2;
--elo-color-foreground: #262623;
```

The widget initial animation can also be customized through [`motion.div`](https://motion.dev/docs/react-motion-component) props.

#### Example

```tsx
import { EloWidget } from "@zuzu.blue/elo-chat";
import "@zuzu.blue/elo-chat/styles";

function App() {
  return (
    <div>
      <h1>My Website</h1>
      <EloWidget
        googleApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        style={
          {
            "--elo-color-primary": "red",
            "--elo-color-primary-light": "orange",
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
