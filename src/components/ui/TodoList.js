/**
 * @module components/ui/TodoList
 * @description Main container component for the Todo application's UI layer.
 * TodoList serves as the primary integration point between the state management
 * layer (StateProvider) and the presentational UI components. It receives the
 * complete application state and action callbacks via props, executes a two-stage
 * data pipeline to filter and search the todo list, and distributes processed
 * data to four child components: Header, FilteredList, Footer, and Info.
 *
 * @requires react
 * @requires ./Info - Contextual keyboard shortcut guidance component
 * @requires ./Header - Application title and input area component
 * @requires ./Footer - Bottom section with mode buttons, item count, and filter controls
 * @requires ./FilteredList - Renders filtered/searched todo items or empty state
 * @requires ../../services/filter - Provides applyFilter, search, and FILTER_ACTIVE constant
 */
import React from 'react';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import FilteredList from './FilteredList';
import {applyFilter, search, FILTER_ACTIVE} from '../../services/filter';

/**
 * TodoList - Main container component that applies filtering and search to the
 * todo list and renders the four child UI components.
 *
 * @function TodoList
 *
 * @param {Object} props - Component props injected by StateProvider via wrapChildrenWith
 *
 * @param {Object} props.data - Application state object from StateProvider
 * @param {Array<{id: number, text: string, completed: boolean}>} props.data.list - Complete array of all todo items
 * @param {string} props.data.filter - Current active filter key (FILTER_ALL, FILTER_ACTIVE, or FILTER_COMPLETED)
 * @param {string} props.data.query - Current search query text for substring matching
 * @param {string} props.data.mode - Current interaction mode (MODE_NONE, MODE_CREATE, or MODE_SEARCH)
 *
 * @param {Object} props.actions - Action callback object from StateProvider via objectWithOnly
 * @param {Function} props.actions.addNew - Adds a new todo item; receives (text: string)
 * @param {Function} props.actions.changeFilter - Changes the active filter; receives (filter: string)
 * @param {Function} props.actions.changeStatus - Toggles item completion; receives (id: number, completed: boolean)
 * @param {Function} props.actions.changeMode - Changes interaction mode; receives (mode: string)
 * @param {Function} props.actions.setSearchQuery - Updates search query text; receives (query: string)
 *
 * @description
 * Data Pipeline:
 * 1. Computes activeItemCount: applyFilter(list, FILTER_ACTIVE).length — counts non-completed items
 * 2. Computes display items via two-stage pipeline:
 *    - Stage 1: applyFilter(list, filter) — filters list by current filter (all/active/completed)
 *    - Stage 2: search(filteredList, query) — applies case-insensitive substring search
 *
 * Child Components Rendered:
 * - Header: Receives {addNew, mode, query, setSearchQuery} — renders title and input area
 * - FilteredList: Receives {items, changeStatus} — renders filtered/searched todo items
 * - Footer: Receives {activeItemCount, filter, changeFilter, mode, changeMode} — renders controls
 * - Info: Receives {mode} — renders contextual keyboard shortcut guidance
 *
 * @returns {React.Element} Container div with todolist panel containing Header, FilteredList, Footer, Info
 */
export default function TodoList(props) {
    // Destructure application state from StateProvider
    const {list, filter, mode, query} = props.data;
    // Destructure action callbacks from StateProvider via objectWithOnly
    const {addNew, changeFilter, changeStatus, changeMode, setSearchQuery} = props.actions;
    // Count active (non-completed) items for the footer display
    const activeItemCount = applyFilter(list, FILTER_ACTIVE).length;
    // Two-stage pipeline: filter by status, then search by query text
    const items = search(applyFilter(list, filter), query);

    return (
        <div className="container">
            <div className="row">
                <div className="todolist">
                    <Header {...{addNew, mode, query, setSearchQuery}}/>
                    <FilteredList {...{items, changeStatus}}/>
                    <Footer {...{activeItemCount, filter, changeFilter, mode, changeMode}}/>
                    <Info {...{mode}}/>
                </div>
            </div>
        </div>
    );
}
