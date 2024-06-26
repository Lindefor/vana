<!-- 
    This is the main view component of Vana
-->

<script lang="ts">
    import NavBar from "./navBar.svelte";
</script>

<div class="mainView">
    <div class=navBar>
        <NavBar />
    </div>
    <div class="content">
        s
    </div>
</div>

<style lang="scss">
    .mainView {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: $darkModeLight;
        margin-top: -29px;
    }

    .navBar {
        border: 1px solid red;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content {
        border: 1px solid red;
        height: 100%;
    }
</style>