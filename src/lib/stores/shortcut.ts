import { get, writable } from 'svelte/store';
import type { ShortcutNode, ShortcutStore } from '$lib/types/shortcut';

const buildShortcutStore = () => {
    const startState: ShortcutStore = {
		navBarActive: 0,
		leftBarActive: 0,
		shortCuts: {"leftbar": [], "navbar": []} 
	}
	
	const { subscribe, set, update } = writable(startState);

	const methods = {
        getLeftbarShortcut(index: number) {
            return get(shortcutStore).shortCuts["leftbar"][index]
        },
        addLeftbarShortcut(sc: ShortcutNode) {
			update((scStore) => {
				scStore.shortCuts["leftbar"].push(sc);
				return scStore;
			});
		},
        getNavbarShortcut(index: number) {
            return get(shortcutStore).shortCuts["navbar"][index]
        },
        addNavbarShortcut(sc: ShortcutNode) {
			update((scStore) => {
				scStore.shortCuts["navbar"].push(sc);
				return scStore;
			});
		},
		setNavbarActive(name: string) {
			update((scStore) => {
				let index: number = 0
				for (let i = 0; i < scStore.shortCuts["navbar"].length; i++) {
					const shortcut = scStore.shortCuts["navbar"][i];
					shortcut.active = shortcut.name === name;
					index = shortcut.name === name ? i:index
				}
				scStore.navBarActive = index
				return scStore;
			});
		}
	};

	return {
		subscribe,
		set,
		...methods
	};
};

export const shortcutStore = buildShortcutStore();
