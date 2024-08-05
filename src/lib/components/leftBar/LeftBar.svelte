<!-- 
    This is the left bar component of Vana
-->

<script lang="ts">
    import { LEFTBAR_WIDTH } from "$lib/constants";
    import LeftBarShortcut from "./LeftBarShortcut.svelte";
    import { shortcutStore } from "$lib/stores/shortcut";
    
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