import { useState, useEffect } from "react"
import db from "../firebase"
import {onSnapshot, collection, addDoc,deleteDoc, doc, setDoc} from "firebase/firestore"
function Form(){
    const[newItem,setNewItem]=useState("")
    const[newTask, setNewTask]=useState([])

    useEffect(()=>{
        const sub = onSnapshot(collection(db,"collections"), (snapshot)=>{
            setNewTask(snapshot.docs.map((doc)=> ({...doc.data(), id:doc.id})))
        })
        return sub
    },[])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const collectionRef = collection(db,"collections")
        const payload = {tasks:newItem}
        await addDoc(collectionRef,payload)
        setNewItem("")
    }
    const handleEdit = async(id)=>{
        const edited = prompt("Edit task: ")
        const payload = {tasks:edited}
        const docRef = doc (db, "collections", id)
        setDoc(docRef,payload)

    }
    const handleDelete = async(id)=>{
        const docRef = doc(db,"collections", id)
        deleteDoc(docRef)
    }
    return(
        <>
            <form className="form" onSubmit={handleSubmit}>
                <h1>Write your new task</h1>
                <input className="textbox" type="text" value={newItem} onChange={e=>setNewItem(e.target.value)} placeholder="Type here! "/><br></br>
                <button>Add</button>
            </form>
            
            {newTask.map((task)=>{
                return[
                <li key={task.id} className="task-list">
                <label className="task-item">{task.tasks}
                    
                </label>
                <button className="edit-button" onClick = {()=>handleEdit(task.id)}>Edit</button>
                <button className="delete-button" onClick={()=>handleDelete(task.id)}>Delete</button>
                </li>
                ]
            })
            }
        </>
    )
}

export default Form