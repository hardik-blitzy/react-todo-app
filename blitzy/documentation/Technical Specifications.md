# Technical Specification

# 0. Agent Action Plan

## 0.1 Intent Clarification

### 0.1.1 Core Refactoring Objective

Based on the prompt, the Blitzy platform understands that the refactoring objective is to perform a **complete tech-stack migration** of the existing Python 3 / Flask web server application into a **standalone Java console application** that calculates a user's exact age from their Date of Birth (DOB). This is not an incremental refactoring of existing logic — it is a full replacement of both the technology stack and the application domain, from an HTTP greeting server to an interactive age-calculation utility.

- **Refactoring type:** Tech stack migration (Python → Java) combined with a complete functional transformation (HTTP server → console-based age calculator)
- **Target repository:** Same repository — the existing Python/Flask codebase is replaced in-place with the new Java/Maven project
- **Refactoring goals:**
  - Replace all Python source code (`app.py`, `tests/test_app.py`, `tests/__init__.py`) with a Java project built using Maven
  - Implement a console application that accepts a Date of Birth in `DD/MM/YYYY` format, calculates the exact age in years, months, and days using `java.time.LocalDate` and `java.time.Period`, and displays the result
  - Provide robust input validation: reject future dates, handle invalid date strings (e.g., `31/02/2020`), and display meaningful error messages
  - Follow Object-Oriented Programming (OOP) principles with clean separation of concerns
  - Include comprehensive JUnit 5 test coverage for normal dates, leap years, invalid dates, future dates, and malformed input
  - Replace `requirements.txt` with a Maven `pom.xml` as the dependency manifest
  - Update `README.md` to reflect the new Java project setup, build, and execution instructions
- **Implicit requirements surfaced by the platform:**
  - The existing Flask features (HTTP endpoints, security headers, 405→404 conversion) are entirely superseded and have no equivalent in the target application
  - The Python virtual environment and pip-based workflow are replaced by Maven-based build and dependency management
  - All existing pytest-based tests must be replaced with JUnit 5 equivalents covering the new age-calculation logic
  - Leap-year handling is critical — `java.time.Period.between()` handles this natively when used with `java.time.LocalDate`
  - The application must use `java.time.format.DateTimeFormatter` with a strict resolver style to properly reject invalid dates like `31/02/2020`

### 0.1.2 Technical Interpretation

This refactoring translates to the following technical transformation strategy:

- **Current architecture:** A single-file Python Flask HTTP server (`app.py`, 81 lines) with two GET endpoints, error-handling middleware, security headers, and an in-process pytest test suite — all running on Python 3.12+ with pip-managed dependencies
- **Target architecture:** A multi-class Java 21 console application organized under a standard Maven directory layout (`src/main/java/` and `src/test/java/`), using `java.time` APIs for date arithmetic, `java.util.Scanner` for user input, and JUnit 5 (Jupiter) for automated testing
- **Transformation rules:**
  - Every Python source file is deleted and replaced by its Java equivalent
  - The Flask application instance, route decorators, error handlers, and security hooks have no counterpart in the target — they are removed entirely
  - The `requirements.txt` manifest is replaced by `pom.xml` declaring JUnit Jupiter as the sole external dependency
  - The `README.md` is rewritten to document Java 21 prerequisites, Maven build commands, and application usage
  - The `tests/` directory (Python package) is replaced by `src/test/java/` (Maven convention)
  - The `blitzy/documentation/` folder is preserved unchanged as it is documentation-centric and not part of the runtime codebase

## 0.2 Source Analysis

### 0.2.1 Comprehensive Source File Discovery

The existing repository is a minimal Python/Flask HTTP server produced by a prior Node.js-to-Python migration. Every runtime and test file in the repository is subject to this refactoring because the entire technology stack and application domain are being replaced. The following exhaustive inventory was compiled by inspecting the repository root, `tests/`, and `blitzy/` directories.

**Current Structure:**

