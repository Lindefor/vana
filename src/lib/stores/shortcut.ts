import { get, writable } from "svelte/store";
import type { ShortcutNode } from "$lib/types/shortcut";
import { createShortcut } from "$lib/types/shortcut";


const buildShortcutStore = () => {
  const Home: ShortcutNode = createShortcut("Home", "HomeIcon.png", "TBD") 
  const Settings: ShortcutNode = createShortcut("Settings", "SettingsIcon.png", "TBD") 
  const Study: ShortcutNode = createShortcut("Study", "StudyIcon.png", "TBD") 
  const startState: ShortcutNode[] = [Home, Settings, Study]

  const { subscribe, set, update } = writable(startState);

  const methods = {
    getShortcut(index: number) {
        return get(shortcutStore)[index];
    },
    addShortcut(sc: ShortcutNode) {
        update((scStore) => {
            scStore.push(sc)
            return scStore;
        })
    }
  }

  return {
    subscribe,
    set,
    ...methods
  }
};

export const shortcutStore = buildShortcutStore();