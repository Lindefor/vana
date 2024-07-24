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
    let disabledItems: number[] = [];
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    let containerSize: number;
    

    function fillHabits(h: HabitDir) {
        let smallHabs: Habit[] = [];
        
        h.habits.forEach(habit => {
            if (!habit.completed) {
                smallHabs.push(habit);
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
        habitSystem.toggleHabitCompleted(habit);
    }

    onMount(() => {
        updateHabits($habitSystem, true)
    })
    
    let today = new Date();
    let dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let todayName = dayNames[today.getDay()];
    let firstData = [65, 59, 80, 81, 56, 55, 40]
    let firstMax = Math.max(...firstData);
    let firstMin = Math.min(...firstData);
    let secondData = [28, 48, 40, 19, 86, 27, 90]    
    let secondMax = Math.max(...secondData);
    let secondMin = Math.min(...secondData);
	let data = {
		labels: dayNames,
		datasets: [
			{
				label: 'My First dataset',
				fill: false,
				lineTension: 0.2,
				backgroundColor: (c) => {
                    if (c["raw"] === firstMax) return good;
                    else if (c["raw"] === firstMin) return warning;
                    else return graphRed;
                },
				borderColor: graphRed,
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: graphRed,
				pointBorderWidth: 2,
				pointHoverRadius: 5,
				pointHoverBorderColor: graphRed,
				pointHoverBorderWidth: 2,
				pointRadius: 6,
				pointHitRadius: 1,
				data: firstData
			},
			{
				label: 'My Second dataset',
				fill: false,
				lineTension: 0.2,
				backgroundColor: (c) => {
                    if (c["raw"] === secondMax) return good;
                    else if (c["raw"] === secondMin) return warning;
                    else return graphYellow;
                },
				borderColor: graphYellow,
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: graphYellow,
				pointBorderWidth: 2,
				pointHoverRadius: 5,
				pointHoverBorderColor: graphYellow,
				pointHoverBorderWidth: 2,
				pointRadius: 6,
				pointHitRadius: 1,
				data: secondData
			}
		]
	};

    let options = {
        responsive: true,
        devicePixelRatio: 2,
        scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                        border: {
                            dash: [10]
                        },
                        ticks: {
                            font: {
                                family: fontFamily,
                                size: 12,
                                weight: 500,
                            },
                            color: (c) => {if (c["tick"]["label"] === todayName) return graphRed; else return Chart.defaults.color}
                        }
                    },
                    y: {
                        grid: {
                            display: true,
                        },
                        border: {
                            // dash: [10]
                        },
                        ticks: {
                            font: {
                                family: fontFamily,
                                size: 12,
                                weight: 500,
                            },
                        }
                    },
                },
        plugins: {
            title: {
                display: true,
                text: "Weekly Overview",
                font:  {
                        family: fontFamily,
                        size: 20,
                        weight: 600
                    },
                padding: {
                    bottom: 10
                }
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    padding: 20,
                    boxWidth: 8,
                    boxHeight: 8,
                    usePointStyle: true,
                    textAlign: 'left',
                    font:  {
                        family: fontFamily,
                        size: 14,
                        weight: 500
                    }
                }
            },
            tooltip: {
                backgroundColor: darkModeLight,
                displayColors: false,
            },
        }
    }

    let doughnutData = {
        labels: ['Marked as Completed','Marked as Incompleted' , 'Not marked'],
        datasets: [
            {
            data: [300, 50, 100],
            backgroundColor: [graphGreen, graphRed, graphGrey],
            borderColor: 'none',
            borderWidth: 0.6,
            backgroundColor: [graphGreen, graphRed, graphGrey],
            hoverBorderColor: [graphBlack],
            hoverBorderDash: [0.3],
            cutout: '80%',
            },
        ],
    }
    const centerTextPlugin = {
    id: 'centerTextPlugin',
    beforeDraw: function(chart) {
    var width = chart.width,
        height = chart.height-60,
        ctx = chart.ctx;

    ctx.restore();
    var fontSize = ((height) / 114).toFixed(2);
    ctx.font = `100 ${fontSize}em 'Roboto', sans-serif`;
    ctx.textBaseline = "center";
    ctx.fillStyle = fontColor;

    let dataset = chart.data.datasets[0].data;
    dataset = dataset.filter((value, index) => !disabledItems.includes(index));
    let total = dataset.reduce((acc, value) => acc + value, 0);
    let markedAsComplete = disabledItems.includes(0) ? 0:dataset[0];

    var text = `${(markedAsComplete/total*100).toFixed(1)}%`,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;
    if (height >= 185) {
        ctx.fillText(text, textX, textY);
        ctx.save();
    }
    }
    };
    
    let doughnutOptions = {
        devicePixelRatio: 2,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: today.toLocaleDateString(),
                font:  {
                        family: fontFamily,
                        size: 20,
                        weight: 600
                    },
                padding: {
                    bottom: 10
                }
            },
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    boxWidth: 8,
                    boxHeight: 8,
                    usePointStyle: true,
                    textAlign: 'left',
                    font:  {
                        family: fontFamily,
                        size: 14,
                        weight: 500,
                    }
                },
                onClick: (_, legendItem, legend) => {
                    legend.chart.toggleDataVisibility(legendItem.index);
                    legend.chart.update();
                    if (disabledItems.includes(legendItem.index)) {
                        disabledItems = disabledItems.filter(item => item !== legendItem.index);
                    } else {
                        disabledItems = [...disabledItems, legendItem.index];
                    }
                }
            },
            tooltip: {
                backgroundColor: darkModeLight,
                displayColors: false,
            },
        }
    }

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
        <Line {data} options={options} />
    </div>
    <div class="item half-width">
        <Doughnut data={doughnutData} options={doughnutOptions} plugins= {[centerTextPlugin]}/>
    </div>
    <div class="item half-width">
        <h3 style="color:{fontColor};font-family:{Chart.defaults.font.family};">Unmarked Habits</h3>
        <div class="habits" style="color:{fontColor};">
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
        <Line {data} options={options} />
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
    }

    .habits {
        display: flex;
        flex-direction: column;
        align-items:flex-start;
        justify-content: flex-start;
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
