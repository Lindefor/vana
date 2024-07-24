<!-- 
    This is the habit list dropdown component of Vana
-->

<script context="module">
    import HabitDropDown from "./HabitDropDown.svelte"
</script>

<script lang="ts">
    import { fade } from "svelte/transition";
    import { flip } from "svelte/animate";
    import type { HabitDir, Habit } from "$src/lib/types/habits";
    import AppIcon from "../other/AppIcon.svelte";
    import Unmarked from '$lib/icons/Unmarked.svg?component';
    import Marked from '$lib/icons/Marked.svg?component';
    import DropClosed from '$lib/icons/DropClosed.svg?component';
    import DropOpened from '$lib/icons/DropOpened.svg?component';
    import { habitSystem as h} from "$src/lib/stores/habits";
    import { createEventDispatcher } from 'svelte';

	
    const dispather = createEventDispatcher();
    export let habitSystem: HabitDir;
    let activeDirs: Record<string,boolean> = {}
    let sortedHabits: Habit[] = [];
    let randomNumber = Math.floor(Math.random() * 100);
    
    function sortHabits(habits: Habit[]) {
        let sortedHabits = Object.values(habits ?? []).sort((a, b) => {
        if (a.completed === false && b.completed === true) {
            return -1;
        } else if (a.completed === true && b.completed === false) {
            return 1;
        } else {
            return 0;
        }
        });
        return sortedHabits
    }
    $: {
        sortedHabits = sortHabits(habitSystem.habits);
    }

    function updateHabit(event: CustomEvent, habit: Habit) {
        dispather('toggleHabit', { habit })
    }

    function selfToggle(event: CustomEvent) {
        let habit = event.detail.habit;
        dispather('toggleHabit', { habit })
    }


    
</script>

<div class="drop-down-container">
{#each Object.values(habitSystem.subDirs ?? []) as habitDir, index (habitDir.id)}
    <AppIcon class="dropDown" inactiveIcon={DropClosed} activeIcon={DropOpened} text={habitDir.name} bind:active={activeDirs[habitDir.id]}/>
    {#if activeDirs[habitDir.id]}
        <div class="habitDir">
            <div class="dirContainer" in:fade={{ duration: 1000, delay: index*400 }}>
                <HabitDropDown habitSystem={habitDir} on:toggleHabit={(event) => {selfToggle(event)}}/>
            </div>
        </div>
    {/if}
{/each}
{#each sortedHabits as habit, index (habit.id)}
    <div class="habit" in:fade={{ duration: 1000, delay: index*400 }} animate:flip={{ duration: 300 }}>
        <AppIcon class="habitCheck" inactiveIcon={Unmarked} activeIcon={Marked} text={habit.name} active={habit.completed} on:toggle={(event) => updateHabit(event, habit)}/>
        <button on:click={h.logAllCompleted}>HoverToMod</button>
    </div>
{/each}
</div>

<style lang="scss">
    .drop-down-container {
        display: flex;
        flex-direction: column;
        padding: 0px 0px 0px 18px;
        gap: 20px;
    }
    .habitDir {
        padding: 2px 0px 2px 6.2px;
    }
    .dirContainer {
        border-left: 1px dashed $graphGreen;
    }
    .habit {
        padding: 10px;
        margin-left: -24px;
    }
</style>