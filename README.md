# EloChat

A React component that adds a financial assistant chat widget to your website.

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
      <EloWidget openaiApiKey="your-openai-api-key-here" />
    </div>
  );
}
```

## Configuration

### Required Props

- `openaiApiKey` (string): Your OpenAI API key for the chat functionality

### Example with Environment Variables

```tsx
import { EloWidget } from "@zuzu.blue/elo-chat";

function App() {
  return (
    <div>
      <h1>My Website</h1>
      <EloWidget openaiApiKey={process.env.REACT_APP_OPENAI_API_KEY} />
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
   # OpenAI API Key for EloChat
   OPENAI_API_KEY=your-actual-openai-api-key-here
   ```

4. **Start development server**
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

## Features

- 💬 Financial assistant chat powered by OpenAI
- 🎨 Beautiful, animated UI with Tailwind CSS
- 📱 Responsive design
- 🔐 Secure API key handling
- 📧 Email-based session management
- 💾 Persistent chat history

## License

ISC
