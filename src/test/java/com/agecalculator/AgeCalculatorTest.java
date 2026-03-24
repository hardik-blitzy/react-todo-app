package com.agecalculator;

import java.time.LocalDate;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Unit tests for the {@link AgeCalculator} class.
 *
 * <p>This test class replaces the original pytest HTTP integration tests from
 * {@code tests/test_app.py} (which tested Flask endpoints) with JUnit 5 unit
 * tests targeting the Java age-calculation business logic directly.</p>
 *
 * <p>All test methods use FIXED dates constructed via {@link LocalDate#of(int, int, int)}
 * to guarantee deterministic, repeatable assertions regardless of when the tests
 * are executed. {@link LocalDate#now()} is never used.</p>
 *
 * <p>Test coverage includes:</p>
 * <ul>
 *   <li>Normal date of birth — verifies correct years, months, days breakdown</li>
 *   <li>Leap year date of birth — confirms {@code Period.between()} handles Feb 29 correctly</li>
 *   <li>Same-day birth — verifies zero age (0 years, 0 months, 0 days)</li>
 *   <li>Year boundary crossing — verifies correct calculation at Dec 31 → Jan 1</li>
 *   <li>Future date rejection — ensures {@link IllegalArgumentException} is thrown</li>
 *   <li>Null DOB parameter — ensures {@link IllegalArgumentException} is thrown</li>
 *   <li>Null current date parameter — ensures {@link IllegalArgumentException} is thrown</li>
 * </ul>
 *
 * @author AgeCalculator Application
 * @see AgeCalculator
 * @see AgeResult
 */
@DisplayName("AgeCalculator Tests")
public class AgeCalculatorTest {

    /**
     * Verifies that {@link AgeCalculator#calculateAge(LocalDate, LocalDate)} correctly
     * computes the age for a normal (non-leap-year) date of birth.
     *
     * <p>Test data: DOB = August 15, 1998; Reference date = March 1, 2024.
     * Expected result: 25 years, 6 months, 15 days.</p>
     *
     * <p>Calculation breakdown:</p>
     * <ul>
     *   <li>1998-08-15 → 2023-08-15 = 25 full years</li>
     *   <li>2023-08-15 → 2024-02-15 = 6 full months</li>
     *   <li>2024-02-15 → 2024-03-01 = 15 days (Feb 2024 has 29 days)</li>
     * </ul>
     */
    @Test
    @DisplayName("calculates age correctly for a normal DOB")
    void testCalculateAgeNormalDob() {
        // Arrange — use fixed dates for deterministic assertions
        LocalDate dob = LocalDate.of(1998, 8, 15);
        LocalDate currentDate = LocalDate.of(2024, 3, 1);

        // Act — invoke the age calculation
        AgeResult result = AgeCalculator.calculateAge(dob, currentDate);

        // Assert — verify the returned AgeResult is not null and contains correct values
        assertNotNull(result, "AgeResult should not be null for a valid DOB");
        assertEquals(25, result.getYears(), "Years component should be 25");
        assertEquals(6, result.getMonths(), "Months component should be 6");
        assertEquals(15, result.getDays(), "Days component should be 15");
    }

    /**
     * Verifies that {@link AgeCalculator#calculateAge(LocalDate, LocalDate)} correctly
     * handles a date of birth on February 29 of a leap year.
     *
     * <p>Test data: DOB = February 29, 2000 (leap year); Reference date = March 1, 2024.
     * Expected result: 24 years, 0 months, 1 day.</p>
     *
     * <p>{@code Period.between()} handles leap years natively. From Feb 29, 2000 to
     * Mar 1, 2024: 24 full years bring us to Feb 29, 2024 (also a leap year), then
     * 1 additional day to reach March 1.</p>
     */
    @Test
    @DisplayName("calculates age correctly for a leap year DOB")
    void testCalculateAgeLeapYearDob() {
        // Arrange — Feb 29, 2000 is a valid leap year date
        LocalDate dob = LocalDate.of(2000, 2, 29);
        LocalDate currentDate = LocalDate.of(2024, 3, 1);

        // Act — invoke the age calculation
        AgeResult result = AgeCalculator.calculateAge(dob, currentDate);

        // Assert — verify correct age breakdown for leap year DOB
        assertNotNull(result, "AgeResult should not be null for a leap year DOB");
        assertEquals(24, result.getYears(), "Years component should be 24");
        assertEquals(0, result.getMonths(), "Months component should be 0");
        assertEquals(1, result.getDays(), "Days component should be 1");
    }

    /**
     * Verifies that {@link AgeCalculator#calculateAge(LocalDate, LocalDate)} returns
     * zero for all fields when the date of birth equals the current date.
     *
     * <p>Test data: DOB = currentDate = January 15, 2024.
     * Expected result: 0 years, 0 months, 0 days.</p>
     */
    @Test
    @DisplayName("returns zero age when DOB equals current date")
    void testCalculateAgeSameDay() {
        // Arrange — DOB and current date are identical
        LocalDate dob = LocalDate.of(2024, 1, 15);
        LocalDate currentDate = LocalDate.of(2024, 1, 15);

        // Act — invoke the age calculation
        AgeResult result = AgeCalculator.calculateAge(dob, currentDate);

        // Assert — all age components should be zero
        assertNotNull(result, "AgeResult should not be null for same-day DOB");
        assertEquals(0, result.getYears(), "Years component should be 0 for same-day DOB");
        assertEquals(0, result.getMonths(), "Months component should be 0 for same-day DOB");
        assertEquals(0, result.getDays(), "Days component should be 0 for same-day DOB");
    }

    /**
     * Verifies that {@link AgeCalculator#calculateAge(LocalDate, LocalDate)} correctly
     * handles the year boundary crossing from December 31 to January 1.
     *
     * <p>Test data: DOB = December 31, 2000; Reference date = January 1, 2001.
     * Expected result: 0 years, 0 months, 1 day.</p>
     *
     * <p>This is an edge case that validates the transition across a calendar year
     * boundary does not introduce off-by-one errors.</p>
     */
    @Test
    @DisplayName("calculates age correctly at year boundary")
    void testCalculateAgeYearBoundary() {
        // Arrange — DOB is the last day of the year, current date is the first day of the next year
        LocalDate dob = LocalDate.of(2000, 12, 31);
        LocalDate currentDate = LocalDate.of(2001, 1, 1);

        // Act — invoke the age calculation
        AgeResult result = AgeCalculator.calculateAge(dob, currentDate);

        // Assert — exactly 1 day old, crossing the year boundary
        assertNotNull(result, "AgeResult should not be null for year boundary DOB");
        assertEquals(0, result.getYears(), "Years component should be 0 for 1-day difference across year boundary");
        assertEquals(0, result.getMonths(), "Months component should be 0 for 1-day difference across year boundary");
        assertEquals(1, result.getDays(), "Days component should be 1 for Dec 31 to Jan 1");
    }

    /**
     * Verifies that {@link AgeCalculator#calculateAge(LocalDate, LocalDate)} throws
     * an {@link IllegalArgumentException} when the date of birth is in the future
     * relative to the reference date.
     *
     * <p>Test data: DOB = June 1, 2025; Reference date = January 1, 2024.
     * Since DOB is after currentDate, the method must reject the input.</p>
     */
    @Test
    @DisplayName("throws IllegalArgumentException for future DOB")
    void testCalculateAgeRejectsFutureDate() {
        // Arrange — DOB is after the reference date
        LocalDate dob = LocalDate.of(2025, 6, 1);
        LocalDate currentDate = LocalDate.of(2024, 1, 1);

        // Act & Assert — expect IllegalArgumentException for future date
        assertThrows(IllegalArgumentException.class,
                () -> AgeCalculator.calculateAge(dob, currentDate),
                "Should throw IllegalArgumentException when DOB is in the future");
    }

    /**
     * Verifies that {@link AgeCalculator#calculateAge(LocalDate, LocalDate)} throws
     * an {@link IllegalArgumentException} when the date of birth parameter is {@code null}.
     *
     * <p>The method performs explicit null-checking to provide a clear error message
     * rather than allowing a {@link NullPointerException} to propagate.</p>
     */
    @Test
    @DisplayName("throws IllegalArgumentException for null DOB")
    void testCalculateAgeRejectsNullDob() {
        // Arrange — null DOB with a valid current date
        LocalDate currentDate = LocalDate.of(2024, 1, 1);

        // Act & Assert — expect IllegalArgumentException for null DOB
        assertThrows(IllegalArgumentException.class,
                () -> AgeCalculator.calculateAge(null, currentDate),
                "Should throw IllegalArgumentException when DOB is null");
    }

    /**
     * Verifies that {@link AgeCalculator#calculateAge(LocalDate, LocalDate)} throws
     * an {@link IllegalArgumentException} when the current date parameter is {@code null}.
     *
     * <p>The method performs explicit null-checking to provide a clear error message
     * rather than allowing a {@link NullPointerException} to propagate.</p>
     */
    @Test
    @DisplayName("throws IllegalArgumentException for null current date")
    void testCalculateAgeRejectsNullCurrentDate() {
        // Arrange — valid DOB with null current date
        LocalDate dob = LocalDate.of(1998, 8, 15);

        // Act & Assert — expect IllegalArgumentException for null current date
        assertThrows(IllegalArgumentException.class,
                () -> AgeCalculator.calculateAge(dob, null),
                "Should throw IllegalArgumentException when current date is null");
    }
}
