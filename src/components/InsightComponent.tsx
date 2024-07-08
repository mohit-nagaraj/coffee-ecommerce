"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import Markdown from "react-markdown";
import { RiRobot3Fill } from "react-icons/ri";
import { FaRegFaceLaugh } from "react-icons/fa6";

const genAI = new GoogleGenerativeAI("api_key");

const InsightComponent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 123,
      text: "Hey! Send any message to get more information about whatever you want",
      sender: "bot",
    },
  ]);

  interface Message {
    id: number;
    text: string;
    sender: "user" | "bot" | string;
  }

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage: Message = { id: Date.now(), text: input, sender: "user" };
    setMessages([...messages, newMessage]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const inputValue = input;
      setInput("");
      const result = await model.generateContent(inputValue);
      const response = await result.response;
      const text = response.text();
      const reply: Message = {
        id: Date.now(),
        text: text,
        sender: "bot",
      };
      setMessages((messages) => [...messages, reply]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error or notify user here
    }
  };

  return (
    <div className="rounded-sm border border-stroke flex flex-col h-full">
      <div className="p-4 flex justify-between">
        <h4 className="font-semibold text-xl md:text-2xl">InsightBot</h4>
      </div>

      <div className="box-container-overflow flex-grow overflow-auto p-4 space-y-2 h-72">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-center gap-1 ${
              message.sender === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            { message.sender === "bot" && <RiRobot3Fill className="w-6 h-6 text-primary" /> }
            <div
              className={`rounded-lg px-4 py-2 ${
                message.sender === "bot" ? "bg-secondary" : "bg-primary text-white"
              }`}
            >
              <Markdown>{message.text}</Markdown>
            </div>
              { message.sender !== "bot" && <FaRegFaceLaugh className="w-6 h-6 text-secondary" />}
          </div>
        ))}
      </div>

      <div className="p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-grow p-2 border-2 rounded focus:outline-none focus:border-black"
            placeholder="Type your message here..."
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-black focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsightComponent;
