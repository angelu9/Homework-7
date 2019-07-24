var firebaseConfig = {
    apiKey: "AIzaSyArrl9oJGr0Duz8o_6B_7_IEdrz0v1u-8g",
    authDomain: "homework-7-e0321.firebaseapp.com",
    databaseURL: "https://homework-7-e0321.firebaseio.com",
    projectId: "homework-7-e0321",
    storageBucket: "",
    messagingSenderId: "478530307735",
    appId: "1:478530307735:web:157705b1456046a0"
  };
  
  firebase.initializeApp(firebaseConfig);

 
  var database = firebase.database(); 

  $("#add-train-btn").on("click", function(event){

    event.preventDefault();

    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#train-destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var trainFrequency = $("#train-frequency-input").val().trim();

    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTrain: firstTrain,
      frequency: trainFrequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    alert("Train has been added!");

    $("#name-input").val("");
    $("#train-destination-input").val("");
    $("#first-train-input").val("");
    $("#train-frequency-input").val("");

  });

  database.ref().on("child_added", function(childSnapshot){
console.log(childSnapshot.val());

var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var firstTrain = childSnapshot.val().firstTrain;
var trainFrequency = childSnapshot.val().frequency;

console.log(trainName);
console.log(trainDestination);
console.log(firstTrain);
console.log(trainFrequency);

var trainArr = firstTrain.split(":");
var trainTime = moment().hours(trainArr[0]).minutes(trainArr[1]);
var maxMoment = moment.max(moment(), trainTime);
var trainMinutes;
var trainArrival;

if (maxMoment === trainTime) {
  trainArrival = trainTime.format("hh:mm A");
  trainMinutes = trainTime.diff(moment(), "minutes");
} else {
  
  var differenceTimes = moment().diff(trainTime, "minutes");
  var tRemainder = differenceTimes % tFrequency;
  trainMinutes = tFrequency - tRemainder;
 
  trainArrival = moment().add(trainMinutes, "m").format("hh:mm A");
  
}

console.log("trainMinutes:", trainMinutes);
console.log("trainArrival", trainArrival);

var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(trainDestination),
  $("<td>").text(trainFrequency),
  $("<td>").text(trainArrival),
  $("<td>").text(trainMinutes)

);

$("#train-table > body").append(newRow);


  });