/**
 * @fileoverview Info component for displaying keyboard shortcut hints.
 *
 * This component displays contextual help messages based on the current
 * application mode. When the application is in MODE_NONE (default state),
 * it shows available keyboard shortcuts for search and create actions.
 * When in any other mode (search or create), it shows the escape shortcut
 * to cancel the current action.
 *
 * @example
 * // In MODE_NONE, displays: "Press `/` to search and `N` to create a new item."
 * <Info mode={MODE_NONE} />
 *
 * @example
 * // In MODE_SEARCH or MODE_CREATE, displays: "Press `Esc` to cancel."
 * <Info mode={MODE_SEARCH} />
 */

import React from 'react';
import type { Mode } from '../../types';
import { MODE_NONE } from '../../services/mode';
import { INFO_SHORTCUT_KEYS, INFO_CANCEL_SHORTCUT_KEY } from '../../assets/text/en_US';

// =============================================================================
// Type Definitions
// =============================================================================

/**
 * Props interface for the Info component.
 *
 * @property mode - The current application mode. Used to determine which
 *                  shortcut hint message to display. When mode equals MODE_NONE,
 *                  shows available shortcuts. Otherwise, shows cancel instruction.
 */
interface InfoProps {
  /** The current application mode determining which message to display */
  mode: Mode;
}

// =============================================================================
// Component Implementation
// =============================================================================

/**
 * Info component that displays keyboard shortcut hints based on application mode.
 *
 * Renders a paragraph element with contextual help text:
 * - In MODE_NONE: Shows "Press `/` to search and `N` to create a new item."
 * - In any other mode: Shows "Press `Esc` to cancel."
 *
 * This component follows the Single Responsibility Principle (SRP) by handling
 * only the display of mode-specific shortcut information.
 *
 * @param props - Component props containing the current mode
 * @param props.mode - The current application mode
 * @returns A paragraph element with the appropriate shortcut hint message
 *
 * @example
 * // Usage in parent component
 * import { MODE_NONE, MODE_SEARCH } from '../../services/mode';
 *
 * // Default mode - shows available shortcuts
 * <Info mode={MODE_NONE} />
 *
 * // Active mode - shows cancel instruction
 * <Info mode={MODE_SEARCH} />
 */
export default function Info({ mode }: InfoProps): React.ReactElement {
  /**
   * Determine the appropriate message based on current mode.
   * In MODE_NONE, show available shortcuts.
   * In any active mode, show cancel instruction.
   */
  const message: string = mode === MODE_NONE ? INFO_SHORTCUT_KEYS : INFO_CANCEL_SHORTCUT_KEY;

  return <p className="info">{message}</p>;
}
