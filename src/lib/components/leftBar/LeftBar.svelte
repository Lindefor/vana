<!-- 
    This is the left bar component of Vana
-->

<script lang="ts">
    import { LEFTBAR_WIDTH } from "$lib/constants";
    import LeftBarShortcut from "./LeftBarShortcut.svelte";
    import { shortcutStore } from "$lib/stores/shortcut"
    import type { ShortcutNode } from "$src/lib/types/shortcut";
    import { createShortcut } from "$src/lib/types/shortcut";

    const Home: ShortcutNode = createShortcut("Home", "HomeIcon.png", "TBD", false) 
    const Settings: ShortcutNode = createShortcut("Settings", "SettingsIcon.png", "TBD", false) 
    const Study: ShortcutNode = createShortcut("Study", "StudyIcon.png", "TBD", false) 
    shortcutStore.addLeftbarShortcut(Home)
    shortcutStore.addLeftbarShortcut(Settings)
    shortcutStore.addLeftbarShortcut(Study)
</script>

<div class="leftBar" style="width:{LEFTBAR_WIDTH}px">
    <LeftBarShortcut shortcuts={$shortcutStore.shortCuts["leftbar"]}/>
</div>

<style lang="scss">
    .leftBar {
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        background-color: $darkModeDark;
        height: 100vh;
    }
</style>