// Business logic layer - logic in communication with the user interface layer


document.addEventListener('DOMContentLoaded', function() { // Call the function when the page loads or move between pages
    // Call the function to update capacity
    updateCapacityAndDisplay();
});


// Function to update capacity and display
function updateCapacityAndDisplay() {
	// Call the function to update capacity
	updatacapacity('A' ,'a_counter', counterManager.getParkingSpots('AParkingSpots'));
	updatacapacity('B' ,'b_counter', counterManager.getParkingSpots('BParkingSpots'));
	updatacapacity('C' ,'c_counter', counterManager.getParkingSpots('CParkingSpots'));
	updatacapacity('D' ,'d_counter', counterManager.getParkingSpots('DParkingSpots'));
}

	
//show available parking spots in website pages
function updatacapacity(letter, id, counters) {
	var element = document.getElementById(id);
	if(element)  // if elemnt exist (not NULL)
	{
        element.innerHTML = letter + '- available spots: ' + counters;
	}
}



function FuncReserve() {    
    var id = document.getElementById('studentID').value;
    var carid = document.getElementById('CarId').value;
    var name = document.getElementById('FirstName').value;
    var lastName = document.getElementById('LastName').value;
    //convert the select choice to variable VAR parkingLot
    var parkingLot = document.getElementById('parkingLot').value; 
	var Disabled = document.getElementById('handicaped').checked;
    var alertMsg = "";
    alertMsg = IdVerifiy(id, alertMsg);   //check Id
    alertMsg = CarIdVerifiy(carid, alertMsg); //check CarId
	alertMsg= FuncDisabled(parkingLot, Disabled, alertMsg);  //check if lotDand not Disable
    if ((trim(name) == '') || (trim(lastName) == '')) {
        alertMsg = alertMsg + "\nPlease enter a right first name and last name.";
    }
    if (alertMsg != '') {
        alert(alertMsg);
    } 
	else{ //if alert massege empty   
		if(IsParkingFull()==true){
				alert('Parking is full, try later.');
		}else
		{
			// Check if there are available parking spots
			if (reduceAvailableParking(parkingLot)) {
				alert('Parking reserved successfully!!');
				// send the data to the third layer DATA BASE         
				processInfo(id, name, lastName, carid, parkingLot);
			} else {
				alert('No available parking spots in this lot. Please try another lot.');
			}
		}
	}
}


//Parallel programming part in the code.
// Event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the element with ID 'studentID'
    var studentIDInput = document.getElementById('studentID');
    // Check if the element with ID 'studentID' exists
    if (studentIDInput) {
        // Add an input event listener to the 'studentID' input field
        studentIDInput.addEventListener('input', function(event) {
            // Retrieve the current value of the input field
            var inputValue = event.target.value;
            // Check if the input value is not empty and contains only digits
            if (inputValue && !(/^\d+$/.test(inputValue))) {
                // Remove the last character from the input field
                event.target.value = inputValue.slice(0, -1);
                // Display an alert to the user
                alert('Please enter numbers only in your ID.');
            }
        });
    }

    // Retrieve the element with ID 'CarId'
    var carIdInput = document.getElementById('CarId');
    // Check if the element with ID 'CarId' exists
    if (carIdInput) {
        // Add an input event listener to the 'CarId' input field
        carIdInput.addEventListener('input', function(event) {
            // Retrieve the current value of the input field
            var inputValue = event.target.value;
            // Check if the input value is not empty and contains only digits
            if (inputValue && !(/^\d+$/.test(inputValue))) {
                // Remove the last character from the input field
                event.target.value = inputValue.slice(0, -1);
                // Display an alert to the user
                alert('Please enter numbers only in your car-ID.');
            }
        });
    }
});

//End of Parallel programming

function IdVerifiy(id,alertMsg){       //Id verification
	if( (id>=0) == false){    // check if the id is integer.
		alertMsg = alertMsg + "Please enter numbers only in your ID.";
	}
	if(trim(id).length != 9) {
		alertMsg = alertMsg + "\nPlease enter ID with 9 digits.";
	}
	//check if this ID is already registered in the Data Base
	var studentTable = getStudentsDb();
	for(i=0; i<studentTable.length; i++){    // go through all the id that registered 
		var studentID = studentTable[i][0];    //student id
		if(studentID==id){
			alertMsg = alertMsg + "\nthis ID is already registered, please try again.";
		}
	}
	return alertMsg;
}	
	
function CarIdVerifiy(carid,alertMsg){    //CAR-Id verification
	if( (carid>=0) == false){    // check if the carid is integer.
		alertMsg = alertMsg + "\nPlease enter numbers only  in your car-ID.";
	}
	if((trim(carid).length != 7) &&  (trim(carid).length != 8)){ //licence plate is 7/8 digits.
		alertMsg = alertMsg + "\nPlease enter car number with 7 or 8 digits.";
	}
	//check if this CAR -ID is already registered in the Data Base
	var studentTable = getStudentsDb();
	for(i=0; i<studentTable.length; i++){   // go through all the CAR -ID that registered 
		var studentCARID = studentTable[i][3];   //student car id
		if(studentCARID==carid){
			alertMsg = alertMsg + "\nthis CAR-ID is already registered, please try again.";
		}
	}	
	return alertMsg;
}

