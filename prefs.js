/*
 * This file is part of the Zorin Sidebar extension.
 *
 * Based on Dash to Dock (c) Michele Giuseppe Grasso, and on the Zorin Dash
 * (Zorin OS). GPL-2.0-or-later.
 */

import Adw from 'gi://Adw'
import Gio from 'gi://Gio'
import GObject from 'gi://GObject'
import Gtk from 'gi://Gtk'

import { ExtensionPreferences } from 'resource:///org/gnome/shell/extensions/prefs.js'

const POSITIONS = ['RIGHT', 'LEFT', 'TOP', 'BOTTOM']
const POSITION_LABELS = ['Right edge', 'Left edge', 'Top edge', 'Bottom edge']
const TRANSPARENCY = ['DEFAULT', 'FIXED', 'DYNAMIC']
const TRANSPARENCY_LABELS = ['Theme default', 'Custom (constant)', 'Dynamic (fade near windows)']

export default class ZorinSidebarPreferences extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    const settings = this.getSettings()

    window.set_default_size(480, 520)
    window.set_title('Zorin Sidebar')

    const page = new Adw.PreferencesPage()

    // ------------------------------- Apps -------------------------------
    const apps = new Adw.PreferencesGroup({
      title: 'Pinned apps',
      description:
        'The sidebar shows only apps you pin, and pins them independently of your overview dash. Pin apps by dragging them from the app grid onto the bar, or right-click an icon in the bar and choose Add to Sidebar. Drag icons to reorder. Nothing else lives here.',
    })
    page.add(apps)

    // ------------------------------ Layout ------------------------------
    const layout = new Adw.PreferencesGroup({
      title: 'Layout',
    })
    page.add(layout)

    const positionRow = new Adw.ComboRow({
      title: 'Position',
      model: Gtk.StringList.new(POSITION_LABELS),
    })
    positionRow.selected = POSITIONS.indexOf(settings.get_string('dock-position'))
    positionRow.connect('notify::selected', () => {
      settings.set_string('dock-position', POSITIONS[positionRow.selected])
    })
    layout.add(positionRow)

    const heightRow = new Adw.SpinRow({
      title: 'Max bar size',
      subtitle: 'Fraction of the screen the bar may fill (height/width)',
      digits: 2,
      adjustment: new Gtk.Adjustment({
        lower: 0.5,
        upper: 0.99,
        step_increment: 0.05,
        page_increment: 0.1,
      }),
    })
    heightRow.value = settings.get_double('height-fraction')
    heightRow.connect('notify::value', () => {
      settings.set_double('height-fraction', Number(heightRow.value.toFixed(2)))
    })
    layout.add(heightRow)

    const extendRow = new Adw.SwitchRow({
      title: 'Extend bar to full length',
      subtitle: 'Stretch the bar to the whole screen edge instead of just fitting its icons',
    })
    settings.bind('extend-height', extendRow, 'active', Gio.SettingsBindFlags.DEFAULT)
    layout.add(extendRow)

    const centerRow = new Adw.SwitchRow({
      title: 'Center icons',
      subtitle: 'When the bar is extended, center the icons instead of top-aligning them',
    })
    settings.bind('always-center-icons', centerRow, 'active', Gio.SettingsBindFlags.DEFAULT)
    layout.add(centerRow)

    const iconRow = new Adw.SpinRow({
      title: 'Icon size',
      adjustment: new Gtk.Adjustment({
        lower: 16,
        upper: 64,
        step_increment: 1,
        page_increment: 8,
      }),
    })
    iconRow.value = settings.get_int('dash-max-icon-size')
    iconRow.connect('notify::value', () => {
      settings.set_int('dash-max-icon-size', Math.round(iconRow.value))
    })
    layout.add(iconRow)

    // ------------------------------ Appearance ---------------------------
    const appearance = new Adw.PreferencesGroup({
      title: 'Appearance',
      description:
        'Look and feel inherited from the Zorin Dash; opacity can be customised.',
    })
    page.add(appearance)

    const transparencyRow = new Adw.ComboRow({
      title: 'Transparency',
      model: Gtk.StringList.new(TRANSPARENCY_LABELS),
    })
    transparencyRow.selected = TRANSPARENCY.indexOf(settings.get_string('transparency-mode'))
    transparencyRow.connect('notify::selected', () => {
      settings.set_string('transparency-mode', TRANSPARENCY[transparencyRow.selected])
    })
    appearance.add(transparencyRow)

    const customAlphaRow = new Adw.SwitchRow({
      title: 'Custom opacity',
      subtitle: 'Use your own min/max instead of the theme opacity',
    })
    settings.bind('customize-alphas', customAlphaRow, 'active', Gio.SettingsBindFlags.DEFAULT)
    appearance.add(customAlphaRow)

    const minAlphaRow = new Adw.SpinRow({
      title: 'Opacity (no window near)',
      digits: 2,
      adjustment: new Gtk.Adjustment({
        lower: 0,
        upper: 1,
        step_increment: 0.05,
        page_increment: 0.1,
      }),
    })
    minAlphaRow.value = settings.get_double('min-alpha')
    minAlphaRow.connect('notify::value', () => {
      settings.set_double('min-alpha', Number(minAlphaRow.value.toFixed(2)))
    })
    appearance.add(minAlphaRow)

    const maxAlphaRow = new Adw.SpinRow({
      title: 'Opacity (windows near / constant)',
      digits: 2,
      adjustment: new Gtk.Adjustment({
        lower: 0,
        upper: 1,
        step_increment: 0.05,
        page_increment: 0.1,
      }),
    })
    maxAlphaRow.value = settings.get_double('max-alpha')
    maxAlphaRow.connect('notify::value', () => {
      settings.set_double('max-alpha', Number(maxAlphaRow.value.toFixed(2)))
    })
    appearance.add(maxAlphaRow)

    window.add(page)
  }
}
