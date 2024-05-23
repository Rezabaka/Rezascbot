
const fs = require('fs')
const chalk = require('chalk')

module.exports = async(Al, json) => {
const { from, id, status } = json[0]
let virus = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "@s.whatsapp.net" } : {})}, message: {contactMessage: {displayName: "Winn WhatsApp ©️", vcard: "BEGIN:VCARD\nVERSION:3.0\nN:Support;WhatsApp;;;\nFN:Winn WhatsApp ©️\nORG:Winn WhatsApp ©️\nTITLE:\nitem1.TEL;waid=+6282143067466:+6282143067466\nitem1.X-ABLabel:Ponsel\nX-WA-BIZ-NAME:Winn WhatsApp ©️\nEND:VCARD"}}}
try {
if (global.anticall && status == 'offer') {
const stanza = {
tag: 'call',
attrs: {
from: Al.user.id,
to: from,
id: Al.generateMessageTag(),
},
content: [
{
tag: 'reject',
attrs: {
'call-id': id,
'call-creator': from,
count: '0',
},
content: undefined,
},
],
}
await Al.query(stanza)
await Al.sendMessage(from, {text: `*AUTO REJECT PANGGILAN*\n\nTerdeteksi Panggilan Dari @${from.split('@')[0]}\nAnda di blokir karna telah menelfon bot!`, mentions: [from] }, {quoted: virus})
await Al.updateBlockStatus(from, 'block')
if (from !== global.owner) return Al.sendMessage(global.owner, {text: `Terdeteksi @${from.split('@')[0]} telah menelfon bot`, mentions: [from]}, {quoted: global.f1('Notifikasi Panggilan', '')})
}
} catch (e){console.log(e)}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.greenBright("[ UPDATE ]"), chalk.whiteBright(`${__filename}`) )
delete require.cache[file]
require(file)
})