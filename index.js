class Hotel {
    name;
    static rooms = [];
    static users = [];
    constructor (name) {
        this.name = name;
    }
}

class Room {
    roomID;
    static IDcounter = 1; 
    roomType; // single, double, apartment
    isOccupied;
    currentOccupant;
    constructor(roomType) {
        this.roomID = Room.IDcounter++;
        this.roomType = roomType;
        this.isOccupied = false;
        Hotel.rooms.push(this);
    }
}

let room1 = new Room ("single");
let room2 = new Room ("double");

console.log(Hotel.rooms);