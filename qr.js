const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Mbuvi_Tech,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function MBUVI_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Mbuvi_Tech = Mbuvi_Tech({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Mbuvi_Tech.ev.on('creds.update', saveCreds)
			Qr_Code_By_Mbuvi_Tech.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Mbuvi_Tech.sendMessage(Qr_Code_By_Mbuvi_Tech.user.id, { text: 'SPIDEY~' + b64data });
	
				   let MBUVI_MD_TEXT = `
╔                    const GIFTED_TEXT = `
╭─═━⌬━═─⊹⊱✦⊰⊹─═━⌬━═─ 
╎   『 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 』   
╎  ✦ Alpha_King_Tech
╎  ✦ ZAIBIKING-JOSHKING
╰╴╴╴╴

▌   『 🔐 𝐒𝐄𝐋𝐄𝐂𝐓𝐄𝐃 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 』   
▌  • Session ID:  
▌  ⛔ [ Please set your SESSION_ID ] 

╔═
╟   『 𝐂𝐎𝐍𝐓𝐀𝐂𝐓 & 𝐒𝐔𝐏𝐏𝐎𝐑𝐓 』  
╟  🎥 𝐘𝐨𝐮𝐓𝐮𝐛𝐞: +263 71 803 6108
╟  👑 𝐎𝐰𝐧𝐞𝐫: +263 71 640 4156
╟  💻 𝐑𝐞𝐩𝐨: https://github.com/ALPHA-KING-TECH-OFC
╟  📢 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥:ASK ONWER
╰  
✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦  
   𝐄𝐍𝐉𝐎𝐘 
✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦  
______________________________
★彡[ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ sᴛᴀʀ ᴛʜᴇ ʀᴇᴘᴏ!]彡★

> Musandinetse ana mha--
🌹 𝗦𝗽𝗲𝗰𝗶𝗮𝗹 𝗔𝗰𝗸𝗻𝗼𝘄𝗹𝗲𝗱𝗴𝗲𝗺𝗲𝗻𝘁: 𝗠𝗬 𝗧𝗘𝗔𝗠 🌹  

━━━━━━━━━━━━━━━━━━━


---

Don't Forget To Give Star⭐ To My Repo
______________________________`;
	 await Qr_Code_By_Mbuvi_Tech.sendMessage(Qr_Code_By_Mbuvi_Tech.user.id,{text:MBUVI_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Mbuvi_Tech.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					MBUVI_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await MBUVI_MD_QR_CODE()
});
module.exports = router
