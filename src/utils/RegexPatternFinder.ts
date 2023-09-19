import { TestSuit } from "./TestSuit";

export class RegexPatternFinder {
  constructor(
    public text: string,
    public regex: RegExp,
    public subtitution: string,
    public testSuit: TestSuit
  ) {}

  clone() {
    return new RegexPatternFinder(
      this.text,
      this.regex,
      this.subtitution,
      this.testSuit
    );
  }
}
