let express = require('express')
let path = require('path')
let qrcode = require('qrcode')
let uploadFile = require('./lib/uploadFile')
let fs = require('fs')

async function connect(conn, PORT, use_ngrok = false) {
    conn.connectOptions.logQR = false
    let app = global.app = express()
    let _qr = 'invalid'
    if (use_ngrok) {
        let ngrok = require('ngrok')
      const ngrok_url = await ngrok.connect({
  proto: 'http', 
  addr: PORT, 
  region: 'jp'
   })
       console.log('Scan QR on :', ngrok_url)
      }
    app.use(async (req, res) => {
        if (req.path == '/session' && conn.state == 'open') return res.send(conn.base64EncodedAuthInfo())
        if (conn.state == 'open') return res.status(200).send({status: 200, message: 'Bot Telah Tersambung ke whatsapp web anda!', user: conn.user })
        qrr = await qrcode.toDataURL(_qr, { scale: 17 })
        html = fs.readFileSync('./views/scan.html', 'utf-8')
        res.send(html.replace(/\$QRURL/g, qrr))
    })
   
    conn.on('qr', qr => {
        _qr = qr
    })
    
    let server = app.listen(PORT, () => console.log('App running on', 'http://localhost:'+PORT))
}

module.exports = connect
