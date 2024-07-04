<!-- 
    This is the navigation bar component of the main view of Vana
-->

<script lang="ts">
    import { shortcutStore } from "$lib/stores/shortcut"
    import type { ShortcutNode } from "$src/lib/types/shortcut";
    import { createShortcut } from "$src/lib/types/shortcut";
	import { onMount } from "svelte";
    import NavView from "./navElement.svelte";
    import CarlendarIcon from "$lib/icons/Calendar.svg?component";
    import GraphsIcon from "$lib/icons/Graphs.svg?component";
    import AddIcon from "$lib/icons/Add.svg?component";

    const Calendar: ShortcutNode = createShortcut("Calendar", CarlendarIcon, "TBD", true) 
    const Graphs: ShortcutNode = createShortcut("Graphs", GraphsIcon, "TBD", false) 
    const Add: ShortcutNode = createShortcut("Add", AddIcon, "TBD", false) 
    
    shortcutStore.addNavbarShortcut(Calendar)
    shortcutStore.addNavbarShortcut(Graphs)
    shortcutStore.addNavbarShortcut(Add)    
    console.log(2);
    
    onMount(() => {
        console.log("Hej")
    })
</script>

<div class="navigation">
    <NavView shortcuts={$shortcutStore.shortCuts}/>
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