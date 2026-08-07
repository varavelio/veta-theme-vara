#!/bin/bash
set -e

LUCIDE_VERSION="1.28.0"
SIMPLE_ICONS_VERSION="16.27.1"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ICONS_DIR="$SCRIPT_DIR/../templates/vara/icons"
TMP_DIR="$(mktemp -d)"

wget -q -O $TMP_DIR/LICENSE-SIMPLE-ICONS https://raw.githubusercontent.com/simple-icons/simple-icons/refs/tags/$SIMPLE_ICONS_VERSION/LICENSE.md
wget -q -O $TMP_DIR/simple-icons.zip https://github.com/simple-icons/simple-icons/archive/refs/tags/$SIMPLE_ICONS_VERSION.zip
unzip -q $TMP_DIR/simple-icons.zip -d $TMP_DIR/simple-icons

wget -q -O $TMP_DIR/LICENSE-LUCIDE https://raw.githubusercontent.com/lucide-icons/lucide/refs/tags/$LUCIDE_VERSION/LICENSE
wget -q -O $TMP_DIR/lucide.zip https://github.com/lucide-icons/lucide/releases/download/$LUCIDE_VERSION/lucide-icons-$LUCIDE_VERSION.zip
unzip -q $TMP_DIR/lucide.zip -d $TMP_DIR/lucide

# Collect Lucide icon names before the icons are moved out of the temp directory
LUCIDE_NAMES_FILE="$TMP_DIR/lucide-names.txt"
: > "$LUCIDE_NAMES_FILE"
for lucide_icon in "$TMP_DIR"/lucide/icons/*.svg; do
  basename "$lucide_icon" .svg >> "$LUCIDE_NAMES_FILE"
done
sort -u -o "$LUCIDE_NAMES_FILE" "$LUCIDE_NAMES_FILE"

# Clean up directory and move licenses
rm -rf $ICONS_DIR && mkdir -p $ICONS_DIR
mv $TMP_DIR/LICENSE-SIMPLE-ICONS $ICONS_DIR/LICENSE-SIMPLE-ICONS
mv $TMP_DIR/LICENSE-LUCIDE $ICONS_DIR/LICENSE-LUCIDE

# Move simple icons and preserve collisions before Lucide takes priority
mv -f $TMP_DIR/simple-icons/simple-icons-$SIMPLE_ICONS_VERSION/icons/*.svg $ICONS_DIR

for lucide_icon in "$TMP_DIR"/lucide/icons/*.svg; do
  icon_name="$(basename "$lucide_icon")"
  if [ -f "$ICONS_DIR/$icon_name" ]; then
    mv "$ICONS_DIR/$icon_name" "$ICONS_DIR/si-$icon_name"
  fi
done

mv -f $TMP_DIR/lucide/icons/*.svg $ICONS_DIR

# Download Varavel logo
rm -rf $ICONS_DIR/varavel.svg
wget -q -O $ICONS_DIR/varavel.svg https://raw.githubusercontent.com/varavelio/brand/refs/tags/v1.0.2/dist/logo-black.svg

# Generate icon manifest with provider and pinned license metadata
MANIFEST="$ICONS_DIR/icons.json"
{
  printf '{\n'
  printf '  "lucide_version": "%s",\n' "$LUCIDE_VERSION"
  printf '  "simple_icons_version": "%s",\n' "$SIMPLE_ICONS_VERSION"
  printf '  "licenses": {\n'
  printf '    "lucide": "https://raw.githubusercontent.com/lucide-icons/lucide/refs/tags/%s/LICENSE",\n' "$LUCIDE_VERSION"
  printf '    "simple-icons": "https://raw.githubusercontent.com/simple-icons/simple-icons/refs/tags/%s/LICENSE.md"\n' "$SIMPLE_ICONS_VERSION"
  printf '  },\n'
  printf '  "repos": {\n'
  printf '    "lucide": "https://github.com/lucide-icons/lucide/tree/%s",\n' "$LUCIDE_VERSION"
  printf '    "simple-icons": "https://github.com/simple-icons/simple-icons/tree/%s"\n' "$SIMPLE_ICONS_VERSION"
  printf '  },\n'
  printf '  "icons": [\n'
  first_icon=1
  for icon in "$ICONS_DIR"/*.svg; do
    name="$(basename "$icon" .svg)"
    if [ "$name" = "varavel" ]; then
      provider="varavel"
    elif [[ "$name" == si-* ]]; then
      provider="simple-icons"
    elif grep -qxF "$name" "$LUCIDE_NAMES_FILE"; then
      provider="lucide"
    else
      provider="simple-icons"
    fi
    if [ "$first_icon" -eq 0 ]; then
      printf ',\n'
    fi
    printf '    {"name": "%s", "provider": "%s"}' "$name" "$provider"
    first_icon=0
  done
  printf '\n  ]\n'
  printf '}\n'
} > "$MANIFEST"

# Normalize SVGs for template usage
for icon in "$ICONS_DIR"/*.svg; do
  # Detect if is solid or bordered
  if grep -q 'fill="none"' "$icon"; then
    fill='fill="none"'
    stroke='stroke="currentColor"'
  else
    fill='fill="currentColor"'
    stroke='stroke="none"'
  fi

  # Normalize SVG
  sed -i -z 's/xmlns="[^"]*"//g' "$icon" # Remove xmlns
  sed -i -z 's/class="[^"]*"//g' "$icon" # Remove class
  sed -i -z 's/fill="[^"]*"//g' "$icon" # Remove fill
  sed -i -z 's/stroke="[^"]*"//g' "$icon" # Remove stroke
  sed -i -z 's/<title>[^<]*<\/title>//g' "$icon" # Remove title
  sed -i -z "s/<svg/<svg $fill $stroke/" "$icon" # Add the new fill and stroke
done

# Minify SVGs
svgo -rf "$ICONS_DIR" --quiet --multipass --precision=3

# Clean up temporary directory
rm -rf $TMP_DIR
