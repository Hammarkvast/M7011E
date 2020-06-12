
function putvalues(values){
  let percentage = values.battery / values.batteryMax;
  percentage = percentage * 100;
  //console.log("percentage: " + percentage + " battery: " + values.battery + " batteryMax: " + values.batteryMax)
  document.getElementById("header").innerHTML = "battery level"  
  document.getElementById("windspeed").innerHTML = values.lastwindspeed + "m/s";
  document.getElementById("production").innerHTML = values.production + "Kwh";
  document.getElementById("consumption").innerHTML = values.consumption + "Kwh";
  document.getElementById("netproduction").innerHTML = values.griddelta + "Kwh";
  document.getElementById("battery").innerHTML = values.battery + "kwh";

  $(function() {

    var progressed = percentage; 
    progressed = progressed.toFixed(0);
    console.log(progressed);
    
    $("#prog")
    .css("width", progressed + "%")
    .attr("aria-valuenow", progressed)
    .text(progressed + "%");
    
  });

}

function putOwnerData(user){
  document.getElementById("firstname").innerHTML = user.firstname;
  document.getElementById("lastname").innerHTML = user.lastname;
  document.getElementById("username").innerHTML = user.username;
}

function putElectricity(electricityprice){
  document.getElementById("electricityprice").innerHTML = electricityprice.totalelectricityPrice + "kr/kwh";
}

function putSlider(userdata){
  document.getElementById("slider").value = userdata[0].gridbatterypercentage;
}