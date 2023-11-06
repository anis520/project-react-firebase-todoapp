import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import clickSoundStatusOk from "../../public/Sounds/statusok.mp3";
import clickSoundStatusNotOk from "../../public/Sounds/status!ok.mp3";
import ConfettiExplosion from "react-confetti-explosion";

import {
  MdClose,
  MdCloudDone,
  MdDelete,
  MdEdit,
  MdOutlineAddPhotoAlternate,
} from "react-icons/md";
import {
  BiLoaderCircle,
  BiSolidSelectMultiple,
  BiSolidTrashAlt,
} from "react-icons/bi";
import Modal from "../components/modal/Modal";
import avatar from "../assets/avatar.jpg";
import { Helmet } from "react-helmet";
import {
  GetDate,
  GetTimeAndDate,
  addDocoment,
  deleteDocoment,
  getAllData,
  getRealtimeData,
  updateDocoment,
} from "../firebase/services/AllService";
import { serverTimestamp } from "firebase/firestore";

const Todo = () => {
  const [statusok] = useState(new Audio(clickSoundStatusOk));
  const [statusNotok] = useState(new Audio(clickSoundStatusNotOk));
  const [isExploding, setIsExploding] = useState([false, null]);

  const [input, setinput] = useState({
    email: "anis@gmail.com",
    photo: "",
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

  const handleAddTodo = () => {
    addDocoment("todos", input);
    setmodal(false);
    setinput({
      email: "anis@gmail.com",
      photo: "",
      text: "",
      trash: false,
      time: serverTimestamp(),
      status: false,
    });
  };

  const getTodo = async () => {
    const data = await getAllData("todos");
    setAllTodo(data);
  };

  const handleRealtimeData = () => {
    getRealtimeData("todos", setAllTodo);
  };

  useEffect(() => {
    handleRealtimeData();
    // getTodo()
  }, []);

  // console.log(AllTodo[0].time.seconds);
  const handleDeleteTodo = (id) => {
    console.log(id);
    deleteDocoment("todos", id);
  };

  const handleupdate = (data) => {
    data.status ? statusNotok.play() : statusok.play();

    data.status
      ? setIsExploding([false, null])
      : setIsExploding([true, data.id]);
    console.log(isExploding);
    updateDocoment("todos", { ...data, status: !data.status });
  };
  return (
    <div className="w-full ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>All todos a</title>
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
          <input type="file" name="" id="photo" className="hidden " />
          <MdOutlineAddPhotoAlternate className=" w-64   h-44 md:h-64 border-4 border-black rounded-md  cursor-pointer" />
        </label>
        <button
          onClick={handleAddTodo}
          className="bg-blue-400  w-64 text-white py-1 text-lg rounded-md mt-3"
        >
          Save
        </button>
      </Modal>
      <p className="font-semibold text-2xl p-5">All todos</p>
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
            <span className="bg-slate-400   p-2 text-white font-semibold md:text-xl rounded-md animate-pulse w-7/12">
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
              <div key={item.id} className="bg-slate-300 p-3 rounded-md ">
                <div className="bg-white p-2 rounded-md ">
                  <div className="float-right w-4/12  sm:w-3/12 p-1 pr-0   md:pr-10 lg:pr-0 flex justify-center gap-1 md:gap-3">
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
                      {item.status ? (
                        <BiSolidSelectMultiple />
                      ) : (
                        <BiLoaderCircle />
                      )}
                    </span>
                    <span className="bg-blue-400 text-white font-semibold rounded-md p-1 text-sm cursor-pointer flex items-center gap-1">
                      {" "}
                      <span className="hidden md:block">
                        edit
                      </span> <MdEdit />{" "}
                    </span>
                    <span
                      onClick={() => handleDeleteTodo(item.id)}
                      className="bg-red-400 text-white font-semibold rounded-md p-1 text-sm cursor-pointer flex items-center gap-1"
                    >
                      {" "}
                      <span className="hidden md:block">delete</span>{" "}
                      <MdDelete />{" "}
                    </span>
                  </div>

                  <div className=" font-semibold text-slate-700 p-2  ">
                    <p
                      className={`${
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
                      <img
                        src={avatar}
                        alt=""
                        className="w-full md:ml-2   rounded-md border-slate-200 border-2"
                      />{" "}
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
