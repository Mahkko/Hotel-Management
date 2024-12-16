class Hotel {
  name;
  static rooms = [501];
  static users = [];
}
class User {
  //in constructor
  firstName; //string
  lastName; //string
  gender; //string
  documentID; //string
  age; //number
  roomID; //number
  roomType; //string
  dateOfArrival; //DATE!!
  #username; //string, must be unique
  #password; //string

  //not in constructor
  isLoggedIn = false; //boolean
  serviceList = []; // array holding strings
  daysSpent; //number

  constructor(
    firstName,
    lastName,
    gender,
    documentID,
    age,
    roomID,
    roomType,
    dateOfArrival = new Date(),
    username,
    password
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.documentID = documentID;
    this.age = age;
    this.roomID = roomID;
    this.roomType = roomType;
    this.dateOfArrival = dateOfArrival; //by default the date the object was created
    this.#username = username;
    this.#password = password;

    //calculates the difference between current date and date of arrival
    this.daysSpent = Math.round(
      (new Date() - new Date(this.dateOfArrival)) / (1000 * 60 * 60 * 24)
    );
  }

  //getter for username, others should be able to see
  get username() {
    return this.#username;
  }

  //checks the users's current bill status
  checkBill() {
    console.log("-----------------------");
    let totalPrice = 0;

    //Main room price evaulation per day spent in hotel
    switch (this.roomType) {
      case "Single bed room":
        totalPrice += 20 * this.daysSpent;
        console.log("Single bed room : 20 KM");
        console.log(
          this.daysSpent + " days : " + 20 * this.daysSpent + " KM\n"
        );
        break;

      case "Double bed room":
        totalPrice += 40 * this.daysSpent;
        console.log("Double bed room : 40 KM");
        console.log(
          this.daysSpent + " days : " + 40 * this.daysSpent + " KM\n"
        );
        break;

      case "Apartment":
        totalPrice += 60 * this.daysSpent;
        console.log("Apartment : 60 KM");
        console.log(
          this.daysSpent + " days : " + 60 * this.daysSpent + " KM\n"
        );
        break;

      default:
        console.log("Error : unexpected roomType found");
        break;
    }

    //additional services evaulation per order
    for (let i = 0; i < this.serviceList.length; i++) {
      const element = this.serviceList[i];

      let servicePrice;
      switch (element) {
        case "Gym":
          servicePrice = 5;
          break;

        case "Cinema":
          servicePrice = 15;
          break;

        case "Restaurant":
          servicePrice = 20;
          break;

        case "Pool":
          servicePrice = 15;
          break;

        case "Sauna":
          servicePrice = 10;
          break;

        default:
          console.log("Error : unexpected service found");
          break;
      }
      totalPrice += servicePrice;
      console.log("+ " + element + " : " + servicePrice + " KM");
    }
    //total evaluation
    console.log("TOTAL : ", totalPrice, " KM");
    console.log("-----------------------");
  }

  //adds a new sevice to seviceList of the user
  orderService(service) {
    if (
      service === "Gym" ||
      service === "Cinema" ||
      service === "Restaurant" ||
      service === "Pool" ||
      service === "Sauna"
    )
      this.serviceList.push(service);
    else console.log("Error : unexpected service recieved");
  }

  changeRoom(room) {
    if (Hotel.rooms.includes === room) this.roomID = room.roomID;
    this.roomType = room.roomType;
  }

  //sets isLoggedIn flag to false
  logOut() {
    this.isLoggedIn = false;
    console.log(this.#username, "logged out.");
  }
}

class Admin {
  username;
  #password;
  isSystemOn;

  constructor(username, password) {
    this.#password = password;
    this.username = username;
  }

  registerUser(
    firstName,
    lastName,
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
        firstName,
        lastName,
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
    let currentUserObject;
    for (let i = 0; i < Hotel.users.length; i++) {
      let userObject = Hotel.users[i];
      if (userObject.username === user) {
        currentUserObject = userObject;
        break;
      }
    }
    if (
      change === "Jednokrevetna Soba" ||
      change === "Dvokrevetna Soba" ||
      change === "Apartman"
    ) {
      //console.log(currentUserObject);

      currentUserObject.roomType = change;
    }
    if (
      change === "Gym" ||
      change === "Cinema" ||
      change === "Restaurant" ||
      change === "Pool" ||
      change === "Sauna"
    ) {
      currentUserObject.serviceList.push(change);
    }
  }
  billServices(user) {
    let currentUserObject;
    let overallPrice = 0;
    for (let i = 0; i < Hotel.users.length; i++) {
      let userObject = Hotel.users[i];
      if (userObject.username === user) {
        currentUserObject = userObject;
        break;
      }
    }
    for (let i = 0; i < currentUserObject.serviceList.length; i++) {
      let element = currentUserObject.serviceList[i];
      switch (element) {
        case "Gym":
          overallPrice += 5;
          break;

        case "Cinema":
          overallPrice += 15;
          break;

        case "Restaurant":
          overallPrice += 20;
          break;

        case "Pool":
          overallPrice += 15;
          break;

        case "Sauna":
          overallPrice += 10;
          break;

        default:
          console.log("Error : unexpected service found");
          break;
      }
    }
    console.log(
      `Korisnik ${currentUserObject.firstName} ${currentUserObject.lastName} je iskoristio $${overallPrice} dodatnih usluga.`
    );
  }
  logOutUser(user) {
    if (user.isLoggedIn === true) {
      return (user.isLoggedIn = false);
    } else {
      console.log("User already logged out");
    }
  }
  loggingOutUsers(users) {
    let loggedInUsers = [];
    for (let i = 0; i < Hotel.users.length; i++) {
      let currentUserObject = Hotel.users[i];
      if (currentUserObject.isLoggedIn === true) {
        loggedInUsers.push(currentUserObject.username);
      }
    }
    if (loggedInUsers.length === 0) {
      console.log("Trenutno nema prijavljenih korisnika");
    } else {
      console.log(`Trenutno prijavljeni korisnici su: ${loggedInUsers}`);
    }

    if (users !== "All") {
      for (let i = 0; i < Hotel.users.length; i++) {
        let curretnUserObject = Hotel.users[i];
        if (curretnUserObject.username === users) {
          curretnUserObject.isLoggedIn = false;
        }
      }
      this.isSystemOn = false;
    }
    if (users === "All") {
      for (let i = 0; i < Hotel.users.length; i++) {
        let curretnUserObject = Hotel.users[i];
        curretnUserObject.isLoggedIn = false;
      }
      this.isSystemOn = false;
      console.log("Svi korisnici su odjavljeni i system se gasi");
    }
  }
  searchForUser(user) {
    for (let i = 0; i < Hotel.users.length; i++) {
      let currentUserObject = Hotel.users[i];
      if (currentUserObject.username === user) {
        console.log(currentUserObject);
        break;
      }
      if (currentUserObject.firstName === user) {
        console.log(currentUserObject);
        break;
      }
      if (currentUserObject.documentID === user) {
        console.log(currentUserObject);
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

console.log("---------------------------------");

anis.userChanges("a19k", "Dvokrevetna Soba");
anis.userChanges("a19k", "Cinema");
anis.userChanges("a19k", "Gym");

console.log(Hotel.users);
anis.billServices("a19k");
anis.logOutUser("a19k");
anis.searchForUser("mahko");

anis.loggingOutUsers("All");
