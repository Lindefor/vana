<!-- 
    This is the renderer of the shortcut component in the main view of Vana
-->

<script lang="ts">
    import type { ShortcutNode } from "$src/lib/types/shortcut"
    export let shortcuts: ShortcutNode[]
</script>

<div class="shortcuts">
    {#each shortcuts as shortcut}
        <button class="shortcut">
            <img src={shortcut.iconPath} alt="Shortcut image" draggable="false"/>
        </button>
    {/each}
</div>

<style lang="scss">
    .shortcuts {
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: space-between;
    }

    .shortcut {
        border: none;
        border-right: 1px solid black;
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