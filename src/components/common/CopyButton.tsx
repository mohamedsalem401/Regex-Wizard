import React, { useState } from "react";
import { ButtonWithIcon } from "./ButtonWithIcon";

const copyIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="white"
      d="M5 22q-.825 0-1.413-.588T3 20V6h2v14h11v2H5Zm4-4q-.825 0-1.413-.588T7 16V4q0-.825.588-1.413T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.588 1.413T18 18H9Zm0-2h9V4H9v12Zm0 0V4v12Z"
    />
  </svg>
);
const checkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
  </svg>
);

interface CopyButtonProps {
  data: string;
  variant?: "text" | "outlined" | "contained"; // Add type for variant prop
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  data,
  variant = "text",
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyCodeToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = data;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 750);
  };

  const copyCodeToClipboardWithClipboardAPI = async () => {
    try {
      await navigator.clipboard.writeText(data);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 750);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const buttonText = isCopied ? "Copied" : "Copy";
  const icon = isCopied ? checkIcon : copyIcon;

  return (
    <ButtonWithIcon
      style={variant}
      text={buttonText}
      icon={icon}
      onClick={() => {
        copyCodeToClipboard();
        copyCodeToClipboardWithClipboardAPI();
      }}
    />
  );
};
