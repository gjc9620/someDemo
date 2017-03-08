/**
 * Created by gujiacheng on 2017/3/8.
 */


var crypto=require('crypto');
var myKey = "gjc1994216"
var crypted = "";
var decipher = crypto.createDecipher('aes-256-cbc',myKey);
var dec = decipher.update(crypted,'hex','utf8');
dec += decipher.final('utf8');
console.log('解密的文本：'+dec);
