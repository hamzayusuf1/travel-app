import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Toaster } from "react-hot-toast";

import check from "../../assests/check-sign.png";

import "./index.css";

const AddPost = () => {
  const [file, setFile] = useState("");
  const [sent, setSent] = useState(false);

  console.log(sent);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (sent) {
    return (
      <div className="w-full h-500px flex flex-col justify-center items-center h-[568px] border-b-2">
        <img
          className="h-20 transition-all scale-125 duration-200 mb-4 check"
          src={check}
          alt=""
        />
        <h3 className="text-3xl font-montserrat">
          Your post has been added succesfully
        </h3>
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col justify-center items-center border-b-2 h-[568px]">
        <div className="class mb-10  container ">
          <h1 className="text-3xl font-semibold font-title mb-6">
            Add your latest thoughts
          </h1>

          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <label htmlFor="">Trip Title</label>
            <input placeholder="Describe your trip"></input>
            <label htmlFor="">Location</label>
            <input placeholder="Share so others can experience too!"></input>
            <div
              className="h-40 flex flex-col justify-center items-center  hover:border-dotted transition-all ease-in-out 0.3s bg-gray-100"
              {...getRootProps()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-upload"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                <path d="M7 9l5 -5l5 5" />
                <path d="M12 4l0 12" />
              </svg>
              <h3 className="font-semibold font-rubik">Upload</h3>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
            <div>
              <a href="#">
                <button
                  type="submit"
                  className="flex justify-center items-center text-white py-2 px-8 rounded-lg bg-black text-sm  transition-all duration-200 hover:scale-110"
                >
                  Submit
                </button>
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default AddPost;
