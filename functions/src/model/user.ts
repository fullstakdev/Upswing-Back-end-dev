


interface GBUserLocation {
    geohash?: string;
    lat: number;
    lng: number;
}

export class GBUserModel {
    uid: string;    
    firstname: string;
    lastname: string;
    gender: string;
    birthday: string;
    email: string;
    phone: string;
    photo?: string;
    location: GBUserLocation;
    userType: Number;
    
    googleId?: string;
    appleId?: string;
    facebookId?: string;    
    fcmToken?: string;

    createAt: Date;
    updateAt: Date;

    constructor(uid: string, data: any) {
        this.uid = uid;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.gender = data.gender;
        this.birthday = data.birthday;
        this.email = data.email;
        this.phone = data.phone;
        this.photo = data.photo;
        this.location = data.location;
        this.userType = data.userType;

        this.googleId = data.googleId;
        this.appleId = data.appleId;
        this.facebookId = data.facebookId;    
        this.fcmToken = data.fcmToken;

        this.createAt = new Date(data.createAt);
        this.updateAt = new Date(data.updateAt);
    }
}