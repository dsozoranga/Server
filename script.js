alert("BIENVENIDO ");

// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("tailor.cloudmqtt.com", 30150, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
    useSSL: true,
    userName: "lsivuczr",
    password: "kO91SYr7olwS",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
  topic="LED";
  topic_rx="test";
    topic_tx="led";
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
	
    client.subscribe("test");
    message = new Paho.MQTT.Message("ll:Hello: hola desde la web");
    message.destinationName = topic_tx;
    
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("nuevo ensaje:"+message.payloadString);
	//sensor=document.getElementById("sensor_i");
	//sensor.innerHTML=message.payloadString;
	
	//sensor=document.getElementById("sensor_p");
	//sensor.innerHTML=message.payloadString;
	
	//sensor=document.getElementById("sensor_l");
	//sensor.innerHTML=message.payloadString;
	action(message.payloadString);
	
  }
  
    // called when a message arrives
  function publicar(msg) {
    message = new Paho.MQTT.Message(msg);
    message.destinationName = topic_tx;
    client.send(message);
	
  }

    // called when a message arrives
  function ledOn() {
	 publicar('led=1');
	 console.log('led=1');
	//sendMessage('led')	
  }
  function ledOff() {
	 publicar('led=0');
	 console.log('led=0');
	//sendMessage('led')	
  }  
  function action(msg){
	  mensaje=msg.split('=');
	 if(mensaje[0]=='i')
		document.getElementById('sensor_i').innerHTML=mensaje[1];
	 if(mensaje[0]=='p')
		document.getElementById('sensor_p').innerHTML=mensaje[1];
	 if(mensaje[0]=='l')
		document.getElementById('sensor_l').innerHTML=mensaje[1];
    
  }
 
  
 