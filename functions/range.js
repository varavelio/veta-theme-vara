/**
 * Creates a zero-based integer range for template loops.
 *
 * The input is converted to a number, clamped between 0 and 20, and returned as
 * an array containing indexes from `0` through `count - 1`.
 *
 * Usage:
 *   {% for index in range(5) %}
 *     {{ index }}
 *   {% endfor %}
 */

export default function(_runtime, input) {
  const count = Math.max(0, Math.min(20, Number(input) || 0));
  return Array.from({ length: count }, (_value, index) => index);
}
