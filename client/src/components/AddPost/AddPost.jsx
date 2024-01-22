import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/Auth";

import check from "../../assests/check-sign.png";
import "./index.css";
import { ADD_THOUGHTS } from "../../utils/mutations";

const AddPost = () => {
  const [myFiles, setMyFiles] = useState([]);
  const [sent, setSent] = useState(false);
  console.log(sent);

  // UseNavigate Config
  const navigate = useNavigate();

  const [addThoughts, { error }] = useMutation(ADD_THOUGHTS);

  //   UseForm hook configuration
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // MAIN ONSUBMIT FUNCTION
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const { placeDetails } = await addThoughts({
        variables: {
          title: data.title,
          description: data.description,
          address: data.address,
          image: myFiles[0],
        },
      });

      setSent(true);

      toast.success("Post added successfully");
    } catch (error) {
      console.error(JSON.stringify(error));
      // setErr(error.message);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setMyFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const removeFile = (file) => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  const files = acceptedFiles.map((file) => (
    <li className="flex justify-between w-full font-semibold" key={file.path}>
      {file.path} - {file.size} bytes
      <svg
        onClick={removeFile(file)}
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-trash"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>
    </li>
  ));

  if (sent) {
    return (
      <div className="w-full h-500px flex flex-col justify-center items-center h-[568px] border-b-2">
        <img
          className="h-20 transition-all scale-125 duration-200 mb-4 check"
          src={check}
          alt=""
        />
        <h3 className="text-3xl font-montserrat">
          Scroll down to see what other viewers have been posting over the last
          few days
        </h3>
      </div>
    );
  } else {
    return (
      <>
        {Auth.loggedIn(localStorage.getItem("id_token")) && (
          <div
            className={
              sent
                ? `hidden`
                : `w-full flex flex-col justify-center items-center border-b-2 h-[690px] sm:h-[650px]`
            }
          >
            <div className="class mb-10 px-10 container max-w-[1200px] ">
              <h1 className="text-4xl font-semibold font-title my-6">
                Add your latest thoughts{" "}
              </h1>

              <form
                className="flex flex-col gap-2 "
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col w-full h-24">
                  {Object.keys(errors).length ? (
                    <h2 className="font-semibold text-lg text-red-400">
                      Oops, Something went wrong
                    </h2>
                  ) : (
                    <div></div>
                  )}
                  {errors.title && (
                    <span className="text-sm text-red-400">
                      - Please add a title for your trip
                    </span>
                  )}
                  {errors.address && (
                    <span className="text-sm text-red-400">
                      - Please add an address so others can visit too
                    </span>
                  )}
                  {errors.image && (
                    <span className="text-red-400 text-sm">
                      - Your must provide an image
                    </span>
                  )}
                </div>
                <label htmlFor="">Trip Title</label>
                <input
                  className={
                    errors.title && `border-2 border-solid border-red-300`
                  }
                  placeholder="Describe your trip"
                  {...register("title", { required: true })}
                ></input>
                <label htmlFor="">Location</label>
                <input
                  className={
                    errors.address && `border-2 border-solid border-red-300`
                  }
                  placeholder="Share the exact address, so others can experience too!"
                  {...register("address", { required: true })}
                ></input>
                <label htmlFor="">Description</label>
                <textarea
                  placeholder="Tell us all the wonderful things you saw and did!"
                  {...register("description")}
                ></textarea>

                {/* Drag n Drop */}
                <div
                  className={
                    errors.image &&
                    `border-2 border-solid border-red-300 rounded-lg`
                  }
                >
                  <div
                    className={
                      isDragActive
                        ? `h-40 flex flex-col justify-center items-center bg-gray-100 border-dotted border-2 border-gray-700 bg-gray-200 rounded-lg`
                        : `h-40 flex flex-col justify-center items-center bg-gray-100 rounded-lg`
                    }
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
                    <input
                      type={"image"}
                      {...register("image")}
                      {...getInputProps()}
                    />

                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>
                        Drag 'n' drop some files here, or{" "}
                        <span className="underline cursor-pointer">click</span>{" "}
                        to select files
                      </p>
                    )}
                  </div>
                </div>
                {myFiles.length >= 1 && (
                  <aside className="flex justify-between">
                    <ul className="w-full">{files}</ul>
                  </aside>
                )}
                <div>
                  <a href="#">
                    <button
                      type="submit"
                      className="flex justify-center items-center text-white py-2 px-8 rounded-lg bg-black text-sm  transition-all duration-200 hover:scale-110"
                      onSubmit={() => {
                        setSent(true);
                      }}
                    >
                      Submit
                    </button>
                  </a>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default AddPost;
