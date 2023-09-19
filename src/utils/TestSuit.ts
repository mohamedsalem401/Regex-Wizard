// Enum for numeric comparison operations
enum NumericComparison {
  Equal = "equal",
  LessThan = "less_than",
  MoreThan = "more_than",
}

// Enum for string comparison operations
enum StringComparison {
  StartsWith = "starts_with",
  EndsWith = "ends_with",
  Contains = "contains",
  DoesNotContain = "does_not_contain",
}

class TestSuit {
  constructor(public description: string, public unitTests: UnitTest[]) {}
}

abstract class UnitTest {
  abstract evaluate(matches: RegExpExecArray[]): boolean;
  abstract clone(): UnitTest;
}

class CountingMatcher extends UnitTest {
  constructor(
    private operation: NumericComparison,
    private expectedValue: number
  ) {
    super();
  }

  evaluate(matches: RegExpExecArray[]): boolean {
    switch (this.operation) {
      case NumericComparison.Equal:
        return matches.length === this.expectedValue;
      case NumericComparison.LessThan:
        return matches.length < this.expectedValue;
      case NumericComparison.MoreThan:
        return matches.length > this.expectedValue;
      default:
        throw new Error("Invalid numeric comparison operation.");
    }
  }

  clone() {
    return new CountingMatcher(this.operation, this.expectedValue);
  }
}

class StringMatcher extends UnitTest {
  constructor(
    private operation: StringComparison,
    private expectedValue: string,
    private matchIndex: number
  ) {
    super();
  }

  evaluate(matches: RegExpExecArray[]): boolean {
    const sourceString = matches[this.matchIndex][0];

    switch (this.operation) {
      case StringComparison.StartsWith:
        return sourceString.startsWith(this.expectedValue);
      case StringComparison.EndsWith:
        return sourceString.endsWith(this.expectedValue);
      case StringComparison.Contains:
        return sourceString.includes(this.expectedValue);
      case StringComparison.DoesNotContain:
        return !sourceString.includes(this.expectedValue);
      default:
        throw new Error("Invalid string comparison operation.");
    }
  }

  clone() {
    return new StringMatcher(
      this.operation,
      this.expectedValue,
      this.matchIndex
    );
  }
}
