export const copyToClipboard = (text: string) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Set the textArea to be invisible
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = "0";
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";

  document.body.appendChild(textArea);

  textArea.select();
  document.execCommand("copy");

  document.body.removeChild(textArea);
};

type Match = {
  start: number;
  end: number;
};

export function findMatchesInText(regex: RegExp, text: string): Match[] {
  const matches: Match[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match[0].length === 0) {
      // Skip empty matches
      continue;
    }
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
    });
    if (!regex.global) {
      // If the regex is not global, break after the first match
      break;
    }
  }

  return matches;
}
