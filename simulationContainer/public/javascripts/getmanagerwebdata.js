function puthandleusers(values){
   //d = new Date()
    for (i = 0;i <values.length; i++ ){
      var tableRef = document.getElementById('table').getElementsByTagName('tbody')[0];
      var newRow   = tableRef.insertRow(-1);
      var newCell0  = newRow.insertCell(0);
      var newCell1  = newRow.insertCell(1);
      var newCell2  = newRow.insertCell(2);
      var newCell3  = newRow.insertCell(3);
      var newCell4  = newRow.insertCell(4);
      var newCell5  = newRow.insertCell(5);
      blockedstring = "not blocked";
      onlinestring = "not online";
      if ((values[i].timeblockedcol + values[i].blocked)<Date.now()){
          blockedstring = BLOCKED;
      } 
      if (values[i].lasttimecol<(Date.now()+10)){
          onlinestring = ONLINE;
      }
      var newText0  = document.createTextNode(values[i].username);
      var newText1  = document.createTextNode(blockedstring);
      var newText2  = document.createTextNode(onlinestring);
      var newText3  = document.createTextNode(onlinestring);

      my_form=document.createElement('FORM');
      my_form.name='myForm';
      my_form.id='myForm';
      my_form.method='POST';
      my_form.onSubmit = "return checkblank(this);"
      // my_form.action='http://www.another_page.com/index.htm';
  
      my_tb=document.createElement('INPUT');
      my_tb.type='HIDDEN';
      my_tb.name='hidden1';
      my_tb.value= values[i].ownerid;
      my_form.appendChild(my_tb);
      //my_form.submit();  
      
      var btn = document.createElement("BUTTON");   // Create a <button> element
      my_form.appendChild(btn);
      btn.type = "submit";
      btn.formAction = "handleusers/visit";
      btn.innerHTML = "VISIT";
      btn.className = "btn btn-lg btn-primary btn-block";
      console.log(btn.formaction);
      // btn.value = 1;
      // btn.onclick = function(){visit(btn)};
      
      var btn1 = document.createElement("BUTTON");
      btn1.form="myForm" // Create a <button> element
      btn1.innerHTML = "BLOCK";
      btn1.className = "btn btn-lg btn-primary btn-block"; 
      btn1.type = "submit";
      btn1.formAction = "handleusers/block";
      //my_form.appendChild(btn1);
      // btn1.value = 1;
      // btn1.onclick = function(){ block(btn1)};
      //document.body.appendChild(my_form);

      newCell0.appendChild(newText0);
      newCell1.appendChild(newText1);
      newCell2.appendChild(newText2);
      newCell3.appendChild(newText3);
      newCell4.appendChild(my_form);
      newCell5.appendChild(btn1);
      console.log(btn.formaction);
      console.log(btn);
      console.log(btn1.formaction);
      console.log(btn1);
    }
}
