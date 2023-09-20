// Enum for numeric comparison operations
export enum NumericComparison {
  Equal = "equal",
  LessThan = "less than",
  MoreThan = "more than",
}

// Enum for string comparison operations
export enum StringComparison {
  StartsWith = "starts with",
  EndsWith = "ends with",
  Contains = "contains",
  DoesNotContain = "does not contain",
}

export class TestSuit {
  constructor(
    public description: string = "",
    public unitTests: UnitTest[] = [
      new NumericMatcher(NumericComparison.MoreThan, 0),
    ]
  ) {}

  clone() {
    return new TestSuit(this.description, this.unitTests);
  }

  evaluate(matches: RegExpExecArray[] | null): boolean {
    for (let index = 0; index < this.unitTests.length; index++) {
      const unitTest = this.unitTests[index];
      if (!unitTest.evaluate(matches)) {
        return false;
      }
    }
    return true;
  }
}

export abstract class UnitTest {
  abstract evaluate(matches: RegExpExecArray[] | null): boolean;
  abstract clone(): UnitTest;
}

export class NumericMatcher extends UnitTest {
  constructor(public operation: NumericComparison, public value: number) {
    super();
  }

  evaluate(matches: RegExpExecArray[] | null): boolean {
    console.log(matches)
    if (!matches) {
      const shouldBeZeroMatches =
        this.operation === NumericComparison.Equal && this.value === 0;
      return shouldBeZeroMatches;
    }

    switch (this.operation) {
      case NumericComparison.Equal:
        return matches.length === this.value;
      case NumericComparison.LessThan:
        return matches.length < this.value;
      case NumericComparison.MoreThan:
        return matches.length > this.value;
      default:
        throw new Error("Invalid numeric comparison operation.");
    }
  }

  clone() {
    return new NumericMatcher(this.operation, this.value);
  }
}

export class StringMatcher extends UnitTest {
  constructor(
    public operation: StringComparison,
    public string: string,
    public index: number
  ) {
    super();
  }

  evaluate(matches: RegExpExecArray[] | null): boolean {
    if (!matches) {
      return false;
    }
    const sourceString = matches[this.index][0];

    switch (this.operation) {
      case StringComparison.StartsWith:
        return sourceString.startsWith(this.string);
      case StringComparison.EndsWith:
        return sourceString.endsWith(this.string);
      case StringComparison.Contains:
        return sourceString.includes(this.string);
      case StringComparison.DoesNotContain:
        return !sourceString.includes(this.string);
      default:
        throw new Error("Invalid string comparison operation.");
    }
  }

  clone() {
    return new StringMatcher(this.operation, this.string, this.index);
  }
}
