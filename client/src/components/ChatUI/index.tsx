import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Nav,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./chatui.css";
import { IoSend } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoMdAddCircle } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { SiGoogletranslate } from "react-icons/si";
import { useAuth } from "../../providers/AuthContext";

import UserConversation from "./Conversation/User";
import BotConversation from "./Conversation/Bot";

import { getHistories, getConversation } from "../../services/chat";
interface Message {
  sender: string;
  content: string;
}

interface ChatProps {}
const key: string = "sk-proj-G8MVYno9aU62hd4XZWhzT3BlbkFJsnHUGRiaRM30CEyPAYBI";

const Chat: React.FC<ChatProps> = () => {
  const navigation = useNavigate();
  const { state } = useAuth();
  const [histories, setHistories] = useState<any[]>([]);
  const [conversation, setConversation] = useState<Message[]>([]);
  const inputRef: any = useRef<HTMLInputElement>(null);

  useEffect(() => {
    _handleFetchHistories();
    _handleFetchConversation("uuid");
  }, []);

  const _handleFetchHistories = async () => {
    try {
      const { data }: any = await getHistories(state?.user?.uuid || "");
      console.log("data", data?.histories);
      setHistories(data?.histories);
    } catch (error) {
      console.error("Error _handleFetchHistories:", error);
    }
  };

  const _handleFetchConversation = async (uuid: string) => {
    try {
      const { data }: any = await getConversation(state?.user?.uuid || "");
      console.log("data", data?.conversations);
      setConversation(data?.conversations);
    } catch (error) {
      console.error("Error _handleFetchHistories:", error);
    }
  };

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
    <div className="App">
      <div className="sidebar">
        <div className="titleSideBar">
          <h1>History</h1>
        </div>
        <div className="top">
          <div className="newChat">
            <IoMdAddCircle size={30} color="white" />
            <button>New Chat</button>
          </div>
          <div className="historyList">
            <ListGroup className="list">
              {histories.map((history, _) => (
                <ListGroupItem
                  key={history.uuid}
                  className="detailList"
                  action
                  href="#1"
                >
                  {history.text}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </div>

        <div className="bottom">
          <div className="logout">
            <RiLogoutBoxRFill size={30} color="white" />
            <button onClick={() => navigation("/")}>Logout</button>
          </div>
        </div>
      </div>
      <div className="chatting">
        <div className="titleMain">
          <h1>Chatting</h1>
        </div>
        <div className="main">
          <div className="chats">
            {
              // Render chat messages here
              conversation.map((msg: any, _) => (
                <Fragment key={msg?.uuid}>
                  {msg?.role === "user" ? (
                    <UserConversation content={msg.content} />
                  ) : (
                    <BotConversation content={msg.content} />
                  )}
                </Fragment>
              ))
            }
          </div>

          <div className="chatFooter">
            <div className="inp">
              <input
                type="text"
                placeholder="Ask me anything...."
                name=""
                id=""
              />
              <button className="micro">
                <FaMicrophone size={30} color="white" />
              </button>
              |
              <button className="send">
                <IoSend size={30} color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