function FuncDisabled(parkingLot, Disabled, alertMsg){
	if(parkingLot == "lotD" && Disabled == false){
		alertMsg = alertMsg + '\nPlease make sure the box is checked';
	}
	return alertMsg;
}

//delete data by id from data base
function FuncCheckout() 
{
	var id = document.getElementById('studentID').value;
	var flagIdExist = false;     //flag to check if ID is i the data base
	var alertMsg = "";
	//**Id verification**
	if( (id>=0) == false){    // check if the id is integer.
		alertMsg = alertMsg + "Please enter numbers only in your ID.";
	}
	if(trim(id).length != 9) {
		alertMsg = alertMsg + "\nPlease enter ID with 9 digits.";
	}
	//check if this ID is already registered in the Data Base
	var studentTable = getStudentsDb();
	for(i=0; i<studentTable.length; i++){   // go through all the id that registered 
		var studentID = studentTable[i][0];
		if(studentID==id){
			flagIdExist = true;
			var studentParkingLot = studentTable[i][4];   //student parking lot
		}
	}
	if(flagIdExist==false){
		alertMsg = alertMsg + "\nthere is no such ID in the DATA BASE.";
	}
	if(alertMsg != ''){
		alert (alertMsg);
	}
	else{
		// Increase available parking spots by 1 - the user just checked out
		increaseAvailableParking(studentParkingLot);
		// send commend to third layer DATA BASE
        alert('Checkout successfully!'); 
		removeIdFromDb(id);
	}
}

// remove spaces before and after string
function trim (str)
{
     return str.replace (/^\s+|\s+$/g, '');
}

function cleanFormAdmin()
{
	document.getElementById('studentID').value = '';
}

// cleaning all field in the form
function cleanForm()
{
	document.getElementById('studentID').value = '';
	document.getElementById('CarId').value = '';
	document.getElementById('FirstName').value = '';
	document.getElementById('LastName').value = '';
	
	//restart the select function to "Lot A"
	document.getElementById('parkingLot').value = 'lotA';
	document.getElementById('handicaped').checked = false;
}

//when press if ALT + R / ('ר') - cleanForm   - Keyboard event
document.addEventListener("keydown", function(event) {
    // Check if ALT+R was pressed
    if ((event.altKey && event.key === 'r')||(event.altKey && event.key === 'ר')) {
        // Call the function
        cleanForm();
    }
});

//when press Enter - submit reserve    Keyboard event
document.addEventListener("keydown", function(event) {
    // Check if ALT+Enter was pressed
    if (event.key === 'Enter') {
        // Call the function
        FuncReserve();
    }
});

//when press Ctrl + Q / ('/') -  change Mode for the student    Keyboard event
document.addEventListener("keydown", function (event) {
	// Check if Ctrl + Q was pressed
	if ((event.ctrlKey && event.key === 'q')||(event.ctrlKey && event.key === '/')) {
		// Call the function
		changeModeStudent();
	}
});

function showPass() {
	  var x = document.getElementById('Admin_Pass');
	  var showPasswordCheckbox = document.getElementById("show_Pass");
	  if(showPasswordCheckbox.checked)
	  {
		x.type = "text";
	  } else {
		x.type = "password";
	  }
}

function adminPage() {
	  var pass = document.getElementById('Admin_Pass').value;
	  if(pass == "1234")
	  {
		location.href = "AdminWebsite.html";
	  } else {
		alert("wrong password");
	  }
}

function handleStudentLogin() {
	location.href = "StudentWebsite.html";
}

function changeModeStudent() {
	var styleSheet = document.getElementById("style_sheet_student");
	if (styleSheet.href.includes("student_light_style.css")) {
		styleSheet.href = "student_dark_style.css";
	} else {
		styleSheet.href = "student_light_style.css"; // Switch to light mode stylesheet
	}
}

function changeModeAdmin() {
	var styleSheet = document.getElementById("style_sheet_admin");
	if (styleSheet.href.includes("admin_light_style.css")) {
		styleSheet.href = "admin_dark_style.css";
	} else {
		styleSheet.href = "admin_light_style.css"; // Switch to light mode stylesheet
	}
}

function changeModeLogin() {
	var styleSheet = document.getElementById("style_sheet_login");
	if (styleSheet.href.includes("login_light_style.css")) {
		styleSheet.href = "login_dark_style.css";
	} else {
		styleSheet.href = "login_light_style.css"; // Switch to light mode stylesheet
	}
}