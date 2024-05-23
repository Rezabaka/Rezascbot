
const chalk = require('chalk');
const fs = require('fs');
const axios = require('axios');
const moment = require('moment-timezone');
const util = require('util');
const Jimp = require('jimp');
const ytdl = require('ytdl-core');
const formData = require('form-data');
const { fromBuffer } = require('file-type');

const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)
global.unixTimestampSeconds = unixTimestampSeconds

global.generateMessageTag = (epoch) => {
let tag = (0, global.unixTimestampSeconds)().toString();
if (epoch)
tag += '.--' + epoch;
return tag;
}

global.processTime = (timestamp, now) => {
return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

global.getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`
}

global.getBuffer = async (url, options) => {
try {
options ? options : {}
const res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (err) {
return err
}
}

global.fetchJson = async (url, options) => {
try {
options ? options : {}
const res = await axios({
method: 'GET',
url: url,
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
},
...options
})
return res.data
} catch (err) {
return err
}
}

global.delay = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms));
}

global.isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

global.getTime = (format, date) => {
if (date) {
return moment(date).locale('id').format(format)
} else {
return moment.tz('Asia/Jakarta').locale('id').format(format)
}
}

global.formatDate = (n, locale = 'id') => {
let d = new Date(n)
return d.toLocaleDateString(locale, {
weekday: 'long',
day: 'numeric',
month: 'long',
year: 'numeric',
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
}

global.tanggal = (numer) => {
myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum’at','Sabtu']; 
var tgl = new Date(numer);
var day = tgl.getDate()
bulan = tgl.getMonth()
var thisDay = tgl.getDay(),
thisDay = myDays[thisDay];
var yy = tgl.getYear()
var year = (yy < 1000) ? yy + 1900 : yy; 
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
return `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}

global.jsonformat = (string) => {
return JSON.stringify(string, null, 2)
}

global.format = function(...args) {
return util.format(...args)
}

global.logic = (check, inp, out) => {
if (inp.length !== out.length) throw new Error('Input and Output must have same length')
for (let i in inp)
if (util.isDeepStrictEqual(check, inp[i])) return out[i]
return null
}

global.generateProfilePicture = async (buffer) => {
const jimp = await Jimp.read(buffer)
const min = jimp.getWidth()
const max = jimp.getHeight()
const cropped = jimp.crop(0, 0, min, max)
return {
img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
}
}

global.bytesToSize = (bytes, decimals = 2) => {
if (bytes === 0) return '0 Bytes';
const k = 1024;
const dm = decimals < 0 ? 0 : decimals;
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const i = Math.floor(Math.log(bytes) / Math.log(k));
return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

global.getSizeMedia = (path) => {
return new Promise((resolve, reject) => {
if (/http/.test(path)) {
axios.get(path)
.then((res) => {
let length = parseInt(res.headers['content-length'])
let size = global.bytesToSize(length, 3)
if(!isNaN(length)) resolve(size)
})
} else if (Buffer.isBuffer(path)) {
let length = Buffer.byteLength(path)
let size = global.bytesToSize(length, 3)
if(!isNaN(length)) resolve(size)
} else {
reject('error gatau apah')
}
})
}
global.randomNomor = function(min, max = null){
if (max !== null) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
} else {
return Math.floor(Math.random() * min) + 1
}
}

global.pickRandom = function(arr){
return arr[Math.floor(Math.random() * arr.length)]
}

global.findAdmin = (arr) => {
return arr.filter((v) => v.admin !== null).map((i) => i.id)
}

global.texted = (type, text) => {
switch (type) {
case 'bold':
return '*' + text + '*'
break
case 'italic':
return '_' + text + '_'
break
case 'monospace':
return '```' + text + '```'
}
}

