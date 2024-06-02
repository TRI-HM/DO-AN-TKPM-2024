import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

interface Message {
  id: number;
  text: string;
  sender: string;
}

const key: string = "sk-proj-G8MVYno9aU62hd4XZWhzT3BlbkFJsnHUGRiaRM30CEyPAYBI";

const ChatGPTInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    // Add user message to the chat window
    const newMessage: Message = {
      id: messages.length,
      text: inputText,
      sender: "user",
    };
    setMessages([...messages, newMessage]);
    setInputText("");

    // Call OpenAI API to get bot response
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "text-davinci-003", // Or use the model of your choice
          prompt: inputText,
          max_tokens: 50, // Adjust based on desired response length
          temperature: 0.7, // Adjust based on desired creativity vs. coherence
          n: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
          },
        }
      );

      const botMessage: Message = {
        id: messages.length + 1,
        text: response.data.choices[0].text.trim(),
        sender: "bot",
      };
      setMessages([...messages, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  

  return (
    <Container className="chat-container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <div className="chat-box">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          <Form onSubmit={handleSubmit} className="input-form">
            <Col>
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Send</Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatGPTInterface;
