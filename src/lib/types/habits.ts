


export interface Habit {
	id: string;
	name: string;
	completed: boolean;
	description: string;
	deadline: string; 
}

export class Habit implements Habit {
	constructor(name: string, completed: boolean, description: string, deadline: string) {
		this.generateId(name, completed, description, deadline);
		this.name = name;
		this.completed = completed;
		this.description = description;
		this.deadline = deadline;
		this.initializeId();
    }

    public async initializeId() {
        this.id = await this.generateId(this.name, this.completed, this.description, this.deadline);
    }

    private async generateId(name: string, completed: boolean, description: string, deadline: string): Promise<string> {
		const today = new Date().getTime();
		const hash = await window.electron.generateHash(name, completed, description, deadline, today);
        return hash;
    }
}

export interface HabitDir {
	id: number;
	name: string;
	subDirs: HabitDir[];
	habits: Habit[];
}

export type HabitFileSystem = Habit | HabitDir;
