package com.agecalculator;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Unit tests for the {@link InputValidator} class.
 *
 * <p>This test class comprehensively exercises the {@code InputValidator.parseDate()}
 * method across eight scenarios: two valid-input (positive) paths and six invalid-input
 * (negative) paths. The tests verify that:</p>
 * <ul>
 *   <li>Valid date strings in DD/MM/YYYY format are correctly parsed into
 *       {@link LocalDate} instances.</li>
 *   <li>Invalid calendar dates (e.g., February 31, February 29 in a non-leap year)
 *       are rejected with a {@link DateTimeParseException}.</li>
 *   <li>Future dates are rejected with an {@link IllegalArgumentException}.</li>
 *   <li>Malformed input (wrong format, empty, null) is rejected with the
 *       appropriate exception.</li>
 * </ul>
 *
 * <p>This file replaces the pytest-based HTTP integration tests from the original
 * Python Flask application ({@code tests/test_app.py}) with direct static method
 * invocation and JUnit 5 assertion-based validation.</p>
 *
 * @author AgeCalculator Application
 * @see InputValidator
 */
@DisplayName("InputValidator Tests")
public class InputValidatorTest {

    // ========================================================================
    // Valid Input Tests (Positive Path)
    // ========================================================================

    /**
     * Verifies that a standard, well-formed date string in DD/MM/YYYY format
     * is correctly parsed into the corresponding {@link LocalDate}.
     *
     * <p>Uses the exact sample input from the AAP (section 0.7.3):
     * {@code "15/08/1998"} should yield {@code LocalDate.of(1998, 8, 15)}.</p>
     */
    @Test
    @DisplayName("parses a valid date string correctly")
    void testParseDateValidDate() {
        LocalDate result = InputValidator.parseDate("15/08/1998");

        assertNotNull(result, "Parsed date should not be null");
        assertEquals(LocalDate.of(1998, 8, 15), result,
                "Parsed date should match LocalDate.of(1998, 8, 15)");
    }

    /**
     * Verifies that a valid leap year date (February 29 in a year divisible
     * by 400) is correctly accepted and parsed.
     *
     * <p>The year 2000 is a valid leap year (divisible by 400), so
     * {@code "29/02/2000"} is a legitimate date. This test confirms that the
     * strict resolver in {@link InputValidator} does NOT reject valid leap
     * year dates.</p>
     */
    @Test
    @DisplayName("parses a valid leap year date correctly")
    void testParseDateValidLeapYear() {
        // Verify no exception is thrown for a valid leap year date
        LocalDate result = assertDoesNotThrow(
                () -> InputValidator.parseDate("29/02/2000"),
                "Valid leap year date 29/02/2000 should not throw an exception"
        );

        assertNotNull(result, "Parsed leap year date should not be null");
        assertEquals(LocalDate.of(2000, 2, 29), result,
                "Parsed date should match LocalDate.of(2000, 2, 29)");
    }

    // ========================================================================
    // Invalid Input Tests (Negative Path — Exception Verification)
    // ========================================================================

    /**
     * Verifies that an impossible calendar date (February 31) is rejected.
     *
     * <p>February never has 31 days in any year. This is the KEY test for
     * {@code ResolverStyle.STRICT} — the default SMART resolver would
     * silently adjust {@code "31/02/2020"} to the last valid day of
     * February (29/02/2020), but the STRICT resolver must reject it
     * outright with a {@link DateTimeParseException}.</p>
     */
    @Test
    @DisplayName("throws DateTimeParseException for invalid date 31/02/2020")
    void testParseDateInvalidDateFebruary31() {
        assertThrows(DateTimeParseException.class,
                () -> InputValidator.parseDate("31/02/2020"),
                "February 31 should throw DateTimeParseException");
    }

    /**
     * Verifies that February 29 in a non-leap year is rejected.
     *
     * <p>The year 2001 is NOT a leap year (not divisible by 4), so
     * {@code "29/02/2001"} does not exist in the calendar. The strict
     * resolver must reject it with a {@link DateTimeParseException}.</p>
     */
    @Test
    @DisplayName("throws DateTimeParseException for Feb 29 on non-leap year")
    void testParseDateInvalidNonLeapYear() {
        assertThrows(DateTimeParseException.class,
                () -> InputValidator.parseDate("29/02/2001"),
                "Feb 29 on non-leap year 2001 should throw DateTimeParseException");
    }

    /**
     * Verifies that a date in the far future is rejected as a date of birth.
     *
     * <p>The {@link InputValidator} checks whether the parsed date is after
     * {@code LocalDate.now()} and throws an {@link IllegalArgumentException}
     * if so. A far-future date ({@code "01/01/2999"}) is used to ensure
     * this test remains valid regardless of when it is executed.</p>
     */
    @Test
    @DisplayName("throws IllegalArgumentException for future date")
    void testParseDateRejectsFutureDate() {
        assertThrows(IllegalArgumentException.class,
                () -> InputValidator.parseDate("01/01/2999"),
                "Future date should throw IllegalArgumentException");
    }

    /**
     * Verifies that completely malformed input that does not resemble a date
     * is rejected with a {@link DateTimeParseException}.
     *
     * <p>The input {@code "abc"} cannot be parsed by the
     * {@code DateTimeFormatter} at all, triggering a parse exception.</p>
     */
    @Test
    @DisplayName("throws DateTimeParseException for wrong format input")
    void testParseDateWrongFormat() {
        assertThrows(DateTimeParseException.class,
                () -> InputValidator.parseDate("abc"),
                "Malformed input 'abc' should throw DateTimeParseException");
    }

    /**
     * Verifies that an empty string input is rejected before any date
     * parsing is attempted.
     *
     * <p>The {@link InputValidator} checks for null and empty strings at
     * the start of {@code parseDate()} and throws an
     * {@link IllegalArgumentException} with a descriptive message.</p>
     */
    @Test
    @DisplayName("throws IllegalArgumentException for empty input")
    void testParseDateEmptyInput() {
        assertThrows(IllegalArgumentException.class,
                () -> InputValidator.parseDate(""),
                "Empty string should throw IllegalArgumentException");
    }

    /**
     * Verifies that a {@code null} input is rejected before any date
     * parsing is attempted.
     *
     * <p>The {@link InputValidator} has an explicit null check at the
     * start of {@code parseDate()} and throws an
     * {@link IllegalArgumentException} with a descriptive message.</p>
     */
    @Test
    @DisplayName("throws IllegalArgumentException for null input")
    void testParseDateNullInput() {
        assertThrows(IllegalArgumentException.class,
                () -> InputValidator.parseDate(null),
                "Null input should throw IllegalArgumentException");
    }
}
