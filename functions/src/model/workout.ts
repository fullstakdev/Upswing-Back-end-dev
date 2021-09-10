

export class Workout {
    workoutId: String;
    name: String;



    constructor(workoutId: string, data: any) {
        this.workoutId = workoutId;
        this.name = data.name;
    }

    toJSON(forFirebase: boolean = true) {
        const dicObject = Object.assign({}, this, {
            workoutId: this.workoutId,
        });
        return JSON.parse(JSON.stringify(dicObject));
    }
}