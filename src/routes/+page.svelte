<script lang="ts">
    import LeftBar from "$lib/components/leftBar/LeftBar.svelte";
    import HabitList from "$lib/components/habitList/HabitList.svelte";
    import MiddleView from "$lib/components/mainView/MainView.svelte";
	import type { Habit } from "$src/lib/types/habits";
    let minimize = false;
    let newHabit = false;
    let habit: Habit;
    let category: string;

    function modifyHabits(event: CustomEvent) {
        habit = event.detail.habit;
        category = event.detail.category;
        newHabit = true;
    }
</script>

<svelte:head>
    <meta name="noMetaName" content="Vana Demo App" />
</svelte:head>

<div class="wrapper">
    <div class="topBar"></div>
    <div class="mainWrapper">
        <LeftBar />
        <HabitList minimize={minimize} on:createHabit={(event) => (modifyHabits(event))}/>
        <MiddleView bind:minimizeLeftbar={minimize} bind:habitMenuOpen={newHabit} bind:habit={habit} bind:category={category}/>
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
</style>