```
Current:
├── app.py                          (81 lines — Flask application: routes, error handlers, security headers, startup)
├── requirements.txt                (2 lines — flask==3.1.3, pytest==9.0.2)
├── README.md                       (93 lines — Python/Flask documentation: setup, usage, API endpoints, testing)
├── tests/
│   ├── __init__.py                 (0 lines — empty package marker for pytest discovery)
│   └── test_app.py                 (69 lines — 7 integration tests: status codes, response bodies, 404/405 handling)
└── blitzy/
    └── documentation/
        ├── Project Guide.md        (migration handoff and implementation status documentation)
        └── Technical Specifications.md (migration specification and file-mapping documentation)
```

### 0.2.2 Source File Inventory

| Source File | Lines | Purpose | Refactoring Action |
|---|---|---|---|
| `app.py` | 81 | Flask web server with `GET /` and `GET /evening` endpoints, 405→404 error conversion, security headers, configurable port | **Delete** — entirely replaced by Java age-calculator classes |
| `requirements.txt` | 2 | Pins `flask==3.1.3` and `pytest==9.0.2` | **Delete** — replaced by Maven `pom.xml` |
| `README.md` | 93 | Documents Python prerequisites, pip installation, Flask server usage, pytest testing | **Rewrite** — updated for Java 21, Maven build, and age-calculator usage |
| `tests/__init__.py` | 0 | Empty Python package marker | **Delete** — Maven uses directory convention, no package marker needed |
| `tests/test_app.py` | 69 | pytest integration tests for HTTP endpoints | **Delete** — replaced by JUnit 5 tests for age-calculation logic |
| `blitzy/documentation/Project Guide.md` | — | Migration handoff documentation | **Preserve** — documentation artifact, not part of runtime |
| `blitzy/documentation/Technical Specifications.md` | — | Migration specification and file mapping | **Preserve** — documentation artifact, not part of runtime |

### 0.2.3 Legacy Code Patterns Identified

- **Monolithic single-file application:** `app.py` contains all application logic (routing, error handling, security, startup) in a single file. The target Java application will decompose this into separate classes following OOP principles.
- **Python-specific idioms to remove:** `@app.route` decorators, `@app.errorhandler`, `@app.after_request` hooks, `if __name__ == '__main__':` guard, `os.environ.get()` for configuration — none of these have equivalents in the target console application.
- **Test framework migration:** pytest fixtures (`@pytest.fixture`), Flask test client (`app.test_client()`), and HTTP assertion patterns (`response.status_code`, `response.data.decode()`) are all replaced by JUnit 5 annotations (`@Test`, `@DisplayName`), assertions (`assertEquals`, `assertThrows`), and direct method invocation.
- **Dependency manifest migration:** `requirements.txt` (2 pip packages) is replaced by `pom.xml` (Maven POM with JUnit Jupiter dependency).

## 0.3 Scope Boundaries

### 0.3.1 Exhaustively In Scope

**Source transformations (files to delete or rewrite):**
- `app.py` — Delete the Python Flask application entirely
- `requirements.txt` — Delete the pip dependency manifest
- `README.md` — Rewrite with Java/Maven documentation
- `tests/__init__.py` — Delete the Python package marker
- `tests/test_app.py` — Delete the pytest test suite

**New Java source files to create:**
- `pom.xml` — Maven project descriptor with JUnit 5 dependency
- `src/main/java/com/agecalculator/AgeCalculator.java` — Core age-calculation logic (OOP service class)
- `src/main/java/com/agecalculator/AgeResult.java` — Value object to hold years, months, days result
- `src/main/java/com/agecalculator/InputValidator.java` — Input validation and date parsing
- `src/main/java/com/agecalculator/Main.java` — Console entry point with Scanner-based user interaction

**New test files to create:**
- `src/test/java/com/agecalculator/AgeCalculatorTest.java` — Unit tests for age-calculation logic
- `src/test/java/com/agecalculator/InputValidatorTest.java` — Unit tests for input validation and error handling

