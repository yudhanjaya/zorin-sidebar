/*
 * This file is part of the Zorin Sidebar extension.
 *
 * Based on Dash to Dock (c) Michele Giuseppe Grasso, and on the Zorin Dash
 * (Zorin OS). GPL-2.0-or-later.
 *
 * A small self-contained "favourites" manager backed by this extension's own
 * gsettings list ('sidebar-apps', ordered desktop file IDs), deliberately
 * independent of GNOME's `favorite-apps` — the sidebar and the overview dash
 * manage their pinned apps separately.
 */

/* eslint-disable no-unused-vars */

import Shell from 'gi://Shell'

import { EventEmitter } from 'resource:///org/gnome/shell/misc/signals.js'

let instance = null

export class SidebarApps extends EventEmitter {
  constructor(settings) {
    super()
    if (!settings) {
      throw new Error('SidebarApps requires the extension settings object')
    }
    this._settings = settings
    this._settings.connect('changed::sidebar-apps', () => this.emit('changed'))
    this.reload()
  }

  reload() {
    try {
      this._apps = this._settings.get_strv('sidebar-apps').slice()
    } catch (e) {
      this._apps = []
    }
  }

  /* Shell.App list, in sidebar order. Mirrors AppFavorites.getFavorites(). */
  getFavorites() {
    const system = Shell.AppSystem.get_default()
    if (!system) return []
    const apps = []
    for (const id of this._apps) {
      const app = system.lookup_app(id)
      if (app) apps.push(app)
    }
    return apps
  }

  /* {desktop-id -> Shell.App}, insertion ordered. Mirrors getFavoriteMap(). */
  getFavoriteMap() {
    const map = {}
    for (const app of this.getFavorites()) {
      if (!app.is_window_backed?.()) map[app.get_id()] = app
    }
    return map
  }

  isFavorite(id) {
    return this._apps.includes(id)
  }

  _save(list) {
    this._apps = list.slice()
    this._settings.set_strv('sidebar-apps', this._apps)
    // 'changed' fires from the gsettings handler above
  }

  addFavorite(id) {
    const list = this.getFavoriteIds()
    if (!list.includes(id)) {
      list.push(id)
      this._save(list)
    }
  }

  addFavoriteAtPos(id, pos) {
    const list = this.getFavoriteIds().filter((x) => x !== id)
    list.splice(Math.min(Math.max(0, pos), list.length), 0, id)
    this._save(list)
  }

  removeFavorite(id) {
    this._save(this.getFavoriteIds().filter((x) => x !== id))
  }

  moveFavoriteToPos(id, pos) {
    const list = this.getFavoriteIds()
    const current = list.indexOf(id)
    if (current === -1) return
    list.splice(current, 1)
    list.splice(Math.min(Math.max(0, pos), list.length), 0, id)
    this._save(list)
  }

  getFavoriteIds() {
    return this._apps.slice()
  }
}

export function initSidebarApps(settings) {
  instance = new SidebarApps(settings)
  return instance
}

export function getSidebarApps() {
  if (!instance) {
    throw new Error('SidebarApps not initialized; call initSidebarApps(settings) first')
  }
  return instance
}

