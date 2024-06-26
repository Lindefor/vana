<!-- 
    This is the navigation bar component of the main view of Vana
-->

<script lang="ts">
    import { shortcutStore } from "$lib/stores/shortcut"
    import type { ShortcutNode } from "$src/lib/types/shortcut";
    import { createShortcut } from "$src/lib/types/shortcut";
    import NavView from "./navElement.svelte";

    const Calendar: ShortcutNode = createShortcut("Calendar", "CalendarIcon.png", "TBD") 
    const Graphs: ShortcutNode = createShortcut("Graphs", "GraphIcon.png", "TBD") 
    const Add: ShortcutNode = createShortcut("Add", "PlusIcon.png", "TBD") 
    
    shortcutStore.addNavbarShortcut(Calendar)
    shortcutStore.addNavbarShortcut(Graphs)
    shortcutStore.addNavbarShortcut(Add)
</script>

<div class="navigation">
    <NavView shortcuts={$shortcutStore["navbar"]}/>
</div>

<style lang="scss">
    .navigation {
        display: flex;
        flex-direction: row;
        width: 60%;
        height: 30%;
        border-radius: 15px;
        background-color: $darkModeDark;
        border: 1px solid black;
        overflow: hidden;
    }
</style>