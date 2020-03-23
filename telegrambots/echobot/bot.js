const Telegraf = require('telegraf');

const bot = new Telegraf('1077577493:AAGzaieNQ65XmPXQ5QefDTAGqTUlJheySpI');

const helpMessage = `
Bana bisey söyle
/start - bot baslatir
/help - komut yardimi
`;

bot.use((ctx, next) => {
    console.log(ctx);
    if (ctx.updateSubTypes[0] == "text"){
        console.log(ctx.from.username + " said: " + ctx.message.text);
    } else {
        console.log(ctx.from.username + " sent " + ctx.updateSubTypes[0]);
    }
    next();
})

bot.start((ctx) => {
    ctx.reply("Ben Nurdan'ın echo botuyum!");
    ctx.reply(helpMessage);
})

bot.help((ctx) => {
    ctx.reply(helpMessage);
})

bot.command("echo", (ctx) => {
    let input = ctx.message.text;
    let inputArray = input.split(" ");
    let message = "";

    if(inputArray.length == 1){
        message = "echo";
    } else {
        inputArray.shift();
        message = inputArray.join(" ");
    }

    ctx.reply(message);
})


bot.launch();