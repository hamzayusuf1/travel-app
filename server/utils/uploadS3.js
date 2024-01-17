// const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
require("dotenv").config();

const BUCKET_NAME = process.env.BUCKET_NAME;

const uploadWithMulter = () =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, { fieldname: file.fieldname });
      },
      key: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
      },
    }),
  }).single("s3Images");

const uploadToAws = () => {
  const upload = uploadWithMulter();

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.json({ err, msg: "Error occured while uploading" });
      return;
    }
    res.json({ msg: "files uploaded succesfully", files: req.files });
  });
};

module.exports = uploadToAws;
