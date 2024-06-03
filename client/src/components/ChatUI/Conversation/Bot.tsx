import React from "react";

import "../chatui.css";

import { RiRobot2Fill } from "react-icons/ri";
import { HiSpeakerWave } from "react-icons/hi2";
import { SiGoogletranslate } from "react-icons/si";

const BotConversation = ({ content }: any) => {
  return (
    <div className={`chat bott`}>
      <RiRobot2Fill size={80} />
      <p className="txt">{content}</p>

      <div className="botFunction">
        <button className="speaker">
          <HiSpeakerWave size={30} color="white" />
        </button>
        <button className="translate">
          <SiGoogletranslate size={30} color="white" />
        </button>
      </div>
    </div>
  );
};

export default BotConversation;
