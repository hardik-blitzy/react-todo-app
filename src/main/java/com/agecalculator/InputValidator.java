package com.agecalculator;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;

/**
 * Validates and parses user-provided date strings in DD/MM/YYYY format.
 *
 * <p>This class is responsible for converting raw user input into a validated
 * {@link LocalDate} instance. It enforces strict date resolution to reject
 * impossible dates (e.g., 31/02/2020, 29/02/2001) and validates that the
 * parsed date is not in the future.</p>
 *
 * <p>The class uses {@link DateTimeFormatter} with {@link ResolverStyle#STRICT}
 * to ensure that only valid calendar dates are accepted. The pattern uses
 * {@code "dd/MM/uuuu"} (proleptic year) rather than {@code "dd/MM/yyyy"}
 * (year of era) because {@code ResolverStyle.STRICT} requires the unambiguous
 * proleptic year symbol {@code 'u'} — using {@code 'y'} with STRICT mode
 * causes unexpected parse failures for valid dates.</p>
 *
 * <p>Design principles:</p>
 * <ul>
 *   <li><strong>Single Responsibility:</strong> This class only handles input
 *       parsing and validation — no age calculation, no user interaction.</li>
 *   <li><strong>Stateless utility:</strong> All methods are static; no instance
 *       state is maintained.</li>
 *   <li><strong>Defense-in-depth:</strong> The future-date check here is an
 *       input-level validation. {@code AgeCalculator} also performs a
 *       future-date guard at the business-logic level.</li>
 * </ul>
 *
 * <p>Usage example:</p>
 * <pre>{@code
 * LocalDate dob = InputValidator.parseDate("15/08/1998");
 * // dob is LocalDate.of(1998, 8, 15)
 * }</pre>
 *
 * @author AgeCalculator Application
 */
public class InputValidator {

    /**
     * Strict date formatter for parsing dates in DD/MM/YYYY format.
     *
     * <p>Uses the proleptic year pattern {@code "dd/MM/uuuu"} with
     * {@link ResolverStyle#STRICT} to ensure that invalid calendar dates
     * (such as February 31 or February 29 in non-leap years) are properly
     * rejected rather than silently adjusted.</p>
     *
     * <p><strong>Important:</strong> The pattern uses {@code 'u'} (proleptic year)
     * instead of {@code 'y'} (year of era) because {@code ResolverStyle.STRICT}
     * requires an unambiguous year representation. The {@code 'y'} symbol represents
     * "year of era" which is ambiguous without an explicit era designator in strict
     * mode.</p>
     */
    private static final DateTimeFormatter DATE_FORMATTER =
            DateTimeFormatter.ofPattern("dd/MM/uuuu")
                    .withResolverStyle(ResolverStyle.STRICT);

    /**
     * Private constructor to prevent instantiation of this utility class.
     *
     * <p>All methods in this class are static, so instantiation is unnecessary.</p>
     */
    private InputValidator() {
        // Utility class — not meant to be instantiated
    }

    /**
     * Parses and validates a user-provided date string in DD/MM/YYYY format.
     *
     * <p>This method performs three levels of validation:</p>
     * <ol>
     *   <li><strong>Null/empty check:</strong> Rejects {@code null} or blank input
     *       with an {@link IllegalArgumentException}.</li>
     *   <li><strong>Format and calendar validation:</strong> Uses strict date parsing
     *       to reject malformed input (e.g., {@code "abc"}, {@code "1998-08-15"})
     *       and impossible dates (e.g., {@code "31/02/2020"}, {@code "29/02/2001"}).
     *       Invalid input causes a {@link DateTimeParseException}.</li>
     *   <li><strong>Future date check:</strong> Ensures the parsed date is not after
     *       today's date. Future dates are rejected with an
     *       {@link IllegalArgumentException}.</li>
     * </ol>
     *
     * <p>Examples of valid input:</p>
     * <ul>
     *   <li>{@code "15/08/1998"} → {@code LocalDate.of(1998, 8, 15)}</li>
     *   <li>{@code "29/02/2000"} → {@code LocalDate.of(2000, 2, 29)} (valid leap year)</li>
     * </ul>
     *
     * <p>Examples of invalid input:</p>
     * <ul>
     *   <li>{@code "31/02/2020"} → {@code DateTimeParseException} (February has no 31st)</li>
     *   <li>{@code "29/02/2001"} → {@code DateTimeParseException} (2001 is not a leap year)</li>
     *   <li>{@code "abc"} → {@code DateTimeParseException} (not a date)</li>
     *   <li>{@code ""} → {@code IllegalArgumentException} (empty input)</li>
     *   <li>{@code null} → {@code IllegalArgumentException} (null input)</li>
     *   <li>A future date → {@code IllegalArgumentException} (DOB cannot be in the future)</li>
     * </ul>
     *
     * @param input the date string to parse, expected in DD/MM/YYYY format
     * @return a validated {@link LocalDate} representing the parsed date
     * @throws IllegalArgumentException if the input is {@code null}, empty,
     *         or represents a date in the future
     * @throws DateTimeParseException if the input does not match the expected
     *         DD/MM/YYYY format or represents an invalid calendar date
     */
    public static LocalDate parseDate(String input) {
        // Validate that the input is not null or empty
        if (input == null || input.trim().isEmpty()) {
            throw new IllegalArgumentException("Date input cannot be null or empty.");
        }

        // Trim leading and trailing whitespace from the input
        input = input.trim();

        // Parse the date string using the strict formatter.
        // This will throw DateTimeParseException for:
        //   - Invalid format (e.g., "abc", "1998-08-15", "15-08-1998")
        //   - Invalid calendar dates (e.g., "31/02/2020", "29/02/2001")
        LocalDate parsedDate = LocalDate.parse(input, DATE_FORMATTER);

        // Validate that the parsed date is not in the future
        if (parsedDate.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Date of birth cannot be in the future.");
        }

        return parsedDate;
    }
}
