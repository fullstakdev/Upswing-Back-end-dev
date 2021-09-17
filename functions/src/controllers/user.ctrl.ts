import {Request, Response} from 'express';
import {db} from "../.";
// import {db, FieldValue, FieldPath} from ".";
import {COLLECTION_USER} from "../utils/constants";
import {GBResponseModel} from "../model/response";
import {createData, updateData, deleteDataById, getDataById} from "../repositories/curd.repo";

export const createUser = async (req: Request, res: Response) => {
  const params = req.body.data;
  const result: any = await createData(COLLECTION_USER, "userId", params );
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const params:any = req.body.data;
  const result:any = await updateData(COLLECTION_USER, "userId", userId, params);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result:any = await deleteDataById(COLLECTION_USER, userId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result:any = await getDataById(COLLECTION_USER, userId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.error.code).json(result);
  }
};

export const getUsers = async (req: Request, res: Response) => {
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
