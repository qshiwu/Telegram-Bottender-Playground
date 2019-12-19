const DEBUG = true;

const { router, text } = require('bottender/router');

async function SayHi(context) {
  await context.sendText('Hi!');
}

async function SayHello(context) {
  await context.sendText('Hello!');
}

async function Unknown(context) {
  await context.sendText('Unknown');
}

async function sendMessage(context) {
  response = await context.sendMessage('Testing Send Message');
  dumpSentMessageInfo(context, response);
}

async function sendMultipleMessages(context) {
  for (var i = 0; i < 5; i++) {
    response = await context.sendMessage(`Testing Send Message ${i}`);
  }

  //dumpSentMessageInfo(context, response);
}

async function dumpSentMessageInfo(context, response) {
  if (DEBUG) {
    const jsonResponse = JSON.stringify(response, null, 4);
    context.sendMessage(`${jsonResponse}`);
  }
}

async function sendMessageMarkdown(context) {
  await context.sendMessage('Send *Markdown* Message with [Bottender](https://bottender.js.org/)', {
    parseMode: 'markdown',
  });
}

async function sendMessageHTML(context) {
  await context.sendMessage(
    'Send <b>HTML</b> Message with <a href="https://bottender.js.org/">Bottender</a>',
    {
      parseMode: 'html',
    }
  );
}

async function sendImage(context) {
  await context.sendPhoto(
    'https://user-images.githubusercontent.com/662387/70974674-46759f00-20e3-11ea-814a-e0729c68a7a4.png'
  );
}

async function sendAudio(context) {
  await context.sendAudio(
    'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3'
  );
}

async function sendDocument(context) {
  await context.sendDocument('https://media.giphy.com/media/l2JhGa1nx4ir3zj20/giphy.gif');
}

async function sendVideo(context) {
  await context.sendVideo(
    'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
  );
}

async function sendAnimation(context) {
  await context.sendAnimation(
    'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
  );
}

async function getStickerFileId(context) {
  await context.sendText(`sticker`);
}

async function sendStickerNice(context) {
  await context.sendSticker('CAADAgADDQADWbv8JS5RHx3i_HUDFgQ');
}

async function sendVoice(context) {
  await context.sendVoice(
    'https://file-examples.com/wp-content/uploads/2017/11/file_example_OOG_1MG.ogg'
  );
}

async function sendVideoNote(context) {
  await context.sendVideoNote(
    'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
  );
}

async function sendMediaGroup(context) {
  await context.sendMediaGroup([
    {
      type: 'photo',
      media: 'https://http.cat/100',
    },
    {
      type: 'photo',
      media: 'https://http.cat/101',
    },
    {
      type: 'photo',
      media: 'https://http.cat/200',
    },
    {
      type: 'photo',
      media: 'https://http.cat/207',
    },
    {
      type: 'photo',
      media: 'https://http.cat/302',
    },
  ]);
}

async function sendLocation(context) {
  //await context.sendText(`I am from Taiwan :D`);
  await context.sendLocation({ latitude: 25.034436, longitude: 121.526483 });
}

async function sendVenue(context) {
  //await context.sendText(`I am from Taiwan :D`);
  await context.sendVenue({
    location: { latitude: 25.034436, longitude: 121.526483 },
    title: 'Bottender Home',
    address: 'Xinyi Road, Da’an District, Taipei City, 106',
  });
}

async function sendContact(context) {
  //await context.sendText(`I am from Taiwan :D`);
  await context.sendContact({
    phoneNumber: '123456',
    firstName: 'first',
  });
}

async function sendPoll(context) {
  await context.sendText('Sending Poll');
  await context.sendPoll('Which one is your favorite food?', ['🍔', '🍕', '🌮', '🍱']);
}

async function sendInvoice(context) {
  const invoice = {
    title: 'product name',
    description: 'product description',
    payload: 'bot-defined invoice payload',
    providerToken: 'PROVIDER_TOKEN',
    startParameter: 'pay',
    currency: 'USD',
    prices: [
      { label: 'product', amount: 11000 },
      { label: 'tax', amount: 11000 },
    ],
  };
  await context.sendInvoice(invoice);
}

async function chatAction(context) {
  await context.sendChatAction('typing');
  await context.sendMessage('Text after typing');
}

async function checkContext(context) {
  const jsonContext = JSON.stringify(context, null, 4);
  await context.sendText(`${jsonContext}`);
}

async function checkContextChat(context) {
  const jsonContext = JSON.stringify(context.event._rawEvent.message.chat, null, 4);
  // const jsonContext = JSON.stringify(context.event._rawEvent, null, 4);
  await context.sendText(`${jsonContext}`);
}

async function getContextChatId(context) {
  const jsonContext = JSON.stringify(context.event._rawEvent.message.chat, null, 4);
  await context.sendText(`${jsonContext}`);
}

async function updateMessage(context) {
  const response = await context.sendMessage('hello');
  await context.editMessageText(response.messageId, '*world*', {
    parseMode: 'markdown',
  });
}

async function updateCaption(context) {
  const response = await context.sendPhoto('https://http.cat/302', { caption: `original caption` });
  await context.editMessageCaption(response.messageId, 'new caption');
}

async function updateMedia(context) {
  const response = await context.sendPhoto('https://http.cat/100');
  await context.editMessageMedia(response.messageId, {
    type: 'photo',
    media: 'https://http.cat/302',
  });
}

