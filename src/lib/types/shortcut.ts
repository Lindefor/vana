

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
    iconPath: string;
    
    /**
     * The path to the shortcut file.
     */
    shortcutPath: string;
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
export function createShortcut(name: string, icon: string, shortcut: string): ShortcutNode {
    return {
        name: name,
        iconPath: icon,
        shortcutPath: shortcut
    };
}