global.clockString = function(ms){
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

global.msToTime = function(ms){
var milliseconds = parseInt((ms % 1000) / 100),
seconds = Math.floor((ms / 1000) % 60),
minutes = Math.floor((ms / (1000 * 60)) % 60),
hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
let h = (hours < 10) ? '0' + hours : hours
let m = (minutes < 10) ? '0' + minutes : minutes
let s = (seconds < 10) ? '0' + seconds : seconds
return h + ':' + m + ':' + s
}

global.runtime = function(seconds) {
seconds = Number(seconds);
var d = Math.floor(seconds / (3600 * 24));
var h = Math.floor(seconds % (3600 * 24) / 3600);
var m = Math.floor(seconds % 3600 / 60);
var s = Math.floor(seconds % 60);
var dDisplay = d > 0 ? d + (d == 1 ? ' hari, ' : ' hari, ') : '';
var hDisplay = h > 0 ? h + (h == 1 ? ' jam, ' : ' jam, ') : '';
var mDisplay = m > 0 ? m + (m == 1 ? ' menit, ' : ' menit, ') : '';
var sDisplay = s > 0 ? s + (s == 1 ? ' detik' : ' detik') : '';
return dDisplay + hDisplay + mDisplay + sDisplay;
}

global.formatNumber = function(integer){
let numb = parseInt(integer)
return Number(numb).toLocaleString().replace(/,/g, '.')
}

global.sort = function(property, ascending = true){
if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

global.toNumber = function(property, _default = 0){
if (property) return (a, i, b) => {
return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
}
else return a => a === undefined ? _default : a
}

global.enumGetKey = function(a){
return a.jid
}

global.h2k = (number) => {
var SI_POSTFIXES = ["", " Ribu", " Juta", " Miliar", " Triliun", " P", " E"]
//var SI_POSTFIXES = ["", " K", " M", " G", " T", " P", " E"]
var tier = Math.log10(Math.abs(number)) / 3 | 0
if(tier == 0) return number
var postfix = SI_POSTFIXES[tier]
var scale = Math.pow(10, tier * 3)
var scaled = number / scale
var formatted = scaled.toFixed(1) + ''
if (/\.0$/.test(formatted))
formatted = formatted.substr(0, formatted.length - 2)
return formatted + postfix
}

global.FileSize = (number) => {
var SI_POSTFIXES = ["B", " KB", " MB", " GB", " TB", " PB", " EB"]
var tier = Math.log10(Math.abs(number)) / 3 | 0
if(tier == 0) return number
var postfix = SI_POSTFIXES[tier]
var scale = Math.pow(10, tier * 3)
var scaled = number / scale
var formatted = scaled.toFixed(1) + ''
if (/\.0$/.test(formatted))
formatted = formatted.substr(0, formatted.length - 2)
return formatted + postfix
}

global.ytDownloadMp3 = async function(url){
return new Promise((resolve, reject) => {
try {
const id = ytdl.getVideoID(url)
const yutub = ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`).then((data) => {
let pormat = data.formats
let audio = []
let video = []
for (let i = 0; i < pormat.length; i++) {
if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
let aud = pormat[i]
audio.push(aud.url)
}
}
const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
const result = {
creator: 'Lyosh',
title: title,
thumb: thumb,
channel: channel,
published: published,
views: views,
url: audio[0]
}
resolve(result)
})
return(yutub)
} catch (error) {
reject(error)
console.log(error)
}
})
}

global.ytDownloadMp4 = async function(url){
return new Promise((resolve, reject) => {
try {
const id = ytdl.getVideoID(url)
const yutub = ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`).then((data) => {
let pormat = data.formats
let video = []
for (let i = 0; i < pormat.length; i++) {
if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
let vid = pormat[i]
video.push(vid.url)
}
}
const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
const result = {
creator: 'Lyosh',
title: title,
thumb: thumb,
channel: channel,
published: published,
views: views,
url: video[0]
}
resolve(result)
})
return(yutub)
} catch (error) {
reject(error)
console.log(error)
}
})
}

global.TikTok = async(query) => {
let response = await axios("https://lovetik.com/api/ajax/search", {
method: "POST",
data: new URLSearchParams(Object.entries({ query })),
});

let clean = (data) => {
let regex = /(<([^>]+)>)/gi;
data = data.replace(/(<br?\s?\/>)/gi, " \n");
return data.replace(regex, "");
};

async function shortener(url) {
return url;
}

let result = {
creator: 'Lyosh',
title: clean(response.data.desc),
author: clean(response.data.author),
nowm: await shortener((response.data.links[0].a || "").replace("https", "http")),
watermark: await shortener((response.data.links[1].a || "").replace("https", "http")),
audio: await shortener((response.data.links[2].a || "").replace("https", "http")),
thumbnail: await shortener(response.data.cover)
}
return result;
}

global.telegraPH = async (Path) => 
new Promise(async (resolve, reject) => {
if (!fs.existsSync(Path)) return reject(new Error("File not Found"));
try {
const form = new formData();
form.append("file", fs.createReadStream(Path));
const data = await axios({
url: "https://telegra.ph/upload",
method: "POST",
headers: {
...form.getHeaders(),
},
data: form,
});
return resolve("https://telegra.ph" + data?.data[0]?.src);
} catch (err) {
return reject(new Error(String(err)));
}
});

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.greenBright("[ UPDATE ]"), chalk.whiteBright(`${__filename}`) )
delete require.cache[file]
require(file)
})