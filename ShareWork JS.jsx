
'importScripts("verificador.js");
var ports = {};
var contador = 0;
function obtemNovoNome() {
    return "porta: " + contador++;
}
function enviaMsgTodasPortas(msg){
    for(p in ports){
        ports[p].postMessage(msg);
    }
}
function verifica(evt) {
    var number = parseInt(evt.data);
    var res = verificaNumero(number);
    enviaMsgTodasPortas("O número " + evt.data + (res ? " é primo." : " não é primo."), evt.target);
}
onconnect = function (evt) {
    var name = obtemNovoNome();
    var port = evt.ports[0];
    port._name = name;
    ports[name] = port;
    port.onmessage = verifica;
    port.postMessage(port._name);
}
