const { Schema, model, default: mongoose } = require("mongoose");

module.exports = (mongoose) => {
  const newSchema = new mongoose.Schema(
    {
      filename: {
        type: String,
      },
      mimetype: {
        type: String,
      },
      path: {
        type: String,
      },
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );
  const Image = mongoose.model("image", newSchema);
  return Image;
};
