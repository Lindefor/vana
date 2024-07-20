<!-- 
    This is the renderer of the calendar component in the main view of Vana
-->

<script lang="ts">
    let dates: Record<string, Date[]> = {}
    let monthsFromNow: string[] = []
    const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"]
    let currentDate = new Date();
    let currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    let endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    function generateDates() {
        monthsFromNow.push(currentMonth)
		dates[currentMonth] = [];
        let yest = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-1);
        
		for (let i = 1; i <= endOfMonth.getDate(); i++) {
			dates[currentMonth].push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
		}

		// Store the dates for the remaining months until next year
		for (let month = currentDate.getMonth() + 1; month < 12; month++) {
			let monthName = new Date(currentDate.getFullYear(), month).toLocaleString('default', {
				month: 'long'
			});
            
            monthsFromNow.push(monthName)
			dates[monthName] = [];
			let endOfMonth = new Date(currentDate.getFullYear(), month + 1, 0);
			for (let i = 1; i <= endOfMonth.getDate(); i++) {
				dates[monthName].push(new Date(currentDate.getFullYear(), month, i));
			}
		}
		return dates;
	}

    generateDates()
    
</script>

<div class="months">
    <div class="year">{currentDate.getFullYear()}</div>
    {#each monthsFromNow as month}
        <div class="month">
            <div class="monthName">
                {month}
            </div>
            <div class="weekDays">
                {#each daysOfWeek as day}
                    <div class="weekDay">
                        {day}
                    </div>
                {/each}
            </div>
            <div class="days">
                {#if month === currentMonth}
                    {#each dates[month] as day}
                        {#if currentDate.toLocaleDateString() > day.toLocaleDateString()}
                            <div class="day" style="opacity:50%">
                                {day.getDate()}
                            </div>
                        {:else if currentDate < day}
                            <div class="day">
                                {day.getDate()}
                            </div>
                        {:else}
                            <div class="day" style="box-shadow: 0 2px 0 rgba(0,0,0,1);transform:translateY(-6px);">
                                {day.getDate()}
                            </div>
                        {/if}
                    {/each}
                {:else}
                    {#each dates[month] as day}
                        <div class="day">
                            {day.getDate()}
                        </div>
                    {/each}
                {/if}
            </div>
        </div>
    {/each}
</div>

<style lang="scss">

    .year {
        width: 100%;
        font-size:24px;
        font-weight: 500;
        width: 100%;
        height: fit-content;
        -webkit-font-smoothing: antialiased; /* For WebKit (Safari, Chrome) */
    }

    .months {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 20px;
    }

    .month {
        min-height: 360px;
        height:fit-content;
        width: 100%;
        border-radius: 10px;
        padding: 30px;
        gap: 15px;
        background-color: $darkModeDark;
        transition: all 0.3s ease-in-out;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
    }

    .month:hover {
        transform: scale(1.01);
    }

    

    .monthName {
        font-size:20px;
        margin-bottom: 10px;
        font-weight: 400;
        width: 100%;
        height: fit-content;
        -webkit-font-smoothing: antialiased; /* For WebKit (Safari, Chrome) */
        margin-bottom: 25px;
    }

    .days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: inherit;
    }

    .weekDays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: inherit;
    }

    .weekDay {
        display: flex;
        padding: 7px;
        width: 40px;
        height: 40px;
        border: 1px solid transparent;
        align-items: top;
        justify-content: center;
        font-weight: 300;
        font-size: 12px;
    }


    .day {
        display: flex;
        padding: 7px;
        width: 40px;
        height: 40px;
        border: 1px solid black;
        border-radius: 10px;
        align-items: top;
        justify-content: center;
        background-color: $darkModeLight;
        
        font-weight: 300;
        font-size: 12px;
        box-shadow: inset 0 0px 1px black;
        transition: all 0.2s ease-in-out;
    }
    .day:hover {
        border: 1px solid grey;
        transform: translateY(-2px);
    }
</style>