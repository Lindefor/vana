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
            <AppIcon class=leftbarShortcut inactiveIcon={shortcut.iconPath} activeIcon={shortcut.iconPath} text=""/>
        </button>
    {/each}
</div>

<style lang="scss">
    .shortcuts {
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: space-between;

        .shortcut {
            &:not(:last-child) {
                border-right: 1px solid black;
                padding: 10px;
            }
        }
    }

    .active-true {
        background: $darkModeDark !important;
    }

    .shortcut {
        border: none;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #29292B;
        padding: 0;
        cursor: pointer;
    }

    .shortcut:hover {
        box-shadow: inset 0 0.8px 0.8px black;
    }

    .shortcut:active {
        box-shadow: inset 0 1px 2px black;
        transform: translateY(0.5px);
    }

    .shortcut img {
        width: 60px;
        height: 60px;
        object-fit: cover;
    }
</style>