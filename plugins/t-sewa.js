let handler = async (m, { conn }) => {
  let fetch = require('node-fetch')
  let a = await conn.profilePictureUrl(conn.user.jid, 'image').catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png")
  let b = await conn.profilePictureUrl(owner[0]+'@s.whatsapp.net', 'image').catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png")
  let c = pickRandom([a, b])
  let d = await fetch(c).then(a => a.buffer())
  let prepare = await require('@adiwajshing/baileys').generateWAMessageFromContent(m.key.remoteJid,{listMessage:{
  title: `${await conn.getName(conn.user.jid)}`,
  description: ` *• SEWA BOT & UP TO PREMIUM •*
        
1. Grup / 30 Hari
Rp. 20,000 Dana
Rp. 35,000 Pulsa
2. Premium / 30 Hari
Rp. 25,000 Dana
Rp. 30,000 Pulsa
3. Premium + Grup / 30 Hari
Rp. 45,000 Dana
Rp. 65,000 Pulsa
wa.me/${owner[0]}
*Bukan Bot!!!*
*Owner ${conn.user.name}*
`,
  buttonText: 'Harga Bisa Nego Kack 😉',
  listType: 2,
  productListInfo: {
  productSections: [{
  title:'Klik untuk order',
  products:[{productId:'7993088630761494'}]}],
  headerImage: { productId: '7993088630761494', 
  jpegThumbnail: d },
  businessOwnerJid: `${owner[0]}@s.whatsapp.net`
  },
  footerText: 'https://github.com/sampun-penak',
  }},{})
  conn.relayMessage(prepare.key.remoteJid,prepare.message,{messageId:prepare.key.id})
}
handler.help = ['sewa' , 'premium']
handler.tags = ['main']
handler.command = /^(sewa|rent(this)?(bot)?)$/i

module.exports = handler

function pickRandom(list) {
        return list[Math.floor(Math.random() * list.length)]
    }