const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with the token you obtained from BotFather
const TOKEN = process.env['TELEGRAM_BOT_TOKEN']
const BLOCKED_MESSAGES = process.env['BLOCKED_MESSAGES']

if (!TOKEN) {
  console.error('No token provided');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, {polling: true});

bot.on('message', (msg) => {
    if (msg.new_chat_members || msg.left_chat_member) {
        // Delete "user joined" and "user left" messages
        console.log(`TRYING TO DELETE ${msg}`)
        bot.deleteMessage(msg.chat.id, msg.message_id)
          .catch(e => console.error(e))
          .then(() => console.log("MESSAGE DELETED"))
    }

    if(BLOCKED_MESSAGES.includes(msg.text?.slice(0,10))) {
      bot.deleteMessage(msg.chat.id,  msg.message_id)
        .catch(e => console.error("MESSAGE NOT DELETED", e))
        .then(() => console.log("MESSAGE DELETED"))
    }
});

// Handle /start command
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Bot is running!')
      .catch(e => console.error(e))
      .then(value => console.log(value));
});
