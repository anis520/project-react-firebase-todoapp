import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, updateDoc } from "firebase/firestore"
import { firebaseapp } from ".."
export const db = getFirestore(firebaseapp)




// add data 
 export const addDocoment=async(collectionName,data)=>{
   return  await addDoc(collection(db,collectionName),data)

 }
 
// add data 
 export const updateDocoment=async(collectionName,data)=>{
   return  await updateDoc(doc(db,collectionName,data.id),data)
             // const single= await updateDoc(doc(db,'todos','KsaVQKpIQiEHtO6Q6pC1'),{email:"raza soinik",trash:"sasdf00",pho:"asdf",text:"dada vai"})


 }
 export const deleteDocoment=async(collectionName,id)=>{
 
   return await deleteDoc(doc(db,collectionName,id))

 }


//  get data 
 export const getAllData=async(collectionName)=>{

  const todo=await getDocs(collection(db,collectionName))
    
    
            const alltodo =[]
            todo.forEach((item)=>{
              alltodo.push({...item.data()})
            })

            return alltodo

 }


// get realtime data 
export const getRealtimeData=(collectionName,stateName)=>{
  onSnapshot(collection(db,collectionName),(snapshot)=>{
    const datalist=[]
    snapshot.docs.forEach(item=>{
       datalist.push({...item.data(),id:item.id})
    })
    stateName(datalist)
  })
}



// get time from seconds

export const GetDate=(data)=> {
  var milliseconds = data * 1000;
  var date = new Date(milliseconds);
  return date.toDateString(); // You can format the date as per your requirement
}
// get time from seconds

export const GetTimeAndDate=(data)=> {
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
}

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