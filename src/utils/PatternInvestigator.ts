import { TestSuit } from "./TestSuit";

export class PatternInvestigator {
  constructor(
    public text: string,
    public regex: RegExp,
    public subtitution: string,
    public testSuit: TestSuit
  ) {}

  clone() {
    return new PatternInvestigator(
      this.text,
      this.regex,
      this.subtitution,
      this.testSuit
    );
  }

  getSubtitutionOutput() {
    return this.text.replace(this.regex, this.subtitution);
  }
}
