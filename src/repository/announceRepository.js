const Announce = require('../models/mongodb/announces');
const logger = require('@condor-labs/logger');

exports.saveAnnounce = async function(userId, description, category ) {
    const newAnnounce = new Announce({
    userId: userId,
    description: description,
    category: category,
    status: 1
    })
    await newAnnounce
    .save();
    return newAnnounce;
};

exports.findAnnouncesByUser =  async function(userId) {
    const announces = await Announce.find({ userId: userId });
    return announces;
};

exports.findAnnouncesByCategoy = async function(userId, category) {
   const announces = await Announce.find({ userId: userId, category: category });
    return announces;
};

exports.deleteAnnounce = async function(announceId, userId) {
    const announce = await Announce.findOneAndDelete({ _id: announceId, userId: userId });
    return announce;
};

exports.modifyAnnounce = async function(userId, announceId, status) {
   const announce = await Announce.findOneAndUpdate({ _id: announceId, userId: userId}, { status: status});
    return announce;
};