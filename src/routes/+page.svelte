<script lang="ts">
    import LeftBar from "$lib/components/leftBar/LeftBar.svelte";
    import HabitList from "$lib/components/habitList/HabitList.svelte";
    import MiddleView from "$lib/components/mainView/MainView.svelte";
</script>

<svelte:head>
    <title>Vana</title>
    <meta name="noMetaName" content="Vana Demo App" />
</svelte:head>

<div class="wrapper">
    <div class="topBar">Vana</div>
    <div class="mainWrapper">
        <LeftBar />
        <HabitList />
        <MiddleView />
    </div>    
</div>



<style lang="scss">

    .wrapper {
        display: flex;
        flex-direction: column;
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