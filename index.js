"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// Create a new bot using the token from the .env file
const bot = new grammy_1.Bot(process.env.BOT_TOKEN);
// Parse authorized chat IDs from the environment variable
const authorizedChatIds = process.env.AUTHORIZED_CHAT_IDS;
// Function to check if the chat ID is authorized
const isAuthorized = (ctx) => {
    const chatId = ctx.chat?.id;
    return authorizedChatIds.includes(chatId);
};
// Middleware to check authorization
bot.use((ctx, next) => {
    if (isAuthorized(ctx)) {
        return next(); // If authorized, proceed to the next handler
    }
    else {
        console.log(`${ctx.from?.first_name ? ctx.from.first_name : ""} ${ctx.from?.last_name} unauthorized person was trying to use the bot.`);
        return ctx.reply("Unauthorized"); // Send unauthorized message
    }
});
// Build the inline keyboard for the menu
const menuMarkup = new grammy_1.InlineKeyboard()
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
    }
    else {
        // If it's not a greeting, show the menu
        await ctx.reply("Here is the menu:", {
            reply_markup: menuMarkup,
        });
    }
});
// Function to check if the message is a greeting
const isGreeting = (message) => {
    const greetings = ["hi", "hii", "hiii", "hey", "hello", "hlw"];
    return greetings.includes(message.toLowerCase());
};
bot.start();
