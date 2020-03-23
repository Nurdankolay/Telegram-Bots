const Telegraf = require('telegraf');
const bot = new Telegraf('1112697832:AAFx-rqRK9zQychRLXYKBYKrLiBbIJBZIaM');

bot.command(['start', 'help'], ctx => {
    let message = `
  Bana bir komut ver
  /newyork - Newyork fotoğrafı
  /dubai - Dubai gif
  /singapore - Singapore lokasyonu
  /cities - Şehir fotoğrafları
  /citieslist - text dosyası
    `;
    ctx.reply(message);
  })
  
  bot.command('newyork', ctx => {
    //send chat action - bot will say '>>>sending a photo'
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
    //send photo using file path
    bot.telegram.sendPhoto(ctx.chat.id,
      {
        source: 'res/newyork.jpg'
      },
      {
        //quotes message that trigger this handler
        reply_to_message_id: ctx.message.message_id
      }
    )
  })
  
  bot.command('dubai', ctx => {
    
    bot.telegram.sendChatAction(ctx.chat.id, "upload_video");
    
    bot.telegram.sendAnimation(ctx.chat.id,
      "https://media2.giphy.com/media/c0BdI069vyn5K/giphy.gif?cid=790b7611640372d3186cd2314995cb37839375a907f0a08e&rid=giphy.gif",
      {
        reply_to_message_id: ctx.message.message_id
      }
    )
  })
  
  bot.command('cities', ctx => {
    
    let cities = ['res/dubai.jpg', 'res/hongkong.jpg', 'res/london.jpg', 'res/newyork.jpg', 'res/singapore.jpg'];
    
    let result = cities.map(city => {
      return {
        type: 'photo',
        media: {
          source: city
        }
      }
    })
    
    bot.telegram.sendMediaGroup(ctx.chat.id, result);
  })
  
  bot.command('citieslist', ctx => {
    bot.telegram.sendDocument(ctx.chat.id,
      {
        source: "res/citieslist.txt"
      },
      {
        
        thumb: { source: "res/dubai.jpg" }
      })
  })
  
  bot.command('singapore', ctx => {
    
    bot.telegram.sendLocation(ctx.chat.id, 1.3521, 103.8198);
  })
  
  
  // bot.on('message', async ctx => {
  //   //when user sends a message, and subtype of message is document
  //   if (ctx.updateSubTypes[0] == 'document') {
  //     try {
  //       let link = await bot.telegram.getFileLink(ctx.message.document.file_id);
  //       ctx.reply('Your download link: ' + link);
  //     } catch (err) {
  //       console.log(err);
  //       ctx.reply(err.description);
  //     }
  //     //when user sends a message, and subtype of message is photo
  //   } else if (ctx.updateSubTypes[0] == 'photo') {
  //     console.log();
  //     try {
  //       let link = await bot.telegram.getFileLink(ctx.message.photo[0].file_id);
  //       ctx.reply('Your download link: ' + link);
  //     } catch (err) {
  //       console.log(err);
  //       ctx.reply(err.description);
  //     }
  //   }
  // })
  
  bot.launch();