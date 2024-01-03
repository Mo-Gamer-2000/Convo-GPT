import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        "Chat with your own AI",
        1000,
        "Build with Convo-GPT",
        1500,
        "Your own customised Convo-GPT",
        2000,
      ]}
      wrapper="span"
      speed={50}
      style={{
        fontSize: "60px",
        display: "inline-block",
        color: "white",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
