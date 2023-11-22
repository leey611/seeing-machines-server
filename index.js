const OSC = require('osc-js')
const WebSocket = require('ws')

const osc = new OSC({  plugin: new OSC.DatagramPlugin() })
const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
    console.log('ws connection open')
    osc.on('/cursor/move', (message) => {
        console.log(message.args);
    
        // Send OSC message data to the browser over WebSocket
        ws.send(JSON.stringify({ address: '/cursor/move', args: message.args }));
    });
    osc.on('/position', (message) => {
        console.log(message.args);
    
        // Send OSC message data to the browser over WebSocket
        ws.send(JSON.stringify({ address: '/position', args: message.args }));
    });
    // osc.open({ port: 8080 })
})

osc.open({ port: 8080 })