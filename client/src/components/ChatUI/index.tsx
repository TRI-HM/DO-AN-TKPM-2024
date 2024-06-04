import React, { useState, useEffect, useRef, Fragment } from "react";
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useAuth } from "../../providers/AuthContext";
import { saveHistories } from "../../services/chat";
import { SubmitConversation } from "../../types/Chat";
import { sendConversation } from "../../services/chat";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { getHistories, getConversationByHistoryId } from "../../services/chat";

import UserConversation from "./Conversation/User";
import BotConversation from "./Conversation/Bot";

import "./chatui.css";

interface Message {
  sender: string;
  content: string;
}

interface ChatProps {}

const SpeechRecognition: any =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const Chat: React.FC<ChatProps> = () => {
  const { state, logout: serviceLoggout } = useAuth();
  const [histories, setHistories] = useState<any[]>([]);
  const [conversation, setConversation] = useState<Message[]>([]);
  const inputRef: any = useRef<HTMLInputElement>(null);

  const [activeHistory, setActiveHistory] = useState<any>({});

  const [activeDate, setActiveDate] = useState<string>("");

  ////
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event: any) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setTranscription((prev) => prev + transcript + " ");
          } else {
            interimTranscript += transcript;
          }
        }
        setTranscription((prev) => prev + interimTranscript);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error", event);
      };

      setRecognition(recognitionInstance);
    } else {
      alert("Sorry, your browser does not support Speech Recognition.");
    }
  }, []);

  const startRecording = () => {
    if (recognition) {
      recognition.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    _handleFetchHistories({ uuid: state.user?.uuid });
  }, []);

  useEffect(() => {
    if (activeDate.length) {
      _handleFetchConversation(activeHistory.history_uuid || "");
    }
  }, [activeHistory.history_uuid, activeDate]);

  useEffect(() => {
    let object: any = document.getElementsByClassName("chats")[0];
    object.scrollTop = object.scrollHeight;
  }, [conversation]);

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

  const _handleSendText = async (event: any) => {
    event.preventDefault();
    console.log("_handleSendText", inputRef.current.value);
    try {
      const submitConversation: SubmitConversation = {
        number_sentence: "123",
        sentences: inputRef.current.value,
        history_uuid: activeHistory.history_uuid,
      };
      const response = await sendConversation(submitConversation);
      await _handleFetchConversation(activeHistory.history_uuid);
      inputRef.current.value = "";
      console.log(response);
    } catch (error) {
      console.error("Error _handleSendText:", error);
    }
  };

  const handleUserInput = (text: string) => {
    try {
    } catch (error) {}
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
            <form className="inp" onSubmit={_handleSendText}>
              <input
                type="text"
                ref={inputRef}
                placeholder="Ask me anything...."
                name=""
                id=""
                value={transcription}
              />

              <button
                className="micro"
                onClick={isRecording ? stopRecording : startRecording}
              >
                <FaMicrophone size={30} color="white" />
              </button>
              <button className="send" onClick={_handleSendText}>
                <IoSend size={30} color="white" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
