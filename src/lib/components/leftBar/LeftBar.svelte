<!-- 
    This is the shortcut component in the left bar of Vana
-->

<script lang="ts">
    import { LEFTBAR_WIDTH } from "$lib/constants";
</script>

<div class="leftBar" style="width:{LEFTBAR_WIDTH}px">
    s
</div>

<style lang="scss">
    .leftBar {
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        background-color: $darkModeDark;
    }
</style>