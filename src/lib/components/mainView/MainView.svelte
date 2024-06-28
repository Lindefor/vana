<!-- 
    This is the main view component of Vana
-->

<script lang="ts">
	import NavBar from './navBar.svelte';
    import Calendar from './Calendar.svelte';
</script>

<div class="mainView">
	<div class="navBar">
		<NavBar />
	</div>
	<div class="content">
        <Calendar/>
    </div>
</div>

<style lang="scss">
	.mainView {
		display: flex;
		flex-direction: column;
		width: 950px;
		background-color: $darkModeLight;
		margin-top: -29px;
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
        overflow: scroll;
        padding: 20px;
	}
    .content::-webkit-scrollbar {
        display: none;
    }   
</style>
