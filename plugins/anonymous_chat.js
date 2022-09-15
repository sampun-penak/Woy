//const { MessageType } = require("@adiwajshing/baileys")
let fetch = require('node-fetch')
async function handler(m, { command, usedPrefix }) {
    if (!db.data.settings[this.user.jid].anon) throw `Fitur ini tidak aktif`
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        //case 'next':
        //case 'skip':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) {
                await this.sendButton(m.chat, '_Kamu tidak sedang berada di anonymous chat_', 'Mau cari patner chating?', '⚡ START ⚡', `${usedPrefix}start`, m)
                throw false
            }
            this.send2Button(m.chat, '_Kamu meninggalkan room anonymous chat_', 'Mau main anonymous lagi?', '😋 YA 😋', `${usedPrefix}start`, '😌 TIDAK 😌', `${usedPrefix}say Ok terimakasih telah menggunakan Anonymous Chat Bot, kalo kamu mau main lagi bisa klik button *😋 YA 😋* di atas atau bisa ketik *.start*!`, m)
            let other = room.other(m.sender)
            if (other) await this.sendButton(other, '_Partner meninggalkan chat_', 'Mau cari patner chat lagi?', '😋 YA 😋', `${usedPrefix}start`, m)
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) {
                await this.sendButton(m.chat, '_Kamu masih berada di dalam anonymous chat_', 'Mau keluar?', '😋 YA 😋', `${usedPrefix}leave`, m)
                throw false
            }
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.sendButton(room.a, '_Partner ditemukan!_', 'Silahkan chatingan🤗', 'Halo', 'Halo 👋', m)
                room.b = m.sender
                room.state = 'CHATTING'
                await this.sendButton(room.b, '_Partner ditemukan!_', 'Silahkan chatingan🤗', 'Hai', 'Hai 👋', m)
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.sendButton(m.chat, '_Menunggu partner..._', 'Kalo bosan menunggu, klik di bawah untuk keluar!', '🐤 KELUAR 🐤', `${usedPrefix}leave`, m)
            }
            break
        }
    }
}
handler.help = ['start', 'leave']
handler.tags = ['anonymous']
handler.command = ['start', 'leave']//, 'next', 'skip']

handler.private = true

module.exports = handler
