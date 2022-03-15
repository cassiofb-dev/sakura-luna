const dotenv = require("dotenv");
dotenv.config();

const CONFIG = {
  DISCORD: {
    APP_ID: process.env.DISCORD_APP_ID,
    GUILD_ID: process.env.DISCORD_GUILD_ID,
    BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
    BOT_NAME: "Sakura Luna",
    ROLES: {
      ADMIN: "Sakura Owner",
    },
  },
  MONGODB: {
    CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
  },
  TENOR: {
    API_URL: "https://g.tenor.com/v1",
    API_KEY: process.env.TENOR_API_KEY,
    ENDPOINTS: {
      RANDOM: "/random?",
    },
  },
  URBAN_DICTIONARY: {
    API_URL: "https://api.urbandictionary.com/v0",
    ENDPOINTS: {
      DEFINE: "/define?",
    },
  },
};

module.exports = CONFIG;