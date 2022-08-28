import makeWASocket,{useSingleFileAuthState,DisconnectReason} from '@adiwajshing/baileys'
import{Boom} from '@hapi/boom'
import cfonts from 'cfonts'
const{say}=cfonts
import fs from 'fs'
let bot='Virtex-BOT'
let botname='Reyna'
let wm='Created by Yusuf Expert'
let ownername='Yusuf Expert'
let ownerig='yusuf.expert'
const{state,saveState}=useSingleFileAuthState(`./yusuf.json`)
function del(i){
try{fs.unlinkSync(i);
cfonts.say(`Menghapus file: ${i}`,{font:'console',align:'left',colors:['green']})
}catch(err){
cfonts.say(`${botname}: File ${i} sudah dihapus`,{font:'console',align:'left',colors:['red']})
}}
cfonts.say(bot,{font:'chrome',align:'center',colors:['red']});
setTimeout(function(){cfonts.say(`${bot} by ${ownername}\nIG: @${ownerig}`,{font:'console',align:'center',gradient:['red','magenta']})},1500)
function startBot(){
setTimeout(function(){
const sock=makeWASocket.default({
printQRInTerminal:true,
auth:state,
browser:[`${bot} By ${ownername}`,'Safari','1.0.0']});
sock.ev.on("creds.update",saveState);
sock.ev.on("connection.update",(update)=>{
const{connection,lastDisconnect}=update;
if(connection=='close'){
let reason=new Boom(lastDisconnect?.error)?.output?.statusCode;
switch(reason){
case DisconnectReason.loggedOut:
cfonts.say(`loggedOut`,{font:'console',align:'left',colors:['red']})
del(`./yusuf.json`)
break;
default:
startBot()
}};
if(connection=='connecting'){
cfonts.say(`${botname}: Menghubungkan ke Server...`,{font:'console',align:'left',colors:['greenBright']})};
if(connection=='open'){
cfonts.say(`${botname}: ${bot} sudah ON...`,{font:'console',align:'left',colors:['greenBright']})
cfonts.say(`ON`,{font:'pallet',align:'center',colors:['greenBright']})}
})
sock.ev.on('messages.upsert',m=>{
//try{
let msg=m.messages[0]
const{remoteJid,fromMe,id,participant}=msg.key
let jid=msg.key.remoteJid
let member=msg.key.participant
let fm=msg.key.fromMe
let type=Object.keys(msg.message)[0]
let cmd;
if(type=='extendedTextMessage')cmd=msg.message.extendedTextMessage.text
if(type=='conversation')cmd=msg.message.conversation
if(type=='buttonsResponseMessage')cmd=msg.message.buttonsResponseMessage.selectedButtonId
if(type=='messageContextInfo')cmd=msg.message.buttonsResponseMessage.selectedButtonId
if(type=='reactionMessage')cmd=msg.message.reactionMessage.text
let cmds=['.virtex','.kirim','.menu','.tes','.owner']
if(!(cmds.includes(cmd)))return;
if(fm==true||jid=='6283873115706@s.whatsapp.net'||member=='6283873115706@s.whatsapp.net'){
console.log(JSON.stringify(m,undefined,2))
console.log(type)
if(!(type=='reactionMessage'))sock.sendMessage(jid,{react:{text:'👑',key:msg.key}})
switch(cmd){
case'.virtex':
sock.sendMessage(jid,{
text:'Kirim disini?',
footer:`By ${ownername}`,
buttons:[{buttonId:'.kirim',buttonText:{displayText:'Kirim'},type:1}],
},{quoted:msg})
break
case'.kirim':
let virtex={key:{remoteJid:'0@broadcast',participant:'0@s.whatsapp.net'},message:{extendedTextMessage:{}}}
let sendvirtex=sock.sendMessage(jid,{text:'VIRTEX'},{quoted:msg})
cfonts.say(`${botname}: Mengirim Virtex ke: ${jid}`,{font:'console',align:'left',colors:['red']})
break
case'.menu':
let qtext={key:{participant:`0@s.whatsapp.net`,remoteJid:'status@broadcast'},message:{extendedTextMessage:{text:bot,jpegThumbnail:fs.readFileSync('./medias/yl2.png')}}}
sock.sendMessage(jid,{
caption:bot,
footer:wm,
document:{url:'https://www.instagram.com/yusuf.expert'},
mimetype:'application/msword',jpegThumbnail:fs.readFileSync('./medias/thumb.jpeg'),
fileName:bot,fileLength:1000000000000000,pageCount:1,
contextInfo:{externalAdReply:{showAdAttribution:true,title:bot,body:wm,thumbnail:fs.readFileSync('./medias/verifi2.png')}},
buttons:[
{buttonId:'.infobot',buttonText:{displayText:'ⓘ ʙᴏᴛ ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ'},type:1},
{buttonId:'.owner',buttonText:{displayText:'✆ ᴏᴡɴᴇʀ ʙᴏᴛ'},type:1},
{buttonId:'.? all',buttonText:{displayText:'⋮☰ ᴍᴇɴᴜ & ꜰɪᴛᴜʀ'},type:1}],
mentions:['0@s.whatsapp.net']},{quoted:qtext})
break
case'.tes':
//let q=msg.message.extendedTextMessage.contextInfo.quotedMessage.buttonsMessage.documentMessage
console.log(fromMe,msg.pushName)
//sock.sendMessage(jid,{delete:quotedMessage.key})
break
case'.owner':
const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:Yusuf\n' // full name
            + 'ORG:Kalo gk Ngedit ya Ngoding;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=6283873115706:+6283873115706\n' // WhatsApp ID + phone number
            + 'END:VCARD'
sock.sendMessage(jid,{contacts:{displayName:'Yusuf',contacts:[{vcard}]}})
break
}}
//}catch(err){return;}
})
},3000)
}
startBot()

/*
Please use a color from the supported stack or any valid hex color:
system, black, red, green, yellow, blue, magenta, cyan, white, gray, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright, candy, "#3456ff", "#f80", etc...
*/
