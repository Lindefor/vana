<!-- 
    This is the navigation bar component of the main view of Vana
-->

<script lang="ts">
    import { shortcutStore } from "$lib/stores/shortcut"
    import type { ShortcutNode } from "$src/lib/types/shortcut";
    import { createShortcut } from "$src/lib/types/shortcut";
	import { onMount } from "svelte";
    import NavView from "./navElement.svelte";

    const Calendar: ShortcutNode = createShortcut("Calendar", "CalendarIcon.png", "TBD", true) 
    const Graphs: ShortcutNode = createShortcut("Graphs", "GraphIcon.png", "TBD", false) 
    const Add: ShortcutNode = createShortcut("Add", "PlusIcon.png", "TBD", false) 
    
    shortcutStore.addNavbarShortcut(Calendar)
    shortcutStore.addNavbarShortcut(Graphs)
    shortcutStore.addNavbarShortcut(Add)    
    console.log(2);
    
    onMount(() => {
        console.log("Hej")
    })
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
        overflow: scroll;
    }

    .navigation::-webkit-scrollbar {
        display: none;
    }   
</style>