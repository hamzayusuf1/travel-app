//Image Upload
const { createWriteStream } = require("fs");
const { join } = require("path");
const { graphqlUploadExpress } = require("graphql-upload");

const storeUpload = async ({ stream, filename }) => {
  const uploadDir = "./uploads";
  const path = join(uploadDir, filename);
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ path }))
      .on("error", reject)
  );
};
const processUpload = async (upload) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const { path } = await storeUpload({ stream, filename });
  return { filename, mimetype, path };
};

module.exports = {
  upload: graphqlUploadExpress().single("file"),
  Mutation: {
    uploadFile: async (_, { file }) => {
      const result = await processUpload(file);
      const newFile = await File.create(result);
      return newFile;
    },
  },
};
