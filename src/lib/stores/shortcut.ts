import { get, writable } from 'svelte/store';
import type { ShortcutNode } from '$lib/types/shortcut';

const buildShortcutStore = () => {
    const startState: Record<string,ShortcutNode[]> = {"leftbar": [], "navbar": []} 

	const { subscribe, set, update } = writable(startState);

	const methods = {
        getLeftbarShortcut(index: number) {
            return get(shortcutStore)["leftbar"][index]
        },
        addLeftbarShortcut(sc: ShortcutNode) {
			update((scStore) => {
				scStore["leftbar"].push(sc);
				return scStore;
			});
		},
        getNavbarShortcut(index: number) {
            return get(shortcutStore)["navbar"][index]
        },
        addNavbarShortcut(sc: ShortcutNode) {
			update((scStore) => {
				scStore["navbar"].push(sc);
				return scStore;
			});
		},
	};

	return {
		subscribe,
		set,
		...methods
	};
};

export const shortcutStore = buildShortcutStore();
