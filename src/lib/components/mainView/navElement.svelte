<!-- 
    This is the renderer of the shortcut component in the main view of Vana
-->

<script lang="ts">
    import type { ShortcutNode } from "$src/lib/types/shortcut"
    import AppIcon from "$lib/components/other/AppIcon.svelte";
    import { shortcutStore } from "$lib/stores/shortcut"
    export let shortcuts: Record<string,ShortcutNode[]>
</script>

<div class="shortcuts">
    {#each shortcuts["navbar"] as shortcut}
        <button class="shortcut active-{shortcut.active}" on:click={() => shortcutStore.setNavbarActive(shortcut.name)}>
            <AppIcon class=leftbarShortcut inactiveIcon={shortcut.inactiveIconPath} activeIcon={shortcut.iconPath} text="" bind:active={shortcut.active}/>
            {#if shortcut.name !== "Add"}
            <div class="shortcut-text-{shortcut.active}">{shortcut.name}</div>    
            {/if}
        </button>
    {/each}
</div>

<style lang="scss">
    .shortcuts {
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: space-between;
        height: 100px;
    }

    .active-true {
        box-shadow: 0px 15px 10px -15px;
        transform: translateY(-3px);
    }

    .shortcut {
        border: none;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: transparent;
        padding: 0;
        cursor: pointer;
        @include transition()
    }

    .shortcut:hover {
        transform: translateY(-3px);
        filter: drop-shadow(7px 5px 3px #000000);
    }

    .shortcut:active {
        transform: translateY(0.5px);
    }

    .shortcut img {
        width: 60px;
        height: 60px;
        object-fit: cover;
    }

    .shortcut-text-false {
        color: grey;
        font-size: 14px;
    }

    .shortcut-text-true {
        color: white;
        font-size: 14px;
    }
</style>