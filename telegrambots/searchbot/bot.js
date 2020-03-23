const Telegraf = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('1006455324:AAEPawGRNtlxT1yrWm-vwm5MzFdadcmymKg');

const apikey = `15699292-51f7eed1faefdc58d87b28d7c`;

bot.on('inline_query', async ctx => {
    let query = ctx.inlineQuery.query;
    let res = await axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}&limit=2`);
    console.log(res.data);
})

bot.launch();
