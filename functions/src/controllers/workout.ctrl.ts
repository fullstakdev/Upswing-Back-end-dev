import {Request, Response} from "express";
import {db} from "../.";
// import {db, FieldValue, FieldPath} from ".";
import {COLLECTION_WORKOUT} from "../utils/constants";
import {GBResponseModel} from "../model/response";
import {createData, updateData, deleteDataById, getDataById} from "../repositories/curd.repo";

export const createWorkout = async(req: Request, res: Response) => {
  const params = req.body.data;
  params["rating"] = 0;
  params["difficulty"] = 0;
  const result: any = await createData(COLLECTION_WORKOUT, "workoutId", params );
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
};

export const updateWorkout = async (req: Request, res: Response) => {
  const workoutId = req.body.workoutId;
  const params:any = req.body.data;
  const result:any = await updateData(COLLECTION_WORKOUT, "workoutId", workoutId, params);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
}

export const deleteWorkout = async (req: Request, res: Response) => {
  const workoutId = req.params.workoutId;
  const result:any = await deleteDataById(COLLECTION_WORKOUT, workoutId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
}

export const getWorkout = async (req: Request, res: Response) => {
  const workoutId = req.params.workoutId;
  const result:any = await getDataById(COLLECTION_WORKOUT, workoutId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
}

export const getWorkouts = async (req: Request, res: Response) => {
  const searchData = req.body.data;
  console.log(searchData);
  const result = {success: false, payload: {}, error: {}};
  try {
    const allSnaps = await db.collection(COLLECTION_WORKOUT).get();
    const allWorkouts: any = [];
    // allSnaps.forEach((doc: any) => {
    //   // console.log("doc datas: ");
    //   // console.log(doc.data());
    //   allWorkouts.push(doc.data());
    // });
    let row = 0;
    allSnaps.forEach((doc: any) => {
      let workout = doc.data();
      workout["workoutId"] = doc.id;
      allWorkouts.push(workout);
      row++;
    });
    result["success"] = true;
    result["payload"] = {
      docs: allWorkouts,
      limit: 10,
      page: 1,
      totalPages: 1,
      totalDocs: row,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: 0,
      nextPage: 0
  };
    res.status(200).json(new GBResponseModel(result));
  } catch (err) {
    result["success"] = false;
    result["error"] = JSON.stringify(err);
    res.status(500).json(new GBResponseModel(result));
  }
}
