import { graphBlue, graphBrown, graphGreen, graphRed, graphYellow, graphBlack, graphWhite, graphGrey, fontFamily, warning, good, darkModeLight, darkModeDark } from '$src/lib/stylingConstants';
let fontColor = "#666"
let today = new Date();
let dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let todayName = dayNames[today.getDay()];

const graphColors = [graphBrown, graphBlack, graphWhite, graphGrey, graphBlue, graphRed, graphYellow, graphGreen];

export function line(datapoints: Record<string, number[]>) {
    let datasets: any = [];
    let options: any;
    let allColors = [...graphColors];
    Object.entries(datapoints).forEach(([key, value]: [string, number[]]) => {
        let color = allColors.pop()
        // let max = Math.max(...value);
        // let min = Math.min(...value);
        datasets.push(
            {
                label: key,
                fill: false,
				lineTension: 0.1,
				// backgroundColor: (c: any) => {
                //     if (c["raw"] === max) return good;
                //     else if (c["raw"] === min) return warning;
                //     else return color;
                // },
                backgroundColor: color,
				borderColor: color,
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: color,
				pointBorderWidth: 2,
				pointHoverRadius: 5,
				pointHoverBorderColor: color,
				pointHoverBorderWidth: 2,
				pointRadius: 6,
				pointHitRadius: 1,
				data: value
            }
        )
        options = {
            responsive: true,
            devicePixelRatio: 2,
            scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                font: {
                                    family: fontFamily,
                                    size: 12,
                                    weight: 500,
                                },
                                color: (c: any) => {if (c["tick"]["label"] === todayName) return graphRed; else return fontColor}
                            }
                        },
                        y: {
                            grid: {
                                display: true,
                            },
                            ticks: {
                                font: {
                                    family: fontFamily,
                                    size: 12,
                                    weight: 500,
                                },
                                callback: function(value) {
                                    if (Number.isInteger(value)) {
                                        return value;
                                    }
                                }
                            }
                        },
                    },
            plugins: {
                title: {
                    display: true,
                    text: "Weekly Overview Dou missing",
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
                        },
                    },
                    
                },
                tooltip: {
                    backgroundColor: darkModeLight,
                    displayColors: false,
                },
            }
        }
    });
    let data = {
        labels: dayNames,
		datasets: datasets,
    }
    return [data, options];
}

export function doughnut(labels: string[], datapoints: number[], disabledItems: number[]) {
    
    let allColors = [...graphColors];
    let backgroundColor = new Array(labels.length);

    for (let i = 0; i<labels.length; i++) {
        backgroundColor[i] = allColors.pop()
    }

    let data = {
        labels: labels,
        datasets: [
            {
            data: datapoints,
            backgroundColor: backgroundColor,
            borderColor: 'none',
            borderWidth: 0.6,
            hoverBorderColor: [graphBlack],
            hoverBorderDash: [0.3],
            cutout: '80%',
            },
        ],
    }

    let options = {
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

    return [data, options, centerTextPlugin]
}