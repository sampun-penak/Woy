let handler = async (m, { conn, usedPrefix, command }) => {
  await conn.send3TemplateButtonImg(m.chat, global.API('xteam', '/randomimage/ero', {}, 'apikey'), 'wangy wangy', wm, '🏒 AGAIN 🏒', `${usedPrefix + command}`, '🎀 MENU 🎀', `${usedPrefix}menu`, '🛡 OWNER 🛡', `${usedPrefix}owner`, m)
}
handler.help = ['ero']
handler.tags = ['nsfw']
handler.command = /^(ero)$/i

handler.limit = true
handler.nsfw = true

module.exports = handler