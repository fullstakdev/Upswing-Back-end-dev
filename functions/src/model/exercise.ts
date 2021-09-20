export class GBExerciseModel {
    exerId: string;
    exerName: string;
    duration?: number;
    duration_unit?: string;
    recovery_time?: number;
    recovery_unit?: string;
    reps?: number;
    require_weights: boolean;
    sets?: number;
    video_url: string;
  
    /**
    * @param {any} data first parameter.
    */
    constructor(data: any) {
      this.exerId = data.exerId;
      this.exerName = data.exerName;      
      this.require_weights = data.require_weights;
      this.video_url = data.video_url;
      this.duration = data.duration;
    }
  }