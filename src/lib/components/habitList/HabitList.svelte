<!-- 
    This is the habit list component of Vana
-->

<script lang="ts">
    import { habitSystem } from "$lib/stores/habits";
    import type { HabitDir } from "$src/lib/types/habits";
    import HabitDropDown from "./HabitDropDown.svelte";
    import { HABIT_LIST_WIDTH } from "$lib/constants";
    import AppIcon from "../other/AppIcon.svelte";
    import AddIcon from "$lib/icons/Add.svg?component";
	import { onDestroy, onMount } from "svelte";

    let dragging: { startX: any; } | null = null;
    let listWidth = HABIT_LIST_WIDTH;
    export let minimize = false;
    let searchFilter: string = "";
    // let hs: HabitDir;
    // $: hs = $habitSystem;

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
            if (listWidth + dx >= HABIT_LIST_WIDTH) {
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
    //         console.log("YE");
    //         console.log($habitSystem);
            
    //         return $habitSystem;
    //     }
    //     else {
    //         console.log("NOPE");
    //         console.log(hs);
            
            
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
            habitSystem.loadHabits(habitsData, subDirs, habits);
        })

        // window.electron.onLoadedHabit(({ name, completed, description }: { name: string, completed: boolean, description: string }) => {
        //     habitSystem.updateHabit(name, completed, description);
        // })
    })
    // onDestroy(() => {
    //         window.removeEventListener('mousemove', drag);
    //         window.removeEventListener('mouseup', stopDrag);
    // })  
    
    
</script>

<div class="list" style="width:{listStyle}px;">
    <div class="habitContainer" style="width:{listWidth}px;">
        
        <div class="search"><AppIcon class="add" inactiveIcon={AddIcon} activeIcon={AddIcon} text=""/><input class="search-text" spellcheck="false" bind:value={searchFilter} placeholder="Search" on:input={handleSearchFilterChange}/></div>
        <div class="habits">
            <HabitDropDown habitSystem={$habitSystem}/>
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