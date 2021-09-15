import {db} from ".";
// import {db, FieldValue, FieldPath} from ".";
import {COLLECTION_USER, COLLECTION_WORKOUT} from "./utils/constant";
import {GBResponseModel} from "./model/response";
// interface GBWorkoutParams {
//     workoutName: string;
//     status: Number;
// }

export const createWorkout = async (req: any, res: any) => {
  const params = req.body.data;
  const result = {success: false, payload: {}, error: {}};
  params["rating"] = 0;
  params["difficulty"] = 0;
  try {
    const writeResult =
      await db.collection(COLLECTION_WORKOUT).add(params);
    if (writeResult.id) {
      result["success"] = true;
      params["workoutId"] = writeResult.id;
      result["payload"] = {docs: params};
      res.status(200).json(new GBResponseModel(result));
    } else {
      result["success"] = false;
      result["payload"] = {docs: params};
      res.status(400).json(new GBResponseModel(result));
    }
  } catch (err) {
    result["error"] = JSON.stringify(err);
    result["success"] = false;
    result["payload"] = {docs: params};
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
    let updatedWorkout = updateData;
    updatedWorkout["workoutId"] = workoutId;
    result["payload"] = {"docs": updatedWorkout};
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

export const getWorkout = async (req: any, res: any) => {  
  const workoutId = req.params.workoutId;
  const result = {success: false, payload: {}, error: {}};
  try {
    const workout = await (await db.collection(COLLECTION_WORKOUT).doc(workoutId).get()).data();
    result["success"] = true;
    result["payload"] = {docs: workout};
    res.status(200).json(new GBResponseModel(result));
  } catch (err) {
    result["success"] = false;
    result["error"] = JSON.stringify(err);
    res.status(500).json(new GBResponseModel(result));
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
  console.log("Create User: ", req.body.data);
  const params = req.body.data;
  const result = {success: false, payload: {}, error: {}};
  try {
    const writeResult =
      await db.collection(COLLECTION_USER).add(params);
    if (writeResult.id) {
      result["success"] = true;
      params["userId"] = writeResult.id;
      result["payload"] = {docs: params};
      res.status(200).json(new GBResponseModel(result));
    } else {
      result["success"] = false;
      result["payload"] = {docs: params};
      res.status(400).json(new GBResponseModel(result));
    }
  } catch (err) {
    result["error"] = JSON.stringify(err);
    result["success"] = false;
    result["payload"] = {docs: params};
    res.status(500).json(new GBResponseModel(result));
  }
};

export const updateUser = async (req: any, res: any) => {
  const userId = req.body.userId;
  const updateData = req.body.data;
  const result = {success: false, payload: {}, error: {}};
  try {
    const snapUser = db.collection(COLLECTION_USER).doc(userId);

    await snapUser.set(updateData).catch( (err) => {
      result["success"] = false;
      result["error"] = JSON.stringify(err);
      res.status(200).json(new GBResponseModel(result));
    });

    result["success"] = true;
    let updatedUser = updateData;
    updatedUser["userId"] = userId;
    result["payload"] = {"docs": updatedUser};
    res.status(400).json(new GBResponseModel(result));
  } catch (err) {
    result["error"] = JSON.stringify(err);
    result["success"] = false;
    res.status(500).json(new GBResponseModel(result));
  }
};

export const deleteUser = async (req: any, res: any) => {
  const userId = req.body.userId;
  const result = {success: false, payload: {}, error: {}};
  try {
    const snapUser = db.collection(COLLECTION_USER).doc(userId);
    await snapUser.delete().catch( (err) => {
      result["success"] = false;
      result["error"] = JSON.stringify(err);
      res.status(200).json(new GBResponseModel(result));
    });
    result["success"] = true;
    result["payload"] = {"userId": userId};
    res.status(400).json(new GBResponseModel(result));
  } catch (err) {
    result["error"] = JSON.stringify(err);
    result["success"] = false;
    res.status(500).json(new GBResponseModel(result));
  }
};

export const searchUsers = async (req: any, res: any) => {
  const searchData = req.body.data;
  console.log(searchData);
  const result = {success: false, payload: {}, error: {}};
  try {
    const allSnaps = await db.collection(COLLECTION_USER).get();
    const allUsers: any = [];
    // allSnaps.forEach((doc: any) => {
    //   // console.log("doc datas: ");
    //   // console.log(doc.data());
    //   allUsers.push(doc.data());
    // });
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

export const getUserInformation = async (req: any, res: any) => {  
  const userId = req.params.userId;
  const result = {success: false, payload: {}, error: {}};
  try {
    const userInformation = await (await db.collection(COLLECTION_USER).doc(userId).get()).data();
    result["success"] = true;
    result["payload"] = {docs: userInformation};
    res.status(200).json(new GBResponseModel(result));
  } catch (err) {
    result["success"] = false;
    result["error"] = JSON.stringify(err);
    res.status(500).json(new GBResponseModel(result));
  }
};