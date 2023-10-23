import {  useEffect, useState } from "react";
import {
  MdCloudDone,
  MdEdit,
  MdOutlineAddPhotoAlternate,
} from "react-icons/md";
import { BiLoaderCircle, BiSolidTrashAlt } from "react-icons/bi";
import Modal from "../components/modal/Modal";
import avatar from "../assets/avatar.jpg";
import { Helmet } from "react-helmet";
import { addDocoment, deleteDocoment, getAllData } from "../firebase/services/AllService";
 
 
const Todo = () => {
  const [input ,setinput]=useState({email:'anis@gmail.com',photo:"anis.png",text:"",trash:false})
  const [modal, setmodal] = useState(false);
  const [AllTodo,setAllTodo]=useState(null)
 




 const handleInput=(e)=>{
  setinput((prevstate)=>({
    ...prevstate,
    [e.target.name]:e.target.value
  }))

 }

 const handleAddTodo=()=>{
  addDocoment('todos',input)
  setmodal(false)
 }

 useEffect(() => {

  (async function  immediateFunction() {
    const data= await getAllData('todos')
   setAllTodo(data) 
  })()


 

}, [modal])
 

console.log(AllTodo);
const handleDeleteTodo=(id)=>{
  console.log(id);
deleteDocoment('todos',"lhldWAodIruSLWK7BA20")
}

 

  return (
    <div className="w-full ">
      
      <Helmet>
        <meta charSet="utf-8" />
        <title>All todos</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Modal status={modal} setstatus={setmodal}>
        <p className="text-xl font-semibold  mb-3">Text :</p>

        <textarea
        onChange={handleInput}
          name='text' 
          value={input.text}
          id=""
          cols="30"
          className=" bg-slate-100 p-2 border focus:outline-none mb-5 rounded-md  w-10/12"
          rows="2"
        ></textarea>

        <label htmlFor="photo">
          <input type="file" name="" id="photo" className="hidden " />
          <MdOutlineAddPhotoAlternate className="w-64 h-64 border-4 border-black rounded-md  cursor-pointer" />
        </label>
        <button onClick={handleAddTodo} className="bg-blue-400  w-64 text-white py-1 text-lg rounded-md mt-3">
          Save
        </button>
      </Modal>
      <p className="font-semibold text-2xl p-5">All todos</p>
      <hr className="" />

      <div className=" m-4 space-y-2 overflow-hidden pb-10 sm:pb-0">
        <button
          onClick={() => setmodal(!modal)}
          className="py-1 bg-indigo-400 text-white px-5 rounded-md cursor-pointer font-semibold"
        >
          Add {}
        </button>
 
     
        {/* single todo  */}
{AllTodo?.reverse().map((item ,key)=>{
  return (
         <div key={key} className=" flex gap-2 items-start  bg-indigo-400 p-2 font-semibold text-lg      rounded-md px-4">
          <span className="text-white">{item.text}</span>
          <span className="  ms-auto bg-white text-yellow-400 p-2 rounded-md text-sm  cursor-pointer">
            panding
          </span>

          <span className="flex items-center gap-2 bg-white text-indigo-400 px-2 rounded-md py-2 text-sm cursor-pointer">
            edit <MdEdit />
          </span>
          <span onClick={()=>handleDeleteTodo(item.id)} className="  flex items-center gap-2 bg-red-400 border text-white px-2 rounded-md py-2 text-sm cursor-pointer">
            delete <BiSolidTrashAlt />
          </span>
          <span className="ml-4 ">
            {/* <BiLoaderCircle className="w-8 h-6 bg-white rounded-md cursor-pointer " /> */}
            <MdCloudDone className="w-8 h-6 bg-white rounded-md cursor-pointer " />
            {/* <BiSolidTrash className="w-8 h-6 bg-white rounded-md cursor-pointer " /> */}
          </span>
        </div>
  )
})}
   

        {/* single todo  */}

  <div className="pt-64"></div>
   <hr />
   <hr />


    {/* single todo  */}

        <div className=" flex gap-2 items-start  bg-indigo-400 p-2 font-semibold text-lg       rounded-md px-4">
          <span className="text-white">
            go to bazar Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit dolores eaque dolore eveniet minima est. Eum error
            sapiente ab facere?{" "}
            <img src={avatar} alt="" className="w-32 rounded-md" />{" "}
          </span>
          <span className=" ml-auto bg-white text-blue-400 p-2 rounded-md text-sm ms-5 cursor-pointer">
            added
          </span>

          <span className="flex items-center gap-2 bg-white text-indigo-400 px-2 rounded-md py-2 cursor-pointer text-sm ">
            edit <MdEdit />
          </span>
          <span className=" flex items-center gap-2 bg-red-400 border text-white px-2 rounded-md py-2 text-sm cursor-pointer">
            delete <BiSolidTrashAlt />
          </span>
          <span className="ml-4 ">
            <BiLoaderCircle className="w-8 h-6 bg-white rounded-md cursor-pointer " />
            {/* <MdCloudDone className="w-8 h-6 bg-white rounded-md cursor-pointer " /> */}
            {/* <BiSolidTrash className="w-8 h-6 bg-white rounded-md cursor-pointer " /> */}
          </span>
        </div>

        {/* single todo  */}
      </div>
    </div>
  );
};

export default Todo;
