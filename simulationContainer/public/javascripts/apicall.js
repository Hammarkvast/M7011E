async function getuserdata(){
    await $.getJSON('/API/getUserData', function(userdata) {
      putvalues(userdata[0]);
    });
}

async function getmanagerpowerplantdata(){
    await $.getJSON('/API/getmanagerplantData', function(userdata) {
      putvalues(userdata[0]);
    });
}
async function getownerdata(){
  await $.getJSON('/API/getOwnerData', function(userdata){
    putOwnerData(userdata[0]);
  });
}

async function getelectricityprice(){
    await $.getJSON('/API/getElectricityPrice', function(userdata) {
      putElectricity(userdata[0]);
    });

}

async function gethandleuserdata(){
  await $.getJSON('/API/getmanagerhandleusers', function(userdata){
    puthandleusers(userdata);
  });
}

async function updatehandleuserdata(){
  await $.getJSON('/API/getmanagerhandleusers', function(userdata){
    putupdatehandleusers(userdata);
  });
}

async function getmanageruserblocked(){
  await $.getJSON('/API/getmanagerhandleuserblocked', function(userdata){
    putupdateblocked(userdata);
  });
}
async function getvisituserdata(userid){
    await $.getJSON('/API/getVisitUserData',{userid}, function(userdata) {
      putvalues(userdata[0]);
    });
}

async function getalluserdata(){
  await $.getJSON('/API/getAllOwners', function(userdata){
    putuserprofiledata(userdata);
  })
}

async function getvisitownerdata(userid){
  await $.getJSON('/API/getVisitOwnerData',{userid}, function(userdata){
    putOwnerData(userdata[0]);
  });
}

async function getvisitelectricityprice(userid){
    await $.getJSON('/API/getVisitElectricityPrice',{userid}, function(userdata) {
      putElectricity(userdata[0]);
    });

}


async function settoggle(toggle){
    await $.getJSON('/API/settoggle',{toggle}, function() {
      
    });

}
async function setprice(price){
    await $.getJSON('/API/setprice',{price}, function() {
      
    });

}
async function setSlider(){
    await $.getJSON('/API/getSlider', function(userdata) {
      putSlider(userdata);
      
    });

}