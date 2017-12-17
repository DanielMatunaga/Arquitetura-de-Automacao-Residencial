var md5 = require("blueimp-md5");
var SerialPort = require("serialport");
var firebase = require('firebase');

const key = "tfg123";

var port = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600
});

//----------------------------------------------------------------------Firebase---------------------------------------------------------------------------------------------------------

firebase.initializeApp({
serviceAccount: "./Controlador-e9124f6e152e.json",
databaseURL: "https://controlador-ec734.firebaseio.com"
});

//----------------------------------------------------------------------Application-------------------------------------------------------------------------------------------------------


var ref1 = firebase.database().ref().child("Constantes/KP");

var first1 = true;
ref1.on('value', function(data) { 
	if(first1){
		first1 = false;
	} else{
			var KP = data.val();
			building("P", KP);
	}
})

var ref2 = firebase.database().ref().child("Constantes/KI");

var first2 = true;
ref2.on('value', function(data) { 
	if(first2){
		first2 = false;
	} else{
			var KI = data.val();
			building("I",KI);
	}
})

var ref3 = firebase.database().ref().child("Constantes/KD");

var first3 = true;
ref3.on('value', function(data) { 
	if(first3){
		first3 = false;
	} else{
			var KD = data.val();
			building("D",KD);
	}
})

var ref4 = firebase.database().ref().child("Constantes/KT");

var first4 = true;
ref4.on('value', function(data) { 
	if(first4){
		first4 = false;
	} else{
			var KT = data.val();
			building("T",KT);
	}
})


function building(command, K){
	var msg = command + K + "#";
	packing(msg);
}


//----------------------------------------------------------------------Sending Message---------------------------------------------------------------------------------------------------

function packing(msg){ //constroi o pacote
 var md5_t = md5(key+msg); //cria o md5 da chave+mensagem
 var pack = '$' + msg + ',' + md5_t + '/n'; //cria o pacote contendo: [(bit de sinal) + (mensagem) + (,) + (md5 da chave+mensagem) + (bits finais)]
 sending(pack); //manda o pacote para a funcao que envia os bytes pelo serial
}

function sending(msg){	//envia mensagem
	for(i=0; i < msg.length;i++){ //for com o tamanho da mensagem
		port.write(msg[i]); //envia a mensagem byte a byte pelo serial
	}
}



//----------------------------------------------------------------------Receiving Message---------------------------------------------------------------------------------------------------

//tratar mais q 47bytes
//tratar primeiro buffer
var buffer = new Buffer.alloc(69); //
var reading = false;
var count = 0;
var ending1 = false;
var ending2 = false;

port.on('readable', function () {
	var tempBuffer = port.read();
	if(reading){
		readingMsg(tempBuffer);
	} else{
		waitingMsg(tempBuffer);
	}
});

function waitingMsg(tempBuffer){
			for(i=0; i< tempBuffer.length; i++){
			if(!((tempBuffer[i] == 13) || (tempBuffer[i] == 10))){
				var c = String.fromCharCode(tempBuffer[i]);
				if((ending1) && (c == 'n')){
					buffer.fill(0);
					count = 0;
					ending1 = false;
				} else{
					ending1 = false;
				}
				if ( c == '$'){
					buffer.fill(0);
					count = 0;
					for(j = i; j < tempBuffer.length; j++){
						buffer[count] = tempBuffer[j];
						count++;
					}
					reading = true;
				}
				if( c == '/'){
					ending1 = true;
				}
			}
		}	
}

function readingMsg(tempBuffer){
				for(i=0; i< tempBuffer.length; i++){
				if(!((tempBuffer[i] == 13) || (tempBuffer[i] == 10))){
					var c = String.fromCharCode(tempBuffer[i]);
					if(count>68){
						buffer.fill(0);
						break;
					}
					if((ending2) && (c == 'n')){
						buffer[count] = tempBuffer[i];
						reading = false;
						ending2 = false;
						unpack(buffer);
						break;
					} else {
						ending2 = false;
					}
					if(c == '$'){
						waitingMsg(tempBuffer);
						break;
					}
					if (c == '/'){
						ending2 = true;
					} 	
					buffer[count] = tempBuffer[i];
					count++;
				}
			}
}


function unpack(buffer){
	var pack = String(buffer).trim();
	var msgReceived;
	var md5Received;
	var aux = 0;
	for(i = 1; i < pack.length; i++){
		var c = pack.charAt(i);
		if(c == ','){
			msgReceived = pack.substring(1,i);
			aux = i + 1;
		}
		if(c=='/'){
			var d = pack.charAt(i + 1);
			if( d == 'n'){
				md5Received = pack.substring(aux,i);
			}
		}
	}
	validate(msgReceived, md5Received);
}

function validate(msgReceived, md5Received){
	var key_msg = (key + msgReceived).replace(/(\r\n|\n|\r)/gm,"");
	var md5_v = md5(key_msg);
	if(md5_v == md5Received){
		processingMsg(msgReceived);
	}
}

function processingMsg(msgReceived){
	//aplicacao
	var ref5 = firebase.database().ref();
		ref5.update({
		Leitura: msgReceived
	});
}

