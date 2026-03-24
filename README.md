# Age Calculator

A Java 21 console application that calculates a user's exact age in years, months, and days from a Date of Birth (DOB) input in `DD/MM/YYYY` format.

Built with the modern `java.time` API — uses `java.time.LocalDate` and `java.time.Period` for accurate age calculation with full leap-year handling. Input validation is powered by `java.time.format.DateTimeFormatter` with strict date resolution to reject invalid dates such as `31/02/2020`.

## Prerequisites

- **Java 21** (LTS) — JDK, not just JRE. Verify with `java -version` and `javac -version`.
- **Apache Maven 3.8.7+** — build and dependency management tool. Verify with `mvn -version`.

## Build

Clone the repository and build the project using Maven:

```bash
git clone <repository-url>
cd <repository-directory>
```

**Compile the source code:**

```bash
mvn compile
```

**Compile and package into an executable JAR:**

```bash
mvn package
```

**Clean build artifacts:**

```bash
mvn clean
```

## Usage

After compiling, run the console application with:

```bash
java -cp target/classes com.agecalculator.Main
```

Or, after packaging, run the JAR directly:

```bash
java -jar target/age-calculator-1.0-SNAPSHOT.jar
```

### Sample Interaction

```
Enter your Date of Birth (DD/MM/YYYY): 15/08/1998
Your age is 27 years, 6 months, and 15 days.
```

### Input Validation

The application validates all user input and provides meaningful error messages:

- **Invalid date** — dates that do not exist (e.g., `31/02/2020`) are rejected
- **Future date** — dates after today are rejected with an appropriate message
- **Malformed input** — input that does not match the `DD/MM/YYYY` format is rejected
- **Leap-year awareness** — `29/02/2000` is accepted (valid leap year), `29/02/2001` is rejected (not a leap year)

## Testing

Run the full JUnit 5 test suite with:

```bash
mvn test
```

### Test Coverage

The test suite includes comprehensive coverage across two test classes:

**AgeCalculatorTest** — verifies core age-calculation logic:

- Normal DOB (e.g., `15/08/1998`) — computes correct years, months, and days
- Leap year DOB (`29/02/2000`) — handles February 29 births correctly
- Same-day birth — returns zero years, months, and days
- Age boundary conditions — validates edge cases around month and year transitions

**InputValidatorTest** — verifies input validation and error handling:

- Invalid date (`31/02/2020`) — rejects non-existent dates
- Future date — rejects dates that have not yet occurred
- Wrong format input — rejects input that does not match `DD/MM/YYYY`
- Empty and null input — handles missing input gracefully

## Project Structure

```
├── pom.xml                                        # Maven project descriptor (Java 21, JUnit 5)
├── README.md                                      # Project documentation
├── src/
│   ├── main/java/com/agecalculator/
│   │   ├── Main.java                              # Console entry point (Scanner-based user interaction)
│   │   ├── AgeCalculator.java                     # Core age-calculation logic (LocalDate, Period)
│   │   ├── AgeResult.java                         # Immutable value object (years, months, days)
│   │   └── InputValidator.java                    # Input parsing and validation (strict DateTimeFormatter)
│   └── test/java/com/agecalculator/
│       ├── AgeCalculatorTest.java                 # Unit tests for age-calculation logic
│       └── InputValidatorTest.java                # Unit tests for input validation and error handling
└── blitzy/documentation/
    ├── Project Guide.md                           # Migration handoff documentation
    └── Technical Specifications.md                # Migration specification and file mapping
```

## Design

The application follows Object-Oriented Programming principles with a clean separation of concerns:

| Class | Responsibility |
|---|---|
| **Main** | Console entry point — reads user input via `java.util.Scanner`, delegates to validator and calculator, and displays the formatted result |
| **AgeCalculator** | Core business logic — accepts a `LocalDate` DOB and computes the age as a `Period` using `Period.between()` |
| **AgeResult** | Immutable value object — encapsulates the age breakdown (years, months, days) with a formatted `toString()` output |
| **InputValidator** | Input validation — parses `DD/MM/YYYY` strings into `LocalDate` using `DateTimeFormatter` with `ResolverStyle.STRICT`, rejects future dates and invalid calendar dates |
