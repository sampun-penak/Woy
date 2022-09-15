let handler = async (m, { conn, usedPrefix }) => { 
      conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'INR',
      amount1000: 1339889,
      requestFrom: m.sender,
      noteMessage: {
      extendedTextMessage: {
      text: `
╭─「 Donasi • Dana 」
│ • XL [087848115476]
│ • AXIS  [083816446896]
│ • DANA [087848115476]
│ • GOPAY [087848115476]
│ • OVO [087848115476]
│ • MOTION PAY [087848115476]
│ • SAWERIA  [https://saweria.co/mimimproject]
╰────
╭─「 *NOTE* 」
│ > Ingin donasi? Wa.me/6283816446896
│ _Hasil donasi akan digunakan buat sewa_
│ _atau beli *RDP/VPS* agar bot bisa jalan_
│ _24jam tanpa kendala_
╰────
`,
      contextInfo: {
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})
}
handler.help = ['donasi']
handler.tags = ['about']
handler.command = /^dona(te|si)$/i

module.exports = handler
