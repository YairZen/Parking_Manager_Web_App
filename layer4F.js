//Data base layer

      
 
let instance; // Global variable to track the single instance
	
// using Singleton design patter for counter Manager
class CounterManager {

	// Constructor check: if object exists - use it, else - create and initialize to 5
    constructor() {
        if (instance) {   //we have 1 object already 
            throw new Error("Singleton class, can not create more than 1 object.");
        } else {          // we dont have any object - create 1.
            this.initializeCounters();  
            instance = this; // Assign the initialization to this object
        }
    }

    //get counters from localStorage if exist, else -  create and defaults to 5.
    initializeCounters() {    // this connect all the variable to the current object
		// get the value of counters from localStorage
        this.AParkingSpots = parseInt(localStorage.getItem('AParkingSpots'));   //parseInt - return the string asa int integer
        this.BParkingSpots = parseInt(localStorage.getItem('BParkingSpots'));
        this.CParkingSpots = parseInt(localStorage.getItem('CParkingSpots'));
        this.DParkingSpots = parseInt(localStorage.getItem('DParkingSpots'));

        // if value of counters is NUMBER (if exist) - use it.
		// else - (garbage) - create variable in localStorage and set to 5  
        if (isNaN(this.AParkingSpots)) {
            this.AParkingSpots = 5;
            localStorage.setItem('AParkingSpots', this.AParkingSpots);
        }
        if (isNaN(this.BParkingSpots)) {
            this.BParkingSpots = 5;
            localStorage.setItem('BParkingSpots', this.BParkingSpots);
        }
        if (isNaN(this.CParkingSpots)) {
            this.CParkingSpots = 5;
            localStorage.setItem('CParkingSpots', this.CParkingSpots);
        }
        if (isNaN(this.DParkingSpots)) {
            this.DParkingSpots = 5;
            localStorage.setItem('DParkingSpots', this.DParkingSpots);
        }
    }

	updateParkingSpots(parkingLot, counter) {
    // Update a specific parking spot counter and change its value in local storage
    localStorage.setItem(parkingLot, counter);
	}

    getParkingSpots(parkingLot) {
    // Retrieve the value of a specific parking spot counter from localStorage
    return parseInt(localStorage.getItem(parkingLot));    //parseInt - return the string asa int integer
	}
}

// Usage: define Object of Class (CounterManager)
const counterManager = new CounterManager();


function stringify(id, name, lastName, carid, parkingLot) {
	//Create a long string with the data of the student for insert to the local storage.
    return id + '|' + name + '|' + lastName + '|' + carid + '|' + parkingLot;
}

function processInfo(id, name, lastName, carid, parkingLot) {
    var dbString = stringify(id, name, lastName, carid, parkingLot);
	//insert the data of the student to the local storage.
    localStorage.setItem(id, dbString);
}

function getStudentsDb() {
    var students = [];
	//loop that over on the local storage data and insert the data to array of students.
    for (var i = 0; i < localStorage.length; i++) {
        var studentId = localStorage.key(i);
        var studentInfo = localStorage.getItem(studentId);
        var studentData = studentInfo.split('|'); // Split string by the separator
        students.push(studentData); // Use push to add the studentData array to students
    }
	//return the array of the students.
    return students;
}

//function to get name of student.

function getName(studentInfo) {
	var nameIndex = studentInfo.indexOf('name')+6;
	var endNameIndex = studentInfo.indexOf('lastName')-1;
	return 	studentInfo.substring(nameIndex, endNameIndex);
}
//function to get last name of student.

function getLastName(studentInfo) {
	var lastNameIndex = studentInfo.indexOf('lastName')+10;
	var endLastNameIndex = studentInfo.indexOf('carid')-1;
	return 	studentInfo.substring(lastNameIndex, endLastNameIndex);
}
//function to get car id of student.

function getcarid(studentInfo) {
	var caridIndex = studentInfo.indexOf('carid')+9;
	var endcaridIndex = studentInfo.indexOf('parkingLot')-1;
	return 	studentInfo.substring(caridIndex, endcaridIndex);
}
//function to get parking area of student.

function getparea(studentInfo) {
	var pareaIndex = studentInfo.indexOf('parkingLot')+6;
	var endpareaIndex = studentInfo.indexOf('}')-1;
	return 	studentInfo.substring(pareaIndex, endpareaIndex);
}
//function to delete a student from the local storage.

function removeIdFromDb(studentId) {
	localStorage.removeItem(studentId);
}