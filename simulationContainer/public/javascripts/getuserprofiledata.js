function putuserprofiledata(values){
    // console.log("hallo!");
    // console.log(values);
    for (i = 0; i <values.length; i++){
        var tableRef = document.getElementById('profiletable').getElementsByTagName('tbody')[0];
        var newRow = tableRef.insertRow(-1);
        var newCell0 = newRow.insertCell(0);
        var newCell1 = newRow.insertCell(1);
        var newCell2 = newRow.insertCell(2);
        var newText0 = document.createTextNode(values[i].username);
        var newText1 = document.createTextNode(values[i].ownerid);

        my_form = document.createElement('form');
        my_form.name = 'myForm';
        my_form.id = 'myForm';
        my_form.method = 'post';
        my_form.onSubmit = 'return chackblank(this);';

        my_tb = document.createElement('INPUT');
        my_tb.type = "HIDDEN";
        my_tb.name = "usertable";
        my_tb.value = values[i].ownerid;
        my_form.appendChild(my_tb);

        var btn = document.createElement('button');
        //btn.form = "myForm";
        my_form.appendChild(btn);
        btn.type = "submit";
        btn.innerHTML = "Delete";
        btn.className = "btn btn-danger";
        btn.formAction = "profile/deleteOwner";
    
        newCell0.appendChild(newText0);
        newCell1.appendChild(newText1);
        newCell2.appendChild(my_form);


    }
}