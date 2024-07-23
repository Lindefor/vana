<!-- 
    This is the main view component of Vana
-->

<script lang="ts">
	import AppIcon from '../other/AppIcon.svelte';
	import LeftArrow from '$lib/icons/LeftArrow.svg?component';
    import RightArrow from '$lib/icons/RightArrow.svg?component';
	import NavBar from './navBar.svelte';
    import Calendar from './Calendar.svelte';
    import Graph from './Graph.svelte';
    import { shortcutStore } from '$src/lib/stores/shortcut';
	export let minimizeLeftbar = false;
    $: activeView = $shortcutStore.navBarActive
</script>

<div class="mainView">
	<div class="fullscreen">
	<AppIcon class="habitCheck" inactiveIcon={LeftArrow} activeIcon={RightArrow} text={""} bind:active={minimizeLeftbar}/>
	</div>
	<!-- <button class="fullscreen" on:click={() => minimizeLeftbar = !minimizeLeftbar}>Fullscreen</button> -->
	<div class="navBar">
		<NavBar />
	</div>
	<div class="content">
        {#if activeView === 0}
            <Calendar/>
        {:else if activeView === 1}
            <Graph/>
        {/if}
    </div>
</div>

<style lang="scss">
	.mainView {
		display: flex;
		flex-direction: column;
		width: 600px;
		background-color: $darkModeLight;
		margin-top: -29px;
		flex: 1;
	}

	.fullscreen {
		background: none;
		display: flex;
		position: relative;
		top: 50px;
		width: 50px;
		left: 0;
	}

	.navBar {
		height: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
        border-bottom: 1px solid black;
	}

	.content {
        height: calc(100vh - 200px);
        overflow-y: scroll;
        padding: 20px;
	}
    .content::-webkit-scrollbar {
        display: none;
    }   
</style>
