
export default function Header(props){
    return(
    <header style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
      <span className='title'>TodoApp</span>
      <div style={{fontFamily:"cursive"}}>
        {props.cont}
      </div>
      
    </header>)
  }
