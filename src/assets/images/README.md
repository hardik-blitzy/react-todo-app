# Images

[← Assets](../README.md) · [Main README](../../../README.md)

## Overview

This folder is the icon asset directory for the React Todo App. It contains SVG vector icons used as CSS background images for the application's interactive button controls.

The icons in this directory are **not** imported in JavaScript. They are referenced exclusively via CSS `background-image` URLs defined in `src/assets/style/index.css`. This approach keeps icon rendering entirely within the stylesheet layer, separate from the component logic.

## Icon Inventory

| File | Dimensions | Description | SVG Structure |
|------|------------|-------------|---------------|
| `add.svg` | 24×24 viewBox, explicit `width="24"` `height="24"` | Plus sign icon for the create/add button control | Two `<path>` elements: (1) path `d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"` draws centered horizontal and vertical stems forming the plus sign; (2) path `d="M0 0h24v24H0z" fill="none"` draws an invisible 24×24 bounding rectangle for transparent margins |
| `search.svg` | 24×24 viewBox, explicit `width="24"` `height="24"` | Magnifying glass icon for the search button control | Two `<path>` elements: (1) complex curve-based path draws a circular lens centered at approximately (9.5, 9.5) with a diagonal handle extending to the lower-right; (2) path `d="M0 0h24v24H0z" fill="none"` draws an invisible 24×24 bounding rectangle for transparent margins |

Both icons share these common SVG attributes:

- **Default fill color**: `fill="#000000"` set on the root `<svg>` element
- **XML namespace**: `xmlns="http://www.w3.org/2000/svg"` standard namespace declaration
- **Bounding path**: A second `<path>` with `fill="none"` that defines a transparent 24×24 rectangle, ensuring consistent hit areas and margins

## Dimensions

Both icons use a 24×24 coordinate system defined by `viewBox="0 0 24 24"` with explicit `width="24"` and `height="24"` attributes on the root `<svg>` element.

The fixed viewport ensures that all path coordinates are expressed relative to a canonical 24×24 square canvas. This allows downstream CSS to scale the icons cleanly to any target size without distortion or coordinate recalculation.

In the application, CSS renders these icons at **18×18 pixels** within `.button` elements. The browser scales the 24×24 SVG viewBox down to fit the 18×18 CSS box, preserving the vector sharpness at all display resolutions.

## CSS Integration

The icons are consumed via the CSS `background-image` property in `src/assets/style/index.css`.

### Icon Background Selectors

The following selectors assign each SVG as the background image for its corresponding button (the `.buttons .add` and `.buttons .search` selectors in `index.css`):

```css
.buttons .add {
    background: url(../images/add.svg) no-repeat center;
}

.buttons .search {
    background: url(../images/search.svg) no-repeat center;
}
```

### Base Button Styles

The `.buttons .button` selector defines the shared visual properties for all icon buttons (in `index.css`):

```css
.buttons .button {
    display: inline-block;
    margin: 0 5px;
    height: 18px;
    width: 18px;
    cursor: pointer;
    opacity: 0.5;
    transition: 0.3s all;
}
```

Key style properties:

- **Display**: `inline-block` — buttons sit side-by-side in the footer
- **Size**: `height: 18px; width: 18px` — icons rendered at 18×18 pixels
- **Opacity**: `0.5` by default, transitioning to `1` on hover or when the `selected` class is applied
- **Cursor**: `pointer` — indicates interactivity
- **Transition**: `0.3s all` — smooth opacity fade on state changes

The CSS controls the visual appearance of the `#000` fill color through opacity modulation. The SVG markup itself is never modified at runtime.

Full stylesheet path: `src/assets/style/index.css`

## Component Usage

The component `src/components/ui/ButtonWrapper.js` is responsible for rendering the button elements that display these icons through CSS classes.

ButtonWrapper renders two `<a>` elements with the following class name patterns:

```jsx
<a title="Add New"
    className={'button add ' + (isCreateMode() ? 'selected' : '')}
    onClick={() => changeMode(isCreateMode() ? MODE_NONE : MODE_CREATE)}></a>

<a title="Search"
    className={'button search ' + (isSearchMode() ? 'selected' : '')}
    onClick={() => changeMode(isSearchMode() ? MODE_NONE : MODE_SEARCH)}></a>
```

- The **add button** uses `className="button add"` (with `selected` appended when in create mode)
- The **search button** uses `className="button search"` (with `selected` appended when in search mode)
- Each button carries a `title` attribute (`"Add New"` and `"Search"`) for tooltip accessibility

The icons are **not** imported via JavaScript `import` statements. They are loaded purely through CSS `background-image` references, which means the component code has no direct dependency on the SVG files. The coupling is managed entirely through the CSS class names.

## Build Pipeline

CRA (Create React App) and its internal Webpack configuration process these SVG files during production builds:

- **Verbatim copy**: SVGs are copied as-is to the output `build/` directory without modification
- **URL rewriting**: CSS `url()` references are automatically rewritten to point to the correct production asset paths with content hashes for cache busting
- **No transformation**: No code transformation, tree-shaking, minification, or optimization is applied to the SVG files themselves
- **Static asset pipeline**: The files pass through Webpack's static asset pipeline unchanged, preserving the original SVG markup exactly as authored

Because the project uses CRA 0.9.0 without ejection, the build configuration is not customizable. The SVG handling behavior is determined entirely by the built-in Webpack configuration provided by `react-scripts`.

## Maintenance

> **WARNING**: Renaming or removing any SVG file in this directory requires coordinated updates in `src/assets/style/index.css`.

The `.buttons .add` and `.buttons .search` CSS selectors reference these files by **exact filename**. Specifically:

- `.buttons .add` references `url(../images/add.svg)`
- `.buttons .search` references `url(../images/search.svg)`

Failing to update CSS references after renaming or removing an SVG will cause the corresponding button to lose its icon, rendering it as an empty 18×18 clickable area with no visual indicator.

### Guidelines for Adding New Icons

When adding new SVG icons to this directory, follow the established pattern:

1. Use a **24×24 viewBox** (`viewBox="0 0 24 24"`) with explicit `width="24"` and `height="24"` attributes
2. Set the default fill to `fill="#000000"` on the root `<svg>` element
3. Include a transparent bounding rectangle path (`d="M0 0h24v24H0z" fill="none"`) as the last `<path>` element
4. Add a corresponding CSS selector in `src/assets/style/index.css` following the `background: url(../images/<name>.svg) no-repeat center` pattern
5. Apply the `button` base class in the consuming component to inherit the 18×18 size and opacity transition behavior

## Related

- [../README.md](../README.md) — Parent asset layer documentation
- [../style/index.css](../style/index.css) — Stylesheet with CSS selectors referencing these SVGs
- [../../components/ui/ButtonWrapper.js](../../components/ui/ButtonWrapper.js) — Component that applies icon CSS classes
- [../../../README.md](../../../README.md) — Root project README
