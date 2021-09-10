

export class GBWorkoutModel {
    workoutId: string;
    workoutName: string;
    trainerId: string;
    memberId: string[];
    status: Number;
    startTime?: Number;
    playDate: Date;
    trainingVideoUrl?: string;
   

    constructor(workoutId: string, data: any) {
        this.workoutId = workoutId;
        this.workoutName = data.workoutName;
        this.trainerId = data.trainerId;
        this.memberId = data.memberId;
        this.status = data.status;
        this.startTime = data.startTime;
        this.playDate = data.playDate;
        this.trainingVideoUrl = data.trainingVideoUrl;
    }

    toJSON(forFirebase: boolean = true) {
        const dicObject = Object.assign({}, this, {
            workoutId: this.workoutId,
        });
        return JSON.parse(JSON.stringify(dicObject));
    }
}