**Documentation updates:**
- `README.md` — Complete rewrite documenting Java 21 prerequisites, Maven build instructions, usage examples, and test execution

### 0.3.2 Explicitly Out of Scope

The following items are explicitly excluded based on the user's requirements and the nature of the refactoring:

- **Existing Flask features** — HTTP endpoints (`GET /`, `GET /evening`), error handlers (405→404 conversion), security headers (`Server`, `X-Content-Type-Options`), configurable port binding — none of these concepts apply to the target console application
- **Web server functionality** — The target application is a console utility, not an HTTP server; no web framework is included
- **Database integration** — No data persistence layer is required
- **GUI implementation** — The user lists Java Swing/JavaFX as optional enhancements; the core requirement is a console application only
- **Next-birthday countdown** — Listed as an optional enhancement; not included in the core scope
- **Total age in months/days display** — Listed as an optional enhancement; not included in the core scope
- **Reusable utility class packaging** — Listed as an optional enhancement; the core OOP design already supports reuse
- **Docker containerization** — Not mentioned in requirements
- **CI/CD pipeline** — Not mentioned in requirements
- **Modification of `blitzy/documentation/` files** — These are documentation artifacts from the prior migration and are preserved unchanged

### 0.3.3 Scope Rationale

The entire existing Python codebase is replaced because the refactoring involves both a technology-stack migration (Python → Java) and a complete functional transformation (HTTP server → age calculator). There is no behavioral preservation mandate — the target application serves an entirely different purpose. The only structural continuity is the `README.md` file (rewritten) and the `blitzy/documentation/` folder (preserved).

## 0.4 Target Design

### 0.4.1 Refactored Structure Planning

The target application follows the standard Maven directory layout with a clean Object-Oriented design separating concerns into distinct classes. The package `com.agecalculator` contains all source files.

**Target Architecture:**

```
Target:
├── pom.xml                                                (Maven project descriptor — Java 21, JUnit 5)
├── README.md                                              (Rewritten — Java/Maven setup, build, usage, testing)
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── agecalculator/
│   │               ├── Main.java                          (Console entry point — Scanner input, output formatting)
│   │               ├── AgeCalculator.java                 (Core logic — LocalDate, Period, age computation)
│   │               ├── AgeResult.java                     (Value object — years, months, days fields)
│   │               └── InputValidator.java                (Validation — date parsing, future-date check, format check)
│   └── test/
│       └── java/
│           └── com/
│               └── agecalculator/
│                   ├── AgeCalculatorTest.java              (Unit tests — normal DOB, leap year, edge cases)
│                   └── InputValidatorTest.java             (Unit tests — invalid dates, future dates, wrong format)
└── blitzy/
    └── documentation/
        ├── Project Guide.md                               (Preserved unchanged)
        └── Technical Specifications.md                    (Preserved unchanged)
```

### 0.4.2 Design Pattern Applications

The target design applies the following Object-Oriented principles and patterns as required by the user:

- **Single Responsibility Principle:** Each class has one well-defined purpose:
  - `Main` — user interaction (input/output) only
  - `AgeCalculator` — pure date arithmetic (accepts `LocalDate`, returns `AgeResult`)
  - `AgeResult` — immutable data carrier for the age breakdown
  - `InputValidator` — input parsing and validation logic
- **Separation of Concerns:** User interaction (`Main`) is decoupled from business logic (`AgeCalculator`) and validation (`InputValidator`), enabling each component to be tested and evolved independently
- **Value Object Pattern:** `AgeResult` is an immutable object encapsulating years, months, and days — it provides a `toString()` override for formatted output
- **Dependency Injection (informal):** `Main` delegates to `AgeCalculator` and `InputValidator` through direct method calls with no tight coupling to framework infrastructure — methods accept parameters and return results, making unit testing straightforward

### 0.4.3 Web Search Research Conducted

The following research was conducted to validate the target design:

