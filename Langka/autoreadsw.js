
const fs = require('fs')
const chalk = require('chalk')
const { getContentType } = global.baileys
const { getBuffer } = require('./langka/functions')

module.exports = async(Al, msg, m) => {
if (global.autoreadsw && (msg.key.remoteJid === 'status@broadcast')) {
//if (msg.key.participant == global.owner) return
Al.readMessages([msg.key])
let mt = getContentType(msg.message)
let swdel = `Status dari @${msg.key.participant.split('@')[0]} Telah dihapus`
if (/protocolMessage/i.test(mt)) return Al.sendMessage(global.owner, {text: swdel, mentions: [msg.key.participant]}, {quoted:m})
if (/(imageMessage|audioMessage|videoMessage|extendedTextMessage)/i.test(mt)) {
let laporsw = `Melihat story dari @${msg.key.participant.split('@')[0]} ${(mt == 'extendedTextMessage') ? '\nStory Teks Berisi : '+msg.message.extendedTextMessage.text : (mt == 'imageMessage') ? '\nStory Gambar dengan Caption : '+msg.message.imageMessage.caption : (mt == 'audioMessage') ? '\nStory Audio dengan Caption : '+msg.message.audioMessage.caption : (mt == 'videoMessage') ? '\nStory Video dengan Caption : '+msg.message.videoMessage.caption : '\nTidak diketahui cek aja langsung.'}`

Al.copyNForward(global.owner, m, {text: laporsw, mentions: [msg.key.participant]}, {quoted:m})

Al.sendMessage(global.owner, {text: laporsw, mentions: [msg.key.participant]}, {quoted: m })

}
}
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.greenBright("[ UPDATE ]"), chalk.whiteBright(`${__filename}`) )
delete require.cache[file]
require(file)
})