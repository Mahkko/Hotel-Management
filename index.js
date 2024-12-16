class Hotel {
    name;
    static rooms = [];
    static users = [];
    constructor (name) {
        this.name = name;
    }
}

class Room {
    roomID = 1;
    roomType; // single, double, apartment
    isOccupied;
    currentOccupant;
    constructor(roomID, roomType) {
        this.roomID = roomID;
        this.roomType = roomType;
        this.isOccupied = false;
        Hotel.rooms.push(this);
    }
}

//changes:
// added constructor to the class Hotel
// created class Room