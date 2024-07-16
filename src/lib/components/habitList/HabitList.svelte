<!-- 
    This is the habit list component of Vana
-->

<script lang="ts">
    import { HABIT_LIST_WIDTH } from "$lib/constants";
	import { onDestroy, onMount } from "svelte";

    let dragging: { startX: any; } | null = null;
    let listWidth = HABIT_LIST_WIDTH-60;

    function startDrag(e: MouseEvent) {
        dragging = {startX: e.clientX};
    }

    function stopDrag() {
        dragging = null;
    }

    function drag(e: MouseEvent) {
        if (dragging) {
            const dx = e.clientX - dragging.startX;
            dragging.startX = e.clientX;
            if (listWidth + dx >= HABIT_LIST_WIDTH-60) {
                listWidth += dx;
            }
        }
    }

    onMount(() => {
        window.addEventListener('mousemove', drag);
        window.addEventListener('mouseup', stopDrag);
        
    })
    // onDestroy(() => {
    //         window.removeEventListener('mousemove', drag);
    //         window.removeEventListener('mouseup', stopDrag);
    // })  
    
    
</script>

<div class="list">
    <div class="habitList" style="width:{listWidth}px;">s</div>
    <div class="divider" role="button" tabindex="0" aria-label="Adjust Habit List size" on:mousedown={(e) => startDrag(e)}></div>
</div>

<style lang="scss">

    .list {
        display: flex;
        flex-direction: row;
        margin-top: -29px;
        border-left: 1px solid #494949;
        // flex: 1;
    }
    .habitList {
        background-color: $darkModeDark;
        
    }

    .divider {
        cursor: ew-resize;
        width: 2px;
        border-right: 1px solid black;
        height: 100%;
    }
</style>