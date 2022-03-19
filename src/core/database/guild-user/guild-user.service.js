const guildUserModel = require("./guild-user.model");
const GuildUser = require("./guild-user");

/**
 * Returns GuildUser Creating if not Exist
 * @param {String} guildId
 * @param {String} userId
 * @returns {Promise<GuildUser>}
 */
const createIfNotExist = async (guildId, userId) => {
  const guildUser = await guildUserModel.findOne({ guildId, userId });

  if (guildUser) return guildUser;

  return guildUserModel.create({ guildId, userId });
}

/**
 * Update GuildUser
 * @param {GuildUser} guildUser
 */
const update = async (guildUser) => {
  await guildUserModel.updateOne({
    guildId: guildUser.guildId,
    userId: guildUser.userId,
  }, guildUser);
}

/**
 * Find one GuildUser
 * @param {GuildUser} guildUser
 * @returns {Promise<Array<GuildUser>>}
 */
 const find = (guildUser) => {
  return guildUserModel.find(guildUser);
}

/**
 * Get ExperienceLeaderboard
 * @param {String} guildId
 * @returns {Promise<Array<GuildUser>>}
 */
 const getLevelLeaderboard = (guildId) => {
  return guildUserModel.find({ guildId }).sort("-experience").limit(10);
}

/**
 * Get CurrencyLeaderboard
 * @param {String} guildId
 * @returns {Promise<Array<GuildUser>>}
 */
 const getCurrencyLeaderboard = (guildId) => {
  return guildUserModel.find({ guildId }).sort("-currency").limit(10);
}

/**
 * Remove GuildUser
 * @param {String} guildId
 * @param {String} userId
 */
const remove = (guildId, userId) => {
  return guildUserModel.deleteOne({ guildId, userId });
}

const guildUserService = {
  createIfNotExist,
  update,
  find,
  remove,
  getLevelLeaderboard,
  getCurrencyLeaderboard,
};

module.exports = guildUserService;