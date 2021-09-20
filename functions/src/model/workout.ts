
/**
* Workout model
*/
export class GBWorkoutModel {
  workoutId: string;
  workoutName: string;
  trainerId: string;
  memberId: string[];
  status: number;
  startTime?: number;
  playDate: Date;
  trainingVideoUrl?: string;

  /**
  * @param {string} workoutId first parameter.
  * @param {any} data second parameter.
  */
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

  /**
  * @return {Object} return json object.
  */
  toJSON() {
    const dicObject = Object.assign({}, this, {
      workoutId: this.workoutId,
    });
    return JSON.parse(JSON.stringify(dicObject));
  }
}
