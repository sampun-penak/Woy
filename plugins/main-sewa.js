let fetch = require('node-fetch')

let handler = async (m, { conn }) => {
    pepe = 'https://telegra.ph/file/74d983dd46e8bac065b48.jpg'
    baper = await fetch(pepe).then(a => a.buffer())
    let listMessage = {
        "title": "◈ Made by Mimim-Official",
        "description": `
┌「 *Sewa bot* 」
│     
├ 1 Grup / 30 Hari
├ Rp. 20,000 Gopay
├ Rp. 35,000 Pulsa XL Axiata
│
├ 1 Premium / 30 Hari
├ Rp. 15,000 Gopay
├ Rp. 30,000 Pulsa XL
│
├ tertarik? hubungi: 
├ @6283816446896 (Mimim-Official)
└────
`.trim(),
        "listType": "PRODUCT_LIST",
        "productListInfo": {
            "productSections": [
                {
                    "title": "klik untuk melihat harga",
                    "products": [
                        {
                            "productId": "7993088630761494"
                        }
                    ]
                }
            ],
            "headerImage": {
                "productId": "7993088630761494",
                "jpegThumbnail": baper
            },
            "businessOwnerJid": "6283816446896@s.whatsapp.net"
        },
        "footerText": "https://wa.me/c/6283816446896\n\nowner number : wa.me/6283816446896"
    }
    conn.sendMessage(m.chat, listMessage, 'listMessage', { quoted: m, contextInfo: { mentionedJid: conn.parseMention(listMessage.description) } })
}
handler.help = ['sewabot', 'premium']
handler.tags = ['main']
handler.command = /^(sewabot|premium)$/i

module.exports = handler