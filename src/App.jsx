import { useState,useRef ,useEffect} from 'react'
import './App.css'
import Header from "./components/header"
import axios from 'axios'; 

function App() {
  const [tasks, settasks] = useState(() => {
    return localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
  });
  const [quote,setquote] = useState([])

  const inputref = useRef()

  async function fetchquote() {
    try{
      const res = await axios.get('http://api.quotable.io/random')
      setquote(res.data.content)
    } catch(err) {
      console.error("error in quote api",err);
    }
  }
  useEffect(()=>{
    
    fetchquote()

  },[])

  useEffect(() => {
    console.log(quote)
  },[quote])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function insert(){
    const newtask = inputref.current?.value.trim();
    
    if(newtask){
      settasks([...tasks,{text:newtask,priority:"medium"}]);
      inputref.current.value = ''
      console.log(tasks)
    }
  }

  function TaskInput(){
    return(
      <div style={{display:"flex",justifyContent:"center"}}>
        <div>
          <input ref={inputref} className='inputbox' type="text" placeholder='Write a Task TODO' />
        </div>
        <div>
          <button onClick={insert} className='gobtn'>Go!</button>
        </div>       
      </div>
    )
  }

  
  function del(index){
    const newarr = [...tasks];
    newarr.splice(index,1);
    settasks(newarr)
  }

  function togglePriority(index){
    const newarr = [...tasks]
    const priorities = ["high", "medium", "low"];
    const nxt = priorities[(priorities.indexOf(newarr[index].priority) + 1) % 3]    
    newarr[index].priority = nxt
    settasks(newarr)
  }

  function pc(priority){
    if (priority === "high") return "#D62828";
    if (priority === "medium") return "#E9C46A";
    return "#4CAF50";
  }

  function TaskList(){
    return(
      <ul className='taskbox'>
        {tasks.map((task, index) => (
          <div className='task' style={{backgroundColor:pc(task.priority)}} key={index}>
            <div>{task.text}</div>
            <div style={{boxShadow:"7px 7px 5px",borderRadius:"25px"}}>
              <button className='prioritybtn' onClick={() => togglePriority(index)}>priority</button>
              <button className='deletebtn'  onClick={() => del(index)}>delete</button>
            </div>
          </div>
        ))}
      </ul>
      )
    }

  return (
    <>
      <Header cont={quote} />
      <TaskInput/>
      <TaskList/>
    </>
  )
}

export default App
