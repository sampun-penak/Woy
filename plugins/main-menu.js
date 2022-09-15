let levelling = require('../lib/levelling')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
let jimp = require('jimp')
let PhoneNumber = require('awesome-phonenumber')
const defaultMenu = {
  before: `
┌─〔 %me 〕
├ *${ucapan()} %name*
│
├ Tersisa *%limit Limit*
├ Role *%role*
├ Level *%level (%exp / %maxexp)* [%xp4levelup]
├ %totalexp XP secara Total
│
├ Tanggal: *%week %weton, %date*
├ Tanggal Islam: *%dateIslamic*
├ Waktu: *%time*
│
├ Uptime: *%uptime (%muptime)*
├ Database: %rtotalreg dari %totalreg
│
├ Note :
├ *Ⓟ* = Premium
├ *Ⓛ* = Limit
└────
%readmore`.trim(),
  header: '┌─〔 %category 〕',
  body: '├ %cmd %islimit %isPremium',
  footer: '└────\n',
  after: `
*%npmname@^%version*
${'```%npmdesc```'}
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {

  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'rpg', 'xp', 'stiker', 'kerangajaib', 'quotes', 'admin', 'grup', 'anime', 'nsfw', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'asupan', 'database', 'quran', 'audio', 'jadibot', 'info', 'tanpakategori', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'UTAMA',
    'game': 'Game',
    'rpg': 'RPG',
    'xp': 'Exp & Limit',
    'sticker': 'Stiker',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'group': 'Grup',
    'anime': 'Anime',
    'nsfw': 'Nsfw',
    'premium': 'Premium',
    'internet': 'Internet',
    'anonymous': 'Anonymous Chat',
    'nulis': 'MagerNulis & Logo',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'fun': 'Fun',
    'asupan': 'Asupan',
    'database': 'Database',
    'vote': 'Voting',
    'absen': 'Absen',
    'quran': 'Al Qur\'an',
    'audio': 'Pengubah Suara',
    'jadibot': 'Jadi Bot',
    'info': 'Info',
    '': 'Tanpa Kategori',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'RPG'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'asupan') tags = {
    'asupan': 'Asupan'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al Qur\'an'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, age, money, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let umur = `*${age == '-1' ? 'Belum Daftar*' : age + '* Thn'}`
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    const wita = moment.tz('Asia/Makassar').format("HH:mm:ss")
    const wit = moment.tz('Asia/Jayapura').format("HH:mm:ss")
    const hariRaya = new Date('January 1, 2023 23:59:59')
    const sekarang = new Date().getTime()
    const Selisih = hariRaya - sekarang
    const jhari = Math.floor( Selisih / (1000 * 60 * 60 * 24));
    const jjam = Math.floor( Selisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    const mmmenit = Math.floor( Selisih % (1000 * 60 * 60) / (1000 * 60))
    const ddetik = Math.floor( Selisih % (1000 * 60) / 1000)
    const hariRayaramadan = new Date('April 21, 2023 23:59:59')
    const sekarangg = new Date().getTime()
    const lebih = hariRayaramadan - sekarangg
    const harii = Math.floor( lebih / (1000 * 60 * 60 * 24));
    const jamm = Math.floor( lebih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    const menitt = Math.floor( lebih % (1000 * 60 * 60) / (1000 * 60))
    const detikk = Math.floor( lebih % (1000 * 60) / 1000)
    const ultah = new Date('April 26, 2023 23:59:59')
    const sekarat = new Date().getTime() 
    const Kurang = ultah - sekarat
    const ohari = Math.floor( Kurang / (1000 * 60 * 60 * 24));
    const ojam = Math.floor( Kurang % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    const onet = Math.floor( Kurang % (1000 * 60 * 60) / (1000 * 60))
    const detek = Math.floor( Kurang % (1000 * 60) / 1000)
    const natal = new Date('December 25, 2022 23:59:59')
    const kapanatal = new Date().getTime() 
    const natalnya = natal - kapanatal
    const nhari = Math.floor( natalnya / (1000 * 60 * 60 * 24));
    const njam = Math.floor( natalnya % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    const nmenit= Math.floor( natalnya % (1000 * 60 * 60) / (1000 * 60))
    const mdetek = Math.floor( natalnya % (1000 * 60) / 1000)
    let pe = '```'
    let { premium, premiumTime } = global.db.data.users[m.sender]
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    global.jam = time
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      let judul = `${ucapan()}, ${name}`.trim()
      const sections = [
      {
        title: 'List Menu ' + data.namabot,
        rows: [
          { title: '「 💬 」› Semua Perintah',
          "description": "Menampilkan semua fitur dari bot",
          rowId: `${_p + command} all` },
          
          { title: '「 🎮 」› Game',
          "description": "Menampilkan fitur dari game",
          rowId: `${_p + command} game` },
          
          { title: '「 🌱 」› Rpg',
          "description": "Menampilkan fitur dari rpg ! ",
          rowId: `${_p + command} rpg` },
          
          { title: '「 📈 」› Exp & Limit',
         "description": "Menampilkan fitur dari xp",
          rowId: `${_p + command} xp` },
          
          { title: '「 🎫 」› Sticker',
          "description": "Menampilkan fitur dari sticker",
          rowId: `${_p + command} stiker` },
          
          { title: '「 🐚 」› Kerang Ajaib',
          "description": "Menampilkan fitur dari kerang ajaib",
          rowId: `${_p + command} kerangajaib` },
          
          { title: '「 📑 」› Quotes',
          "description": "Menampilkan fitur dari random teks",
          rowId: `${_p + command} quotes` },
          
          { title: '「 👥 」› Group',
          "description": "Menampilkan fitur dari group",
          rowId: `${_p + command} grup` },
          
          { title: '「 ⛩️ 」› Anime',
          "description": "Menampilkan fitur dari anime",
          rowId: `${_p + command} anime` },
          
          { title: '「 🔞 」› Nsfw',
          "description": "Menampilkan fitur dari nsfw",
          rowId: `${_p + command} nsfw` },
          
          { title: '「 🌟 」› Premium',
          "description": "Menampilkan fitur dari premium",
          rowId: `${_p + command} premium` },
          
          { title: '「 💻 」› Internet',
          "description": "Menampilkan fitur dari internet",
          rowId: `${_p + command} internet` },
          
          { title: '「 🎭 」›  Anonymous Chat',
          "description": "Menampilkan fitur dari anonymous chat",
          rowId: `${_p + command} anonymous` },
          
          { title: '「 📝 」› Nulis & Logo',
          "description": "Menampilkan fitur dari Nulis & Logo",
          rowId: `${_p + command} nulis` },
          
          { title: '「 📩 」› Downloader',
          "description": "Menampilkan fitur dari download",
          rowId: `${_p + command} downloader` },
          
          { title: '「 🧰 」› Tools',
          "description": "Menampilkan fitur dari tools",
          rowId: `${_p + command} tools` },
          
          { title: '「 🧩 」› Fun',
          "description": "Menampilkan fitur dari fun",
          rowId: `${_p + command} fun`},
          
          { title: '「 🦸‍♀️ 」› Asupan',
          "description": "Menampilkan fitur dari Asupan",
          rowId: `${_p + command} asupan`},
          
          { title: '「 📂 」› Database',
          "description": "Menampilkan fitur dari Database",
          rowId: `${_p + command} database` },
          
          { title: '「 🗳️ 」› Vote & Absen',
          "description": "Menampilkan fitur dari Vote & Absen",
          owId: `${_p + command} vote` },
          
          { title: "「 ☪️ 」› Al-Qur\'an",
          "description": "Menampilkan fitur dari Al-Qur\'an",
          rowId: `${_p + command} quran` },
          
          { title: '「 🎙️ 」› Pengubah Suara',
          "description": "Menampilkan fitur dari Pengubah Suara",
          rowId: `${_p + command} audio` },
          
          { title: '「 🤖 」› Jadi Bot',
          "description": "Menampilkan fitur dari Jadi Bot",
          rowId: `${_p + command} jadibot` },
          
          { title: '「 ⚡️ 」› Info',
          "description": "Menampilkan fitur dari Info",
          rowId: `${_p +command} info` },
          
          { title: '「 ❓ 」› Tanpa Kategori',
          "description": "Menampilkan fitur dari Tanpa Kategori",
          rowId: `${_p + command} tanpakategori` },
          
          { title: '「 👩🏻‍💻 」› Owner',
          "description": "Menampilkan fitur dari Owner",
          owId: `${_p + command} owner` },
        ]
      }
    ]
    const listMessage = {
      text: `
●────━───༺༻───━────●
        *《 BOT INFO 》*
⚘ *𝐁𝐨𝐭 𝐍𝐚𝐦𝐞 : TheBotz-Official*
⚘ *𝐂𝐫𝐞𝐚𝐭𝐨𝐫    : Mimim-Official*
⚘ *𝐓𝐚𝐧𝐠𝐠𝐚𝐥   : ${date}*  
⚘ *𝐉𝐚𝐦        : ${time} WIB*
⚘ *𝐒𝐭𝐚𝐭𝐮𝐬     : 「 ${mode} 」*
⚘ *𝐏𝐫𝐞𝐟𝐢𝐱      : 「 MULTI PREFIX 」*
●────━───༺༻───━────●

>> *𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐎𝐰𝐧𝐞𝐫 𝐁𝐨𝐭* <<
*http://wa.me/6283816446896*

┏━━〔 ıll *INFO USER* llı 〕━㉿
⌬ 𝐍𝐚𝐦𝐚     : ${name}
⌬ 𝐋𝐢𝐦𝐢t     : ${limit}
⌬ 𝐒𝐭𝐚𝐭𝐮𝐬     : ${global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) ? 'Owner' : 'Users'}
⌬ 𝐏𝐫𝐞𝐦𝐢𝐮𝐦   : ${premium ? `${conn.msToDate(premiumTime - new Date() * 1)}` : 'Gratisan'}
┗━━━━━━━━━━━━━㉿
┏━━〔 ıll *STATUS INFO* llı 〕━㉿
⌬ 𝐓𝐨𝐭𝐚𝐥 𝐔𝐬𝐞𝐫  : ${rtotalreg} dari ${totalreg}
⌬ 𝐓𝐞𝐫𝐬𝐢𝐬𝐚     : ${limit} Limit
⌬ 𝐑𝐨𝐥𝐞       : ${role}
⌬ 𝐋𝐞𝐯𝐞𝐥      : *${level}*
⌬ 𝐑𝐮𝐧𝐭𝐢𝐦𝐞   : *${uptime}*
┗━━━━━━━━━━━━━㉿
┏━━〔 ıll *INFO WAKTU* llı 〕━㉿
❏ 𝐇𝐀𝐑𝐈 𝐍𝐀𝐓𝐀𝐋 :
*${nhari} Hari ${njam} Jam ${nmenit} Menit ${mdetek} Detik*
❏ 𝐓𝐀𝐇𝐔𝐍 𝐁𝐀𝐑𝐔 :
*${jhari} Hari ${jjam} Jam ${mmmenit} Menit ${ddetik} Detik*
❏ 𝐑𝐀𝐌𝐀𝐃𝐇𝐀𝐍 :
*${harii} Hari ${jamm} Jam ${menitt} Menit ${detikk} Detik*
❏ 𝐔𝐋𝐓𝐀𝐇 𝐎𝐖𝐍𝐄𝐑 :
*${ohari} Hari ${ojam} Jam ${onet} Menit ${detek} Detik*
┗━━━━━━━━━━━━━㉿
*Official Bot By @${'0'.split('@')[0]}* 
 *Powered By @${'6283816446896'.split('@')[0]}*`,
 
      footer: wm,
      title: judul,
      buttonText: "Klik Disini",
      sections
    }
    return conn.sendMessage(m.chat, listMessage, { quoted: fake, mentions: await conn.parseMention(judul), contextInfo: { forwardingScore: 99999, isForwarded: true }})
    
    }


    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? ' *Ⓛ* ' : '')
                .replace(/%isPremium/g, menu.premium ? ' *Ⓟ* ' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, umur, money, age, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send3TemplateButtonImg(m.chat, await genProfile(conn, m), text.trim(), wm, `🛡 OWNER 🛡`, `${_p}owner`, `🎉 THANKSTO 🎉`, `${_p}tqto`, `💰 DONASI 💰`, `${_p}donasi`, m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(m)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat dinihari"
  if (time >= 4) {
    res = "Selamat pagi"
  }
  if (time > 10) {
    res = "Selamat siang"
  }
  if (time >= 15) {
    res = "Selamat sore"
  }
  if (time >= 18) {
    res = "Selamat malam"
  }
  return res
}

//By fahri adison = https://github.com/FahriAdison

 async function genProfile(conn, m) {
    font = await jimp.loadFont('./name.fnt'),
    mask = await jimp.read('https://i.imgur.com/552kzaW.png'),
    res = JSON.parse(fs.readFileSync('./api/thumb.json')),
    welcome = await jimp.read(res.getRandom()),
    avatar = await jimp.read(await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')),
    status = (await conn.fetchStatus(m.sender).catch(console.log) || {}).status?.slice(0, 30) || 'Not Detected'

    await avatar.resize(460, 460)
    await mask.resize(460, 460)
    await avatar.mask(mask)
    await welcome.resize(welcome.getWidth(), welcome.getHeight())

    await welcome.print(font, 550, 180, 'Name:')
    await welcome.print(font, 650, 255, m.pushName.slice(0, 25))
    await welcome.print(font, 550, 340, 'About:')
    await welcome.print(font, 650, 415, status)
    await welcome.print(font, 550, 500, 'Number:')
    await welcome.print(font, 650, 575, PhoneNumber('+' + m.sender.split('@')[0]).getNumber('international'))
    return await welcome.composite(avatar, 50, 170).getBufferAsync('image/png')
}
