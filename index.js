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
        //console.log('position',message.args);
    
        // Send OSC message data to the browser over WebSocket
        ws.send(JSON.stringify({ address: '/position', args: message.args }));
    });

    osc.on('/click', message => {
        //console.log('click', message.args)
        ws.send(JSON.stringify({ address: '/click', args: message.args }));
    })

    osc.on('/shoot', message => {
        //console.log('shoot', message.args)
        ws.send(JSON.stringify({ address: '/shoot', args: message.args }));
    })

    osc.on('/clap', message => {
        console.log('clap', message.args)
        //if (message.args[0] < 35) {
        ws.send(JSON.stringify({ address: '/clap', args: message.args }));
        //}
    })
    // osc.open({ port: 8080 })
})

osc.open({ port: 8080 })