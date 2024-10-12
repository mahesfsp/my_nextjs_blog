
"use client";

import { useState } from "react";

export default function Contact() {
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputs = (e) => {
    setInputs((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!inputs.name || !inputs.email || !inputs.message) {
      setError("All fields are required.");
      return;
    }

    fetch("api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setMessage(res.message);
          setInputs({});
          setError("");
        }
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((err) => setError("Failed to send enquiry.")); 
  };

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <label htmlFor="name" className="w-1/4">
              Name:
            </label>
            <input
              onChange={handleInputs}
              type="text"
              name="name"
              value={inputs.name ?? ""}
              id="name"
              className="border rounded px-2 py-1 w-3/4"
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="email" className="w-1/4">
              Email:
            </label>
            <input
              onChange={handleInputs}
              type="email"
              name="email"
              value={inputs.email ?? ""}
              id="email"
              className="border rounded px-2 py-1 w-3/4"
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="message" className="w-1/4">
              Message:
            </label>
            <textarea
              onChange={handleInputs}
              id="message"
              name="message"
              value={inputs.message ?? ""}
              className="border rounded px-2 py-1 w-3/4"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
        <br />
        {error && <div className="text-red-500">{error}</div>} 
        {message && <div className="text-green-500">{message}</div>} 
      </main>
    </>
  );
}
