import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import clickSoundStatusOk from "../../public/Sounds/statusok.mp3";
import clickSoundStatusNotOk from "../../public/Sounds/status!ok.mp3";
import ConfettiExplosion from "react-confetti-explosion";
import { LazyLoadImage } from "react-lazy-load-image-component";

import {
  MdClose,
  MdDelete,
  MdEdit,
  MdOutlineAddPhotoAlternate,
} from "react-icons/md";
import { BiLoaderCircle, BiSolidSelectMultiple } from "react-icons/bi";
import Modal from "../components/modal/Modal";
import avatar from "../assets/avatar.jpg";
import { Helmet } from "react-helmet";
import {
  GetDate,
  addDocoment,
  deleteDocoment,
  getQueryData,
  updateDocoment,
  uploadFile,
  uploadFileWithlink,
} from "../firebase/services/AllService";
import { serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { useSelector } from "react-redux";

const Todo = () => {
  const [statusok] = useState(new Audio(clickSoundStatusOk));
  const [statusNotok] = useState(new Audio(clickSoundStatusNotOk));
  const [isExploding, setIsExploding] = useState([false, null]);

  const { user } = useSelector((state) => state.auth);
  const [input, setinput] = useState({
    email: user.email,
    photo: null,
    text: "",
    trash: false,
    time: serverTimestamp(),
    status: false,
  });

  const [modal, setmodal] = useState(false);
  const [AllTodo, setAllTodo] = useState(null);

  const handleInput = (e) => {
    setinput((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddTodo = async () => {
    setmodal(false);

    if (input.photo) {
      const data = await uploadBytesResumable(
        ref(storage, input.photo.name),
        input.photo
      );
      const photourl = await getDownloadURL(data.ref);

      await addDocoment("todos", { ...input, photo: photourl });
    } else {
      addDocoment("todos", input);
    }

    setinput({
      email: user.email,
      photo: null,
      text: "",
      trash: false,
      time: serverTimestamp(),
      status: false,
    });
  };

  const handleRealtimeData = () => {
    // getRealtimeData("todos", setAllTodo);
    getQueryData("todos", setAllTodo, "status", user.email);
  };

  useEffect(() => {
    handleRealtimeData();
    setIsExploding([false, null]);
  }, []);

  const handleDeleteTodo = (data) => {
    deleteDocoment("todos", data);
  };

  const handleupdate = (data) => {
    data.status ? statusNotok.play() : statusok.play();

    data.status
      ? setIsExploding([false, null])
      : setIsExploding([true, data.id]);

    updateDocoment("todos", { ...data, status: !data.status });
  };
  return (
    <div className="w-full ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>All todos </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Modal status={modal} setstatus={setmodal}>
        <p className="text-xl font-semibold  mb-3">Text :</p>

        <textarea
          onChange={handleInput}
          name="text"
          value={input.text}
          id=""
          cols="30"
          className=" bg-slate-100 p-2 border focus:outline-none mb-5 rounded-md  md:w-10/12"
          rows="2"
        ></textarea>

        <label htmlFor="photo">
          <input
            type="file"
            name="photo"
            id="photo"
            className="hidden"
            onChange={(e) => setinput({ ...input, photo: e.target.files[0] })}
          />
          <MdOutlineAddPhotoAlternate className=" w-64   h-44 md:h-64 border-4 border-black rounded-md  cursor-pointer" />
        </label>
        <button
          onClick={handleAddTodo}
          className="bg-blue-400  w-64 text-white py-1 text-lg rounded-md mt-3"
        >
          Save
        </button>
      </Modal>
      <p className="font-semibold text-2xl p-5 dark:text-white">All todos</p>
      <hr className="" />

      <div className=" m-4 space-y-2 overflow-hidden pb-10 sm:pb-0">
        <button
          // onClick={() => setmodal(!modal)}
          onClick={() => setmodal(!modal)}
          className="py-1 bg-indigo-400 text-white px-5 rounded-md cursor-pointer font-semibold"
        >
          Add {}
        </button>
        {/* loading start      */}
        {!AllTodo && (
          <h3 className="p-3 bg-slate-200 animate-pulse flex  rounded-md gap-4">
            {" "}
            <span className="bg-slate-400   p-2 text-white font-semibold md:text-xl rounded-md animate-pulse w-6/12">
              {" "}
              Loading . . . . .
            </span>{" "}
            <span className="bg-slate-400  w-5/12 rounded-md p-2"></span>{" "}
          </h3>
        )}
        {!AllTodo && (
          <h3 className="p-3 bg-slate-200 animate-pulse flex  rounded-md gap-4">
            {" "}
            <span className="bg-slate-400   p-2 text-white font-semibold md:text-xl rounded-md animate-pulse w-3/12"></span>{" "}
            <span className="bg-slate-400  w-9/12 rounded-md p-2"></span>{" "}
          </h3>
        )}
        {/* loading end      */}
        {/* <Reorder.Group
          axis="y"
          values={AllTodo ? AllTodo : []}
          onReorder={setAllTodo}
        ><Reorder.Item key={item} value={item}> 
       </Reorder.Item>    </Reorder.Group> */}
        {AllTodo?.map((item) => {
          return (
            <>
              <div
                key={item.id}
                className={` bg-slate-300 p-3 rounded-md  ${
                  item.status && "opacity-50"
                } `}
              >
                <div className="bg-white p-2 rounded-md ">
                  <div className="float-right w-4/12   sm:w-3/12 p-1 pr-0   md:pr-10 lg:pr-0 flex justify-around md:justify-center  gap-1  md:gap-3">
                    {isExploding[0] == true && isExploding[1] == item.id && (
                      <ConfettiExplosion />
                    )}
                    <span
                      onClick={() => handleupdate(item)}
                      className={` ${
                        item.status ? "bg-green-400" : "bg-yellow-400"
                      }    text-white font-semibold rounded-md p-1 text-sm cursor-pointer flex items-center gap-1`}
                    >
                      {" "}
                      <span className="hidden md:block">
                        {item.status ? "completed" : "complete"}
                      </span>{" "}
                      <span className="">
                        {item.status ? (
                          <BiSolidSelectMultiple className="h-6 w-6" />
                        ) : (
                          <BiLoaderCircle className="h-6 w-6" />
                        )}
                      </span>
                    </span>
                    {/* <span className="bg-blue-400 text-white font-semibold rounded-md p-1 text-sm cursor-pointer flex items-center gap-1">
                      {" "}
                      <span className="hidden md:block">edit</span>{" "}
                      <MdEdit className="h-6 w-6" />{" "}
                    </span> */}
                    <span
                      onClick={() => handleDeleteTodo(item)}
                      className="bg-red-400 text-white font-semibold rounded-md p-1 text-sm cursor-pointer flex items-center gap-1"
                    >
                      {" "}
                      <span className="hidden md:block">delete</span>{" "}
                      <MdDelete className="h-6 w-6" />{" "}
                    </span>
                  </div>

                  <div className=" md:font-semibold text-slate-700 p-2  ">
                    <p
                      className={`text-xs ${
                        item.time
                          ? "bg-transparent  w-5/12 md:w-2/12"
                          : "bg-gray-200 w-5/12 md:w-2/12 px-2 rounded-md"
                      }`}
                    >
                      {item.time
                        ? GetDate(item?.time?.seconds)
                        : "loading . ..  . ."}
                    </p>
                    <hr className=" w-5/12  md:w-2/12" />
                    <p className="">{item.text}</p>
                  </div>

                  {item.photo && (
                    <div className="relative w-full md:w-3/12  p-2">
                      <MdClose className="absolute right-3 md:right-1 top-3 bg-red-500 hover:scale-105 duration-500 text-white h-6 w-6 rounded-md cursor-pointer " />
                      <LazyLoadImage
                        src={item.photo}
                        width={600}
                        height={400}
                        className="w-full max-h-44 object-cover md:ml-2   rounded-md border-slate-200 border-2"
                        alt="Image Alt"
                      />
                      {/* <img
                        src={item.photo}
                        alt=""
                        className="w-full md:ml-2   rounded-md border-slate-200 border-2"
                      />{" "} */}
                    </div>
                  )}
                </div>
              </div>
            </>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default Todo;
