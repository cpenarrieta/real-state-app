import axios from "axios";

// TODO return only ID and let react library of clousinary manage transformations
// for now we will only save the w_1500 image

export const singleImageUpload = async (file, tags, preset) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", preset);
  data.append("tags", tags);

  const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
  return [res?.data?.eager[0]?.secure_url, res?.data?.eager[1]?.secure_url];
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const multipleImageUpload = async (files, tags, preset) => {
  const resFinal = [];
  let data;
  let res;

  await asyncForEach(files, async (file) => {
    data = new FormData();
    data.append("file", file);
    data.append("upload_preset", preset);
    data.append("tags", tags);

    // TODO try catch and keep uploading
    res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
    resFinal.push([
      res?.data?.eager[0]?.secure_url,
      res?.data?.eager[1]?.secure_url,
    ]);
  });

  return resFinal;
};
