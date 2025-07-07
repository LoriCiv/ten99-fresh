// This makes sure this component only runs on the user's browser, not on the server.
"use client";

import { useState } from 'react';

export default function ScanDocumentsPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleParse = () => {
    // This is where the AI parsing logic will go later.
    // For now, it just shows the text that was entered.
    setResult(`Parsing this text: "${text}"`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      {/* Main Page Title */}
      <h1 className="text-3xl font-bold mb-8">Scan Document or Paste Text</h1>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Column 1: Upload Image (Placeholder for later) */}
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Upload Image (Optional)</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-500">
            <p>Image upload feature coming soon.</p>
          </div>
        </div>

        {/* Column 2: Paste Text & Parse (The component we moved) */}
        <div>
          <h2 className="text-xl font-semibold mb-2">2. Paste Text & Parse</h2>
          <textarea
            className="w-full h-48 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Paste text from an email, text message, or screenshot here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            onClick={handleParse}
            className="w-full mt-2 bg-teal-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-teal-700 transition-colors"
          >
            Parse with AI & Create Appointment
          </button>
        </div>
      </div>

      {/* A section to display the result later */}
      {result && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold">Result:</h3>
          <p className="mt-2 text-gray-700">{result}</p>
        </div>
      )}

    </div>
  );
}
