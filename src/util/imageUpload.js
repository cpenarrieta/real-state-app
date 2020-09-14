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

export const multipleImageUpload = async (files, tags, preset) => {
  let data;

  const promises = files.map((file) => {
    data = new FormData();
    data.append("file", file);
    data.append("upload_preset", preset);
    data.append("tags", tags);

    return axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
  });

  const res = await Promise.all(promises);

  return res.map((r) => {
    return {
      urlLowRes: r?.data?.eager[0]?.secure_url,
      url: r?.data?.eager[1]?.secure_url,
    };
  });
};
