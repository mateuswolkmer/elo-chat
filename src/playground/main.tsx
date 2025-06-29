import React, { CSSProperties } from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import { EloWidget } from "../components/EloWidget";

const PlaygroundApp: React.FC = () => {
  return (
    <div className="elo:min-h-screen elo:bg-gray-50">
      <header className="elo:bg-white elo:shadow-sm">
        <div className="elo:max-w-7xl elo:mx-auto elo:px-4 elo:sm:px-6 elo:lg:px-8">
          <div className="elo:flex elo:justify-between elo:items-center elo:py-6">
            <h1 className="elo:text-2xl elo:font-bold elo:text-gray-900">
              EloChat Playground
            </h1>
            <nav className="elo:space-x-8">
              <a href="#" className="elo:text-gray-500 elo:hover:text-gray-900">
                Home
              </a>
              <a href="#" className="elo:text-gray-500 elo:hover:text-gray-900">
                About
              </a>
              <a href="#" className="elo:text-gray-500 elo:hover:text-gray-900">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="elo:max-w-7xl elo:mx-auto elo:px-4 elo:sm:px-6 elo:lg:px-8 elo:py-12">
        <div className="elo:text-center">
          <h2 className="elo:text-4xl elo:font-bold elo:text-gray-900 elo:mb-8">
            Testing EloChat Widget
          </h2>
          <p className="elo:text-xl elo:text-gray-600 elo:mb-12 elo:max-w-3xl elo:mx-auto">
            This is a playground environment to test the EloChat widget. The
            chat bubble should appear in the bottom-right corner of the screen.
          </p>

          <div className="elo:grid elo:grid-cols-1 elo:md:grid-cols-3 elo:gap-8 elo:mb-16">
            <div className="elo:bg-white elo:p-6 elo:rounded-lg elo:shadow">
              <h3 className="elo:text-lg elo:font-semibold elo:mb-4">
                Feature 1
              </h3>
              <p className="elo:text-gray-600">
                Some sample content to make the page look more realistic.
              </p>
            </div>
            <div className="elo:bg-white elo:p-6 elo:rounded-lg elo:shadow">
              <h3 className="elo:text-lg elo:font-semibold elo:mb-4">
                Feature 2
              </h3>
              <p className="elo:text-gray-600">
                More sample content for testing the widget positioning.
              </p>
            </div>
            <div className="elo:bg-white elo:p-6 elo:rounded-lg elo:shadow">
              <h3 className="elo:text-lg elo:font-semibold elo:mb-4">
                Feature 3
              </h3>
              <p className="elo:text-gray-600">
                Additional content to simulate a real website layout.
              </p>
            </div>
          </div>

          <div className="elo:bg-blue-50 elo:p-8 elo:rounded-lg">
            <h3 className="elo:text-2xl elo:font-bold elo:text-gray-900 elo:mb-4">
              Widget Integration Test
            </h3>
            <p className="elo:text-gray-700 elo:mb-4">
              The chat widget will be integrated here. You can test different
              configurations and see how it behaves on a real page.
            </p>
            <div className="elo:bg-yellow-100 elo:border elo:border-yellow-400 elo:text-yellow-800 elo:px-4 elo:py-3 elo:rounded">
              <strong>Note:</strong> Replace ChatBubblePlaceholder with your
              actual ChatBubble component when ready.
            </div>
          </div>
        </div>
      </main>

      <EloWidget
        googleApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        googleModelId="gemini-2.5-flash"
      />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PlaygroundApp />
  </React.StrictMode>
);
