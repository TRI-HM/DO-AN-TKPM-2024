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

import ButtonSpeaker from "../ButtonSpeaker";

import UserConversation from "./Conversation/User";
import BotConversation from "./Conversation/Bot";

import { getHistories, getConversationByHistoryId } from "../../services/chat";
import ButtonSpeechToText from "../ButtonTextToSpeech";
import { apiCaller } from "../../apis/apiCaller";
import { saveHistories } from "../../services/chat";

import { formatDateTime } from "../../utils";

import { SubmitConversation } from "../../types/Chat";
import { sendConversation } from "../../services/chat";
interface Message {
  sender: string;
  content: string;
}

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  const { state, logout: serviceLoggout } = useAuth();
  const [histories, setHistories] = useState<any[]>([]);
  const [conversation, setConversation] = useState<Message[]>([]);
  const inputRef: any = useRef<HTMLInputElement>(null);

  const [activeHistory, setActiveHistory] = useState<any>({});

  const [activeDate, setActiveDate] = useState<string>("");

  useEffect(() => {
    _handleFetchHistories({ uuid: state.user?.uuid });
  }, []);

  useEffect(() => {
    if (activeDate.length) {
      _handleFetchConversation(activeHistory.history_uuid || "");
    }
  }, [activeHistory.history_uuid, activeDate]);

  const _handleFetchHistories = async ({ uuid }: any) => {
    try {
      const data: any = await getHistories({ uuid });
      setHistories(data || []);
    } catch (error) {
      console.error("Error _handleFetchHistories:", error);
    }
  };

  const _handleFetchConversation = async (history_uuid: string) => {
    try {
      const data: any = await getConversationByHistoryId(history_uuid);
      console.log(
        "data?.conversations_handleFetchConversation",
        data?.conversations
      );
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

  const _handleSendText = async () => {
    console.log("_handleSendText", inputRef.current.value);
    try {
      const submitConversation: SubmitConversation = {
        number_sentence: "123",
        sentences: inputRef.current.value,
        history_uuid: activeHistory.history_uuid,
      };
      const response = await sendConversation(submitConversation);
      console.log(response);
    } catch (error) {
      console.error("Error _handleSendText:", error);
    }
  };

  const handleUserInput = (text: string) => {
    try {
    } catch (error) {}
    // Send user text to OpenAI API for processing
    // fetch("https://api.openai.com/v1/completions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${key}`, // Replace with your API key
    //   },
    //   body: JSON.stringify({
    //     model: "text-davinci-003", // Adjust model as needed
    //     prompt: `You: ${text}`,
    //     max_tokens: 1024, // Adjust maximum response length
    //     n: 1,
    //     stop: null,
    //     temperature: 0.7, // Adjust temperature for response creativity
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const responseText = data.choices[0].text.trim();
    //     setConversation((prev) => [
    //       ...prev,
    //       { sender: "System", content: responseText },
    //     ]);
    //     // Integrate a text-to-speech library (e.g., Web Speech API or third-party SDK)
    //     // Here's a simplified example using Web Speech API (requires additional setup):
    //     const synth = window.speechSynthesis;
    //     if (synth.speaking) {
    //       synth.cancel();
    //     }
    //     const utterance = new SpeechSynthesisUtterance(responseText);
    //     synth.speak(utterance);
    //   })
    //   .catch((error) => console.error(error));
  };

  const _handleCreateHistory = async () => {
    try {
      const response: any = await saveHistories({
        user_uuid: state?.user?.uuid,
      });
    } catch (error) {
      console.error("Error _handleCreateHistory:", error);
    }
  };

  const _handleActivateHistory = (history: any) => {
    setActiveHistory(history);
    setActiveDate(history.createdAt);
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
            <button onClick={_handleCreateHistory}>Today</button>
          </div>
          <div className="historyList">
            <ListGroup className="list">
              {histories.map((history, _) => (
                <ListGroupItem
                  key={history.uuid}
                  active={history.createdAt === activeDate}
                  className="detailList"
                  onClick={() => _handleActivateHistory(history)}
                >
                  {history?.createdAt}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </div>

        <div className="bottom">
          <div className="logout">
            <RiLogoutBoxRFill size={30} color="white" />
            <button onClick={serviceLoggout}>Logout</button>
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
                ref={inputRef}
                placeholder="Ask me anything...."
                name=""
                id=""
              />
              {/* <ButtonSpeechToText />| */}
              <button className="send" onClick={_handleSendText}>
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
