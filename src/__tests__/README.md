# Tests

[← Source Code](../README.md) · [Main README](../../README.md)

## Overview

This directory contains the unit test suite for the React Todo App's service and utility layers. Tests are organized in subdirectories that mirror the source tree structure, ensuring each test file maps directly to its corresponding source module.

## Directory Structure

| Directory | Test File | Source Module | Status |
|-----------|-----------|---------------|--------|
| `services/` | `mode.test.js` | [`src/services/mode.js`](../services/mode.js) | ✅ Implemented |
| `services/` | `todo.test.js` | [`src/services/todo.js`](../services/todo.js) | 🔲 Planned |
| `services/` | `filter.test.js` | [`src/services/filter.js`](../services/filter.js) | 🔲 Planned |
| `util/` | `common.test.js` | [`src/util/common.js`](../util/common.js) | 🔲 Planned |

## Running Tests

Tests are executed via the CRA-provided Jest test runner:

```bash
CI=true npm test -- --watchAll=false
```

Jest automatically discovers test files inside `__tests__/` directories. No additional configuration is required.

## Test Runner

The project uses `react-scripts` 0.9.0 which bundles Jest with a jsdom test environment. Tests run with the following defaults:

- **Environment**: jsdom (simulated browser DOM)
- **Module resolution**: Same as the application (CRA Webpack aliases)
- **Auto-discovery**: Files matching `__tests__/**/*.test.js` pattern

## Related

- [../README.md](../README.md) — Source code overview
- [../services/README.md](../services/README.md) — Service layer documentation
- [../util/README.md](../util/README.md) — Utility layer documentation
- [../../README.md](../../README.md) — Root project README
