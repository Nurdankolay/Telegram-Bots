const Telegraf = require("telegraf");

const bot = new Telegraf("1103198561:AAEgENo3HeYHu01LarH-WNHmsI9lzGitZfY");

const axios = require('axios');

let dataStore = [];

getData();

bot.command('fact', ctx => {
    let maxRow = dataStore.filter(item => {
        return (item.row == '1' && item.col == '2')
    })[0].val;
    
    let k = Math.floor(Math.random()*maxRow)+1;

    let fact = dataStore.filter(item => {
        return (item.row == k && item.col == '5');
    })[0];

    let message =
    `
    Fact #${fact.row}:
    ${fact.val}
    `;
    ctx.reply(message);
})

bot.command('update', async ctx =>{
    try{
        await getData();
        ctx.reply('updated');
    }catch(err){
        console.log(err);
        ctx.reply('Error encountered');
    }
})

async function getData(){
    try {
        let res = await axios('https://spreadsheets.google.com/feeds/cells/1pxTxYhjm3xH6xW2boUwTEvg-Uu32O6gY-uGjYdp1J04/1/public/full?alt=json');
        
        let data = res.data.feed.entry;
        dataStore = [];
        data.forEach(item => {
            dataStore.push({
                row: item.gs$cell.row,
                col: item.gs$cell.col,
                val: item.gs$cell.inputValue,
            })
        })
        console.log(dataStore);
    } catch(err){
        console.log(err);
        throw new Error;
    }
}

bot.launch();