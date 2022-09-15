let handler = async (m, { conn, text, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
            dfail('admin', m, conn)
            throw 0
        }
    }
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    if (id in conn.absen) {
        await conn.send2Button(m.chat, `masih ada sesi absen berlangsung!`, wm, '📺 HAPUS ABSEN 📺', `.hapusabsen`, '📝 CEK ABSEN 📝', '.cekabsen', m)
        throw false
    }
    conn.absen[id] = [
        await conn.sendButton(m.chat, `sesi absen dimulai!`, wm, '🗿 HADIR 🗿', `.absen`, m),
        [],
        text
    ]
}
handler.help = ['+absen [teks]']
handler.tags = ['absen']
handler.command = /^(start|mulai|\+)(attendance|absen)$/i

module.exports = handler