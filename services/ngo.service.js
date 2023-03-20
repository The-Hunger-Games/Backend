const NGO = require("../models/ngo.model");

// ngo creation service

const createNGO = async (ngo) => {
  const newNGO = new NGO(ngo);
  await newNGO.save();
  return newNGO;
};

// ngo find service

const findNGO = async (params) => {
  const searchedNGO = await NGO.findOne(params);
  return searchedNGO;
};

// ngo update service

const updateNGO = async (ngoId, ngo) => {
  const updatedNGO = await NGO.updateMany(
    { _id: ngoId },
    { $set: ngo },
    { new: true },
  );

  return updatedNGO;
};

// ngo delete service

const deleteNGO = async (params) => {
  const deletedNGO = await NGO.deleteOne(params);
  return deletedNGO;
};

// ngo donated amount increment service

const increaseNgoAmountDonated = async (params) => {
  const updatedNGO = await NGO.findOneAndUpdate(
    params,
    { $inc: { amountDonated: 1 } },
    { new: true },
  );

  return updatedNGO;
};

// export

module.exports = {
  createNGO,
  findNGO,
  updateNGO,
  deleteNGO,
  increaseNgoAmountDonated,
};
