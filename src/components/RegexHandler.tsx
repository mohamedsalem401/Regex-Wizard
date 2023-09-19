import { Match } from "./RegexContainerGroup";

export class BaseRegexHandler {
  private _regexString: string;
  private _flags: string;

  constructor(regexString: string, flags: string) {
    this._regexString = regexString;
    this._flags = flags;
  }

  protected getRegex(): RegExp {
    const flag = this._flags.length > 0 ? this._flags : "";
    let regex: RegExp;

    try {
      regex = new RegExp(this._regexString, flag);
    } catch (error) {
      regex = /^$/;
    }

    return regex;
  }

  getMatches(text: string): Match[] {
    const regex = this.getRegex();
    const matches: Match[] = [];
    let match: RegExpExecArray | null;

    if (this._flags.includes("g")) {
      while ((match = regex.exec(text)) !== null) {
        if (match[0].length === 0) {
          // Break the loop if an empty match is found
          break;
        }
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
        });
      }
    } else {
      match = regex.exec(text);
      if (match !== null && match[0].length !== 0) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
        });
      }
    }

    return matches;
  }

  get regexString() {
    return this._regexString;
  }

  get flags() {
    return this._flags;
  }

  updateRegexString(regexString: string): void {
    this._regexString = regexString;
  }

  updateFlags(flags: string): void {
    this._flags = flags;
  }
}

export class RegexHandler extends BaseRegexHandler {
  private setRegex: (newRegex: RegexHandler) => void;

  constructor(
    regexString: string,
    flags: string,
    setRegex: (newRegex: RegexHandler) => void
  ) {
    super(regexString, flags);
    this.setRegex = setRegex;
  }

  updateRegexString(regexString: string): void {
    const newRegex = new RegexHandler(regexString, this.flags, this.setRegex);
    this.setRegex(newRegex);
  }

  updateFlags(flags: string): void {
    const newRegex = new RegexHandler(this.regexString, flags, this.setRegex);
    this.setRegex(newRegex);
  }
}
