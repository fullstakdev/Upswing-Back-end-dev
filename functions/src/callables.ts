import {db, FieldValue, FieldPath} from ".";
import {COLLECTION_WORKOUT} from "./utils/constant";
import {GBResponseModel} from "./model/response";
// interface GBWorkoutParams {
//     workoutName: string;
//     status: Number;
// }

export const createWorkout = async (req: any, res: any) => {
  const params = req.body.data;
  const result = {success: false, payload: {}, error: {}};
  try {
    const writeResult =
      await db.collection(COLLECTION_WORKOUT).add(params);
    if (writeResult.id) {
      result["success"] = true;
      result["payload"] = { "message": "success"};
      res.status(200).json(new GBResponseModel(result));
    } else {
      result["success"] = false;
      res.status(400).json(new GBResponseModel(result));
    }
  } catch (err) {
    result["error"] = JSON.stringify(err);
    result["success"] = false;
    res.status(500).json(new GBResponseModel(result));
  }
};

export const updateWorkout = async (req: any, res: any) => {
  const workoutId = req.body.workoutId;
  const updateData = req.body.data;
  const result = {success: false, payload: {}, error: {}};
  try {
    const snapWorkout = db.collection(COLLECTION_WORKOUT).doc(workoutId);

    await snapWorkout.set(updateData).catch( (err) => {
      result["success"] = false;
      result["error"] = JSON.stringify(err);
      res.status(200).json(new GBResponseModel(result));
    });

    result["success"] = true;
    result["payload"] = {"message": "success"};
    res.status(400).json(new GBResponseModel(result));
  } catch (err) {
    result["error"] = JSON.stringify(err);
    result["success"] = false;
    res.status(500).json(new GBResponseModel(result));
  }
};

export const deleteWorkout = async (req: any, res: any) => {
  const workoutId = req.body.workoutId;
  const result = {success: false, payload: {}, error: {}};
  try {
    const snapWorkout = db.collection(COLLECTION_WORKOUT).doc(workoutId);
    await snapWorkout.delete().catch( (err) => {
      result["success"] = false;
      result["error"] = JSON.stringify(err);
      res.status(200).json(new GBResponseModel(result));
    });
    result["success"] = true;
    result["payload"] = {"message": "success"};
    res.status(400).json(new GBResponseModel(result));
  } catch (err) {
    result["error"] = JSON.stringify(err);
    result["success"] = false;
    res.status(500).json(new GBResponseModel(result));
  }
};

export const getWorkouts = async (req: any, res: any) => {
  console.log(db, FieldValue, FieldPath);
  const result = {success: false, payload: {}, error: {}};
  try {
    const allSnaps = await db.collection(COLLECTION_WORKOUT).get();
    const allWorkouts: any = [];
    allSnaps.forEach((doc: any) => allWorkouts.push(doc.data()));

    result["success"] = true;
    result["payload"] = allWorkouts;
    res.status(200).json(new GBResponseModel(result));
  } catch (err) {
    result["success"] = false;
    result["error"] = JSON.stringify(err);
    res.status(500).json(new GBResponseModel(result));
  }
};
