import React, { useEffect } from "react";
import { useField, useFormikContext } from "formik";
import getVideoId from "get-video-id";

export default function VideoUrlField({ label, labelClass, ...props }) {
  const {
    values: { videoUrl },
    touched,
    setFieldValue,
  } = useFormikContext();
  const [field, meta] = useField(props);

  useEffect(() => {
    if (videoUrl.trim() !== "" && touched.videoUrl) {
      const res = getVideoId(videoUrl);
      if (res?.id && ['youtube', 'vimeo'].includes(res?.service)) {
        setFieldValue('videoId', res.id);
        setFieldValue('videoType', res.service.toUpperCase());
      }
    }
  }, [videoUrl, touched.videoUrl, setFieldValue]);

  return (
    <>
      <label className={labelClass} htmlFor={props.name}>
        {label}
      </label>
      <input {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="text-sm text-red-400">{meta.error}</div>
      ) : null}
    </>
  );
}
