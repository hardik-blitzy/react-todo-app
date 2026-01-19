# Assets

> ← Back to [src](../README.md) | [Main README](../../README.md)

## What You'll Find Here

This is where we keep all the visual stuff and text that makes your app look good and speak your language! Think of it as the app's wardrobe and phrase book—pictures for the buttons, colors and layouts for how everything looks, and the words your app uses to talk to users.

You don't need to be a designer to understand this folder. Everything here is pretty straightforward:
- **Images** — The little icons you see on buttons
- **Styles** — The CSS that makes things look pretty instead of plain HTML
- **Text** — The messages and hints your app displays

## Overview

We've organized everything into three simple folders that each handle a different job. The `images/` folder holds our SVG icons, `style/` contains the main stylesheet, and `text/` stores the messages users see. Together, these make the app look polished and user-friendly.

## Contents

### images/

This is where the button icons live—you know, the little pictures on the Add and Search buttons.

| File | What It Is | Size |
|------|------------|------|
| `add.svg` | The plus sign (+) icon you see on the Create button | 24×24 |
| `search.svg` | The magnifying glass icon on the Search button | 24×24 |

These icons show up on buttons through the stylesheet (we'll show you how in the Usage section below). We use SVG format because it looks crisp and sharp no matter how big or small your screen is—no fuzzy edges!

### style/

Here's where all the CSS magic happens—the file that makes your app look pretty instead of plain HTML.

| File | What It Does |
|------|--------------|
| `index.css` | The main stylesheet that controls how everything looks |

Let's break down what's inside `index.css`. If you ever want to change the app's colors, width, or overall look, this is your file to edit:

- **Body**: Sets the page background to a nice light gray (`#eee`) with darker text (`#555`) so it's easy to read
- **Container** (`.todolist`): The main card that holds your entire todo list—it's 600px wide, centered on the page, has a white background, and rounded corners to look modern
- **Header**: Makes the title centered and ALL CAPS so it stands out at the top
- **Todo items** (`li.ui-state-default`): Gives each todo item a clean border at the bottom so they don't blend together
- **Completed items** (`li.completed label`): Adds that satisfying strikethrough line when you check something off ~~like this~~
- **Footer**: The green-tinted area (`#F4FCE8`) at the bottom where your filter options and buttons live
- **Filter buttons** (`.filters`): The All/Active/Completed buttons—they get a subtle red border when you hover over them or click to select
- **Icon buttons** (`.buttons .add` and `.buttons .search`): Tells the Add and Search buttons which icons to show

This stylesheet works together with Bootstrap CSS, which handles the basic layout and some standard UI elements. Both get imported in `src/index.js`.

### text/

This folder handles what your app says to users—it's all about the words and messages you see on screen.

| File | What It Contains |
|------|------------------|
| `en_US.js` | All the English text for US users |

**Quick note on "locale"**: That's just a fancy word for "language settings." The `en_US` part means English (United States). If you wanted British English, it might be `en_GB`.

Here's what text is defined in `en_US.js`:

| Constant | What It Says | When You See It |
|----------|--------------|-----------------|
| `MSG_NO_ITEMS` | "There are no items." | The friendly message shown when your list is empty |
| `INFO_SHORTCUT_KEYS` | "Press \`/\` to search and \`N\` to create a new item." | The keyboard hints at the bottom of the screen—reminds you of handy shortcuts |
| `INFO_CANCEL_SHORTCUT_KEY` | "Press \`Esc\` to cancel." | The hint that appears when you're typing—tells you how to back out |

**Want to add Spanish, French, or another language?** Just create a new file like `es_ES.js` (for Spanish) or `fr_FR.js` (for French) with the same three constants but different text. The app structure is ready for it!

## Usage

Here's how these assets actually get used in the app:

### Importing Styles

The style file gets pulled in when your app starts up. This one line in `src/index.js` makes all the styling work:

```javascript
// This import doesn't return anything—it just loads the CSS into the page
import './assets/style/index.css';
```

### Using SVG Icons

Instead of loading these as separate image files in JavaScript, we use a neat CSS trick to put them on buttons. Here's how it works in `index.css`:

```css
/* The Add button gets the plus icon */
.buttons .add {
    background: url(../images/add.svg) no-repeat center;
}

/* The Search button gets the magnifying glass */
.buttons .search {
    background: url(../images/search.svg) no-repeat center;
}
```

This approach keeps things simple—the buttons just need the right CSS class and the icon appears automatically!

### Importing Locale Constants

Components grab just the text they need from the locale file. Here's how different components use them:

```javascript
// In FilteredList.js — shows this message when the todo list is empty
import { MSG_NO_ITEMS } from '../../assets/text/en_US';

// In Info.js — displays keyboard hints based on what mode you're in
import { INFO_SHORTCUT_KEYS, INFO_CANCEL_SHORTCUT_KEY } from '../../assets/text/en_US';
```

Each component only imports what it needs—no more, no less. Clean and efficient!

## Related

- [components/ui/](../components/ui/README.md) — The UI components that actually use these assets
  - `FilteredList.js` uses `MSG_NO_ITEMS` to show a friendly empty state
  - `Info.js` uses `INFO_SHORTCUT_KEYS` and `INFO_CANCEL_SHORTCUT_KEY` to display helpful hints
  - `ButtonWrapper.js` displays the icons via CSS classes defined in `index.css`
- [src/](../README.md) — Head back to the source overview for the big picture
