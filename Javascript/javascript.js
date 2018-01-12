// console.log("hello");
var config = {
  apiKey: "AIzaSyAV0lRb1kT1duygJfRT8wKndiN3aRN5WP8",
  authDomain: "train-project-257e5.firebaseapp.com",
  databaseURL: "https://train-project-257e5.firebaseio.com",
  projectId: "train-project-257e5",
  storageBucket: "train-project-257e5.appspot.com",
  messagingSenderId: "309920808015"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("child_added", function(snapshot){
    // console.log(snapshot.val());
    // console.log(snapshot.val().name);
    // console.log(snapshot.val().destination);
    // console.log(snapshot.val().firstTime);
    // console.log(snapshot.val().frequency);

    var newestFirstTime = snapshot.val().firstTime;
    var newestFrequency = snapshot.val().frequency;

    var firstTimeConverted = moment(newestFirstTime, "hh:mm").subtract(
      1,
      "years"
    );
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % newestFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = newestFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var newRow = `<tr>
          <td>${snapshot.val().name}</td>
          <td>${snapshot.val().destination}</td>
          <td>${snapshot.val().frequency}</td>
          <td>${nextTrain}</td>
          <td>${tMinutesTillTrain}</td>
        </tr>`;

    $("#tableBody").append(newRow);
  },
  function(errorObject) {
    console.log("Failed: " + errorObject.code);
  // }
});

$("#submit").on("click", function(e) {
  e.preventDefault();

  var trainName= $('#trainNameId').val().trim();
	var trainDestination= $('#destinationId').val().trim();
	var firstTrainTime= $('#trainTimeId').val().trim();
	var trainFrequency= parseInt($('#frequencyId').val().trim());


  // console.log(trainTime);
  // console.log(trainName);

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firstTime: firstTrainTime,
    frequency: trainFrequency
  };

  console.log(newTrain);

  database.ref().push(newTrain);

  $(".form-group > input").val(" ");
});
