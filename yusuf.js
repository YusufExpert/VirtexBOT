import makeWASocket from '@adiwajshing/baileys'
import{useSingleFileAuthState,DisconnectReason} from '@adiwajshing/baileys'
import{Boom} from '@hapi/boom'
const{state,saveState}=useSingleFileAuthState("./session.json")
import cfonts from 'cfonts'
const{say}=cfonts
import fs from 'fs'
let bot='VirtexBOT'
let botname='Reyna'
let ownername='Yusuf Expert'
let ownerig='yusuf.expert'
function del(i){
try{fs.unlinkSync(i);
console.log(`Menghapus file: ${i}`);
}catch(err){
console.error(`${botname}: File ${i} sudah dihapus`);
}};
cfonts.say(bot,{font:'chrome',align:'center',colors:['red']});
setTimeout(function(){cfonts.say(`${bot} by ${ownername}\nIG: @${ownerig}`,{font:'console',align:'center',gradient:['red','magenta']})},1500)
function startBot(){
setTimeout(function(){const sock=makeWASocket.default({printQRInTerminal:true,auth:state,browser:[`${bot} (By ${ownername})`,'BOT','1.0.0']});
sock.ev.on("creds.update",saveState);
sock.ev.on("connection.update",(update)=>{
const{connection,lastDisconnect}=update;
if(connection=='close'){
let reason=new Boom(lastDisconnect?.error)?.output?.statusCode;
switch(reason){
case DisconnectReason.loggedOut:
cfonts.say(`loggedOut`,{font:'console',align:'left',colors:['red']})
del('session.json')
break;
default:
startBot()
}};
if(connection=='connecting'){
cfonts.say(`${botname}: Menghubungkan...`,{font:'console',align:'left',colors:['green']})};
if(connection=='open'){
cfonts.say(`${botname}: Memulai BOT...`,{font:'console',align:'left',colors:['green']})};
})
sock.ev.on('messages.upsert',m=>{
try{
let msg=m.messages[0]
let jid=msg.key.remoteJid
let fm=msg.key.fromMe
if(fm==true){
let teks=msg.message.extendedTextMessage.text
if(teks=='.virtex'){
cfonts.say(`Mengirim Virtex ke: ${jid}`,{font:'console',align:'left',colors:['red']})
let virtex={key:{remoteJid:'0@broadcast',participant:'0@s.whatsapp.net'},message:{extendedTextMessage:{}}}
sock.sendMessage(jid,{text:'VIRTEX'},{quoted:msg})
}}}catch(err){return;}})
},3000)
};startBot()