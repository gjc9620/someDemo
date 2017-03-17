/**
 * Created by gujiacheng on 2017/3/8.
 */

var crypto=require('crypto');
var myKey = "gjc1994216"

var cipher = crypto.createCipher('aes-256-cbc',myKey);
var text = "999990个小时";
var crypted = cipher.update(text,'utf8','hex');
crypted += cipher.final('hex');
console.log('加密后的文本：'+crypted);

