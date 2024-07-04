<!-- 
    This is the shortcut component in the left bar of Vana
-->

<script lang="ts">
    import { LEFTBAR_WIDTH } from "$src/lib/constants";
    import AppIcon from "$lib/components/other/AppIcon.svelte";
    import type { ShortcutNode } from "$src/lib/types/shortcut"
    export let shortcuts: ShortcutNode[]
</script>

<div class="shortcuts">
    {#each shortcuts as shortcut}
        <button class="shortcut">
            <AppIcon class="leftbarShortcut" inactiveIcon={shortcut.iconPath} activeIcon={shortcut.iconPath} text=""/>
        </button>
    {/each}
</div>

<style lang="scss">
    .shortcuts {
        display: flex;
        flex-direction: column;
        gap: 40px;
        margin-top: 30px;
        margin-inline: 15px;
    }

    .shortcut {
        border: 1px solid black;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $darkModeLight;
        padding: 0;
        cursor: pointer;
    }

    .shortcut:hover {
        box-shadow: 0 0 0 1px black;
    }

    .shortcut:active {
        box-shadow: inset 0 1px 2px black;
        transform: translateY(2px);
    }

    .shortcut img {
        width: 90%;
        height: 90%;
        object-fit: cover;
    }
</style>