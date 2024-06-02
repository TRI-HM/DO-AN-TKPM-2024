import React, { useState, useEffect, useRef } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './chatui.css';
import { IoSend } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoMdAddCircle } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { SiGoogletranslate } from "react-icons/si";

interface Message {
  sender: string;
  content: string;
}

interface ChatProps {}
const key: string = "sk-proj-G8MVYno9aU62hd4XZWhzT3BlbkFJsnHUGRiaRM30CEyPAYBI";

const Chat: React.FC<ChatProps> = () => {                                                    
  const navigation = useNavigate();
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
    <div className="App">
      <div className="sidebar">
          <div className="titleSideBar">
            <h1>History</h1>
          </div>
          <div className="top">
            <div className="newChat">
              <IoMdAddCircle size={30} color="white"/>
              <button>New Chat</button> 
            </div>
            <div className="historyList">
              <ListGroup className="list">
                  <ListGroupItem className="detailList" action href="#1">30/05/2024</ListGroupItem>
                  <ListGroupItem className="detailList" action href="#2">31/05/2024</ListGroupItem>
                  <ListGroupItem className="detailList" action href="#3">01/06/2024</ListGroupItem>
                  <ListGroupItem className="detailList" action href="#4">02/06/2024</ListGroupItem>
                  <ListGroupItem className="detailList" action href="#5">03/06/2024</ListGroupItem>
                  <ListGroupItem className="detailList" action href="#6">04/06/2024</ListGroupItem>
                  <ListGroupItem className="detailList" action href="#7">05/06/2024</ListGroupItem>
                  <ListGroupItem className="detailList" action href="#8">06/06/2024</ListGroupItem>
                  <ListGroupItem className="detailList" action href="#9">07/06/2024</ListGroupItem>
                  <ListGroupItem className="detailList" action href="#10">08/06/2024</ListGroupItem>
                  <ListGroupItem className="detailList" action href="#11">09/06/2024</ListGroupItem>
                  <ListGroupItem className="detailList" action href="#12">10/06/2024</ListGroupItem>
              </ListGroup>
            </div>
          </div>

        <div className="bottom">
          <div className="logout">
            <RiLogoutBoxRFill size={30} color="white"/>
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
            <div className="chat user">
              <FaUser size={30} />
              <p className="txt">Help me create a plan for a vegetable garden ?</p>
            </div>
            
            <div className="chat bott">
                <RiRobot2Fill size={80} />
                <p className="txt">Certainly! Planning a vegetable garden is an exciting endeavor. Let’s get started with some essential steps: <br /> 1. Visit Other Gardens: Start by visiting nearby vegetable gardens. Observe what grows well in your area and make a list of the vegetables you and your family enjoy eating. <br /> 2. Know Cool and Warm Season Vegetables: Understand which vegetables thrive in cool weather (like lettuce, spinach, and peas) and which prefer warm weather (such as tomatoes, peppers, and squash). This knowledge will help you plan your planting schedule. <br />3.Know Your Growing Season: Determine the length of your growing season. This information will guide your choice of crops and planting times. For example, if you have a short growing season, focus on quick-maturing vegetables. <br /> 4.Choose Seeds or Transplants: Decide whether you’ll start from seeds or purchase transplants. Some vegetables, like carrots and beans, are best grown from seeds directly in the garden, while others, like tomatoes and peppers, benefit from starting indoors as transplants.</p>
              
              <div className="botFunction">
                <button className="speaker"><HiSpeakerWave size={30} color="white"/></button>
                <button className="translate"><SiGoogletranslate size={30} color="white"/></button>
              </div>
            </div>

            <div className="chat user">
              <FaUser size={30} />
              <p className="txt">Help me create a plan for a vegetable garden ?</p>
            </div>
            
            <div className="chat bott">
                <RiRobot2Fill size={80} />
                <p className="txt">Certainly! Planning a vegetable garden is an exciting endeavor. Let’s get started with some essential steps: <br /> 1. Visit Other Gardens: Start by visiting nearby vegetable gardens. Observe what grows well in your area and make a list of the vegetables you and your family enjoy eating. <br /> 2. Know Cool and Warm Season Vegetables: Understand which vegetables thrive in cool weather (like lettuce, spinach, and peas) and which prefer warm weather (such as tomatoes, peppers, and squash). This knowledge will help you plan your planting schedule. <br />3.Know Your Growing Season: Determine the length of your growing season. This information will guide your choice of crops and planting times. For example, if you have a short growing season, focus on quick-maturing vegetables. <br /> 4.Choose Seeds or Transplants: Decide whether you’ll start from seeds or purchase transplants. Some vegetables, like carrots and beans, are best grown from seeds directly in the garden, while others, like tomatoes and peppers, benefit from starting indoors as transplants.</p>
              
              <div className="botFunction">
                <button className="speaker"><HiSpeakerWave size={30} color="white"/></button>
                <button className="translate"><SiGoogletranslate size={30} color="white"/></button>
              </div>
            </div>

            <div className="chat user">
              <FaUser size={30} />
              <p className="txt">Help me create a plan for a vegetable garden ?</p>
            </div>
            
            <div className="chat bott">
                <RiRobot2Fill size={80} />
                <p className="txt">Certainly! Planning a vegetable garden is an exciting endeavor. Let’s get started with some essential steps: <br /> 1. Visit Other Gardens: Start by visiting nearby vegetable gardens. Observe what grows well in your area and make a list of the vegetables you and your family enjoy eating. <br /> 2. Know Cool and Warm Season Vegetables: Understand which vegetables thrive in cool weather (like lettuce, spinach, and peas) and which prefer warm weather (such as tomatoes, peppers, and squash). This knowledge will help you plan your planting schedule. <br />3.Know Your Growing Season: Determine the length of your growing season. This information will guide your choice of crops and planting times. For example, if you have a short growing season, focus on quick-maturing vegetables. <br /> 4.Choose Seeds or Transplants: Decide whether you’ll start from seeds or purchase transplants. Some vegetables, like carrots and beans, are best grown from seeds directly in the garden, while others, like tomatoes and peppers, benefit from starting indoors as transplants.</p>
              
              <div className="botFunction">
                <button className="speaker"><HiSpeakerWave size={30} color="white"/></button>
                <button className="translate"><SiGoogletranslate size={30} color="white"/></button>
              </div>
            </div>
          </div>

          <div className="chatFooter">
            <div className="inp">
                <input type="text" placeholder="Ask me anything...." name="" id="" />
                <button className="micro" ><FaMicrophone size={30} color="white" /></button>|<button className="send"><IoSend size={30} color="white"/></button>
            </div>
          </div>
        </div>
      </div>  
    </div>  
  );
};

export default Chat;
