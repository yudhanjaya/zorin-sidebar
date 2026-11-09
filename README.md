# Zorin Sidebar

A sidebar of just the apps you pin, in the visual style of the Zorin Dash.
Pinned apps only: no launchers, trash, mounts or window lists.

## Why

I build and test agent, harness and UI apps for work on
[Shoggoth](https://github.com/yudhanjaya/Shoggoth). That means a rotating cast
of short-lived tools and demos pinned to my dash for a day or an hour. It
annoyed me to have these sometimes ephemeral things cluttering up my dash,
especially when I couldn't remember their names sometimes. 

This extension
gives a sidebar of just the apps I choose to pin,
completely separate from my real dash.

## What it is

A fork of the **Zorin Dash** package (110.1, itself a fork of Dash to Dock by
Michele Giuseppe Grasso), stripped down to one job: **a sidebar of just the
apps you pin**, in the visual style of the Zorin Dash.

Changes from upstream:

- Renamed to Zorin Sidebar (UUID `zorin-sidebar@yudhanjaya.com`)
- Defaults: vertical bar, **right edge**, always visible, icon size 48
- **Hidden by default**: Show Apps button, trash, mounts, running-app icons,
  window previews
- App management = the same as the stock dash: pin/unpin via the + tile
  ("Add to Sidebar"), drag icons to reorder, drag apps from the app grid to add
- Preferences page rewritten around only what's relevant: position, size,
  transparency. No trash/mounts/intellihide/window-menu options

## Using it

Pinned apps live in the sidebar's own list (`sidebar-apps` in the
`org.gnome.shell.extensions.zorin-sidebar` schema), completely separate from
GNOME's `favorite-apps`, so pinning here does not change your overview dash,
and vice versa.

1. Enable it, reload the shell (X11: `Alt+F2`, type `r`)
2. Pin apps by **dragging them from the app grid onto the bar**, or
   right-click an icon in the bar and choose **Add to Sidebar**
3. Drag icons to reorder; right-click an icon: New Window /
   Remove from Sidebar / Quit

## License and attribution

GPL-2.0-or-later, the same license as Dash to Dock. See `LICENSE`.
Upstream authors and attribution are retained in file headers, metadata
and here.

## Trademark note

I have no claim to the Zorin name, nor do I assert as such. Zorin OS and
the Zorin name are the property of their respective owners. This project is
an independent fork and is not affiliated with, endorsed by or produced by
Zorin OS or its developers.
