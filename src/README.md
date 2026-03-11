# Source Code (src/)

> ← Back to [Main README](../README.md)

## Overview

This is the client-side application root for the React Todo App. It contains the single runtime entry point (`index.js`) and four organized subfolders that separate concerns: assets for static resources, components for the React UI layer, services for business logic, and utilities for shared helper functions. A dedicated `__tests__/` directory provides unit test coverage for the service and utility layers.

## Folder Structure

The following diagram shows the organization of the `src/` directory:

```mermaid
flowchart TB
    subgraph src["src/"]
        INDEX["index.js<br/>(Entry Point)"]

        subgraph assets["assets/"]
            IMAGES["images/<br/>SVG icons"]
            STYLE["style/<br/>Global CSS"]
            TEXT["text/<br/>Locale strings"]
        end

        subgraph components["components/"]
            HOC["hoc/<br/>Higher-order components"]
            UI["ui/<br/>Presentational components"]
            WRAPPERS["wrappers/<br/>State & event handlers"]
        end

        subgraph services["services/"]
            TODO["todo.js"]
            FILTER["filter.js"]
            MODE["mode.js"]
        end

        subgraph util["util/"]
            COMMON["common.js"]
        end

        subgraph tests["__tests__/"]
            subgraph tests_services["services/"]
                TODO_TEST["todo.test.js"]
                FILTER_TEST["filter.test.js"]
                MODE_TEST["mode.test.js"]
            end
            subgraph tests_util["util/"]
                COMMON_TEST["common.test.js"]
            end
        end
    end

    INDEX --> components
    components --> services
    components --> util
    components --> assets
    tests --> services
    tests --> util
```

> **Note:** The `__tests__/` section in the diagram above shows the target test architecture. Currently, `mode.test.js` is the only implemented test file; the remaining test files (`todo.test.js`, `filter.test.js`, `common.test.js`) are planned for future implementation.

## Entry Point

The file `index.js` is the application entry point. It performs the following tasks:

1. Imports React and ReactDOM for rendering
2. Imports the root `App` component from `./components/wrappers/App`
3. Imports Bootstrap CSS for base styling
4. Imports the custom stylesheet from `./assets/style/index.css`
5. Mounts the application to the DOM element with id `root`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/wrappers/App';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/style/index.css';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
```

The `root` DOM element is defined in `public/index.html`.

## Modules

| Module | Description |
|--------|-------------|
| [assets/](assets/README.md) | Static assets including SVG icons, global CSS styles, and locale text constants |
| [components/](components/README.md) | React UI layer organized into HOCs, presentational components, and state wrappers |
| [services/](services/README.md) | Business logic modules for todo operations, list filtering, and UI mode management |
| [util/](util/README.md) | Shared helper functions for object manipulation, React children handling, and string operations |
| [`__tests__/`](__tests__/README.md) | Unit test suite for services and utility modules |

## Related

- [Main README](../README.md) — Project overview, setup instructions, and step-by-step branch history
