import { Bot, InlineKeyboard } from "grammy";
import * as dotenv from "dotenv";

dotenv.config();

// Create a new bot using the token from the .env file
const bot = new Bot("7449228499:AAGPhVNbK9aGHWbcj1Lkp2W_t_HtvuAThLU");

// Parse authorized chat IDs from the environment variable
const authorizedChatIds = [851092968];

// Function to check if the chat ID is authorized
const isAuthorized = (ctx: any) => {
  const chatId = ctx.chat?.id;
  return authorizedChatIds.includes(chatId);
};

// Middleware to check authorization
bot.use((ctx, next) => {
  if (isAuthorized(ctx)) {
    return next(); // If authorized, proceed to the next handler
  } else {
    console.log(
      `${ctx.from?.first_name ? ctx.from.first_name : ""} ${
        ctx.from?.last_name
      } unauthorized person was trying to use the bot.`
    );
    return ctx.reply("Unauthorized"); // Send unauthorized message
  }
});

// Build the inline keyboard for the menu
const menuMarkup = new InlineKeyboard()
  .url("Contact Us", "https://lavkushmaurya.com/contact")
  .url("Check Website", "https://lavkushmaurya.com");

// Command to display the menu
bot.command("menu", async (ctx) => {
  await ctx.reply("Here is the menu:", {
    reply_markup: menuMarkup,
  });
});

// Message handler
bot.on("message", async (ctx) => {
  const messageText = ctx.message?.text?.toLowerCase() || "";

  if (isGreeting(messageText)) {
    // If the message is a greeting, reply with "hello developer"
    await ctx.reply("Hello I'm Your Bot!");
  } else {
    // If it's not a greeting, show the menu
    await ctx.reply("Here is the menu:", {
      reply_markup: menuMarkup,
    });
  }
});

// Function to check if the message is a greeting
const isGreeting = (message: string) => {
  const greetings = ["hi", "hii", "hiii", "hey", "hello", "hlw"];
  return greetings.includes(message.toLowerCase());
};

bot.start();
