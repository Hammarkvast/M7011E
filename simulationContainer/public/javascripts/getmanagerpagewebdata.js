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