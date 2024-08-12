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

function getSubdir(dirName: String, habitDir: HabitDir) {
	for (const subDir of habitDir.subDirs) {
		if (subDir.name === dirName) {
			return subDir;
		}
	}
	
	for (const subDir of habitDir.subDirs) {
		return getSubdir(dirName, subDir);
	}
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
		addHabit(newHabit: Habit, category: string) {
			update((habitSystem) => {
				if (category === "No category") {
					habitSystem.habits.push(newHabit);
					window.electron.updateHabits(habitSystem, habitSystem.id)
				} else {
					let habitDir = getSubdir(category, habitSystem);
					habitDir?.habits.push(newHabit);
					window.electron.updateHabits(habitDir, String(habitDir.id));
				}
				return habitSystem;
			})
		},
		async updateHabit(updatedHabit: Habit, category: string) {
			const today = new Date().getTime();
			const hash = await window.electron.generateHash(updatedHabit.name, updatedHabit.completed, updatedHabit.description, updatedHabit.deadline, today);
			
			update((habitSystem) => {
				if (category === 'No Category') {
					for (let i = 0; i < habitSystem.habits.length; i++) {
						if (habitSystem.habits[i].id === updatedHabit.id) {
							updatedHabit.id = hash;
							
							habitSystem.habits[i] = updatedHabit;
							break;
						}
					}
					window.electron.updateHabits(habitSystem, String(habitSystem.id));
				} else {
					let habitDir = getSubdir(category, habitSystem);
					if (habitDir) {
						for (let i = 0; i < habitDir.habits.length; i++) {
							if (habitDir.habits[i].id === updatedHabit.id) {
								updatedHabit.id = hash;
								habitDir.habits[i] = updatedHabit;
								break;
							}
						}
					}
					
					window.electron.updateHabits(habitDir, String(habitDir?.id))
				}
				return habitSystem;
			})	
		},
		logAllCompleted() {
			update((habits) => {
				helper(habits);
				return habits
			})
		},
		toggleHabitCompleted(habit: Habit, category: string) {
			
			habit.completed = !habit.completed;
			update((habits) => {
				habits = {...habits};
				window.electron.updateHabits(habits, String(habits.id))
				return habits;
			})
		}

	}

	return {...methods, subscribe, set, update};
};

export const habitSystem = buildHabitStore();
