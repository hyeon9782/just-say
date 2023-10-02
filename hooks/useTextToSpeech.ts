const useTextToSpeech = () => {
  let utterance = new SpeechSynthesisUtterance("Hello world!");
  speechSynthesis.speak(utterance);
};

export default useTextToSpeech;
