const color = require("../colors.json");
const functions = require("../functions");
const Discord = require("discord.js");
const ms = require('parse-ms');
const mongoose = require('mongoose');
const mongopass = process.env.mongoPass

mongoose.connect(mongopass, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
})
const Data = require('../models/data.js');
module.exports.run = async (bot, message, args) => {
    var user = message.author;
    var time = 10;
    Data.findOne({
        userID: message.author.id
    },(err, data) => {
        if(err) console.log(err);
        if(!data) {
            const newData = new Data({
                name: bot.users.cache.get(user.id).username,
                userID: user.id
            })
            newData.save().catch(err => console.log(err))
           return message.reply(`User saved in database`);
        } else {
            return message.reply(`User already in database`);
            }
        })
    }

module.exports.help = {
    name:"test",
    aliases: ["testing"]
}