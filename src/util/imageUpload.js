export const singleImageUpload = async (e, tags, preset) => {
  const files = e.target.files;
  const data = new FormData();
  data.append("file", files[0]);
  data.append("upload_preset", preset);
  data.append("tags", tags);

  const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: "POST",
    body: data,
  });
  const file = await res.json();
  // [low_res, high_res]
  return [file.eager[0].secure_url, file.eager[1].secure_url];
};