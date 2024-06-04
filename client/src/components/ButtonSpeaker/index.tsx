import React from "react";
import { HiSpeakerWave } from "react-icons/hi2";

const ButtonSpeaker = ({ content }: any) => {
  const synth = window.speechSynthesis;
  console.log(synth);

  const _handleClickSpeak = () => {
    // Integrate a text-to-speech library (e.g., Web Speech API or third-party SDK)
    // Here's a simplified example using Web Speech API (requires additional setup):
    if (synth.speaking) {
      synth.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(content);
    synth.speak(utterance);
  };

  return (
    <button className="speaker" onClick={_handleClickSpeak}>
      <HiSpeakerWave size={30} color={synth.speaking ? "white" : "gray"} />
    </button>
  );
};

export default ButtonSpeaker;
