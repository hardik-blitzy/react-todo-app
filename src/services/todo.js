/**
 * @module services/todo
 * @description Immutable todo data service providing CRUD operations for todo items.
 * Exports four functions: {@link getAll} for retrieving the canonical seeded dataset,
 * {@link getItemById} for single-item lookup, {@link updateStatus} for toggling
 * completion status via immutable updates, and {@link addToList} for appending new
 * items with auto-generated IDs. All list mutations use immutable patterns — either
 * `immutability-helper`'s `update()` with `$set` command syntax or
 * `Array.prototype.concat()` — ensuring no direct state mutation.
 * @requires immutability-helper — Default export `update` is imported for declarative
 * immutable state transformations with command syntax (`$set`, `$push`, etc.) used
 * in {@link updateStatus}.
 */
import update from 'immutability-helper';

/**
 * @function getAll
 * @description Returns a fresh array of three seeded todo items representing the
 * application's initial dataset. Each call returns a new array instance (not a
 * cached reference), making it safe for use in initialization contexts. The seeded
 * items have IDs 1-3, educational topic text, and `completed: false` status.
 * @returns {Array<{id: number, text: string, completed: boolean}>} A new array
 * containing three seeded todo items:
 * - `{ id: 1, text: 'Learn Javascript', completed: false }`
 * - `{ id: 2, text: 'Learn React', completed: false }`
 * - `{ id: 3, text: 'Build a React App', completed: false }`
 * @example
 * const list = getAll();
 * // [{ id: 1, text: 'Learn Javascript', completed: false }, ...]
 */
export function getAll() {
    return [
        {
            id: 1,
            text: 'Learn Javascript',
            completed: false
        },
        {
            id: 2,
            text: 'Learn React',
            completed: false
        },
        {
            id: 3,
            text: 'Build a React App',
            completed: false
        }
    ]
}

/**
 * @function getItemById
 * @description Retrieves a single todo item by its unique identifier. Regenerates
 * the canonical seeded list via {@link getAll} and searches using
 * `Array.prototype.find`. Note: This only searches the seeded dataset (IDs 1-3),
 * not any dynamically added items.
 * @param {number} itemId - The unique identifier of the todo item to find.
 * @returns {({id: number, text: string, completed: boolean}|undefined)} The matching
 * todo item object, or `undefined` if no item with the given ID exists in the seeded
 * dataset.
 * @example
 * const item = getItemById(2);
 * // { id: 2, text: 'Learn React', completed: false }
 */
export function getItemById(itemId) {
    return getAll().find(item => item.id === itemId);
}

/**
 * @function updateStatus
 * @description Returns a new array with the specified todo item's completion status
 * updated. Uses `Array.prototype.findIndex` to locate the target item by ID, then
 * applies `immutability-helper`'s `update()` function with the `{$set: completed}`
 * command to create a new array with the modified item. The original `items` array
 * is never mutated.
 * @param {Array<{id: number, text: string, completed: boolean}>} items - The current
 * list of todo items to update.
 * @param {number} itemId - The unique identifier of the todo item whose status
 * should change.
 * @param {boolean} completed - The new completion status to set for the item.
 * @returns {Array<{id: number, text: string, completed: boolean}>} A new array with
 * the targeted item's `completed` property set to the provided value. All other items
 * remain unchanged.
 * @see {@link https://github.com/kolodny/immutability-helper|immutability-helper} for
 * the `update()` function and `$set` command syntax.
 * @example
 * const updated = updateStatus(list, 1, true);
 * // Returns new list where item with id 1 has completed: true
 */
export function updateStatus(items, itemId, completed) {
    let index = items.findIndex(item => item.id === itemId);

    // Returns a new list of data with updated item.
    return update(items, {
        [index]: {
            completed: {$set: completed}
        }
    });
}

/**
 * Module-level counter used by {@link getNextId} to generate unique, deterministic
 * IDs for newly added todo items. Starts at 1 and increments with each call to
 * {@link getNextId}. This counter exists as a temporary client-side ID generation
 * mechanism; it would be replaced by backend/database auto-increment logic in a
 * production system.
 * @type {Number}
 */
let todoCounter = 1;

/**
 * @function getNextId
 * @private
 * @description Generates the next unique ID for a new todo item. Computes the ID
 * by adding the seeded list length (`getAll().length`, which is 3) to the current
 * `todoCounter` value, then post-increments the counter. This produces a deterministic
 * sequence starting at 4 (3 + 1), then 5 (3 + 2), etc., ensuring no ID collision
 * with seeded items.
 * @returns {number} The next unique integer ID for a new todo item.
 * @example
 * // First call: returns 3 + 1 = 4, todoCounter becomes 2
 * // Second call: returns 3 + 2 = 5, todoCounter becomes 3
 */
function getNextId() {
    return getAll().length + todoCounter++;
}

/**
 * @function addToList
 * @description Appends a new todo item to the list and returns the updated list
 * (immutable operation). Creates the new item by merging an auto-generated unique
 * `id` (from {@link getNextId}) with the provided `data` object using
 * `Object.assign()`. Uses `Array.prototype.concat()` to return a new array containing
 * all existing items plus the new item, ensuring the original list is never mutated.
 * @param {Array<{id: number, text: string, completed: boolean}>} list - The current
 * list of todo items.
 * @param {Object} data - The data for the new todo item. Typically contains
 * `{ text: string, completed: boolean }`. The `id` property will be auto-generated
 * and should not be included.
 * @returns {Array<{id: number, text: string, completed: boolean}>} A new array
 * containing all existing items plus the newly created item with its auto-generated ID.
 * @example
 * const newList = addToList(list, { text: 'Write tests', completed: false });
 * // Returns new list with appended item { id: 4, text: 'Write tests', completed: false }
 */
export function addToList(list, data) {
    let item = Object.assign({
        id: getNextId()
    }, data);

    return list.concat([item]);
}