- **Java `java.time` API best practices:** Confirmed that `LocalDate` combined with `Period.between()` is the standard, recommended approach for age calculation in Java 8+. The `Period` class handles varying month lengths and leap years automatically. `DateTimeFormatter` with `ResolverStyle.STRICT` is the correct approach for rejecting invalid dates like `31/02/2020`.
- **Java LTS version landscape:** Java 25 is the latest LTS (September 2025), Java 21 is the previous LTS (September 2023). Java 21 is selected as the target runtime because it is widely available, well-supported, and the `java.time` APIs required by the user have been stable since Java 8.
- **JUnit 5 Maven setup:** JUnit Jupiter 5.11.4 is a stable release in the 5.x line. The `junit-jupiter` aggregator artifact simplifies dependency management. The `maven-surefire-plugin` version 3.5.5 is the latest stable release with full JUnit 5 support.
- **Maven project conventions:** Standard directory layout (`src/main/java/`, `src/test/java/`) with `pom.xml` at the project root. The `maven-compiler-plugin` is configured to target Java 21.

### 0.4.4 Class Design Details

**Main.java** — Console entry point:
- Uses `java.util.Scanner` to read user input from `System.in`
- Prompts the user for DOB in `DD/MM/YYYY` format
- Delegates to `InputValidator.parseDate()` for parsing and validation
- Delegates to `AgeCalculator.calculateAge()` for age computation
- Prints the formatted result using `AgeResult.toString()`
- Wraps all logic in `try-catch` for graceful error handling

**AgeCalculator.java** — Core business logic:
- Static method `calculateAge(LocalDate dob, LocalDate currentDate)` returns an `AgeResult`
- Uses `Period.between(dob, currentDate)` for years, months, and days
- Validates that DOB is not after the current date (throws `IllegalArgumentException`)

**AgeResult.java** — Immutable value object:
- Fields: `int years`, `int months`, `int days`
- Constructor, getters, and `toString()` returning: `"Your age is X years, Y months, and Z days."`

**InputValidator.java** — Input validation:
- Static method `parseDate(String input)` returns `LocalDate`
- Uses `DateTimeFormatter.ofPattern("dd/MM/yyyy")` with `ResolverStyle.STRICT`
- Validates format correctness and date validity
- Checks that the parsed date is not in the future
- Throws `DateTimeParseException` for invalid formats and `IllegalArgumentException` for future dates

## 0.5 Transformation Mapping

### 0.5.1 File-by-File Transformation Plan

The following table maps every target file to its source file (where applicable) and describes the transformation. This refactoring is executed in **one phase** — all files are processed together.

| Target File | Transformation | Source File | Key Changes |
|---|---|---|---|
| `pom.xml` | CREATE | `requirements.txt` | Replace pip dependency manifest with Maven POM declaring Java 21 compiler settings, JUnit Jupiter 5.11.4 test dependency, and maven-surefire-plugin 3.5.5 |
| `README.md` | UPDATE | `README.md` | Complete rewrite: replace Python/Flask documentation with Java 21 prerequisites, Maven build commands (`mvn compile`, `mvn test`, `mvn package`), application usage instructions, and project structure |
| `src/main/java/com/agecalculator/Main.java` | CREATE | `app.py` | Replace Flask route handlers and server startup with a console entry point using `Scanner` for user input, delegating to `AgeCalculator` and `InputValidator` |
| `src/main/java/com/agecalculator/AgeCalculator.java` | CREATE | `app.py` | Extract age-calculation business logic into a dedicated class using `java.time.LocalDate` and `java.time.Period` — replaces the Flask response-generation pattern |
| `src/main/java/com/agecalculator/AgeResult.java` | CREATE | — | New immutable value object with `years`, `months`, `days` fields and formatted `toString()` output — no direct Python equivalent exists |
| `src/main/java/com/agecalculator/InputValidator.java` | CREATE | — | New validation class using `DateTimeFormatter` with strict resolver — replaces implicit Flask input handling with explicit DOB validation |
| `src/test/java/com/agecalculator/AgeCalculatorTest.java` | CREATE | `tests/test_app.py` | Replace pytest HTTP integration tests with JUnit 5 unit tests covering: normal DOB (e.g., 15/08/1998), leap year DOB (29/02/2000), same-day birth, and age boundary conditions |
| `src/test/java/com/agecalculator/InputValidatorTest.java` | CREATE | `tests/test_app.py` | Replace pytest negative-path tests with JUnit 5 validation tests covering: invalid date (31/02/2020), future date, wrong format input, empty input, and null handling |

