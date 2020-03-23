const Telegraf = require('telegraf');

const bot = new Telegraf('1046091070:AAHuUaLJbe9kmZ8r2XTv-GPnhSqKbtMb_-o');

const axios = require('axios');
const fs = require('fs');

const helpMessage = 
`
* API BOT *
/fortune - Şans kurabiyesi
/cat - Random kedi fotoğrafları
/cat \`<text>\` - yazıyla kedi fotoğrafları 
/dogbreeds - Köpek cinslerinin listesi
/dogs \`<breed>\` - Köpek cinslerinin fotoğrafları
`;

bot.help(ctx => {
    bot.telegram.sendMessage(ctx.from.id, helpMessage, {
        parse_mode: "markdown"
    })
})

bot.command('fortune',(ctx) => {
    axios.get('http://yerkee.com/api/fortune')
        .then(res => {
            ctx.reply(res.data.fortune);
        }).catch (e => {
            console.log(e);
        })
})

bot.command('cat', async(ctx) => {
    let input = ctx.message.text;
    let inputArray = input.split(" ");

    if(inputArray.length == 1){
      try {
        let res = await axios.get('http://aws.random.cat/meow');
        ctx.replyWithPhoto(res.data.file);
        } catch (e) {
            console.log(e);
        }
    } else {
        inputArray.shift();
        input = inputArray.join(" ");
        ctx.replyWithPhoto(`https://cataas.com/cat/says/${input}`);
    }
})

bot.command('dogbreeds', (ctx) => {
    let rawdata = fs.readFileSync('./dogbreeds.json', 'utf8');
    let data = JSON.parse(rawdata);
    console.log(data);

    let message = "Dog Breeds:\n";

    data.forEach(item => {
        message += `${item}\n`;
    })
    ctx.reply(message);
})

bot.command("dog", (ctx) => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("bir köpk cinsi girin");
        return;
    }
    let breedInput = input[1];

    let rawdata = fs.readFileSync('./dogbreeds.json', 'utf8');
    let data = JSON.parse(rawdata);

    if(data.includes(breedInput)){
        axios.get(`https://dog.ceo/api/breed/${breedInput}/images/random`)
        .then(res => {
            ctx.replyWithPhoto(res.data.message);
        }).catch(e => {
            console.log(e);
        })
    } else {
        let suggestions = data.filter(item => {
            return item.startsWith(breedInput);
        })

        let message = `Ne demek istedin:\n`;

        suggestions.forEach(item => {
            message +=`${item}\n`;
        })

        if(suggestions.length == 0){
            ctx.reply("Cins bulunamadı!!!");
        } else {
            ctx.reply(message);
        }
    }
})

bot.launch();