import {
    FILTER_ALL,
    FILTER_ACTIVE,
    FILTER_COMPLETED,
    applyFilter,
    search,
    getOptions
} from '../../services/filter';

/**
 * Reusable test fixture array with mixed completed states.
 * Mirrors the seeded data pattern from todo.js for consistent filter testing.
 */
const testItems = [
    { id: 1, text: 'Learn Javascript', completed: false },
    { id: 2, text: 'Learn React', completed: true },
    { id: 3, text: 'Build a React App', completed: false }
];

describe('filter constants', () => {
    it('FILTER_ALL should equal "all"', () => {
        expect(FILTER_ALL).toBe('all');
    });

    it('FILTER_ACTIVE should equal "active"', () => {
        expect(FILTER_ACTIVE).toBe('active');
    });

    it('FILTER_COMPLETED should equal "completed"', () => {
        expect(FILTER_COMPLETED).toBe('completed');
    });
});

describe('applyFilter', () => {
    it('FILTER_ALL returns the full list unchanged', () => {
        const result = applyFilter(testItems, FILTER_ALL);
        expect(result).toEqual(testItems);
        // Default case returns the original array reference, not a copy
        expect(result).toBe(testItems);
    });

    it('FILTER_ACTIVE returns items where completed !== true', () => {
        const result = applyFilter(testItems, FILTER_ACTIVE);
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({ id: 1, text: 'Learn Javascript', completed: false });
        expect(result[1]).toEqual({ id: 3, text: 'Build a React App', completed: false });
        result.forEach(item => {
            expect(item.completed).not.toBe(true);
        });
    });

    it('FILTER_COMPLETED returns items where completed === true', () => {
        const result = applyFilter(testItems, FILTER_COMPLETED);
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({ id: 2, text: 'Learn React', completed: true });
        result.forEach(item => {
            expect(item.completed).toBe(true);
        });
    });

    it('handles empty list', () => {
        expect(applyFilter([], FILTER_ALL)).toEqual([]);
        expect(applyFilter([], FILTER_ACTIVE)).toEqual([]);
        expect(applyFilter([], FILTER_COMPLETED)).toEqual([]);
    });

    it('handles list with all completed items', () => {
        const allCompleted = [
            { id: 1, text: 'Task A', completed: true },
            { id: 2, text: 'Task B', completed: true }
        ];
        expect(applyFilter(allCompleted, FILTER_ALL)).toHaveLength(2);
        expect(applyFilter(allCompleted, FILTER_ACTIVE)).toHaveLength(0);
        expect(applyFilter(allCompleted, FILTER_COMPLETED)).toHaveLength(2);
    });

    it('handles list with no completed items', () => {
        const noneCompleted = [
            { id: 1, text: 'Task A', completed: false },
            { id: 2, text: 'Task B', completed: false }
        ];
        expect(applyFilter(noneCompleted, FILTER_ALL)).toHaveLength(2);
        expect(applyFilter(noneCompleted, FILTER_ACTIVE)).toHaveLength(2);
        expect(applyFilter(noneCompleted, FILTER_COMPLETED)).toHaveLength(0);
    });

    it('returns original reference for unrecognized filter value', () => {
        const result = applyFilter(testItems, 'unknown');
        expect(result).toBe(testItems);
    });
});

describe('search', () => {
    it('empty query returns full list', () => {
        const result = search(testItems, '');
        expect(result).toEqual(testItems);
        expect(result).toHaveLength(3);
    });

    it('whitespace-only query returns full list', () => {
        const result = search(testItems, '   ');
        expect(result).toEqual(testItems);
        expect(result).toHaveLength(3);
    });

    it('case-insensitive matching', () => {
        const resultLower = search(testItems, 'learn');
        const resultUpper = search(testItems, 'LEARN');
        expect(resultLower).toHaveLength(2);
        expect(resultUpper).toHaveLength(2);
        expect(resultLower).toEqual(resultUpper);
    });

    it('partial text match', () => {
        const result = search(testItems, 'React');
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({ id: 2, text: 'Learn React', completed: true });
        expect(result[1]).toEqual({ id: 3, text: 'Build a React App', completed: false });
    });

    it('no match returns empty array', () => {
        const result = search(testItems, 'xyz');
        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    it('trims leading/trailing whitespace from query', () => {
        const resultTrimmed = search(testItems, '  React  ');
        const resultClean = search(testItems, 'React');
        expect(resultTrimmed).toEqual(resultClean);
        expect(resultTrimmed).toHaveLength(2);
    });

    it('handles empty list with a query', () => {
        const result = search([], 'test');
        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    it('matches single character substring', () => {
        const result = search(testItems, 'a');
        // 'Learn Javascript' contains 'a', 'Learn React' contains 'a', 'Build a React App' contains 'a'
        expect(result).toHaveLength(3);
    });
});

describe('getOptions', () => {
    it('returns object with correct keys and labels', () => {
        const options = getOptions();
        expect(options[FILTER_ALL]).toBe('All');
        expect(options[FILTER_ACTIVE]).toBe('Active');
        expect(options[FILTER_COMPLETED]).toBe('Completed');
    });

    it('returns object with exactly 3 keys', () => {
        const options = getOptions();
        expect(Object.keys(options)).toHaveLength(3);
    });

    it('uses filter constant values as keys', () => {
        const options = getOptions();
        expect(options).toHaveProperty('all', 'All');
        expect(options).toHaveProperty('active', 'Active');
        expect(options).toHaveProperty('completed', 'Completed');
    });

    it('returns a new object on each call', () => {
        const options1 = getOptions();
        const options2 = getOptions();
        expect(options1).toEqual(options2);
        expect(options1).not.toBe(options2);
    });
});
