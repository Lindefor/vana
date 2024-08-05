<!-- 
    This is the navigation bar component of the main view of Vana
-->

<script lang="ts">
    import { shortcutStore } from "$lib/stores/shortcut"
	import { onMount } from "svelte";
    import NavView from "./navElement.svelte";

    onMount(() => {
        shortcutStore.initStore()
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
        height: fit-content;
        overflow: scroll;
        overflow-y: visible;
    }

    .navigation::-webkit-scrollbar {
        display: none;
    }   
</style>