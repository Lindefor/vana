<!-- 
    This is the habit list component of Vana
-->

<script lang="ts">
    import { HABIT_LIST_WIDTH } from "$lib/constants";
</script>

<div class="habitList" style="width:{HABIT_LIST_WIDTH}px">
    s
</div>

<style lang="scss">
    .habitList {
        display: flex;
        flex-direction: row;
        background-color: $darkModeDark;
        border-left: 1px solid grey;
        border-right: 1px solid black;
        margin-top: -29px;
    }
</style>