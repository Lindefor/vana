<!-- 
    This is the renderer of the calendar component in the main view of Vana
-->

<script lang="ts">
    let dates: Record<string, Date[]> = {}
    let monthsFromNow: string[] = []
    const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"]

    function generateDates() {
        let currentDate = new Date();
		let endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
		
		let currentMonth = currentDate.toLocaleString('default', { month: 'long' });
        monthsFromNow.push(currentMonth)
		dates[currentMonth] = [];
		for (let i = currentDate.getDate(); i <= endOfMonth.getDate(); i++) {
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
                {#each dates[month] as day}
                    {#if new Date().toDateString() !== day.toDateString()}
                        <div class="day">
                            {day.getDate()}
                        </div>
                    {:else}
                        <div class="day" style="box-shadow: 0 4px 0 rgba(0,0,0,1);transform:translateY(-4px);">
                            {day.getDate()}
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
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
        flex: 0 1 380px;
        border: 1px solid black;
        border-radius: 10px;
        padding: 30px;
        gap: 15px;
        background-color: $darkModeDark;
        box-shadow: inset 0 1px 2px black;
        
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
        display: flex;
        flex-wrap: wrap;
        gap: inherit;
    }

    .weekDays {
        display: flex;
        flex-wrap: wrap;
        gap: inherit;
    }

    .weekDay {
        display: flex;
        padding: 7px;
        width: 25px;
        height: 25px;
        border: 1px solid transparent;
        align-items: top;
        justify-content: center;
        font-weight: 300;
        font-size: 12px;
    }


    .day {
        display: flex;
        padding: 7px;
        width: 25px;
        height: 25px;
        border: 1px solid black;
        border-radius: 10px;
        align-items: top;
        justify-content: center;
        background-color: $darkModeLight;
        font-weight: 300;
        font-size: 12px;
        box-shadow: inset 0 1px 2px black;
    }
</style>