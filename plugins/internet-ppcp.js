let fetch = require("node-fetch")

let handler = async (m, { conn }) => {
let res = await fetch('https://api.xteam.xyz/randomimage/ppcouple?APIKEY=NezukoTachibana281207')
m.reply(data.wait)

//let res = await fetch(API('lol', '/api/random/ppcouple', { }, 'apikey')
let json = await res.json()

conn.sendFile(m.chat, json.result.male, 'ppcowo.png', '👳 COWOK 👳', m, false,{ contextInfo: { forwardingScore: 999, isForwarded: true }})

conn.sendFile(m.chat, json.result.female, 'ppcewe.png', '🧕 CEWEK 🧕', m,false, { contextInfo: { forwardingScore: 999, isForwarded: true }})

}
handler.help = ['ppcouple', 'ppcp']
handler.tags = ['internet', 'anime']
handler.command = /^(pp(cp|couple))$/i
handler.limit = true

module.exports = handler