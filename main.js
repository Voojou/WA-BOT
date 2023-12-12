require('./config')
let awesome = require('awesome-phonenumber')
let {
MessageType,
WAConnection,
Browsers
} = require('@adiwajshing/baileys')
let { color, bgcolor } = require('./lib/color')
const cp = require('child_process')
const simple = require('./lib/simple.js')
const WAPI = simple.WAConnection(WAConnection)
const fetch = require('./lib/fetcher')
let fs = require('fs')
let yargs = require('yargs/yargs')
let os = require('os')
let figlet = require('figlet')
global.authfile = './session.json'
async function mulai() {
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
let caliph = new WAPI()
caliph.browserDescription = Browsers.appropriate('Firefox')
caliph.logger.level = opts.logger == true ? 'info' : opts.logger || 'warn'
caliph.browserDescription[0] = "Bot WhatsApp By @Caliph91"
var { currentVersion } = await fetch.json(`https://web.whatsapp.com/check-update?version=1&platform=web`)
caliph.version = currentVersion.split('.').map(a => parseInt(a)) || [2, 2140, 12]
console.log(color(figlet.textSync('WHATSAPP BOT', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'cyan'))
console.log(color('[ CREATED BY CALIPH ]'))
console.log(color('[ REPORT BUG ]', 'cyan'), color('https://clph.pw/reportbug', 'yellow'))
console.log(color('[ SCRIPT BOT ]', 'cyan'), color('https://clph.pw/scriptbot', 'yellow'))
if (opts.server) {
  require('./server')(caliph, process.env.PORT || 8080)
} else {
	
	caliph.on('qr', async () => {
console.log('Scan kode qr ini untuk menjalankan bot')
})
}
fs.existsSync(authfile) && caliph.loadAuthInfo(authfile)
	caliph.on('connecting', () => {
		console.log(color('[CLIENT]', 'cyan'), color('Connecting...', 'yellow'))
	})
	caliph.on('close', async ({ reason, isReconnecting }) => {
	console.log(color('[CLIENT]', 'cyan'), color(`Because ${reason} reconnecting : ${isReconnecting}`, 'yellow'))
	if (!isReconnecting && reason == 'invalid_session') {
           console.log(color('[CLIENT]', 'cyan'), color('Sesion Invalid, deleting session', 'red'))
            if (fs.existsSync(authfile)) {
                fs.unlinkSync(authfile)
            }
            process.exit()
	    mulai()
        }
	})
       function waktu(seconds) { 
seconds = Number(seconds); 
var d = Math.floor(seconds / (3600 * 24)); 
var h = Math.floor(seconds % (3600 * 24) / 3600); var m = Math.floor(seconds % 3600 / 60); 
var s = Math.floor(seconds % 60); 
var dDisplay = d > 0 ? d + (d == 1 ? " Hari,":" Hari,") : ""; 
var hDisplay = h > 0 ? h + (h == 1 ? " Jam,":" Jam,") : ""; 
var mDisplay = m > 0 ? m + (m == 1 ? " Menit,":" Menit,") : ""; 
var sDisplay = s > 0 ? s + (s == 1 ? " Detik,":" Detik") : ""; return dDisplay + hDisplay + mDisplay + sDisplay; 
}
      caliph.on('open', () => {
     console.log(color('[ CLIENT ]', 'cyan'), color('Connected...', 'green'))
      })
	await caliph.connect().then(async v => { 
        console.log(color(`[ CLIENT ]`, 'cyan'), color('WhatsApp Web Running On Version :'), color(caliph.version.join('.'), 'yellow'))
        console.log(color('[ MESSAGE ]', 'cyan'), color('Type #menu to sending menu!', 'green'))
        console.log(color('Notes :', 'cyan'), color('\ntolong jangan menghapus/mengganti nama author!\n\nPlease don\'t rename/delete author name!', 'yellow'))
       // console.log(`Nama Bot : ${caliph.user.name}\nID Bot : ${awesome('+'+caliph.user.jid.split('@')[0]).getNumber('international')}\nMode : ${selfmode ? 'Self Mode' : 'Public Mode'}\nHostname : ${os.hostname()}`)
		if (!fs.existsSync(authfile)) fs.writeFileSync(authfile, JSON.stringify(caliph.base64EncodedAuthInfo(), null, '\t'))
	// owner.map(a => caliph.reply(a + "@c.us", 'Bot Started.....'))
          if (opts.autobio || global.autobio) {
          setInterval(async () => {
              user = JSON.parse(fs.readFileSync('database/user/register.json', 'utf-8'))
               await caliph.setStatus(`Status : ${selfmode ? 'Self Mode' : 'Public Mode'} | Uptime ${waktu(process.uptime())} | User Registered : ${user.length} Users | Author : @caliph91 | Auto Update Bio After 1 Minute`)
             }, 60 * 1000)
          }
		})
    caliph.on('CB:action,,call', id => {
    require('./message/call')(caliph, id)
    })
    caliph.on('group-participants-update', async (anu) => {
	console.log(anu)
	require('./message/detect')(caliph, anu)
	})
	caliph.on('CB:action,,battery', json => {
      caliph.battery = Object.fromEntries(Object.entries(json[2][0][1]).map(v => [v[0], eval(v[1])]))
      console.log(color(`[CLIENT]`, 'cyan'), color('Battery Updated!', 'yellow'))
      console.log(caliph.battery)
      })
      caliph.on('message-delete', async (m) => {
      require('./message/antidelete')(caliph, m)
    })
    caliph.on('chat-update', async chatUpdate => {
    try {
     if (!chatUpdate.hasNewMessage) return   
     if (!chatUpdate.messages && !chatUpdate.count) return
    
 let msg = chatUpdate.messages.all()[0]
         if (!msg.key) return
	 if (!msg.message) return
     msg.message = msg.message.hasOwnProperty('ephemeralMessage') ? msg.message.ephemeralMessage.message : msg.message
       simple.smsg(caliph, msg)
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return 
	if (!msg.key.fromMe && selfmode) return
	if (msg.key.id.startsWith('XYZ0')) return
	if (autoread) await caliph.chatRead(msg.chat).catch(() => {})
    require('./message/caliph')(caliph, msg)
    } catch (e) {
    console.log(color('[ ERR ]', 'cyan'), color(e, 'red'))
    global.owner.map(async a => await caliph.sendMessage(a + '@c.us', 'Handler Error :\n\n'+require('util').format(e) + '\n\nClosed...', 'conversation'))
    process.exit()
    }
    })
    }
    async function _quickTest() {
  let test = await Promise.all([
    cp.spawn('ffmpeg'),
    cp.spawn('ffprobe'),
    cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    cp.spawn('convert'),
    cp.spawn('magick'),
    cp.spawn('gm'),
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm] = test
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm
  }
  console.log(global.support)
  require('./lib/sticker').support = s
  Object.freeze(global.support)
  }

mulai()
_quickTest()
