package com.agecalculator;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Scanner;

/**
 * Console entry point for the Age Calculator application.
 *
 * <p>This class serves as the application's main entry point, providing an
 * interactive console interface that accepts a user's Date of Birth (DOB) in
 * {@code DD/MM/YYYY} format, calculates their exact age in years, months, and
 * days, and displays the formatted result.</p>
 *
 * <p>The class follows the Single Responsibility Principle — it handles ONLY
 * user interaction (console input/output). Date parsing and validation are
 * delegated to {@link InputValidator}, age computation is delegated to
 * {@link AgeCalculator}, and result formatting is handled by
 * {@link AgeResult#toString()}.</p>
 *
 * <p>Error handling is comprehensive: {@link DateTimeParseException} is caught
 * for malformed or invalid dates, {@link IllegalArgumentException} is caught
 * for future dates and null/empty input, and a general {@link Exception} catch
 * provides a safety net for any unexpected errors.</p>
 *
 * <p>Sample interaction:</p>
 * <pre>
 * Enter your Date of Birth (DD/MM/YYYY): 15/08/1998
 * Your age is 27 years, 6 months, and 15 days.
 * </pre>
 *
 * @author AgeCalculator Application
 * @see InputValidator
 * @see AgeCalculator
 * @see AgeResult
 */
public class Main {

    /**
     * Application entry point — prompts the user for their Date of Birth,
     * calculates their exact age, and displays the result.
     *
     * <p>Execution flow:</p>
     * <ol>
     *   <li>Opens a {@link Scanner} on {@code System.in} via try-with-resources</li>
     *   <li>Prompts the user for their DOB in {@code DD/MM/YYYY} format</li>
     *   <li>Reads the input line via {@link Scanner#nextLine()}</li>
     *   <li>Delegates to {@link InputValidator#parseDate(String)} to parse and
     *       validate the input into a {@link LocalDate}</li>
     *   <li>Delegates to {@link AgeCalculator#calculateAge(LocalDate, LocalDate)}
     *       with the parsed DOB and the current system date
     *       ({@link LocalDate#now()})</li>
     *   <li>Prints the formatted age using {@link AgeResult#toString()}</li>
     * </ol>
     *
     * <p>If any error occurs during parsing or calculation, a meaningful error
     * message is displayed and the application exits gracefully.</p>
     *
     * @param args command-line arguments (not used by this application)
     */
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            // Prompt the user for their Date of Birth
            System.out.print("Enter your Date of Birth (DD/MM/YYYY): ");

            // Read the full input line from the console
            String input = scanner.nextLine();

            // Delegate to InputValidator for parsing and validation.
            // This will throw DateTimeParseException for invalid format or
            // impossible dates (e.g., 31/02/2020, 29/02/2001), and
            // IllegalArgumentException for null/empty input or future dates.
            LocalDate dob = InputValidator.parseDate(input);

            // Delegate to AgeCalculator for age computation.
            // Uses LocalDate.now() as the reference date for calculating
            // the exact difference in years, months, and days.
            AgeResult result = AgeCalculator.calculateAge(dob, LocalDate.now());

            // Display the formatted result.
            // AgeResult.toString() returns: "Your age is X years, Y months, and Z days."
            System.out.println(result.toString());

        } catch (DateTimeParseException e) {
            // Handles invalid date format or impossible calendar dates
            // (e.g., "abc", "31/02/2020", "1998-08-15", "29/02/2001")
            System.err.println("Invalid date format. Please use DD/MM/YYYY format with a valid date.");
        } catch (IllegalArgumentException e) {
            // Handles future dates, null input, and empty input.
            // The exception message from InputValidator or AgeCalculator
            // is descriptive, so we print it directly.
            System.err.println(e.getMessage());
        } catch (Exception e) {
            // Safety net for any unexpected runtime errors
            System.err.println("An unexpected error occurred: " + e.getMessage());
        }
    }
}