### 0.5.2 Files to Delete

The following existing files are completely removed as part of this migration:

| File to Delete | Reason |
|---|---|
| `app.py` | Python Flask application — entirely replaced by Java source files |
| `requirements.txt` | pip dependency manifest — replaced by `pom.xml` |
| `tests/__init__.py` | Python package marker — Maven uses directory convention |
| `tests/test_app.py` | pytest test suite — replaced by JUnit 5 test classes |

### 0.5.3 Files Preserved Unchanged

| File Preserved | Reason |
|---|---|
| `blitzy/documentation/Project Guide.md` | Documentation artifact — not part of runtime codebase |
| `blitzy/documentation/Technical Specifications.md` | Documentation artifact — not part of runtime codebase |

### 0.5.4 Cross-File Dependencies

**Import statement mapping (Python → Java):**

- Old (Python): `from flask import Flask` → Deleted entirely (no web framework in target)
- Old (Python): `import pytest` / `from app import app` → Deleted entirely
- New (Java): `import java.time.LocalDate;` + `import java.time.Period;` + `import java.time.format.DateTimeFormatter;` in `AgeCalculator.java` and `InputValidator.java`
- New (Java): `import java.util.Scanner;` in `Main.java`
- New (Java): `import org.junit.jupiter.api.Test;` + `import static org.junit.jupiter.api.Assertions.*;` in test classes

**Intra-project dependencies (Java):**

- `Main.java` → imports `AgeCalculator`, `AgeResult`, `InputValidator`
- `AgeCalculator.java` → imports `AgeResult`
- `AgeCalculatorTest.java` → imports `AgeCalculator`, `AgeResult`
- `InputValidatorTest.java` → imports `InputValidator`

**Configuration updates:**

- `pom.xml` replaces `requirements.txt` as the sole dependency and build configuration file
- `README.md` is rewritten to reflect Maven lifecycle commands instead of pip/pytest commands

### 0.5.5 One-Phase Execution

The entire refactoring is executed by Blitzy in **one phase**. All file deletions, creations, and updates occur in a single pass. There is no multi-phase staging or incremental migration.

## 0.6 Dependency Inventory

### 0.6.1 Key Packages

The following table lists all key public packages relevant to this refactoring. Versions have been verified through web search and Maven Central repository inspection.

| Registry | Package Name | Version | Purpose |
|---|---|---|---|
| OpenJDK | `openjdk` | 21 (LTS) | Java runtime and compiler — provides `java.time.LocalDate`, `java.time.Period`, `java.time.format.DateTimeFormatter`, `java.util.Scanner` |
| Maven Central | `org.junit.jupiter:junit-jupiter` | 5.11.4 | JUnit 5 aggregator artifact — includes `junit-jupiter-api`, `junit-jupiter-engine`, and `junit-jupiter-params` for test authoring and execution |
| Maven Central | `org.apache.maven.plugins:maven-surefire-plugin` | 3.5.5 | Maven plugin for running JUnit 5 tests during the `test` phase of the Maven build lifecycle |
| Maven Central | `org.apache.maven.plugins:maven-compiler-plugin` | 3.13.0 | Maven plugin for compiling Java source code — configured to target Java 21 source and target levels |
| Apache | `maven` | 3.8.7+ | Build tool — manages project compilation, testing, packaging, and dependency resolution via `pom.xml` |

**Packages removed (Python dependencies no longer needed):**

