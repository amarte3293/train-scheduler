var config = {
    apiKey: "AIzaSyAnuuBs5gm9V2K1lH-6wTbAkwQh2hNgyO4",
    authDomain: "train-scheduler-77d9f.firebaseapp.com",
    databaseURL: "https://train-scheduler-77d9f.firebaseio.com",
    projectId: "train-scheduler-77d9f",
    storageBucket: "train-scheduler-77d9f.appspot.com",
    messagingSenderId: "1045063477796"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#submit").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#Destination").val().trim();
    var trainTime = moment($("#trainTime").val().trim(), "hh:mm").format("X");
    var trainFrequency = $("#frequency").val().trim();
  
    // Creates local "temporary" object for holding employee data 
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency
    };
    
  
    database.ref("/trains").push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.rate);
  
    
    // Alert
   

  
    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");

  });

 database.ref("/trains").on("child_added", function(anything) {
      // storing the anything.val() in a variable for convenience
      var retrieveTrainData = anything.val();

      // Console.loging the last user's data
      console.log(retrieveTrainData.name);
      console.log(retrieveTrainData.destination);
      console.log(retrieveTrainData.time);
      console.log(retrieveTrainData.frequency);
//html
      var newRow = $("<tr>")

      newRow.append("<td>" + retrieveTrainData.name+ "</td>");
      newRow.append("<td>" +retrieveTrainData.destination+ "</td>");  
      newRow.append("<td>" +retrieveTrainData.frequency+ "</td>");         
      //var emptimePretty = moment.unix(retrieveTrainData.time).format("hh:mm");
    //hardcore math
      var totalTrainTime = Math.abs(moment().diff(moment(retrieveTrainData.time, "X"), "minutes"));
      
      console.log(totalTrainTime)
      var freqDivider = ((totalTrainTime)/retrieveTrainData.frequency);
      console.log(freqDivider);
      var freqDividerDecimal = freqDivider - Math.floor(freqDivider)
      console.log(freqDividerDecimal)
     var nextTrainMinutes =  Math.round(retrieveTrainData.frequency - (retrieveTrainData.frequency*freqDividerDecimal)) 
     console.log(nextTrainMinutes)
  var nextTrainTime = moment().add(nextTrainMinutes, "m").toDate();
  nextTrainTimeFormatted = moment(nextTrainTime).format("HH:mm");
  console.log(nextTrainTime);
  console.log(nextTrainTimeFormatted);
     
  newRow.append("<td>" +nextTrainTimeFormatted+ "</td>");

  
      newRow.append("<td>" +nextTrainMinutes+ "</td>");
$(".table").append(newRow);
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
