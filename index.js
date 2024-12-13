class Hotel {
  name;
  static rooms = [501];
  static users = [];
}

class User {
  name;
  surname;
  gender;
  documentID;
  age;
  roomID;
  roomType;
  dateOfArrivial;
  username;
  password;
  constructor(
    name,
    surname,
    gender,
    documentID,
    age,
    roomID,
    roomType,
    dateOfArrivial,
    username,
    password
  ) {
    this.age = age;
    this.name = name;
    this.gender = gender;
    this.surname = surname;
    this.dateOfArrivial = dateOfArrivial;
    this.documentID = documentID;
    this.roomID = roomID;
    this.roomType = roomType;
    this.username = username;
    this.password = password;
  }
}
class Admin {
  username;
  #password;

  constructor(username, password) {
    this.#password = password;
    this.username = username;
  }

  registerUser(
    name,
    surname,
    gender,
    documentID,
    age,
    roomID,
    roomType,
    dateOfArrivial,
    username,
    password
  ) {
    let isOccupied = false;
    let usernameUsed = false;

    // Provjerava da li se username koristi
    for (let i = 0; i < Hotel.users.length; i++) {
      let user = Hotel.users[i];

      if (user === username) {
        usernameUsed = true;
      }
    }

    // Provjerava da li je soba zauzeta
    for (let i = 0; i < Hotel.rooms.length; i++) {
      let hotelRoom = Hotel.rooms[i];

      if (hotelRoom === roomID) {
        isOccupied = true;
      }
    }

    // Ako je bilo koje od ovoga true, nece napravit usera
    if (isOccupied || usernameUsed) {
      console.log("Username or a room are in use");
      // Ovdje opet provjerava da oboje bude false da moze napravit usera
    } else if (isOccupied === false && usernameUsed === false) {
      let korisnik = new User(
        name,
        surname,
        gender,
        documentID,
        age,
        roomID,
        roomType,
        dateOfArrivial,
        username,
        password
      );
      Hotel.users.push(korisnik);
      Hotel.rooms.push(roomID);
    }
  }

  userChanges(user, change) {
    let currentUser;

    for (let i = 0; i < Hotel.users.length; i++) {
      let userObject = Hotel.users[i];
      if (userObject.username === user) {
        currentUser = user;
        break;
      }
    }
  }
}

//Testiranje da li sve radi kako treba
const anis = new Admin("a19k", 12321);

anis.registerUser(
  "Mahir",
  "Tokic",
  "male",
  "1",
  25,
  10,
  "Jednokrevetna",
  "Petak",
  "mahko",
  "0000"
);

anis.registerUser(
  "Anis",
  "Karic",
  "male",
  "2",
  25,
  11,
  "Jednokrevetna",
  "Petak",
  "a19k",
  "1111"
);

anis.userChanges("a19k");
/*
anis.registerUser(
  "Natasa",
  "Tomic",
  "female",
  "501",
  25,
  500,
  "Jednokrevetna",
  "Petak",
  "nnatasaa",
  "1234"
);
anis.registerUser(
  "Jasmin",
  "Silver",
  "male",
  "",
  25,
  1,
  "Jednokrevetna",
  "Petak",
  "silver",
  "1234"
);
*/
