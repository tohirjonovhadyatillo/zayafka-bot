const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "8907808062:AAHXU0X7i84FtortLPoizl3EiomJNdAYBXg";

if (!TOKEN) {
  console.error("❌ BOT_TOKEN topilmadi!");
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

console.log("✅ Bot ishga tushdi...");

// Join request kelganda avtomatik qabul qilish
bot.on("chat_join_request", async (request) => {
  const chatId = request.chat.id;
  const userId = request.from.id;

  try {
    await bot.approveChatJoinRequest(chatId, userId);

    console.log(
      `✅ Qabul qilindi: ${request.from.first_name} (${userId})`
    );
  } catch (err) {
    console.error(
      `❌ Join requestni qabul qilishda xato: ${err.message}`
    );
  }
});

// /start komandasi
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "✅ Bot ishlayapti.\n\nMeni kanalingizga admin qilib qo'ying va Join Request funksiyasini yoqing."
  );
});

// Polling xatolari
bot.on("polling_error", (err) => {
  console.error("❌ Polling xatosi:", err.message);
});

// Bot to'xtatilganda
process.on("SIGINT", async () => {
  console.log("\n🛑 Bot to'xtatildi");
  await bot.stopPolling();
  process.exit(0);
});