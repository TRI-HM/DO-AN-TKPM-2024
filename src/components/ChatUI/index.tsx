import React, { useState, useEffect, useRef } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

interface Message {
  sender: string;
  content: string;
}

interface ChatProps {}
const key: string = "sk-proj-G8MVYno9aU62hd4XZWhzT3BlbkFJsnHUGRiaRM30CEyPAYBI";

const Chat: React.FC<ChatProps> = () => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const inputRef: any = useRef<HTMLInputElement>(null);

  // Integrate a speech recognition library (e.g., Web Speech API or third-party SDK)
  // Here's a simplified example using Web Speech API (requires additional setup):
  const handleSpeechInput = () => {
    if (!(window as any).SpeechRecognition) {
      console.error("Speech Recognition is not supported");
      return;
    }

    const recognition = new (window as any).SpeechRecognition();
    recognition.start();

    recognition.onresult = (event: any) => {
      const text = event.result[0][0].transcript;
      setConversation((prev) => [...prev, { sender: "User", content: text }]);
      handleUserInput(text); // Send user input for processing
    };
  };

  const handleUserInput = (text: string) => {
    // Send user text to OpenAI API for processing
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`, // Replace with your API key
      },
      body: JSON.stringify({
        model: "text-davinci-003", // Adjust model as needed
        prompt: `You: ${text}`,
        max_tokens: 1024, // Adjust maximum response length
        n: 1,
        stop: null,
        temperature: 0.7, // Adjust temperature for response creativity
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const responseText = data.choices[0].text.trim();
        setConversation((prev) => [
          ...prev,
          { sender: "System", content: responseText },
        ]);

        // Integrate a text-to-speech library (e.g., Web Speech API or third-party SDK)
        // Here's a simplified example using Web Speech API (requires additional setup):
        const synth = window.speechSynthesis;
        if (synth.speaking) {
          synth.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(responseText);
        synth.speak(utterance);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <ListGroup>
        {conversation.map((message) => (
          <ListGroupItem key={message.content}>
            <span
              style={{
                fontWeight: message.sender === "User" ? "bold" : "normal",
              }}
            >
              {message.sender}: {message.content}
            </span>
          </ListGroupItem>
        ))}
      </ListGroup>
      <input
        type="text"
        ref={inputRef}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleUserInput(inputRef.current.value);
        }}
      />
      <button onClick={handleSpeechInput}>Speak Input</button>
    </div>
  );
};

export default Chat;
