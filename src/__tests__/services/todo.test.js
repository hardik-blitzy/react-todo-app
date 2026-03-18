import { getAll, getItemById, updateStatus, addToList } from '../../services/todo';

/**
 * Unit tests for src/services/todo.js — the immutable todo CRUD service.
 *
 * This service provides four exported functions:
 *   - getAll(): Returns a fresh array of 3 seeded todo items
 *   - getItemById(itemId): Looks up a seeded item by strict ID equality
 *   - updateStatus(items, itemId, completed): Immutably updates an item's completed status
 *   - addToList(list, data): Immutably appends a new item with an auto-generated ID
 *
 * Key behaviors under test:
 *   - getAll() returns a NEW array literal on every invocation (no caching)
 *   - updateStatus uses immutability-helper to guarantee no mutation of the input array
 *   - addToList uses Array.prototype.concat to guarantee no mutation of the input list
 *   - The internal todoCounter is module-level mutable state; tests use relative
 *     assertions (toBeDefined, toBeGreaterThan) rather than hardcoded ID values
 */

describe('getAll', () => {
    it('returns an array of 3 seeded todo items', () => {
        const items = getAll();

        expect(items).toHaveLength(3);
    });

    it('all items have id, text, and completed properties', () => {
        const items = getAll();

        items.forEach(item => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('text');
            expect(item).toHaveProperty('completed');
        });
    });

    it('seeded items have ids 1, 2, 3', () => {
        const items = getAll();
        const ids = items.map(item => item.id);

        expect(ids).toEqual([1, 2, 3]);
    });

    it('all seeded items have completed: false', () => {
        const items = getAll();

        items.forEach(item => {
            expect(item.completed).toBe(false);
        });
    });

    it('seeded items have correct text values', () => {
        const items = getAll();

        expect(items[0].text).toBe('Learn Javascript');
        expect(items[1].text).toBe('Learn React');
        expect(items[2].text).toBe('Build a React App');
    });

    it('returns a fresh array on each call (not same reference)', () => {
        const a = getAll();
        const b = getAll();

        expect(a).not.toBe(b);
        expect(a).toEqual(b);
    });
});

describe('getItemById', () => {
    it('returns the correct item for a valid id', () => {
        const item1 = getItemById(1);
        const item2 = getItemById(2);
        const item3 = getItemById(3);

        expect(item1.text).toBe('Learn Javascript');
        expect(item2.text).toBe('Learn React');
        expect(item3.text).toBe('Build a React App');
    });

    it('returns undefined for a non-existent id', () => {
        expect(getItemById(999)).toBeUndefined();
        expect(getItemById(0)).toBeUndefined();
    });

    it('returned item has id, text, and completed properties', () => {
        const item = getItemById(1);

        expect(item).toHaveProperty('id', 1);
        expect(item).toHaveProperty('text', 'Learn Javascript');
        expect(item).toHaveProperty('completed', false);
    });
});

describe('updateStatus', () => {
    it('returns a new array with the item status updated', () => {
        const items = getAll();
        const result = updateStatus(items, 1, true);

        expect(result[0].completed).toBe(true);
    });

    it('does not mutate the original array (immutability)', () => {
        const items = getAll();
        const result = updateStatus(items, 1, true);

        // Original array's first item must still be completed: false
        expect(items[0].completed).toBe(false);
        // Result must be a different array reference
        expect(items).not.toBe(result);
    });

    it('only changes the targeted item, others remain unchanged', () => {
        const items = getAll();
        const result = updateStatus(items, 2, true);

        expect(result[0].completed).toBe(false);
        expect(result[1].completed).toBe(true);
        expect(result[2].completed).toBe(false);
    });

    it('can toggle status to false', () => {
        const items = getAll();
        // First set item 1 to completed: true
        const withTrue = updateStatus(items, 1, true);

        expect(withTrue[0].completed).toBe(true);

        // Then toggle it back to completed: false
        const withFalse = updateStatus(withTrue, 1, false);

        expect(withFalse[0].completed).toBe(false);
    });

    it('returns an array of the same length', () => {
        const items = getAll();
        const result = updateStatus(items, 1, true);

        expect(result).toHaveLength(items.length);
    });
});

describe('addToList', () => {
    it('returns a new array with the item appended', () => {
        const list = getAll();
        const result = addToList(list, { text: 'New Item', completed: false });

        expect(result).toHaveLength(list.length + 1);
    });

    it('does not mutate the original list (immutability)', () => {
        const list = getAll();
        const originalLength = list.length;

        addToList(list, { text: 'New Item', completed: false });

        expect(list).toHaveLength(originalLength);
    });

    it('new item has an auto-generated id', () => {
        const list = getAll();
        const result = addToList(list, { text: 'Test', completed: false });
        const newItem = result[result.length - 1];

        expect(newItem.id).toBeDefined();
        expect(typeof newItem.id).toBe('number');
    });

    it('new item merges provided data with generated id', () => {
        const result = addToList(getAll(), { text: 'My Task', completed: false });
        const newItem = result[result.length - 1];

        expect(newItem.text).toBe('My Task');
        expect(newItem.completed).toBe(false);
        expect(newItem.id).toBeDefined();
    });

    it('sequential calls generate incrementing ids', () => {
        const list = getAll();
        const result1 = addToList(list, { text: 'First', completed: false });
        const result2 = addToList(result1, { text: 'Second', completed: false });
        const id1 = result1[result1.length - 1].id;
        const id2 = result2[result2.length - 1].id;

        expect(id2).toBeGreaterThan(id1);
    });

    it('appends item at the end of the list', () => {
        const list = getAll();
        const result = addToList(list, { text: 'Last Item', completed: false });

        expect(result[result.length - 1].text).toBe('Last Item');
    });
});

describe('edge cases', () => {
    it('addToList with empty list returns array of length 1', () => {
        const result = addToList([], { text: 'First', completed: false });

        expect(result).toHaveLength(1);
        expect(result[0].text).toBe('First');
        expect(result[0].completed).toBe(false);
        expect(result[0].id).toBeDefined();
        expect(typeof result[0].id).toBe('number');
    });

    it('getItemById with non-number id returns undefined (strict equality)', () => {
        // getItemById uses === which means '1' !== 1
        expect(getItemById('1')).toBeUndefined();
    });
});
