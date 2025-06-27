import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import { EloWidget } from "../components/EloWidget";

const PlaygroundApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              EloChat Playground
            </h1>
            <nav className="space-x-8">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Home
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                About
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Testing EloChat Widget
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            This is a playground environment to test the EloChat widget. The
            chat bubble should appear in the bottom-right corner of the screen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Feature 1</h3>
              <p className="text-gray-600">
                Some sample content to make the page look more realistic.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Feature 2</h3>
              <p className="text-gray-600">
                More sample content for testing the widget positioning.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Feature 3</h3>
              <p className="text-gray-600">
                Additional content to simulate a real website layout.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Widget Integration Test
            </h3>
            <p className="text-gray-700 mb-4">
              The chat widget will be integrated here. You can test different
              configurations and see how it behaves on a real page.
            </p>
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded">
              <strong>Note:</strong> Replace ChatBubblePlaceholder with your
              actual ChatBubble component when ready.
            </div>
          </div>
        </div>
      </main>

      <EloWidget />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PlaygroundApp />
  </React.StrictMode>,
);
