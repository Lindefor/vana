<!-- 
    This is the renderer of the calendar component in the main view of Vana
-->

<script lang="ts">
	import { Line, Doughnut } from 'svelte-chartjs';
    import { flip } from 'svelte/animate';
    import { habitSystem } from "$lib/stores/habits";
    import type { HabitDir, Habit } from '$src/lib/types/habits';
    import AppIcon from '$lib/components/other/AppIcon.svelte';
    import Unmarked from '$lib/icons/Unmarked.svg?component';
    import Marked from '$lib/icons/Marked.svg?component';
    import Add from '$lib/icons/Add.svg?component';
    import { line, doughnut } from './graphConfig';
    
    import { graphBlue, graphBrown, graphGreen, graphRed, graphYellow, graphBlack, graphWhite, graphGrey, fontFamily, warning, good, darkModeLight, darkModeDark } from '$src/lib/stylingConstants';
    import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
	plugins,
	Chart,
  } from 'chart.js';
	
    let fontColor = Chart.defaults.color;
    
    let displayedHabits: Habit[] = [];
    let habitCategories: Record<string, string> = {};
    let disabledItems: number[] = [];
    import { afterUpdate, onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    let containerSize: number;
    let weeklyData = {
        "Completed": [0, 0, 0, 0, 0, 0, 0],
        "Incompleted": [0, 0, 0, 0, 0, 0, 0],
        // "Not marked": [0, 0, 0, 0, 0, 0, 0]
    };
    let doughnutSet = {
        "labels": ["Completed", "Incompleted", "Unmarked"],
        "datapoints": [0, 0, 4]
    }
    let data = {};
    let options = {};
    let doughnutData = {};
    let doughnutOptions = {};
    let centerTextPlugin = {};
    

    function fillHabits(h: HabitDir) {
        let smallHabs: Habit[] = [];
        
        h.habits.forEach(habit => {
            if (!habit.completed) {
                smallHabs.push(habit);
                habitCategories[habit.name] = h.name;
                let date = new Date(habit.deadline);
                weeklyData["Incompleted"][date.getDay()]++
                doughnutSet["datapoints"][1]++
            } else {
                let date = new Date(habit.deadline);
                weeklyData["Completed"][date.getDay()]++
                doughnutSet["datapoints"][0]++
            }
        });
        h.subDirs.forEach(subdir => {
            smallHabs = smallHabs.concat(fillHabits(subdir));
        });
        
        return smallHabs;
    }

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
        return sortedHabits;
    }

    function updateHabits(hs: HabitDir, firstLoad: boolean) {
        weeklyData = {
            "Completed": [0, 0, 0, 0, 0, 0, 0],
            "Incompleted": [0, 0, 0, 0, 0, 0, 0],
            // "Not marked": [0, 0, 0, 0, 0, 0, 0]
        };
        doughnutSet = {
            "labels": ["Completed", "Incompleted", "Unmarked"],
            "datapoints": [0, 0, 4]
        };
        let habs = fillHabits(hs);
        displayedHabits = [];
        if (!firstLoad) {
            habs.forEach((habit, index) => {
                displayedHabits = sortHabits([...displayedHabits, habit]);
            }); 
        } else {
            habs.forEach((habit, index) => {
            setTimeout(() => {
                displayedHabits = sortHabits([...displayedHabits, habit]);
            }, index * 400);
        }); 
        }
    }
    $: updateHabits($habitSystem, false);

    function toggleHabitCompleted(habit: Habit) {
        habitSystem.toggleHabitCompleted(habit, habitCategories[habit.name]);
    }

    onMount(() => {
        updateHabits($habitSystem, true)
    })

    afterUpdate(() => {
        // console.log("UPDATE");
        // chart.update(updateMode);
    })
    
    $: data = line(weeklyData)[0];
    $: options = line(weeklyData)[1];
    $: doughnutData = doughnut(doughnutSet["labels"], doughnutSet["datapoints"], disabledItems)[0];
    $: doughnutOptions = doughnut(doughnutSet["labels"], doughnutSet["datapoints"], disabledItems)[1];
    $: centerTextPlugin = doughnut(doughnutSet["labels"], doughnutSet["datapoints"], disabledItems)[2];

    
    ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );
    
</script>

<div class={containerSize <= 1300 ? "graphs":"graphs-large"} bind:offsetWidth={containerSize}>
    <div class="item {containerSize <= 1030 ? "full-width":"half-width"}">
        <Line data={data} options={options} />
    </div>
    <div class="item half-width">
        <Doughnut data={doughnutData} options={doughnutOptions} plugins= {[centerTextPlugin]}/>
    </div>
    <div class="item half-width">
        <h3 style="color:{fontColor};font-family:{Chart.defaults.font.family};">Unmarked Habits</h3>
        <div class="habits" style="color:{fontColor};{displayedHabits.length>0 ? "":"align-items:center;"}">
            {#if displayedHabits.length > 0}
                {#each displayedHabits as habit (habit.id)}
                    <div in:fade={{duration: 300}} animate:flip={{ duration: 300 }} class="habit">
                        <AppIcon class="habitCheck" inactiveIcon={Unmarked} activeIcon={Marked} text={habit.name} active={habit.completed} on:toggle={() => toggleHabitCompleted(habit)}/>
                    </div>
                {/each}
            {:else}
                All habits completed, well done!
            {/if}
        </div>
    </div>
    <div class="item {containerSize <= 1030 ? "full-width":"half-width"}">
        <Line {data} options={options} updateMode="none"/>
    </div>
    <div class="non-item {containerSize <= 1300 ? "full-width":"half-width"}">
        <AppIcon class="largeAdd" inactiveIcon={Add} activeIcon={Add} text="Add new graph"/>
    </div>
</div>

<style lang="scss">

    .graphs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        overflow: auto;
        padding: 10px;
    }

    .graphs-large {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        overflow: auto;
        padding: 10px;
    }

    .item {
        background-color: $darkModeDark;
        padding: 20px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        // position: relative;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        @include transition();
    }

    .non-item {
        padding: 20px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        // position: relative;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        @include transition();
    }

    .non-item:hover {
        transform: scale(1.01);
        border: 1px solid rgba(0, 170, 255, 0.3);
    }

    .item:hover {
        transform: scale(1.01);
    }

    .full-width {
        // padding: 20px;
        position: relative;
        grid-column: span 2;
        aspect-ratio: 16/9;
        overflow: hidden;
    }

    .half-width {
        position: relative;
        // padding: 20px;
        grid-column: span 1;
        aspect-ratio: 4/3;
        overflow: hidden;
    }

    h3 {
        display: flex;
        margin-top: 0px;
        // justify-content: center;
        user-select: none;
        align-items:flex-start;
        justify-content: flex-start;
        height: 10%;
    }

    .habits {
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: scroll;
        gap: 30px;
        user-select: none;
        width: 80%;
    }
    ::-webkit-scrollbar {
    width: 5px; 
    height: 8px; 
}
    ::-webkit-scrollbar-track {
    background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
    background-color: $darkModeLight; 
    border-radius: 10px;
    }

    ::-webkit-scrollbar-corner {
    background: transparent;
    }

</style>
