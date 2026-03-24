package com.agecalculator;

import java.time.LocalDate;
import java.time.Period;

/**
 * Provides age calculation functionality using {@code java.time} APIs.
 *
 * <p>This class is the core business logic component of the Age Calculator
 * application. It accepts a date of birth and a reference date, computes the
 * exact age difference using {@link Period#between(LocalDate, LocalDate)}, and
 * returns the result as an immutable {@link AgeResult} value object.</p>
 *
 * <p>The class follows the Single Responsibility Principle — it performs ONLY
 * age calculation. Input parsing, user interaction, and output formatting are
 * handled by other classes ({@code InputValidator} and {@code Main}).</p>
 *
 * <p>All methods are static because age calculation is a pure function with no
 * side effects or instance state. A private constructor prevents instantiation.</p>
 *
 * <p><strong>Leap year handling:</strong> {@code Period.between()} handles leap
 * years and varying month lengths natively. For example, a DOB of
 * {@code 29/02/2000} (a valid leap year) is correctly processed without any
 * special-case logic.</p>
 *
 * <p>Usage example:</p>
 * <pre>{@code
 * LocalDate dob = LocalDate.of(1998, 8, 15);
 * LocalDate today = LocalDate.now();
 * AgeResult result = AgeCalculator.calculateAge(dob, today);
 * System.out.println(result);
 * // Output: Your age is 27 years, 7 months, and 9 days.
 * }</pre>
 *
 * @author AgeCalculator Application
 * @see AgeResult
 * @see java.time.Period
 * @see java.time.LocalDate
 */
public class AgeCalculator {

    /**
     * Private constructor to prevent instantiation.
     *
     * <p>Since all methods in this class are static, there is no reason to
     * create instances. This constructor enforces the utility-class pattern.</p>
     */
    private AgeCalculator() {
        // Utility class — instantiation not allowed
    }

    /**
     * Calculates the exact age from a date of birth to a reference date.
     *
     * <p>The age is computed using {@link Period#between(LocalDate, LocalDate)},
     * which handles leap years and varying month lengths natively. The result
     * is returned as an immutable {@link AgeResult} containing the breakdown
     * in years, months, and days.</p>
     *
     * <p>The {@code currentDate} parameter is accepted explicitly (rather than
     * calling {@link LocalDate#now()} internally) to enable deterministic unit
     * testing — tests can pass a fixed reference date for repeatable assertions.</p>
     *
     * <p>This method works for users born in any valid year. There are no
     * artificial constraints on the birth year — any historically valid
     * {@link LocalDate} is accepted.</p>
     *
     * @param dob         the date of birth; must not be {@code null} and must
     *                    not be after {@code currentDate}
     * @param currentDate the reference date to calculate age against; must not
     *                    be {@code null}
     * @return an {@link AgeResult} containing the computed age in years,
     *         months, and days
     * @throws IllegalArgumentException if {@code dob} is {@code null},
     *         {@code currentDate} is {@code null}, or {@code dob} is after
     *         {@code currentDate} (i.e., the date of birth is in the future
     *         relative to the reference date)
     */
    public static AgeResult calculateAge(LocalDate dob, LocalDate currentDate) {
        // Validate that the date of birth is not null
        if (dob == null) {
            throw new IllegalArgumentException("Date of birth cannot be null.");
        }

        // Validate that the current (reference) date is not null
        if (currentDate == null) {
            throw new IllegalArgumentException("Current date cannot be null.");
        }

        // Validate that the date of birth is not in the future
        if (dob.isAfter(currentDate)) {
            throw new IllegalArgumentException("Date of birth cannot be in the future.");
        }

        // Compute the period between the DOB and the reference date.
        // Period.between() handles leap years and varying month lengths natively.
        Period period = Period.between(dob, currentDate);

        // Extract the individual components of the age breakdown
        int years = period.getYears();
        int months = period.getMonths();
        int days = period.getDays();

        // Return an immutable AgeResult value object encapsulating the age
        return new AgeResult(years, months, days);
    }
}
