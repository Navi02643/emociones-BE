const { Types } = require("mongoose");
const FollowupModel = require('./models/followups.model');

async function saveFollow(follow) {
  const newFollowup = new FollowupModel(follow);
  const saveFollowup = await newFollowup.save();
  return saveFollowup;
}

async function findFollow(follow) {
  const searchFollow = FollowupModel.findOne({ idRecord: Types.ObjectId(follow.idRecord), date: new Date(follow.date) });
  return searchFollow;
}

async function findFollowups(idRecord) {
  const searchFollow = await FollowupModel.find({ idRecord: Types.ObjectId(idRecord) }).sort({ date: 1 });
  return searchFollow;
}

module.exports = {
  saveFollow,
  findFollow,
  findFollowups,
};
