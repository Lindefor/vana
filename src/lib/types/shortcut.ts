import type { ComponentType, SvelteComponent } from 'svelte'
import type { SVGAttributes } from 'svelte/elements';

/**
 * Represents the full shortcut tree.
 */
export interface ShortcutStore {
    navBarActive: number;
    leftBarActive: number;
    shortCuts: Record<string, ShortcutNode[]>;
}


/**
 * Represents a node in the shortcut tree.
 */
export interface ShortcutNode {
    /**
     * The name of the shortcut.
     */
    name: string;
    
    /**
     * The path to the icon file for the shortcut.
     */
    iconPath: ComponentType<SvelteComponent<SVGAttributes<SVGSVGElement>, any, any>>;
    
    /**
     * The path to the icon file for the inactive shortcut.
     */
    inactiveIconPath: ComponentType<SvelteComponent<SVGAttributes<SVGSVGElement>, any, any>>;
    /**
     * The path to the shortcut file.
     */
    shortcutPath: string;

    /**
     * The path to the shortcut file.
     */
    active: boolean;
}

/**
 * Represents a shortcut.
 */
export type Shortcut = ShortcutNode;

/**
 * Instantiate a shortcut by creating a new instance of the ShortcutNode interface.
 * 
 * @param name - The name of the shortcut.
 * @returns A new instance of the ShortcutNode interface.
 * 
 * @example
 * const myShortcut: ShortcutNode = createShortcut("My Shortcut", "icon path", "shortcut path");
 * console.log(myShortcut.name); // Output: "My Shortcut"
 */
export function createShortcut(name: string, icon: ComponentType<SvelteComponent<SVGAttributes<SVGSVGElement>, any, any>>, inactiveIcon: ComponentType<SvelteComponent<SVGAttributes<SVGSVGElement>, any, any>>, shortcut: string, active: boolean): ShortcutNode {
    return {
        name: name,
        iconPath: icon,
        inactiveIconPath: inactiveIcon,
        shortcutPath: shortcut,
        active: active
    };
}

