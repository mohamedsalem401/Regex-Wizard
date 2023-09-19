export const initialText =
  "Regular Expressions, abbreviated as Regex or Regexp, are a string of characters created within theoe framework of Regex syntax rules. You can easily manage your data with Regex, which uses commands like finding, matching, and editing. Regex can be used in programming languages such as Python, SQL, JavaScript, R, Google Analytics, Google Data Studio, and throughout the coding process. Learn regex online with examples and tutorials on RegexLearn now.";

type FlagOption = {
  title: string;
  value: string;
};

type CommonRegex = {
  id: number;
  pattern: string;
  regex: string;
  examples: string[];
};

export const flagsOptions: FlagOption[] = [
  { title: "global", value: "g" },
  { title: "case insensitive", value: "i" },
  { title: "multiline", value: "m" },
];

export const commonRegexes: CommonRegex[] = [
  {
    id: 1,
    pattern: "Email validation",
    regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
    examples: ["john.doe@example.com"],
  },
  {
    id: 2,
    pattern: "URL validation",
    regex: "^(https?://)?(www\\.)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(/.*)?$",
    examples: ["https://www.example.com"],
  },
  {
    id: 3,
    pattern: "Phone number validation (US format)",
    regex: "^\\d{3}-\\d{3}-\\d{4}$",
    examples: ["123-456-7890"],
  },
  {
    id: 4,
    pattern: "Date validation (MM/DD/YYYY)",
    regex: "^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/((19|20)\\d\\d)$",
    examples: ["01/01/2022"],
  },
  {
    id: 5,
    pattern: "Password validation",
    regex: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
    examples: ["Password123"],
  },
  {
    id: 6,
    pattern: "Credit card validation (Visa)",
    regex: "^4[0-9]{12}(?:[0-9]{3})?$",
    examples: ["4111111111111111"],
  },
  {
    id: 7,
    pattern: "IP address validation",
    regex: "^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$",
    examples: ["192.168.0.1"],
  },
  {
    id: 8,
    pattern: "HTML tag validation",
    regex:
      "<\\/?\\w+((\\s+\\w+(\\s*=\\s*(?:\".*?\"|'.*?'|[^'\">\\s]+))?)+\\s*|\\s*)\\/?>",
    examples: ["<div>", "</p>", '<a href="https://example.com">'],
  },
  {
    id: 9,
    pattern: "Hexadecimal color code validation",
    regex: "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$",
    examples: ["#FFA500"],
  },
  {
    id: 10,
    pattern: "Social Security Number (SSN) validation (with dashes)",
    regex: "^(?!000)(?!666)(?!9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$",
    examples: ["123-45-6789"],
  },
  {
    id: 11,
    pattern: "IPv6 address validation",
    regex: "^([\\da-fA-F]{1,4}:){7}[\\da-fA-F]{1,4}$",
    examples: ["2001:0db8:85a3:0000:0000:8a2e:0370:7334"],
  },
  {
    id: 12,
    pattern: "Credit card validation (Mastercard)",
    regex: "^5[1-5][0-9]{14}$",
    examples: ["5105105105105100"],
  },
  {
    id: 13,
    pattern: "Username validation",
    regex: "^[a-zA-Z0-9_-]{3,16}$",
    examples: ["user123", "john_doe"],
  },
  {
    id: 14,
    pattern: "Time validation (HH:MM AM/PM)",
    regex: "^(0?[1-9]|1[0-2]):[0-5][0-9]s[APM]{2}$",
    examples: ["09:30 AM", "05:45 PM"],
  },
  {
    id: 16,
    pattern: "Credit card validation (American Express)",
    regex: "^3[47][0-9]{13}$",
    examples: ["371449635398431"],
  },
  {
    id: 17,
    pattern: "MAC address validation",
    regex: "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$",
    examples: ["00:1A:2B:3C:4D:5E"],
  },
  {
    id: 18,
    pattern: "HTML comment validation",
    regex: "<!--[\\s\\S]*?-->",
    examples: ["<!-- This is a comment -->"],
  },
  {
    id: 19,
    pattern: "Currency validation (USD)",
    regex: "^$d+(.d{1,2})?$",
    examples: ["$10.99", "$1000"],
  },
  {
    id: 20,
    pattern: "Credit card validation (Discover)",
    regex: "^6(?:011|5[0-9]{2})[0-9]{12}$",
    examples: ["6011111111111117"],
  },
];
export const initialRegex = /[A-Z]\w+/g;
