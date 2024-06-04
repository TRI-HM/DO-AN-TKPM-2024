import React from "react";

import "../chatui.css";

import { RiRobot2Fill } from "react-icons/ri";

import ButtonTranslate from "../../ButtonTranslate";
import ButtonSpeaker from "../../ButtonSpeaker";

const BotConversation = ({ content }: any) => {
  return (
    <div className={`chat bott`}>
      <RiRobot2Fill size={30} />
      <p className="txt">{content}</p>
      <div className="botFunction">
        <ButtonSpeaker content={content} />
        <ButtonTranslate content={content} />
      </div>
    </div>
  );
};

export default BotConversation;
