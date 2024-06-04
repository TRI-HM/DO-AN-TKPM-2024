import React from "react";
import { SiGoogletranslate } from "react-icons/si";

const ButtonTranslate = ({ content }: any) => {
  const _handleClickSpeak = () => {
    console.log("Translate:", content);
  };

  return (
    <button className="translate" onClick={_handleClickSpeak}>
      <SiGoogletranslate size={30} color={"white"} />
    </button>
  );
};

export default ButtonTranslate;
