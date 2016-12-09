import {Meteor} from 'meteor/meteor';
import {State} from '/imports/api/state';
import '/imports/api/state/publications';
var serialPort = new SerialPort.SerialPort('COM5', {
    baudrate: 9600, parser: SerialPort.parsers.readline('\r\n')
});
var saveUser;
serialPort.on('data', Meteor.bindEnvironment(function (data) {
    switch (data) {
    case 'Aluminio':
        //usuarioid = saveUser;
        var tipoaluminio = State.findOne({usuario: saveUser});   
        var saldo = parseInt(tipoaluminio.saldo) + 13;
        var botes = parseInt(tipoaluminio.botes) + 1;   
        State.update({usuario:tipoaluminio.usuario}, {$set: {saldo:saldo,tipo:"Aluminio",botes:botes, fecha: new Date()}});
        break;
    case 'Pet':
        //usuarioid = saveUser;
        var tipopet= State.findOne({usuario: saveUser});   
        var saldo = parseInt(tipopet.saldo) + 3;
        var botes = parseInt(tipopet.botes) + 1;    
        State.update({usuario:tipopet.usuario}, {$set: {saldo:saldo,tipo:"Pet",botes:botes, fecha: new Date()}});
        break;
    case 'Boton':
        //usuarioid = saveUser;
        var tipoboton = State.findOne({usuario: saveUser}); 
        var saldoanterior = parseInt(tipoboton.saldo);
        State.update({usuario:tipoboton.usuario}, {$set: {tipo:"Boton",saldoanterior:saldoanterior,botes:0, fecha: new Date()}});
        break;
    default:
        saveUser = data;
            State.update({usuario: saveUser}, {$set: {tipo: saveUser,fecha: new Date()}
        });
    }
    

}));
