import { get, writable } from 'svelte/store';
import type { ShortcutNode, ShortcutStore } from '$lib/types/shortcut';
import { createShortcut } from "$src/lib/types/shortcut";
import CarlendarIcon from "$lib/icons/Calendar.svg?component";
import CarlendarInactiveIcon from "$lib/icons/CalendarInactive.svg?component";
import GraphsIcon from "$lib/icons/Graphs.svg?component";
import GraphsInactiveIcon from "$lib/icons/GraphsInactive.svg?component";
import AddIcon from "$lib/icons/Add.svg?component";
import AddInactiveIcon from "$lib/icons/AddInactive.svg?component";
import HomeIcon from "$lib/icons/Home.svg?component";
import SettingsIcon from "$lib/icons/Settings.svg?component";
import StudyIcon from "$lib/icons/Study.svg?component";

const buildShortcutStore = () => {
    const startState: ShortcutStore = {
		navBarActive: 0,
		leftBarActive: 0,
		shortCuts: {"leftbar": [], "navbar": []} 
	}
	
	const { subscribe, set, update } = writable(startState);

	const methods = {
		initStore() {
			const startState: ShortcutStore = {
				navBarActive: 0,
				leftBarActive: 0,
				shortCuts: {"leftbar": [], "navbar": []} 
			}
			set(startState)

			const Calendar: ShortcutNode = createShortcut("Calendar", CarlendarIcon, CarlendarInactiveIcon, "TBD", true) 
			const Graphs: ShortcutNode = createShortcut("Graphs", GraphsIcon, GraphsInactiveIcon, "TBD", false) 
			const Add: ShortcutNode = createShortcut("Add", AddIcon, AddInactiveIcon, "TBD", false) 
			const Home: ShortcutNode = createShortcut("Home", HomeIcon, HomeIcon, "TBD", false) 
			const Settings: ShortcutNode = createShortcut("Settings", SettingsIcon, SettingsIcon, "TBD", false) 
			const Study: ShortcutNode = createShortcut("Study", StudyIcon, StudyIcon, "TBD", false) 
			
			shortcutStore.addNavbarShortcut(Calendar)
			shortcutStore.addNavbarShortcut(Graphs)
			shortcutStore.addNavbarShortcut(Add)  
			shortcutStore.addLeftbarShortcut(Home)
			shortcutStore.addLeftbarShortcut(Settings)
			shortcutStore.addLeftbarShortcut(Study)
		},
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
