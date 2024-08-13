<script lang="ts">
	import { onMount } from 'svelte';
	import { habitSystem } from '../stores/habits';
	import type { HabitDir } from '../types/habits';
	import { Habit } from '../types/habits';
	import AppIcon from './other/AppIcon.svelte';
	import Close from '$lib/icons/Close.svg?component';
	import Back from '$lib/icons/Back.svg?component';

	export let isOpen = false;
	let availableCategories: Record<string, string[]> = {};
	let cancel = false;
	let isClosed = false;
	let recurring: boolean = false;
	let completed: boolean = false;
	let inCompleted: boolean = false;
	let noStatus: boolean = false;
	export let habit: Habit;
	export let newHabit: boolean;
	let nameSet: boolean = true;
	let categorySet: boolean = true;
	export let category: string;
	let fullCategory: string[] = [""];
	export let mounted = true;
	let date: Date;
	let day: number;
	let dayDisplay: number;
	let dayOfWeek: number;
	let month: number;
	let monthDisplay: number;
	let year: number;
	let yearDisplay: number;

	const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	function loadCategories(parent: string, subDir: HabitDir) {
		if (!availableCategories[parent]) {
			availableCategories[parent] = []
		}
		availableCategories[parent].push(subDir.name);
		subDir.subDirs.forEach(subDirr => {
			loadCategories(subDir.name, subDirr)
		});
	}
	
	function initMenu() {
		isOpen = true;
		completed = false;
		inCompleted = false;
		noStatus = false;
		fullCategory = [""];
		
		switch (habit.completed) {
			case true:
				completed = true;
				break;
			case false:
				inCompleted = true;
				break;
		}

		if (habit.deadline) {
			date = new Date(habit.deadline);
		} else {
			date = new Date();
		}

		day = date.getDate();
		dayDisplay = day;
		dayOfWeek = date.getDay();
		month = date.getMonth()+1;
		monthDisplay = month;
		year = date.getFullYear();
		yearDisplay = year;

		if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
			daysPerMonth[1] = 29; // consider leap year
		}

		setTimeout(() => {
			if (Object.entries(availableCategories).length===0) {
				availableCategories[""] = ["No category"]
				$habitSystem.subDirs.forEach(subDir => {
					loadCategories("", subDir);
				});
			}
		}, 100);
	}

	onMount(async () => {
		mounted = true;
		initMenu();
	});
	
	$: habit.id, initMenu()

	function closePopup() {
		
		isClosed = true;
		cancel = false;
		setTimeout(() => {
			isOpen = false;
			isClosed = false;
		}, 300);
	}

	function changeName(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target) {
			habit.name = target.value;
			target.blur();
		}
	}

	function changeCategory(newCategory: string) {
		category = newCategory;
		fullCategory.push(newCategory);
	}

	function changeDescription(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target) {
			habit.description = target.value;
			target.blur();
		}
	}

	function handleEventTarget(eventTarget: EventTarget) {
		let value = Number((eventTarget as HTMLInputElement).value);
		return value;
	}

	function changeDay(newDay: number, button: boolean = false) {
		if (newDay > 0 && newDay <= daysPerMonth[month - 1]) {
			day = newDay;
			dayDisplay = day;
			dayOfWeek = new Date(year, month - 1, day).getDay();
		} else {
			dayDisplay = day;
		}
	}

	function changeMonth(newMonth: number, button: boolean = false) {
		if (newMonth > 0 && newMonth < 13) {
			month = newMonth;
			monthDisplay = month;
			day = day % daysPerMonth[month - 1];
			dayDisplay = day;
			dayOfWeek = new Date(year, month - 1, day).getDay();
		} else {
			monthDisplay = month;
		}
	}

	function changeYear(newYear: number, button: boolean = false) {
		if (newYear > 0 && newYear < 9001) {
			year = newYear;
			yearDisplay = year;
			dayOfWeek = new Date(year, month - 1, day).getDay();
		} else {
			yearDisplay = year;
		}
	}

	function toggleRecurring() {
		recurring = !recurring;
	}

	function toggleStatus(toggledStatus: string) {
		switch (toggledStatus) {
			case 'completed':
				inCompleted = false;
				noStatus = false;
				break;
			case 'inCompleted':
				completed = false;
				noStatus = false;
				break;
			case 'noStatus':
				completed = false;
				inCompleted = false;
				break;
			default:
				break;
		}
	}


	async function saveHabit() {
		if (((habit.completed || newHabit) && !completed)) {
			habitSystem.notifySubscribers(category, habit.deadline, -1);
		} else if ((!habit.completed || newHabit) && completed) {
			habitSystem.notifySubscribers(category, habit.deadline, 1);
		} 
		habit.completed = completed;
		habit.deadline = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
		
		if (habit.name === "") {
			setTimeout(() => {
				nameSet = false;
				setTimeout(() => {
					nameSet = true;
				}, 1000);
          	}, 0);
			return;
		}

		if (category === "") {
			setTimeout(() => {
				categorySet = false;
				setTimeout(() => {
					categorySet = true;
				}, 1000);
          	}, 0);
			return;
		}
		
		
		
		let habitToAdd = new Habit(habit.name, habit.completed, habit.description, habit.deadline);
		await habitToAdd.initializeId();
		habitToAdd.id = habit.id;
		if (newHabit) {
			habitSystem.addHabit(habitToAdd, category);
		} else {
			habitSystem.updateHabit(habitToAdd, category);
		}
		cancelHabit();
	}

	function cancelHabit() {
		isOpen = false;
		mounted = false;
	}

	function backTrackCategory() {
		if (fullCategory.length > 1) {
			fullCategory.pop();	
		}
		category = fullCategory[fullCategory.length - 1];
	}