| Registry | Package Name | Version | Reason for Removal |
|---|---|---|---|
| PyPI | `flask` | 3.1.3 | Python web framework — replaced by Java `java.time` standard library APIs |
| PyPI | `pytest` | 9.0.2 | Python test framework — replaced by JUnit Jupiter 5.11.4 |

### 0.6.2 Dependency Updates

**Import Refactoring:**

Since this is a full technology-stack replacement, all Python imports are deleted and replaced by Java imports. There are no incremental import updates — every file is either deleted or created from scratch.

- Files requiring import updates: **None** (all source files are either deleted or newly created)
- Import transformation rules:
  - Old: `from flask import Flask` → Deleted
  - Old: `import os` → Deleted
  - Old: `import pytest` → Deleted
  - Old: `from app import app` → Deleted
  - New: `import java.time.LocalDate;` (in `AgeCalculator.java`, `InputValidator.java`)
  - New: `import java.time.Period;` (in `AgeCalculator.java`)
  - New: `import java.time.format.DateTimeFormatter;` (in `InputValidator.java`)
  - New: `import java.time.format.ResolverStyle;` (in `InputValidator.java`)
  - New: `import java.util.Scanner;` (in `Main.java`)
  - New: `import org.junit.jupiter.api.Test;` (in test classes)
  - New: `import org.junit.jupiter.api.DisplayName;` (in test classes)
  - New: `import static org.junit.jupiter.api.Assertions.*;` (in test classes)

**External Reference Updates:**

- Build file: `requirements.txt` → `pom.xml` (complete replacement)
- Documentation: `README.md` (complete rewrite to reflect Java/Maven workflow)
- No CI/CD files exist in the repository — no pipeline updates needed
- No `.gitignore` exists — a Java-specific `.gitignore` may optionally be created to exclude `target/`, `*.class`, and IDE files

## 0.7 Refactoring Rules

### 0.7.1 User-Specified Rules and Requirements

The following rules and constraints are derived directly from the user's prompt and must be honored throughout the refactoring:

- **Use `java.time.LocalDate`** — All date representations must use the modern `java.time` API, never the legacy `java.util.Date` or `java.util.Calendar` classes
- **Use `java.time.Period`** — Age calculation must use `Period.between()` to compute the difference between the DOB and the current system date in years, months, and days
- **Use `java.time.format.DateTimeFormatter`** — Date parsing must use `DateTimeFormatter` with the pattern `"dd/MM/yyyy"` and strict resolution to properly reject invalid dates
- **Follow Object-Oriented Programming principles** — The application must be decomposed into multiple classes with clear responsibilities, not written as a single monolithic class
- **Use proper exception handling with `try-catch`** — All user input processing must be wrapped in exception-handling blocks with meaningful error messages displayed to the user
- **Handle leap years correctly** — The application must correctly process DOBs like `29/02/2000` (valid leap year) and reject `29/02/2001` (invalid non-leap year)
- **Work for users born in any valid year** — No artificial constraints on the birth year; the application must handle any historically valid date
- **Input format: `DD/MM/YYYY`** — The application must accept dates exclusively in this format
- **Output format:** `"Your age is X years, Y months, and Z days."` — The output must follow this exact phrasing

### 0.7.2 Special Instructions and Constraints

- **Clean and readable coding standards** — The user explicitly requires clean, readable code. Java naming conventions must be followed: camelCase for methods and variables, PascalCase for classes, UPPER_SNAKE_CASE for constants
- **Test cases to cover (user-specified):**
  - ✅ Normal DOB (e.g., `15/08/1998`)
  - ✅ Leap year DOB (`29/02/2000`)
  - ❌ Invalid date (`31/02/2020`)
  - ❌ Future date
  - ❌ Wrong format input
- **No behavioral preservation mandate** — Unlike the prior Node.js→Python migration, this refactoring does not require preserving the existing application's behavior. The target application serves an entirely different purpose.
- **Console application only** — The core requirement is a command-line utility. GUI enhancements (Swing, JavaFX) are listed as optional and are out of scope.

### 0.7.3 User-Provided Examples

