let handler = async (m, { conn, usedPrefix, command }) => {
    let vid = 'https://api.zacros.my.id/asupan/random'
conn.sendButtonVid(m.chat, vid, '(~‾▿‾)~', wm, '🍆 LANJUT 🍆', `${usedPrefix + command}`, m)
}
handler.help = ['asupan']
handler.tags = ['fun']
handler.premium = true,
handler.command = /^(asupan)$/i

module.exports = handler
