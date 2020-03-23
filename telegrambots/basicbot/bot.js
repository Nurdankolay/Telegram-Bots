const Telegraf = require('telegraf');

const bot = new Telegraf('1080507946:AAHRZRNXUnK829N6Vu6eLY4LORCmcdEDRKE');

// start
bot.start((ctx)=> {
    
    ctx.reply("Nurdan'ın chatbotuna hoşgeldin. "+ ctx.from.first_name+ " start komutunu girdin.");

})

//help
bot.help((ctx)=> {
    
    ctx.reply("Nurdan'ın chatbotuna hoşgeldin. Help komutunu girdin.");

})

bot.settings((ctx)=> {

    ctx.reply("Nurdan'ın chatbotuna hoşgeldin. Ayarlar komutunu girdin.");
})

bot.command('test',(ctx) =>{

    ctx.reply("Hello-world");

})

bot.on("text", (ctx) =>{
    ctx.reply("Nurdan'ın chatbot'u");
})

bot.on("sticker", (ctx) =>{
    ctx.reply("sticker yollandı.");
})


bot.launch();