**User Example — Sample Input:**

```plaintext
Enter your Date of Birth (DD/MM/YYYY): 15/08/1998
```

**User Example — Sample Output:**

```plaintext
Your age is 27 years, 6 months, and 15 days.
```

These examples must be used as the reference for the application's interactive behavior and output formatting.

## 0.8 References

### 0.8.1 Codebase Files and Folders Searched

The following files and folders were searched and analyzed across the repository to derive the conclusions documented in this Agent Action Plan:

| Path | Type | Purpose of Inspection |
|---|---|---|
| `` (root) | Folder | Discovered top-level project structure: `app.py`, `requirements.txt`, `README.md`, `tests/`, `blitzy/` |
| `app.py` | File | Read complete contents (81 lines) — understood Flask application architecture, route handlers, error handling, security headers, and startup logic |
| `requirements.txt` | File | Read complete contents (2 lines) — identified pinned dependencies: `flask==3.1.3`, `pytest==9.0.2` |
| `README.md` | File | Read complete contents (93 lines) — documented Python 3.12+ prerequisite, pip workflow, API endpoints table, pytest commands, and project structure |
| `tests/` | Folder | Explored directory structure — found `__init__.py` (empty) and `test_app.py` |
| `tests/test_app.py` | File | Read complete contents (69 lines) — analyzed 7 pytest integration tests: status codes, response bodies, 404/405 handling, fixture pattern |
| `tests/__init__.py` | File | Confirmed empty package marker |
| `blitzy/` | Folder | Explored directory structure — found `blitzy/documentation/` subfolder |
| `blitzy/documentation/` | Folder | Listed contents — found `Project Guide.md` and `Technical Specifications.md` (preserved unchanged) |

### 0.8.2 Technical Specification Sections Retrieved

The following sections from the existing Technical Specification document were retrieved and analyzed for background context:

| Section | Key Information Extracted |
|---|---|
| 1.1 Executive Summary | Confirmed the repository contains a Flask Hello World Server migrated from Node.js/Express.js; 100% AAP compliance; 7/7 tests passing |
| 1.3 Scope | Identified complete in-scope/out-of-scope boundaries of the prior migration; confirmed no external integrations exist |
| 2.1 Feature Catalog | Cataloged all 8 features of the current Flask application (F-001 through F-008) — all are replaced in this refactoring |
| 3.1 Technology Stack Overview | Confirmed current stack: Python 3.12+, Flask 3.1.3, pytest 9.0.2, ~8 transitive dependencies |
| 3.2 Programming Languages | Confirmed Python is the sole language; Python 3.12+ minimum version documented |
| 5.1 High-Level Architecture | Understood single-file monolith architecture, conditional startup guard, in-process test client pattern |

### 0.8.3 Web Searches Conducted

| Search Query | Key Findings |
|---|---|
| Java 21 LocalDate Period age calculator best practices | Confirmed `Period.between()` with `LocalDate` is the standard approach; `DateTimeFormatter` with strict resolver for input validation |
| Java latest LTS version 2025 2026 | Java 25 LTS released September 2025; Java 21 LTS (September 2023) remains widely adopted; selected Java 21 as target runtime |
| JUnit 5 Maven project structure best practices | Standard Maven layout: `src/main/java/` and `src/test/java/`; `junit-jupiter` aggregator artifact simplifies dependencies; `maven-surefire-plugin` ≥ 2.22.0 required |
| JUnit Jupiter latest version 2025 2026 | JUnit 6.0.3 is the latest GA (February 2026); JUnit 5.11.4 is the latest stable 5.x release; selected 5.11.4 for broad compatibility |
| maven-surefire-plugin latest version 2025 | Version 3.5.5 is the latest stable release |

### 0.8.4 Attachments and External Metadata

- **Attachments provided:** None (0 attachments)
- **Figma URLs provided:** None
- **Environment variables provided:** None
- **Secrets provided:** None
- **Setup instructions provided:** None
- **Implementation rules provided:** None

