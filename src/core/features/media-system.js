const tenor = require("../apis/tenor");
const urbanDictionary = require("../apis/urban-dictionary");
const userArtService = require("../database/user-art/user-art.service");

const searchGif = tenor.searchGif;
const define = urbanDictionary.define;
const findUserArt = userArtService.find;
const randomUserArt = userArtService.random;

const mediaSystem = { searchGif, define, findUserArt, randomUserArt };

module.exports = mediaSystem;