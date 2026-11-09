# Zorin Sidebar

A fork of the **Zorin Dash** (itself a fork of Dash to Dock by Michele
Giuseppe Grasso), stripped down to one job: **a sidebar of just the apps you
pin**, in the visual style of the Zorin Dash.

Based on the Zorin Dash 110.1 package, GPL-2.0-or-later.
Changes from upstream:

- Renamed to Zorin Sidebar (UUID `zorin-sidebar@yudhanjaya.com`)
- Defaults: vertical bar, **right edge**, always visible, icon size 48
- **Hidden by default**: Show Apps button, trash, mounts, running-app icons,
  window previews
- App management = the same as the stock dash: pin/unpin via the + tile
  ("Add to Sidebar"), drag icons to reorder, drag apps from the app grid to add
- Preferences page rewritten around only what's relevant: position, size,
  transparency — no trash/mounts/intellihide/window-menu options

## Using it

1. Enable it, reload the shell (X11: `Alt+F2` → `r`)
2. Click the **+** tile (or the dash context menu) to pin apps
3. Drag apps from the app grid onto the bar to pin them
4. Right-click an icon: New Window / Remove from Sidebar / Quit

## License

GPL-2.0-or-later. Upstream authors and attribution retained in file headers,
metadata and here.
