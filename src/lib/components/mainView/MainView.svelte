<!-- 
    This is the main view component of Vana
-->

<script lang="ts">
	import AppIcon from '../other/AppIcon.svelte';
	import LeftArrow from '$lib/icons/LeftArrow.svg?component';
    import RightArrow from '$lib/icons/RightArrow.svg?component';
	import NavBar from './navBar.svelte';
    import Calendar from './Calendar.svelte';
    import Graph from './Graph/Graph.svelte';
	import HabitMenu from '../HabitMenu.svelte';
    import { shortcutStore } from '$src/lib/stores/shortcut';
	import type { Habit } from '$src/lib/types/habits';
	export let minimizeLeftbar = false;
    $: activeView = $shortcutStore.navBarActive
	export let habitMenuOpen: boolean = false;
	let habitMenuMounted: boolean = false;
	export let habit: Habit;
	export let category: string;
	export let newHabit: boolean;
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
            <div class={habitMenuOpen ? "blurred":""}><Calendar/></div>
        {:else if activeView === 1}
		<div class={habitMenuOpen ? "blurred":""}><Graph/></div>
        {/if}
		{#if habitMenuOpen || habitMenuMounted}
			<div class="habit-menu-container"><HabitMenu bind:isOpen={habitMenuOpen} bind:mounted={habitMenuMounted} bind:habit={habit} bind:category={category} bind:newHabit={newHabit}/></div>
		{/if}
    </div>
</div>

<style lang="scss">
	.mainView {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
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
	}

	.content {
        height: calc(100vh - 210px);
        overflow-y: scroll;
        padding: 20px;
	}
    .content::-webkit-scrollbar {
        display: none;
    }   

	.blurred {
		filter: blur(10px);
		background: rgba($darkModeDark, 0.5);
	}


	.habit-menu-container {
		position: absolute;
		top: 20%;
		left: 40%;
		z-index: 1000;
	}
</style>