async function updateReplyMarkup(context) {
  const replyMarkup = {
    inline_keyboard: [
      [
        {
          text: 'hi',
          url: 'https://www.example.com',
        },
        {
          text: 'yo',
          callback_data: 'yo',
        },
      ],
    ],
  };
  const response = await context.sendMessage('hello');
  await context.editMessageReplyMarkup(response.messageId, replyMarkup);
}

async function deleteMessage(context) {
  const response = await context.sendSticker('CAADAgADIQUAAj-VzArEL64k2NbgbBYE');
  await context.deleteMessage(response.messageId);
}

async function help(context) {
  const commandPool = [
    'sendmessage',
    'sendmultiplemessages',
    'sendmessagemarkdown',
    'sendmessagehtml',
    'sendimage',
    'sendaudio',
    'senddocument',
    'sendvideo',
    'sendanimation',
    'sendsticker',
    'sendvoice',
    'sendvideonote',
    'sendmediagroup',
    'sendlocation',
    'sendvenue',
    'sendcontact',
    'sendpollchecking',
    'sendinvoicechecking',
    'chatactionchecking',
    'checkcontext',
    'checkcontextchat',
    'getcontextchatid',
    'updatemessage',
    'updatecaption',
    'updatemedia',
    'updatereplymarkup',
    'sendreplykeyboard',
    'sendonetimereplykeyboard',
    'removereplykeyboard',
    'sendreplyinlinekeyboard',
    'deletemessage',
  ];

  const commandName = commandPool[Math.floor(Math.random() * commandPool.length)];
  const replyMarkup = {
    keyboard: [
      [
        {
          text: `/${commandName}`,
        },
      ],
    ],
    one_time_keyboard: true,
  };

  const userName = context.event.message.chat.firstName;
  await context.sendMessage(
    `Hello *${userName}*!\nThis is [Bottender\'s](https://bottender.js.org/) playground for testing Telegram Chat UI! 
    \nTry to input \`\/${commandName}\``,

    // of Send *Markdown* Message with `,
    { replyMarkup, parseMode: 'markdown', disable_web_page_preview: 'true' }
  );

  // /sendMessage
}

async function sendReplyKeyboard(context) {
  const replyMarkup = {
    keyboard: [
      [
        {
          text: 'hi',
        },
        {
          text: 'yo',
        },
      ],
    ],
  };
  await context.sendText('Hello', { replyMarkup });
}
async function sendOnetimeReplyKeyboard(context) {
  const replyMarkup = {
    keyboard: [
      [
        {
          text: 'hi',
        },
        {
          text: 'yo',
        },
      ],
    ],
    one_time_keyboard: true,
  };
  await context.sendText('Hello', { replyMarkup });
}

async function removeReplyKeyboard(context) {
  const replyMarkup = { removeKeyboard: true };
  await context.sendText('remove Keyboard', { replyMarkup });
}

async function sendReplyInlineKeyboard(context) {
  const replyMarkup = {
    inline_keyboard: [
      [
        {
          text: 'hi',
          url: 'https://www.example.com',
        },
        {
          text: 'yo',
          callback_data: 'yo',
        },
      ],
    ],
  };
  await context.sendText('Hello', { replyMarkup });
}

module.exports = async function App(context) {
  // a little feature to get sticker id
  if (context.event.isSticker) {
    await context.sendText(`received the sticker: ${context.event.sticker.fileId}`);
  }

  return router([
    text(/\/sendMessage/i, sendMessage), // botFather only accepts commands in small captials
    text(/\/sendMultipleMessages/i, sendMultipleMessages),
    text(/\/sendMessageMarkdown/i, sendMessageMarkdown),
    text(/\/sendMessageHTML/i, sendMessageHTML),
    text(/\/sendImage/i, sendImage),
    text(/\/sendAudio/i, sendAudio),
    text(/\/sendDocument/i, sendDocument),
    text(/\/sendVideo/i, sendVideo),
    text(/\/sendAnimation/i, sendAnimation),
    text(/\/sendSticker/i, sendStickerNice),
    text(/\/sendVoice/i, sendVoice),
    text(/\/sendVideoNote/i, sendVideoNote),
    text(/\/sendMediaGroup/i, sendMediaGroup),
    text(/\/sendLocation/i, sendLocation),
    text(/\/sendVenue/i, sendVenue),
    text(/\/sendContact/i, sendContact),
    text(/\/sendPoll/i, sendPoll), // checking
    text(/\/sendInvoice/i, sendInvoice), // checking
    text(/\/chatAction/i, chatAction), // checking
    text(/\/checkContext/i, checkContext),
    text(/\/checkContextChat/i, checkContextChat),
    text(/\/getContextChatId/i, getContextChatId),
    text(/\/updateMessage/i, updateMessage),
    text(/\/updateCaption/i, updateCaption),
    text(/\/updateMedia/i, updateMedia),
    text(/\/updateReplyMarkup/i, updateReplyMarkup),
    text(/\/sendReplyKeyboard/i, sendReplyKeyboard),
    text(/\/sendOnetimeReplyKeyboard/i, sendOnetimeReplyKeyboard),
    text(/\/removeReplyKeyboard/i, removeReplyKeyboard),
    text(/\/sendReplyInlineKeyboard/i, sendReplyInlineKeyboard),
    text(/\/deleteMessage/i, deleteMessage),
    text(/(help|start|hi|yo|hello|hey|hay|你好|您好)/i, help),
    // text(/start/i, help),
    text('*', Unknown), // Unknwon
  ]);
};
