import {db} from ".";
// import {db, FieldValue, FieldPath} from ".";
import {COLLECTION_USER, COLLECTION_WORKOUT, COLLECTION_EXERCISE} from "./utils/constant";
import {GBResponseModel} from "./model/response";
import {createData, updateData, deleteDataById, getDataById} from "./repository/curd";
// interface GBWorkoutParams {
//     workoutName: string;
//     status: Number;
// }

export const createWorkout = async (req: any, res: any) => {
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

export const updateWorkout = async (req: any, res: any) => {
  const workoutId = req.body.workoutId;
  const params:any = req.body.data;
  const result:any = await updateData(COLLECTION_WORKOUT, "workoutId", workoutId, params);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
};

export const deleteWorkout = async (req: any, res: any) => {
  const workoutId = req.params.workoutId;
  const result:any = await deleteDataById(COLLECTION_WORKOUT, workoutId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
};

export const getWorkout = async (req: any, res: any) => {  
  const workoutId = req.params.workoutId;
  const result:any = await getDataById(COLLECTION_WORKOUT, workoutId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
};

export const getWorkouts = async (req: any, res: any) => {
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
};

export const createUser = async (req: any, res: any) => {
  const params = req.body.data;
  const result: any = await createData(COLLECTION_USER, "userId", params );
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
};

export const updateUser = async (req: any, res: any) => {
  const userId = req.body.userId;
  const params:any = req.body.data;
  const result:any = await updateData(COLLECTION_USER, "userId", userId, params);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
};

export const deleteUser = async (req: any, res: any) => {
  const userId = req.params.userId;
  const result:any = await deleteDataById(COLLECTION_USER, userId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
};

export const getUser = async (req: any, res: any) => {
  const userId = req.params.userId;
  const result:any = await getDataById(COLLECTION_USER, userId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
};

export const getUsers = async (req: any, res: any) => {
  const searchData = req.body.data;
  console.log(searchData);
  const result = {success: false, payload: {}, error: {}};
  try {
    const allSnaps = await db.collection(COLLECTION_USER).get();
    const allUsers: any = [];
    allSnaps.forEach((doc: any) => {
      let snap = doc.data();      
      console.log("snap data: ", snap);
      allUsers.push(doc.data());
    });
    let row = 0;
    allSnaps.forEach((doc: any) => {
      let user = doc.data();
      user["userId"] = doc.id;
      allUsers.push(user);
      row++;
    });
    result["success"] = true;
    result["payload"] = {
      docs: allUsers,
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

export const uploadFiles = async (req: any, res: any) => {
  console.log(req.body.data);
  res.status(200).json({"result": "ok"});
}

export const createExercise = async(req: any, res: any) => {
  const params = req.body.data;
  const result: any = await createData(COLLECTION_EXERCISE, "exerciseId", params );
  console.log(result);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
}

export const updateExercise = async(req: any, res: any) => {
  const exerciseId = req.body.exerciseId;
  const params:any = req.body.data;
  const result:any = await updateData(COLLECTION_EXERCISE, "exerciseId", exerciseId, params);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
}

export const deleteExercise = async(req: any, res: any) => {
  const exerciseId = req.params.exerciseId;
  const result:any = await deleteDataById(COLLECTION_EXERCISE, exerciseId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
}

export const getExercise = async(req: any, res: any) => {
  const exerciseId = req.params.data;
  const result:any = await getDataById(COLLECTION_USER, exerciseId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
  res.status(200).json({result: "ok"});
}

export const getExercises = async (req: any, res: any) => {
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
