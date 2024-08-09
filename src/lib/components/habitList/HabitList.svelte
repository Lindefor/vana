<!-- 
    This is the habit list component of Vana
-->

<script lang="ts">
    import { habitSystem } from "$lib/stores/habits";
    import type { Habit, HabitDir } from "$src/lib/types/habits";
    import { Habit as H } from "$src/lib/types/habits";
    import HabitDropDown from "./HabitDropDown.svelte";
    import { HABIT_LIST_WIDTH, HABIT_LIST_MAX_WIDTH } from "$lib/constants";
    import AppIcon from "../other/AppIcon.svelte";
    import AddIcon from "$lib/icons/Add.svg?component";
	import { onMount, createEventDispatcher } from "svelte";

    let dragging: { startX: any; } | null = null;
    let listWidth = HABIT_LIST_WIDTH;
    export let minimize = false;
    let searchFilter: string = "";
    const dispatch = createEventDispatcher();

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
            if (listWidth + dx >= HABIT_LIST_WIDTH && listWidth + dx <= HABIT_LIST_MAX_WIDTH) {
                listWidth += dx;
                listStyle += dx;
            }
        }
    }
    $: listStyle = minimize ? 0 : HABIT_LIST_WIDTH;

    // function filterHabits(habbitSystem: HabitDir) {
    //     // if match, dont recursive call
    //     // if no match, recursive call and only save those mathhing. If no matches at all, hs.subDirs = []
    //     hs.subDirs = habbitSystem.subDirs.filter(dir => dir.name.toLowerCase().startsWith(searchFilter)); 
    //     hs.habits = habbitSystem.habits.filter(habit => habit.name.toLowerCase().startsWith(searchFilter));
    //     return hs;
    // }
    // // Your function that should run every time searchFilter changes
    function handleSearchFilterChange() {        

    //     hs = get(habitSystem);
    //     if (searchFilter === "") {
    //         console.log($habitSystem);
            
    //         return $habitSystem;
    //     }
    //     else {
            
            
    //         return filterHabits(hs);
    //     }
    }

    // Reactive statement to watch for changes in searchFilter
    // $: if (searchFilter) {
        
    //     hs = {...handleSearchFilterChange()};
    //     console.log(hs);
        
    // }
    onMount(() => {
        window.addEventListener('mousemove', drag);
        window.addEventListener('mouseup', stopDrag);
        
        window.electron.readHabits();

        window.electron.onLoadedHabits(({ habitsData, subDirs, habits }: { habitsData: Record<any,any>, subDirs: any[], habits: any[] }) => {
            habitSystem.loadHabitSystem(habitsData);
        })
    })
    // onDestroy(() => {
    //         window.removeEventListener('mousemove', drag);
    //         window.removeEventListener('mouseup', stopDrag);
    // })  
    function toggleHabitCompleted(event: CustomEvent) {
        habitSystem.toggleHabitCompleted(event.detail.habit, event.detail.category);
    }

    function newHabit() {
        let habit = new H('', false, '', '');
        let category = "";
        dispatch('createHabit', { habit, category });
    }

    function editHabit(event: CustomEvent) {
        let habit = event.detail.habit;
        let category = event.detail.category;
        dispatch('createHabit', { habit, category });
    }
    
    
</script>

<div class="list" style="width:{listStyle}px;">
    <div class="habitContainer" style="width:{listWidth}px;">
        
        <div class="search"><AppIcon class="add" inactiveIcon={AddIcon} activeIcon={AddIcon} text="" on:toggle={newHabit}/><input class="search-text" spellcheck="false" bind:value={searchFilter} placeholder="Search" on:input={handleSearchFilterChange}/></div>
        <div class="habits">
            <HabitDropDown habitSystem={$habitSystem} on:toggleHabit={(event) => {toggleHabitCompleted(event)}} on:editHabit={(event) => {editHabit(event)}}/>
        </div> 
    </div>
    <div class="divider" role="button" tabindex="0" aria-label="Adjust Habit List size" on:mousedown={(e) => startDrag(e)}></div>
</div>

<style lang="scss">

    .list {
        display: flex;
        flex-direction: row;
        margin-top: -29px;
        border-left: 1px solid #494949;
    }
    .habitContainer {
        display: flex;
        flex-direction: column;
        background-color: $darkModeDark;
    }

    .search {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        padding: 40px;
        height: 25px;
    }

    .search-text {
        background: none;
        border: none;
        color: $graphGrey;
        padding-left: 20px;
        border-left: 1px solid $graphGrey;
        height: 30px;
        @include transition();
    }

    .search-text:focus {
        border: none;
        border-left: 1px solid white;
        outline: none;
        background: linear-gradient(to right, rgba($graphGrey,0.1), transparent);
    }

    .habits {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 25px);
        overflow-y: scroll;
        
    }
    
    .habit {
        padding: 10px;
        margin: -21px;
    }

    .divider {
        cursor: ew-resize;
        width: 2px;
        border-right: 1px solid black;
        height: 100%;
    }
</style>