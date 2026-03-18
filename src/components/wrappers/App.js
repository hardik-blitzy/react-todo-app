/**
 * @module components/wrappers/App
 * @description Application root composition shell that establishes the strict provider
 * hierarchy for the React Todo App. App itself contains no local state, no business
 * logic, and no prop manipulation. Its sole responsibility is composing the three
 * critical layers in the correct nesting order: StateProvider (state management)
 * wrapping KeyStrokeHandler (keyboard event interception) wrapping TodoList
 * (presentational UI container). This ordering is immutable — changing it would break
 * the unidirectional data flow that powers the entire application.
 *
 * This module is imported by src/index.js which renders <App/> into the div#root
 * mount point via ReactDOM.render().
 *
 * @requires react — Uses React.Component for class-based component definition
 *     (React 15.x pattern)
 * @requires ../ui/TodoList — The main presentational container component that receives
 *     state and actions via prop injection
 * @requires ./StateProvider — The centralized state container holding all application
 *     state (query, mode, filter, list) and 5 action methods
 * @requires ./KeyStrokeHandler — The global keyboard event interceptor that captures
 *     window keydown events and delegates mode transitions
 */
import React, {Component} from 'react';
import TodoList from '../ui/TodoList';
import StateProvider from './StateProvider';
import KeyStrokeHandler from './KeyStrokeHandler';

/**
 * Application root composition shell.
 *
 * This class-based component renders a fixed three-layer wrapper hierarchy that
 * establishes the application's data flow and event handling architecture. App
 * does not accept any props and does not maintain any local state. It serves
 * purely as a structural glue that enforces the provider ordering contract.
 *
 * @class App
 * @extends {React.Component}
 */
class App extends Component {
    /**
     * Renders the application's provider hierarchy.
     *
     * The nesting order is critical:
     * 1. StateProvider (outermost) — Must be first because it initializes and owns
     *    all application state (query, mode, filter, list) and the 5 action methods
     *    (addNew, changeFilter, changeStatus, changeMode, setSearchQuery). It injects
     *    {data: this.state, actions} into its children via wrapChildrenWith().
     * 2. KeyStrokeHandler (middle) — Must wrap TodoList because it intercepts global
     *    window.keydown keyboard events and needs access to data.mode and
     *    actions.changeMode (injected by StateProvider) to perform mode transitions.
     *    It forwards all received props to its children.
     * 3. TodoList (innermost) — The presentational container that receives the full
     *    data and actions props through the injection chain. It destructures these
     *    props, executes the data pipeline (search(applyFilter(list, filter), query)),
     *    and distributes specific props to its sub-components (Header, FilteredList,
     *    Footer, Info).
     *
     * Removing or reordering any component in this hierarchy would break the
     * assumption that TodoList lives within the StateProvider context and
     * KeyStrokeHandler listener scope.
     *
     * @method render
     * @returns {React.ReactElement} A JSX tree composing the strict nesting order:
     *     StateProvider → KeyStrokeHandler → TodoList
     */
    render() {
        return (
            <StateProvider>
                <KeyStrokeHandler>
                    <TodoList/>
                </KeyStrokeHandler>
            </StateProvider>
        );
    }
}

export default App;
