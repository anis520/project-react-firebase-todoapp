import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore"
import { firebaseapp } from ".."
const db = getFirestore(firebaseapp)





 export const addDocoment=async(collectionName,data)=>{
   return  await addDoc(collection(db,collectionName),data)

 }
 export const deleteDocoment=async(collectionName,id)=>{
 
   return await deleteDoc(doc(db,collectionName,id))

 }
 export const getAllData=async(collectionName)=>{

  const todo=await getDocs(collection(db,collectionName))
    
    
            const alltodo =[]
            todo.forEach((item)=>{
              alltodo.push({...item.data()})
            })

            return alltodo

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