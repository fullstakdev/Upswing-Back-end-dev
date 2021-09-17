import { db } from "../.";
// import {db, FieldValue, FieldPath} from ".";

export const createData = async (collectionName: string, id: string, data: any) => {
    const params:any = data;
    const result = { success: false, payload: {}, error: {} };
    try {
      const writeResult =
        await db.collection(collectionName).add(params);
      if (writeResult.id) {
        result["success"] = true;
        params[id] = writeResult.id;
        result["payload"] = { docs: params };
      } else {
        result["success"] = false;
        result["payload"] = { docs: params };
      }
    } catch (err) {
      result["error"] = JSON.stringify(err);
      result["success"] = false;
      result["payload"] = { docs: params };
    }
    return result;
};

export const updateData = async (collectionName: string, id: string, updateId: string, data: any) => {
  const params:any = data;
  const result = { success: false, payload: {}, error: {} };
  result["payload"] = { "docs": params };
  try {
    const snapData = db.collection(collectionName).doc(updateId);

    await snapData.set(params).catch( (err) => {
      result["success"] = false;
      result["error"] = JSON.stringify(err);
      return result;
    });
    result["success"] = true;
    params[id] = updateId;    
    return result;
  } catch (err) {
    result["error"] = JSON.stringify(err);
    result["success"] = false;
    return result;
  }
};

export const deleteDataById = async (collectionName: string, deleteId: string) => {
  const result = { success: false, payload: {}, error: {} };
  result["payload"] = { id: deleteId };
  console.log(result);
  try {
      const snapData = db.collection(collectionName).doc(deleteId);
      await snapData.delete().catch( (err) => {
        result["success"] = false;
        result["error"] = JSON.stringify(err);
        return result;
      });
      result["success"] = true;
      return result;
    } catch (err) {
      result["error"] = JSON.stringify(err);
      result["success"] = false;
      return result;
    }
};

export const getDataById = async (collectionName: string, searchId: string) => {
    const result = { success: false, payload: {}, error: {} };
    try {
      const data = await (await db.collection(collectionName).doc(searchId).get()).data();
      result["success"] = true;
      result["payload"] = { docs: data };
    } catch (err) {
      result["success"] = false;
      result["error"] = JSON.stringify(err);
    }
    return result;
};
