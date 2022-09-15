let handler = async (m, { conn, text, usedPrefix, command }) => {
   let ar = ['dog', 'cat', 'panda', 'fox', 'red_panda', 'koala', 'bird', 'raccoon', 'kangaroo']
   let ras = `Halo Kak @${m.sender.split('@')[0]}`
    let sel = `Pilih Jenis Animal/Hewan Dibawah Ya Kak!`
    let rs = `Pilih Disini`
const sections = [ {
	title: `Silahkan Pilih Animal Favorit-mu!`,
	rows: [
	{title: `🐶 DOG 🐶`, rowId: `.animal dog `},//, description: ``},
        {title: `🐯 CAT 🐯`, rowId: `.animal cat `},//, description: ``},
	{title: `🐼 PANDA 🐼`, rowId: `.animal panda`},//, description: ``},
        {title: `🐼 RED PANDA 🐼`, rowId: `.animal red_panda `},//, description: ``},
        {title: `🐣 FOX 🐣`, rowId: `.animal fox`},//, description: ``},
	{title: `🦅 KOALA 🦅`, rowId: `.animal koala`},//, description: ``},
        {title: `🐦 BIRD 🐦`, rowId: `.animal bird `},//, description: ``},
        {title: `🐴 RACCOON 🐴`, rowId: `.animal raccoon`},//, description: ``},
	{title: `🦘 KANGAROO 🦘`, rowId: `.animal kangaroo`},//, description: ``},
        ]
 } ]

const listMessage = {
  text: sel,
  mentions: [m.sender],
  footer: wm,
  title: ras,
  buttonText: rs,
  sections
}

  if(!text) return conn.sendMessage(m.chat, listMessage, { quoted: m })
  if (!ar.includes(text)) throw conn.sendMessage(m.chat, listMessage, { quoted: m })
  let res = await fetch(API('https://some-random-api.ml', '/animal/' + text))
  if (!res.ok) throw `${res.status} ${res.statusText}`
  let json = await res.json()
  if (!json.image) throw json
  await conn.sendStimg(m.chat, json.image, m, { packname: packname, author: author })
  await conn.sendMedia(m.chat, json.image, m, {jpegThumbnail: await(await fetch(json.image)).buffer(), caption: `${json.fact}`})
}
handler.help = ['animal'].map((v) => v + ' <opsi>')
handler.tags = ['internet']
handler.command = /^(animal|animalfact)$/i

module.exports = handler
