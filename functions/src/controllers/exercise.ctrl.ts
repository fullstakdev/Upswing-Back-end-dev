import {Request, Response} from "express";
import {db} from "../.";
// import {db, FieldValue, FieldPath} from ".";
import {COLLECTION_EXERCISE} from "../utils/constants";
import {GBResponseModel} from "../model/response";
import {createData, updateData, deleteDataById, getDataById} from "../repositories/curd.repo";

export const createExercise = async(req: Request, res: Response) => {
  const params = req.body.data;
  const result: any = await createData(COLLECTION_EXERCISE, "exerciseId", params );
  console.log(result);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
}

export const updateExercise = async(req: Request, res: Response) => {
  const exerciseId = req.body.exerciseId;
  const params:any = req.body.data;
  const result:any = await updateData(COLLECTION_EXERCISE, "exerciseId", exerciseId, params);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
}

export const deleteExercise = async(req: Request, res: Response) => {
  const exerciseId = req.params.exerciseId;
  const result:any = await deleteDataById(COLLECTION_EXERCISE, exerciseId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
}

export const getExercise = async(req: Request, res: Response) => {
  const exerciseId = req.params.data;
  const result:any = await getDataById(COLLECTION_EXERCISE, exerciseId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
  res.status(200).json({result: "ok"});
}

export const getExercises = async (req: Request, res: Response) => {
  const searchData = req.body.data;
  console.log(searchData);
  const result = {success: false, payload: {}, error: {}};
  try {
    const allSnaps = await db.collection(COLLECTION_EXERCISE).get();
    const allExercises: any = [];
    let row = 0;
    allSnaps.forEach((doc: any) => {
      let exercises = doc.data();
      exercises["exercisesId"] = doc.id;
      allExercises.push(exercises);
      row++;
    });
    result["success"] = true;
    result["payload"] = {
      docs: allExercises,
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
};
