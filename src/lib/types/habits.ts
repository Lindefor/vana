export interface Habit {
	id: number;
	name: string;
	completed: boolean;
	description: string;
}

export interface HabitDir {
	id: number;
	name: string;
	subDirs: HabitDir[];
	habits: Habit[];
}

export type HabitFileSystem = Habit | HabitDir;
