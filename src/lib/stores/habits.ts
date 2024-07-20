import { writable } from 'svelte/store';
import type { Habit, HabitDir } from '../types/habits';

const buildHabitStore = () => {
	const startState: HabitDir = {
		id: 0,
		name: 'root',
		subDirs: [],
		habits: []
	};

	const { subscribe, set, update } = writable(startState);

	const loadHabitSystem = (habitSystem: HabitDir, habitsData: Record<any,any>, subDirs: any[], habits: any[]) => {
		console.log("NU");
		// console.log(subDirs);
		console.log(habitsData as HabitDir);
		return habitsData as HabitDir;
		
		// if (subDirs) {
		// 	subDirs.forEach(habitDir => {
		// 		let habit: HabitDir = {
		// 			name: habitDir.name,
		// 			subDirs: habitDir.subDir,
		// 			habits: habitDir.habits
		// 		}
		// 		habitSystem.subDirs.push(habit)
		// 		loadHabitSystem(habit, habit.subDirs, habit.habits);
		// 	});
		// }
        
		// if (habits) {
		// 	habits.forEach(habit => {
		// 		let newHabit: Habit = {
		// 			name: habit.name,
		// 			completed: habit.completed,
		// 			description: habit.description
		// 		}
		// 		habitSystem.habits.push(newHabit)
		// 	});
		// }

    };

	// const updateHabitSystem = (
	// 	node: HabitDir,
	// 	name: string,
	// 	completed: boolean,
	// 	description: string
	// ) => {
	// 	if (dirSegments.length === 1) {
	// 		// dirSegments is at habit level, habit should be added to the node/directory
	// 		const fileIndex = node.habits.findIndex((habit) => habit.name === dirSegments[0]);
	// 		if (fileIndex === -1) {
	// 			node.habits.push({ name: name, completed: completed, description: description });
	// 		} else {
	// 			node.habits[fileIndex].completed = completed;
	// 			node.habits[fileIndex].description = description;
	// 		}
	// 	} else {
	// 		// dirSegments is at directory level, must continue recursively
	// 		const subDir: string = dirSegments.shift()!;

	// 		if (!node.subDirs[subDir]) {
	// 			node.subDirs[subDir] = { name: subDir, subDirs: {}, habits: [] };
	// 		}
	// 		updateHabitSystem(node.subDirs[subDir], name, completed, description);
	// 	}
	// };

	// const removeFromFileSystem = (node: HabitDir, dirSegments: string[], isFile: boolean) => {
	// 	if (dirSegments.length === 1) {
	// 		if (isFile) {
	// 			const fileIndex = node.habits.findIndex((habit) => habit.name === dirSegments[0]);
	// 			if (fileIndex !== -1) {
	// 				node.habits.splice(fileIndex, 1);
	// 			}
	// 		} else {
	// 			delete node.subDirs[dirSegments[0]];
	// 		}
	// 	} else {
	// 		const subDir: string = dirSegments.shift()!;
	// 		if (node.subDirs[subDir]) {
	// 			removeFromFileSystem(node.subDirs[subDir], dirSegments, isFile);
	// 		}
	// 	}
	// };

	return {
		subscribe,
		set,
		update,
		loadHabits: (habitsData: Record<any,any>, subDirs: any[], habits: any[]) => {
			set({id: 0, name: "root", subDirs: [], habits: []}); // Reset the store to initial state
			update((habitSystem) => {
				habitSystem = habitsData as HabitDir;
				return habitSystem;
			});
		},
		// updateHabit: (name: string, completed: boolean, description: string, filePath: string) => {
		// 	update((habitSystem) => {
		// 		updateHabitSystem(habitSystem, name, completed, description);
		// 		return habitSystem;
		// 	});
		// },
		// removeFS: async (filePath: string) => {
		// 	const rootFolder = await window.electron.getFilesRoot();
		// 	const rootIndex = filePath.indexOf(rootFolder);
		// 	const fpath = filePath.substring(rootIndex + rootFolder.length + 1);
		// 	const separator = window.electron.getPathSeparator();
		// 	const dirSegments = fpath.split(separator);
		// 	const isFile = filePath.includes('.');
		// 	update((habitSystem) => {
		// 		removeFromFileSystem(habitSystem, dirSegments, isFile);
		// 		return habitSystem;
		// 	});
		// }
	};
};

export const habitSystem = buildHabitStore();
