import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, firebaseapp, storage } from "..";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { signOut } from "firebase/auth";
export const db = getFirestore(firebaseapp);

// add data
export const addDocoment = async (collectionName, data) => {
  return await addDoc(collection(db, collectionName), data);
};

// add data
export const updateDocoment = async (collectionName, data) => {
  return await updateDoc(doc(db, collectionName, data.id), data);
  // const single= await updateDoc(doc(db,'todos','KsaVQKpIQiEHtO6Q6pC1'),{email:"raza soinik",trash:"sasdf00",pho:"asdf",text:"dada vai"})
};
export const deleteDocoment = async (collectionName, data) => {
  return await deleteDoc(doc(db, collectionName, data.id));
};

//  get data
export const getAllData = async (collectionName) => {
  const todo = await getDocs(collection(db, collectionName));

  const alltodo = [];
  todo.forEach((item) => {
    alltodo.push({ ...item.data() });
  });

  return alltodo;
};

// get realtime data
export const getRealtimeData = (collectionName, stateName) => {
  onSnapshot(collection(db, collectionName), (snapshot) => {
    const datalist = [];
    snapshot.docs.forEach((item) => {
      datalist.push({ ...item.data(), id: item.id });
    });
    stateName(datalist);
  });
};

// get queryed data
export const getQueryData = (collectionName, stateName, queryfor, email) => {
  onSnapshot(
    query(
      collection(db, collectionName),
      where("email", "==", email)
      // orderBy(queryfor)
    ),
    (snapshot) => {
      const datalist = [];
      snapshot.docs.forEach((item) => {
        datalist.push({ ...item.data(), id: item.id });
      });
      stateName(datalist);
    }
  );
};

///sing out
export const singout = () => {
  signOut(auth);
  localStorage.removeItem("user");
};

// upload file
export const uploadFile = (file) => {
  uploadBytes(ref(storage, file.name), file);
};

// upload file with link
export const uploadFileWithlink = async (file) => {
  const data = await uploadBytesResumable(ref(storage, file.name), file);
  const photourl = await getDownloadURL(data.ref);

  return photourl;
};

// get time from seconds

export const GetDate = (data) => {
  var milliseconds = data * 1000;
  var date = new Date(milliseconds);
  return date.toDateString(); // You can format the date as per your requirement
};

// get time from seconds

export const GetTimeAndDate = (data) => {
  var milliseconds = data * 1000;
  var date = new Date(milliseconds);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are 0-indexed
  var day = ("0" + date.getDate()).slice(-2);
  var hours = ("0" + date.getHours()).slice(-2);
  var minutes = ("0" + date.getMinutes()).slice(-2);
  var seconds = ("0" + date.getSeconds()).slice(-2);
  var formattedDate = year + "-" + month + "-" + day;
  var formattedTime = hours + ":" + minutes + ":" + seconds;
  return formattedDate + " " + formattedTime;
};

// const single= await getDoc(doc(db,'todos','HmK3CCstcOJfquhnQHl6'))
// const single= await deleteDoc(doc(db,'todos','kaja5555'))
// const single= await updateDoc(doc(db,'todos','KsaVQKpIQiEHtO6Q6pC1'),{email:"raza soinik",trash:"sasdf00",pho:"asdf",text:"dada vai"})
// await addDoc(collection(db,'todos'),{email:"raza vai kaja"}).then((res)=>console.log(res))
// const  single = await setDoc(doc(db,'todos','kajssa55sss53333'),{email:"kaza",trash:'no ',text:"baja vai doll"})

// const todo=await getDocs(collection(db,'todos'))

// const alltodo =[]
// todo.forEach((item)=>{
//   alltodo.push({...item.data()})
// })
// console.log(alltodo);

// delete file
export const deleteFile = (link) => {
  const storage = getStorage();

  // Create a reference to the file to delete
  const desertRef = ref(storage, link);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};
