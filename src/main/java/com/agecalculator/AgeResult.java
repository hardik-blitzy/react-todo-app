package com.agecalculator;

/**
 * Immutable value object representing an age breakdown in years, months, and days.
 *
 * <p>This class implements the Value Object Pattern to cleanly separate data
 * representation from computation logic. Once constructed, an {@code AgeResult}
 * instance cannot be modified — all fields are {@code private final} and no
 * setter methods are provided.</p>
 *
 * <p>The {@link #toString()} method returns a human-readable string in the
 * exact format: {@code "Your age is X years, Y months, and Z days."}</p>
 *
 * <p>Usage example:</p>
 * <pre>{@code
 * AgeResult result = new AgeResult(27, 6, 15);
 * System.out.println(result);
 * // Output: Your age is 27 years, 6 months, and 15 days.
 * }</pre>
 *
 * @author AgeCalculator Application
 */
public class AgeResult {

    /** The number of complete years in the age breakdown. */
    private final int years;

    /** The number of complete months (beyond full years) in the age breakdown. */
    private final int months;

    /** The number of remaining days (beyond full months) in the age breakdown. */
    private final int days;

    /**
     * Constructs a new {@code AgeResult} with the specified years, months, and days.
     *
     * <p>All three values are stored as-is. No validation is performed on the
     * arguments — the caller (typically {@code AgeCalculator}) is responsible
     * for ensuring the values are logically consistent and non-negative.</p>
     *
     * @param years  the number of complete years
     * @param months the number of complete months beyond full years
     * @param days   the number of remaining days beyond full months
     */
    public AgeResult(int years, int months, int days) {
        this.years = years;
        this.months = months;
        this.days = days;
    }

    /**
     * Returns the number of complete years in this age breakdown.
     *
     * @return the years component of the age
     */
    public int getYears() {
        return this.years;
    }

    /**
     * Returns the number of complete months (beyond full years) in this age breakdown.
     *
     * @return the months component of the age
     */
    public int getMonths() {
        return this.months;
    }

    /**
     * Returns the number of remaining days (beyond full months) in this age breakdown.
     *
     * @return the days component of the age
     */
    public int getDays() {
        return this.days;
    }

    /**
     * Returns a human-readable string representation of this age breakdown.
     *
     * <p>The returned string follows the exact format required by the application:
     * {@code "Your age is X years, Y months, and Z days."}</p>
     *
     * <p>Example output: {@code "Your age is 27 years, 6 months, and 15 days."}</p>
     *
     * @return a formatted string describing the age in years, months, and days
     */
    @Override
    public String toString() {
        return String.format("Your age is %d years, %d months, and %d days.", years, months, days);
    }
}
