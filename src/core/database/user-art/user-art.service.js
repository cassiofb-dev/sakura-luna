const UserArt = require("./user-art");
const userArtModel = require("./user-art.model");

/**
 * Create a UserArt if not exist
 * @param {UserArt} userArt
 * @returns {Promise<UserArt>}
 */
const createIfNotExist = async (userArt) => {
  const foundUserArt = await userArtModel.findOne(userArt);
  if (foundUserArt) return foundUserArt;
  return userArtModel.create(userArt);
}

/**
 * Find one UserArt
 * @param {UserArt} userArt
 * @returns {Promise<Array<UserArt>>}
 */
 const find = (userArt) => {
  return userArtModel.find(userArt);
}

const random = async () => {
  const userArts = await find();
  const userArt = userArts[Math.floor(Math.random() * userArts.length)];
  return userArt;
}

const userArtService = { createIfNotExist, find, random };

module.exports = userArtService;