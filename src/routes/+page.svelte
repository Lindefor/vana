<script lang="ts">
    import LeftBar from "$lib/components/leftBar/LeftBar.svelte";
    import HabitList from "$lib/components/habitList/HabitList.svelte";
    import MiddleView from "$lib/components/mainView/MainView.svelte";
	import type { Habit } from "$src/lib/types/habits";
    let minimize = false;
    let newHabit = false;
    let habit: Habit;
    let category: string;
    let createHabit = false;

    function modifyHabits(event: CustomEvent) {
        habit = event.detail.habit;
        category = event.detail.category;
        newHabit = event.detail.new;
        createHabit = true;
    }
</script>

<svelte:head>
    <meta name="noMetaName" content="Vana Demo App" />
</svelte:head>

<div class="wrapper">
    <div class="topBar"></div>
    <div class="mainWrapper">
        <div class="sidebar"><LeftBar /></div>
        <div class="sidebar"><HabitList minimize={minimize} on:createHabit={(event) => (modifyHabits(event))}/></div>
        <div class="middle-wrapper"><MiddleView bind:minimizeLeftbar={minimize} bind:habitMenuOpen={createHabit} bind:habit={habit} bind:category={category} bind:newHabit={newHabit}/></div>
    </div>    
</div>



<style lang="scss">
    html, body {
        height: 100%;
        margin: 0;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .topBar {
        height: 30px;
        width: 100%;
        z-index: 1000;
        -webkit-user-select: none;
        user-select: none;
        -webkit-app-region: drag;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $fontColor;
    }
    
    .mainWrapper {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        position: relative;
    }

    :global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Roboto', sans-serif;
        color: $fontColor;
		overflow: hidden;
        -webkit-font-smoothing: antialiased;
        user-select: none;
	}

    .sidebar {
        position: relative;
        z-index: 10002;
    }

    .middle-wrapper {
        width: 100%;
        height: 100%;
    }
</style>