let fs = require('fs')
let chalk = require('chalk')
let { color } = require('../lib/color')
module.exports = async function connect(caliph, m) {
     let revoke = JSON.parse(fs.readFileSync('./database/chat/antidelete.json').toString())
        if (m.key.remoteJid == 'status@broadcast') return 
    console.log(color(`[CLIENT]`, 'cyan'), color(`${caliph.getName(m.participant)} Deleting Message ${m.key.remoteJid.endsWith('g.us') ? `On ${caliph.getName(m.key.remoteJid)}` : ''} With MESSAGE_ID :`, 'yellow'), color(m.key.id, 'red'))
        if (!revoke.includes(m.key.remoteJid)) return
    let buttons = [
  {buttonId: '/antidelete disable', buttonText: {displayText: 'OFF ANTIDELETE'}, type: 1}
]
const buttonsMessage = {
    contentText: `Terdeteksi @${m.participant.split('@')[0]} Telah Menghapus Pesan`.trim(),    
footerText:`Rikka-Bot By Caliph | © ${new Date().getFullYear()}`,
    buttons: buttons,
    headerType: "EMPTY"
}
const sendMsg = await caliph.prepareMessageFromContent(m.key.remoteJid,{buttonsMessage},{ quoted: m.message, contextInfo: { mentionedJid: [m.participant] }, sendEphemeral: true})

await caliph.relayWAMessage(sendMsg)
caliph.forwardMessage(m.key.remoteJid, m.message, false).catch(e => console.log(e, m))
 }
 
 
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update './message/antidelete.js'"))
  delete require.cache[file]
  require(file)
})