</script>

{#if isOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="backdrop" on:click={closePopup} class:isOpen></div>
	<div class="popup-container {isClosed ? 'fade-out' : 'fade-in'}">
		<div class="habit-attributes">
			<h1>{(habit && habit.name) || 'New Habit (duplicates)'}</h1>
			<div class="habit-attribute {!nameSet ? "error":""}">
				<div class="habit-type set-{habit.name !== ""}">Name:</div>
				<input
					class="input"
					type="text"
					spellcheck="false"
					placeholder="Required"
					value={(habit && habit.name) || ''}
					on:change={(e) => {
						changeName(e);
					}}
				/>
			</div>
			<div class="category-container {!categorySet ? "error":""}">
				<div class="habit-type set-{category !== ""}">Category:</div>
				<div>
					<div class="category-title">Selected Category:</div>
					<div class="selected-category">
						{#if category}
							<AppIcon class="back" inactiveIcon={Back} activeIcon={Back} text={category} on:toggle={backTrackCategory}/>
							{:else}
							-
						{/if}
					</div>
				</div>
				<div>
					
					<div class="category-title">Subcategories:</div>
					<div class="categories">
						{#if availableCategories[category]}	
							{#each availableCategories[category] as subCategory}
								<button class="button category" on:click={() => changeCategory(subCategory)}>{subCategory}</button>
							{/each}
						{/if}
						<button class="button add-category">Add new</button>
					</div>
				</div>
			</div>
			<div class="habit-attribute">
				<div class="habit-type set-{habit.description !== ""}">Description:</div>
				<input
					class="input"
					type="text"
					spellcheck="false"
					placeholder="Optional"
					value={(habit && habit.description) || ''}
					on:change={(e) => {
						changeDescription(e);
					}}
				/>
			</div>
			<div class="habit-date">
				<div class="habit-type set-true">Deadline MODULO LOGIC:</div>
				<div class="date-element">
					<button
						on:click={() => {
							changeDay(day + 1, true);
						}}
						class="increment">^</button
					>
					<input
						class="date-input"
						type="number"
						min="1"
						max="31"
						bind:value={dayDisplay}
						on:change={(e) => {
							if (e.target) {
								changeDay(handleEventTarget(e.target));
							}
						}}
					/>
					<div>{dayNames[dayOfWeek]}</div>
					<button
						on:click={() => {
							changeDay(day - 1, true);
						}}
						class="decrement">˅</button
					>
				</div>
				<div class="date-bind">-</div>
				<div class="date-element">
					<button
						on:click={() => {
							changeMonth(month + 1, true);
						}}
						class="increment">^</button
					>
					<input
						class="date-input"
						type="number"
						min="1"
						max="12"
						bind:value={monthDisplay}
						on:change={(e) => {
							if (e.target) {
								changeMonth(handleEventTarget(e.target));
							}
						}}
					/>
					<div>{monthNames[month - 1]}</div>
					<button
						on:click={() => {
							changeMonth(month - 1, true);
						}}
						class="decrement">˅</button
					>
				</div>
				<div class="date-bind">-</div>
				<div class="date-element">
					<button
						on:click={() => {
							changeYear(year + 1, true);
						}}
						class="increment">^</button
					>
					<input
						class="date-input"
						type="number"
						min="1"
						max="3000"
						bind:value={yearDisplay}
						on:change={(e) => {
							if (e.target) {
								changeYear(handleEventTarget(e.target));
							}
						}}
					/>
					<button
						on:click={() => {
							changeYear(year - 1, true);
						}}
						class="decrement">˅</button
					>
				</div>
				<div class="recurring">
					<div class="switch-container">
						<div>Recurring:</div>
						<label class="switch">
							<input type="checkbox" bind:checked={recurring} />
							<span class="slider"></span>
						</label>
					</div>
				</div>
			</div>
			<div class="status-container">
				<div class="habit-type set-true">Status:</div>
				<div class="statuses">
					<div class="switch-container">
						<div class="status">Mark as Completed:</div>
						<label class="switch">
							<input
								type="checkbox"
								bind:checked={completed}
								on:change={() => toggleStatus('completed')}
							/>
							<span class="slider"></span>
						</label>
					</div>
					<div class="switch-container">
						<div class="status">Mark as Incompleted:</div>
						<label class="switch">
							<input
								type="checkbox"
								bind:checked={inCompleted}
								on:change={() => toggleStatus('inCompleted')}
							/>
							<span class="slider"></span>
						</label>
					</div>
					<div class="switch-container">
						<div class="status">No status:</div>
						<label class="switch">
							<input
								type="checkbox"
								bind:checked={noStatus}
								on:change={() => toggleStatus('noStatus')}
							/>
							<span class="slider"></span>
						</label>
					</div>
				</div>
			</div>
			{#if !cancel}
				<div class="save-cancel">
					<button class="button save" on:click={saveHabit}>Save</button>
					<button class="button cancel" on:click={() => (cancel = true)}>Cancel</button>
				</div>
			{:else}
				<div class="save-cancel-text">Discard habit?</div>
				<div class="save-cancel">
					<button class="button cancel" on:click={cancelHabit}>Discard</button>
					<button class="button save" on:click={() => (cancel = false)}>Continue editing</button>
				</div>
			{/if}
		</div>
	</div>
{:else if mounted}
	<div class="minimised-popup-container">
		<button
			on:click={() => {
				isOpen = true;
			}}
			class="minimised-popup">{(habit && habit.name) || 'New habit'}</button
		>
		<AppIcon
			class="popup-close"
			inactiveIcon={Close}
			activeIcon={Close}
			text=""
			bind:active={mounted}
		/>
	</div>
{/if}

<style lang="scss">
	.popup-container {
		position: relative;
		width: 600px;
		height: 700px;
		overflow: scroll;
		background-color: $darkModeDark;
		border: 1px solid $darkModeLight;
		border-radius: 10px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.3s ease;
	}

	.fade-in {
		animation: fadeIn 0.3s forwards;
	}
	.fade-out {
		animation: fadeOut 0.4s forwards;
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(100%);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@keyframes fadeOut {
		from {
			opacity: 1;
			transform: translateY(0);
		}
		to {
			opacity: 0.5;
			transform: translateY(100%);
		}
	}

	.minimised-popup-container {
		position: fixed;
		bottom: 0px;
		width: 50%;
		height: 40px;
		background-color: $graphYellow;
		border: 2px solid $darkModeDark;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: opacity 0.3s ease;
	}

	.minimised-popup {
		background: none;
		border: none;
		width: 100%;
		height: 100%;
		color: white;
		font-size: 16px;
	}

	.habit-attributes {
		display: flex;
		height: 100%;
		flex-direction: column;
		gap: 30px;
		position: relative;
		margin: 20px 0;
		align-items: center;
	}

	.habit-attribute {
		display: flex;
		flex-direction: row;
		position: relative;
		border: 2px solid $darkModeLight;
		border-radius: 6px;
		@include transition();
	}

	.habit-type {
		position: absolute;
		top: -10px;
		left: 10px;
		width: fit-content;
		padding: 0 0.5rem;
		color: grey;
		background-color: $darkModeDark;
		@include transition();
	}

	

	.input {
		background-color: $darkModeDark;
		width: 300px;
		height: 30px;
		padding: 15px;
		padding-left: 20px;
		font-size: 16px;
		border: none;
		outline: none;
		color: white;
	}

	.category-container {
		display: flex;
		align-items: center;
		height: 100px;
		position: relative;
		border: 2px solid $darkModeLight;
		border-radius: 6px;
		padding: 10px;
		gap: 10px;
	}
	
	.categories {
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
		width: fit-content;
		height: 50px;
		gap: 10px;
		border-right: 1px solid rgba(grey, 0.5);
		border-top: 1px solid rgba(grey, 0.5);
		border-bottom: 1px solid rgba(grey, 0.5);
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
	}

	::-webkit-scrollbar {
    	width: 6px; 
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

	.category-title {
		margin: 6px;
		color: grey;
	}

	.selected-category {
		display: flex;
		align-items: center;
		justify-content: center;
		border-left: 1px solid rgba(grey, 0.5);
		border-top: 1px solid rgba(grey, 0.5);
		border-bottom: 1px solid rgba(grey, 0.5);
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
		height: 50px;
		width: 200px;
	}

	.category {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		height: 50px;
		width: 200px;
		margin: 5px;
	}

	.add-category {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		height: 50px;
		width: 200px;
		color: rgba($graphYellow, 0.7) !important;
	}

	.habit-date {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		// height: 150px;
		width: 335px;
		position: relative;
		border: 2px solid $darkModeLight;
		border-radius: 6px;
		padding-top: 10px;
		padding-bottom: 10px;
		justify-content: center;
		align-items: center;
	}

	.date-element {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 40px;
		margin: 20px;
		position: relative;
		border: 1px solid $darkModeLight;
		padding: 10px;
		border-radius: 4px;
	}

	.date-input {
		display: flex;
		text-align: center;
		background: none;
		border: none;
		color: white;
		font-size: 18px;
		width: fit-content;
	}

	.date-input:focus {
		border: none;
		outline: none;
	}

	.date-input::-webkit-outer-spin-button,
	.date-input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.increment {
		position: absolute;
		top: -6px;
		background: $darkModeDark;
		border: none;
		color: grey;
		cursor: pointer;
	}

	.decrement {
		position: absolute;
		bottom: -10px;
		background: $darkModeDark;
		border: none;
		color: grey;
		cursor: pointer;
	}

	.date-bind {
		display: flex;
		align-items: center;
	}

	.recurring {
		flex-basis: 100%;
		width: 100%;
		color: grey;
	}

	.status-container {
		display: flex;
		flex-direction: row;
		height: 100px;
		position: relative;
		border: 2px solid $darkModeLight;
		border-radius: 6px;
		padding: 10px;
		gap: 10px;
	}

	.statuses {
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: grey;
		gap: 15px;
	}

	.status {
		width: 200px;
	}

	.switch-container {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-left: 30px;
	}

	.switch {
		position: relative;
		display: inline-block;
		width: 34px;
		height: 20px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: $darkModeLight;
		transition: 0.4s;
		border-radius: 5px;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 14px;
		width: 14px;
		left: 3px;
		bottom: 3px;
		background-color: $graphYellow;
		transition: 0.4s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: $graphGreen;
	}

	input:checked + .slider:before {
		transform: translateX(14px);
		background-color: white;
	}

	.save-cancel {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 40px;
	}

	.save-cancel-text {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button {
		background: none;
		font-size: 16px;
		border-radius: 5px;
		color: white;
		padding: 10px;
		@include transition();
	}

	.save {
		border: 1px solid rgba(teal, 0.3);
		background: linear-gradient(to bottom right, teal, $graphGreen);
		opacity: 0.7;
		color: white;
		cursor: pointer;
	}

	.save:hover {
		border: 1px solid rgba(white, 0.8);
	}

	.cancel {
		border: 1px solid $darkModeLight;
		background: linear-gradient(to bottom right, $graphRed, orange);
		opacity: 0.7;
		color: white;
	}

	.cancel:hover {
		border: 1px solid rgba($graphRed, 0.8);
	}

	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 40;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.popup-container.hidden {
		opacity: 0;
		pointer-events: none;
	}

	.backdrop.hidden {
		opacity: 0;
		pointer-events: none;
	}

	.set-true {
		color: rgba($graphYellow, 0.5);
	}

	.error {
		border: 1px solid rgba($graphRed, 0.8);
	}
</style>
