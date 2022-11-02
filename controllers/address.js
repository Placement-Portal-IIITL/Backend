const Addresses = require("../models/addresses");
const mongoose = require("mongoose");

exports.addAddress = (req, res) => {
  try {
    const address = new Addresses({
      ...req.body,
      studentId: req.auth.studentId,
    });
    address.save((error, address) => {
      if (error) {
        console.log("Error saving address in /addAddress: ", error);
        return res.status(500).json({
          error: "Not able to add address",
        });
      }
      res.json({ ...address._doc, msg: "Address added successfully" });
    });
  } catch (error) {
    console.log("Error occurred in /addAddress", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.getAddress = async (req, res) => {
  try {
    const address = await Addresses.findOne({ _id: req.query.addressId });
    if (!address) {
      return res.status(404).json({ msg: "Address not found" });
    }
    res.json(address);
  } catch (error) {
    console.log("Error occurred in /getAddress", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.getAddressList = async (req, res) => {
  try {
    const address = await Addresses.find({ studentId: req.auth.studentId });
    res.json(address);
  } catch (error) {
    console.log("Error occurred in /getAddressList", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const address = await Addresses.findOne({ _id: req.body.addressId });
    if (!address) {
      return res.status(404).json({ msg: "Address does not exist" });
    }
    if (!address.studentId.equals(req.auth.studentId)) {
      return res.status(401).json({
        error: "You are not authorized to delete this address",
      });
    }
    const deletedAddress = await Addresses.deleteOne({
      _id: req.body.addressId,
    });
    if (deletedAddress.deletedCount == 0) {
      return res.status(500).json({ error: "Failed to delete address" });
    }
    res.json({ msg: "Address successfully deleted" });
  } catch (error) {
    console.log("Error occurred in /deleteAddress", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};
