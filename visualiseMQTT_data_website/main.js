$(function(){
  var client = mqtt.connect('mqtt://msolcany~nodemcu@broker.shiftr.io', {
    clientId: 'browser-local'
  });
    
  var vals;
 
  var data = [];
  var y;
  var z;
   
  client.on('connect', function(){
    console.log('client has connected!');
  }); 
  client.subscribe('nodemcu/vals');

  client.on('message', function(topic, message) {
    document.getElementById('vals_content').innerHTML = message;
    console.log(message);
  })
})
 
  // client.on('message', function(topic, message) {
  //     if(topic === 'nodemcu/vals'){
  //       vals = message;
  //     }else{;}
  //  if(vals){
  //   $('#vals').text(vals.toString());
  //   z = vals.toString();
  //   vals =  undefined;
  //  }
 
  //   var x = new Date();  // current time
  //    console.log(y);
  //   console.log(z);
  //   data.push([x, y, z]);
  //   g.updateOptions( { 'file': data } );
 
  // });
 
//})