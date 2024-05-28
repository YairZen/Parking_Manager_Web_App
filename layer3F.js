//Data access layer - logic in communication with the database


//check if all full.
function IsParkingFull() {
    if ((counterManager.getParkingSpots('AParkingSpots') == 0) &&
        (counterManager.getParkingSpots('BParkingSpots') == 0) &&
        (counterManager.getParkingSpots('CParkingSpots') == 0) &&
        (counterManager.getParkingSpots('DParkingSpots') == 0)) 
	{
        return true;
    } else {
        return false;
    }
}
   
function increaseAvailableParking(parkingLot)
{    
    switch (parkingLot) {
        case 'lotA':
            counterManager.updateParkingSpots('AParkingSpots', counterManager.getParkingSpots('AParkingSpots') + 1); //increase 1
            updatacapacity('A' ,'a_counter', counterManager.getParkingSpots('AParkingSpots')); //update on the display 
            return true;
        case 'lotB':
            counterManager.updateParkingSpots('BParkingSpots', counterManager.getParkingSpots('BParkingSpots') + 1);
            updatacapacity('B' ,'b_counter', counterManager.getParkingSpots('BParkingSpots'));
            return true;
        case 'lotC':
            counterManager.updateParkingSpots('CParkingSpots', counterManager.getParkingSpots('CParkingSpots') + 1);
            updatacapacity('C' ,'c_counter', counterManager.getParkingSpots('CParkingSpots'));
            return true;
        case 'lotD':
            counterManager.updateParkingSpots('DParkingSpots', counterManager.getParkingSpots('DParkingSpots') + 1);
            updatacapacity('D' ,'d_counter', counterManager.getParkingSpots('DParkingSpots'));
            return true;
        default:
            return false; // Indicate failure (parkingLot not found)
    }
}

//general switch - reduce available parking by parkingLot
function reduceAvailableParking(parkingLot) {
    switch (parkingLot) {
        case 'lotA':
            if (counterManager.getParkingSpots('AParkingSpots') > 0) {
                counterManager.updateParkingSpots('AParkingSpots', counterManager.getParkingSpots('AParkingSpots') - 1);
                updatacapacity('A' ,'a_counter', counterManager.getParkingSpots('AParkingSpots'));
                return true;
            }
            break;
        case 'lotB':
            if (counterManager.getParkingSpots('BParkingSpots') > 0) {
                counterManager.updateParkingSpots('BParkingSpots', counterManager.getParkingSpots('BParkingSpots') - 1);
                updatacapacity('B' ,'b_counter', counterManager.getParkingSpots('BParkingSpots'));
                return true;
            }
            break;
        case 'lotC':
            if (counterManager.getParkingSpots('CParkingSpots') > 0) {
                counterManager.updateParkingSpots('CParkingSpots', counterManager.getParkingSpots('CParkingSpots') - 1);
                updatacapacity('C' ,'c_counter', counterManager.getParkingSpots('CParkingSpots'));
                return true;
            }
            break;
        case 'lotD':
            if (counterManager.getParkingSpots('DParkingSpots') > 0) {
                counterManager.updateParkingSpots('DParkingSpots', counterManager.getParkingSpots('DParkingSpots') - 1);
                updatacapacity('D' ,'d_counter', counterManager.getParkingSpots('DParkingSpots'));
                return true;
            }
            break;
    }
    return false; // Indicate failure (parkingLot not found or no spots available)
}

function FuncDelAll(){
	var studentTable = getStudentsDb();
	for(i=0; i<studentTable.length; i++)
	{
		var student = studentTable[i];
		var delparkingLot = student[4];
		//delete each student by his id.
		removeIdFromDb(student[0]);
	}
	alert('The information has been deleted.');
	// Initialize the counters after deleting all records
    initializeParkingCounters();
}

// Function to initialize parking spot counters
function initializeParkingCounters() {
    // Set counters to 5 for each parking lot
    counterManager.updateParkingSpots('AParkingSpots', 5);
    counterManager.updateParkingSpots('BParkingSpots', 5);
    counterManager.updateParkingSpots('CParkingSpots', 5);
    counterManager.updateParkingSpots('DParkingSpots', 5);
}
function FuncShowData() {
    // Check if the password is the manager password (1234).
    var studentTable = getStudentsDb();
    var tableBody = document.getElementById('tableBody');
    
    // Clear existing table data
    tableBody.innerHTML = '';

    // Create a string to hold the entire HTML content
    var tableContent = '';

    // Loop over the students table in the local storage to insert the data into vars
    for (var i = 0; i < studentTable.length; i++) {
        var student = studentTable[i];
        var ID = student[0];
        var fullName = student[1] + ' ' + student[2];
        var carId = student[3];
        var parkingLot = student[4];

        // Create a new row in the table
        var newRow = "<tr><td>" + ID + "</td><td>" + fullName + "</td><td>" + carId + "</td><td>" + parkingLot + "</td></tr>";

        // Append the new row to the tableContent string
		if (ID > 99999999 && ID < 1000000000){
			tableContent += newRow;
		}
    }

    // Set the entire HTML content to the table body
    tableBody.innerHTML = tableContent;
}