// -*- mode: js; js-indent-level: 4; indent-tabs-mode: nil -*-

import {DockManager} from './docking.js';
import {Extension} from './dependencies/shell/extensions/extension.js';

// We export this so it can be accessed by other extensions
export let dockManager;

export default class ZorinSidebarExtension extends Extension.Extension {
    enable() {
        // Workaround for race condition in GNOME Shell where enable() may be called multiple times
        if (this._alreadyEnabled)
            return;
        this._alreadyEnabled = true;

        // TODO: Remove this when upstream will disable extensions on shutdown
        // See: https://gitlab.gnome.org/GNOME/gnome-shell/-/merge_requests/4214
        this._shutdownID = global.connect('shutdown', () => this.disable());

        try {
            dockManager = new DockManager(this);
        } catch (e) {
            logError(e, 'Failed to enable, resetting state');
            this.disable();
        }
    }

    disable() {
        if (this._shutdownID) {
            global.disconnect(this._shutdownID);
            delete this._shutdownID;
        }

        dockManager?.destroy();
        dockManager = null;

        this._alreadyEnabled = false;
    }
}
