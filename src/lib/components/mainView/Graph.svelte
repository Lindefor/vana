<!-- 
    This is the renderer of the calendar component in the main view of Vana
-->

<script lang="ts">
	import { Line, Doughnut } from 'svelte-chartjs';
    import { graphBlue, graphBrown, graphGreen, graphRed, graphYellow, graphBlack, graphWhite, graphGrey, fontFamily, warning, good } from '$src/lib/stylingConstants';
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
				lineTension: 0.3,
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
				lineTension: 0.3,
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
        scales: {
                    x: {
                        grid: {
                            display: true,
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
                            // callback:  (value: number, index: number, values: Object[]) => {
                            //     console.log(value);
                                
                            //         const colors = [graphBlue, graphBrown, graphGreen, graphRed, graphYellow, graphBlack, graphWhite];
                            //         return {
                            //             color: "#007BFF"
                            //         };
                            //     }
                            color: (c) => {if (c["tick"]["label"] === todayName) return graphRed; else return Chart.defaults.color}
                        }
                    },
                    y: {
                        grid: {
                            display: true,
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
                    boxWidth: 40,
                    boxHeight: 2,
                    textAlign: 'left',
                    font:  {
                        family: fontFamily,
                        size: 14,
                        weight: 500
                    }
                }
            }
        }
    }

    let doughnutData = {
        labels: ['Marked as Incompleted', 'Marked as Completed', 'Not marked'],
        datasets: [
            {
            data: [300, 50, 100],
            backgroundColor: [graphRed, graphGreen, graphGrey],
            borderColor: graphWhite,
            borderWidth: 0.6,
            hoverBackgroundColor: [graphRed, graphGreen, graphGrey],
            hoverBorderColor: [graphBlack],
            hoverBorderDash: [0.3]
            },
        ],
    }

    let doughnutOptions = {
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
                    boxWidth: 40,
                    boxHeight: 4,
                    textAlign: 'left',
                    font:  {
                        family: fontFamily,
                        size: 14,
                        weight: 500
                    }
                }
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

<div class="graphs">
    <div class="line">
        <Line {data} options={options} />
    </div>
    <div class="doughNut">
        <Doughnut data={doughnutData} options={doughnutOptions}/>
    </div>
</div>
<style lang="scss">
    .graphs {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .line {
        height: fit-content;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        padding: 20px;
        background-color: $darkModeDark;
        transition: all 0.3s ease-in-out;
    }

    .line:hover {
        transform: scale(1.01);
    }

    .doughNut {
        width: 50%;
        height: fit-content;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        padding: 20px;
        background-color: $darkModeDark;
        transition: all 0.3s ease-in-out;
    }

    .doughNut:hover {
        transform: scale(1.01);
    }
</style>
