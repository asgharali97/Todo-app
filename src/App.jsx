import { useState,useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);


  const saveTodo = () => {
      setTodos([...todos, {id : uuidv4(),todo  }]);
      setTodo("");
      saveToL()
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (e,id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter((item)=>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveToL()
  }

  const handleDelete = (id)=>{
     let newTodos = todos.filter((item)=>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveToL()
  }

  const saveToL = ()=>{
    localStorage.setItem('todo' ,JSON.stringify(todo))
  }

  useEffect(()=>{
    let todoS = localStorage.getItem('todo')
    if(todoS){
       let todos = JSON.parse(localStorage.getItem('todo'))
       setTodos(todos)
    }
  },[])
  return (
    <>
      <div className="w-full h-screen bg-[#F8EDE3] flex  justify-center items-center">
        <div className="bg-[#8D493A] w-[45vw] h-4/5 rounded-xl">
          <div className="flex justify-center flex-wrap items-center my-10">
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              className="w-3/4 py-2 outline-none rounded-l-lg"
            />
            <button
              onClick={saveTodo}
              className="bg-[#DFD3C3] py-2 w-16 rounded-r-lg disabled:bg-[#F8EDE3]"
              disabled ={todo.length < 3 }
            >
              Add
            </button>
          </div>
          {todos.length === 0 && <div className="m-10 text-white">No Todo's to Display</div> }
          {todos.map(item => {  <div key={item.id}>
              <div  className="m-12 flex justify-between flex-wrap px-4 py-2 text-white rounded-lg hover:bg-[#D0B8A8]">
                <h2 className="font-bold text-lg cursor-pointer">{item.todo}</h2>
                <div className="buttons flex gap-6 items-center cursor-pointer">
                  <FiEdit className="hover:text-xl" onClick={(e) =>{handleEdit(e,item.id)}}/>
                  <MdDelete className="hover:text-xl" onClick={(e) =>{handleDelete(e,item.id)}} />
                </div>
              </div>
              </div>
          })}
        </div>
      </div>
    </>
  );
}
export default App;
