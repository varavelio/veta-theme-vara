/**
 * Formats a numeric value for compact display.
 *
 * Non-finite inputs return `0`. Values greater than or equal to one million use
 * an `M` suffix, values greater than or equal to one thousand use a `k` suffix,
 * and smaller finite values are returned as plain numbers. Suffix values keep one
 * decimal place only when needed.
 *
 * Usage:
 *   {{ repo.stars|vara_number }}
 */

export default function(_runtime, input) {
  const value = Number(input);

  if (!Number.isFinite(value)) {
    return "0";
  }

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }

  return String(value);
}
