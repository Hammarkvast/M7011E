function putvalues(values) {
  let percentage = values.buffer / values.bufferMax;
  percentage = percentage * 100;
  document.getElementById("header").innerHTML = "Buffer level"
  document.getElementById("production").innerHTML = values.production + "Kwh";
  //document.getElementById("netproduction").innerHTML = values.griddelta + "Kwh";
  document.getElementById("buffer").innerHTML = values.buffer + "kwh";

  $(function () {

    var progressed = percentage;
    progressed = progressed.toFixed(0);

    $("#prog")

      .css("width", progressed + "%")

      .attr("aria-valuenow", progressed)

      .text(progressed + "%");

  });

}

function putOwnerData(user) {
  document.getElementById("firstname").innerHTML = user.firstname;
  document.getElementById("lastname").innerHTML = user.lastname;
  document.getElementById("username").innerHTML = user.username;
}

function putElectricity(electricityprice) {

  document.getElementById("netgridproduction").innerHTML = electricityprice.totalnetproduction + "kwh";
  document.getElementById("electricityprice").innerHTML = electricityprice.totalelectricityPrice + "kr/kwh";
  let manorsim = electricityprice.manorsim;
  if (manorsim == 0) {
    $('#optradio').prop(checked, false);
  } else {
    $('#optradio').prop(checked, true);
  }
}

function putPowerplantState(state) {
  var date = new Date();
  var currentTime = date.getTime();
  stateString = "Started!";
  var timeDiff = currentTime - state[0].changestatetime;
  console.log(state[0].changestatetime);
  if(state[0].onoroff == 1){
    if(timeDiff <= 30000){
      stateString = "Starting up!";
      document.getElementById("currState").innerHTML = stateString;
    } else{
      stateString = "Started!";
      document.getElementById("currState").innerHTML = stateString;
    }
  } else {
    if(state[0].production == 0) {
      stateString = "Stopped!";
      document.getElementById("currState").innerHTML = stateString;
    } else {
      stateString = "Shutting down!";
      document.getElementById("currState").innerHTML = stateString;
    }
  }


}

function putSliderManager(userdata){
  document.getElementById("slider").value = userdata[0].gridbufferpercentage;
}