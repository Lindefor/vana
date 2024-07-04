<!-- 
    This is the left bar component of Vana
-->

<script lang="ts">
    import { LEFTBAR_WIDTH } from "$lib/constants";
    import LeftBarShortcut from "./LeftBarShortcut.svelte";
    import { shortcutStore } from "$lib/stores/shortcut";
    import type { ShortcutNode } from "$src/lib/types/shortcut";
    import { createShortcut } from "$src/lib/types/shortcut";
    import HomeIcon from "$lib/icons/Home.svg?component";
    import SettingsIcon from "$lib/icons/Settings.svg?component";
    import StudyIcon from "$lib/icons/Study.svg?component";

    const Home: ShortcutNode = createShortcut("Home", HomeIcon, "TBD", false) 
    const Settings: ShortcutNode = createShortcut("Settings", SettingsIcon, "TBD", false) 
    const Study: ShortcutNode = createShortcut("Study", StudyIcon, "TBD", false) 
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