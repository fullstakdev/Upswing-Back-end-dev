
interface GBErrorModel {
    code: Number;
    message: string;
}

export class GBResponseModel {
    success: string;
    payload: Object;
    error?: GBErrorModel;
    timestamp: Number;

    constructor(data: any) {
        this.success = data.success;
        this.payload = data.payload;
        this.error = data.error;
        this.timestamp = data.timestamp;
    }
}