console.log("testtest");
function putvalues(values){
  console.log("entercheck putvalues function");
  console.log(values);
  console.log("tedt: " + values.lastwindspeed);
  let percentage = values.battery / values.batteryMax;
  percentage = percentage * 100;
  console.log("percentage: " + percentage + " battery: " + values.battery + " batteryMax: " + values.batteryMax)
  document.getElementById("header").innerHTML = "battery level = "  + percentage 
  document.getElementById("windspeed").innerHTML = values.lastwindspeed + "m/s";
  document.getElementById("production").innerHTML = values.production + "Kwh";
  document.getElementById("consumption").innerHTML = values.consumption + "Kwh";
  document.getElementById("netproduction").innerHTML = values.griddelta + "Kwh";
  document.getElementById("battery").innerHTML = values.battery + "kwh";

  $(function() {

    var progressed = percentage; 
  
    var interval = setInterval(function() {
    
        $("#prog")
    
        .css("width", progressed + "%")
    
        .attr("aria-valuenow", progressed)
    
        .text(progressed + "%");
    
        if (progressed >= 100)
    
            clearInterval(interval);
    
    }, 100);
  });

}

function putElectricity(electricityprice){

  document.getElementById("electricityprice").innerHTML = electricityprice.totalelectricityPrice + "kr/kwh";
}