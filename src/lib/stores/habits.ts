import { writable } from 'svelte/store';
import type { Habit, HabitDir } from '../types/habits';

function helper(habits: HabitDir) {
	habits.habits.forEach(habit => {
		console.log(`${habit.name}: ${habit.completed}`);
	})
	habits.subDirs.forEach(subDir => {
		helper(subDir)
	});

}

const buildHabitStore = () => {
	const startState: HabitDir = {
		id: 0,
		name: 'root',
		subDirs: [],
		habits: []
	};

	const { subscribe, set, update } = writable(startState);

	const methods = {
		loadHabitSystem(habitsData: Record<any,any>) {
			set({id: 0, name: "root", subDirs: [], habits: []}); // Reset the store to initial state
			update((habitSystem) => {
				habitSystem = habitsData as HabitDir;
				return habitSystem;
			});
		},
		logAllCompleted() {
			update((habits) => {
				helper(habits);
				return habits
			})
		},
		toggleHabitCompleted(habit: Habit) {
			habit.completed = !habit.completed;
			update((habits) => {
				habits = {...habits};
				return habits;
			})
		}

	}

	return {...methods, subscribe, set, update};
};

export const habitSystem = buildHabitStore();
