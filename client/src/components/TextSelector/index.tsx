import React, { useState } from "react";
import axios from "axios";

const TextSelector: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);

  const handleMouseUp = async () => {
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText) {
      setSelectedText(selectedText);
      const translatedText = await fetchTranslation(selectedText);
      setTranslation(translatedText);
    }
  };

  const fetchTranslation = async (text: string): Promise<string> => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    console.log("fetchTranslation", apiKey);
    if (!apiKey) {
      console.error("OpenAI API key is not defined");
      return "Translation error";
    }

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: `Translate the following text to Spanish: "${text}"`,
          max_tokens: 60,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error("Error fetching translation:", error);
      return "Translation error";
    }
  };

  const handleSpeak = () => {
    if (translation) {
      const utterance = new SpeechSynthesisUtterance(translation);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div onMouseUp={handleMouseUp}>
      <p>Select some text in this sentence to translate and speak it.</p>
      {selectedText && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            border: "1px solid black",
            padding: "10px",
            backgroundColor: "white",
          }}
        >
          <p>Selected Text: {selectedText}</p>
          <p>Translation: {translation}</p>
          <button onClick={handleSpeak}>Speak</button>
        </div>
      )}
    </div>
  );
};

export default TextSelector;
