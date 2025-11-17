import { useEffect, useState } from "react"


function App() {
  const [task, setTask] = useState("")
  const [todos, setTodos] = useState(() => {
    const saveTodos = localStorage.getItem("todos")
    return saveTodos ? JSON.parse(saveTodos) : []
  })

  // load the localstorage
  useEffect(() => {
    const saveTodos = JSON.parse(localStorage.getItem("todos"))
    if(Array.isArray(saveTodos)){
      setTodos(saveTodos)
    }
  },[])

  // save todos to localstorage whenever changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])

  // add todo
  const addTodo = () => {
    if(task.trim() === "") return

    setTodos([...todos, {id: Date.now(), text: task, completed: false}])
    setTask("")
  }

  // Toggle todo 
  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo)
    )
  }

  // delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  
  // clear completed
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }


  // count values
  const leftCount = todos.filter((t) => !t.completed).length
  const completedCount = todos.length - leftCount


  //
  const resetAll = () => {
    const confirm = window.confirm("Are you sure you want to reset all tasks?")
    if(!confirm) return

    setTodos([])
    localStorage.removeItem("todos")
  } 

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center p-5">
      <div className=" bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          DailyDo
        </h1>

        {/* input and Add button */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add your task..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button
            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
            onClick={addTodo}
          >Add</button>
        </div>

        {/* Summary */}
        <div className="flex justify-between items-center mb-4 text-gray-600">
          <span>{leftCount} Left</span>
          <span>{completedCount} Completed</span>
          <button
            className="text-red-600 hover:underline"
            onClick={clearCompleted}
          >Clear Completed
          </button>

          <button
            className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-700 hover:transition"
            onClick={resetAll}
          >Reset all</button>
        </div>

        {/* Todo list */}
        <div className="space-y-3">
          {todos.map((todo) => (
            <div 
              key={todo.id}            
              className="flex justify-between items-center bg-gray-100 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-2 ">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="ml-3"
                />

                <span
                  className={
                    "text-lg "+
                    (todo.completed ? "line-through text-gray-400" : "")
                  }
                >
                  {todo.text}
                </span>
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 font-semibold mr-3 my-1"
              >
                Delete
              </button>
              
            </div>  
          ))}

          {todos.length === 0 && (
            <p className="text-center text-gray-400">No tasks added yet</p>
          )}
        </div>
        


      </div>
    </div>
  )
}

export default App
