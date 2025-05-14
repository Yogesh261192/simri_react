export default function Input(props) {
    return <>
        <form action="#" onSubmit={props.get}>
        <input type="text" placeholder="item" value={props.todo} onChange={(e)=>{props.setTodo(e.target.value)}}/>
        <input type="text" placeholder="details" value={props.details} onChange={(e)=>{props.setDetails(e.target.value)}}/>
        <button>subimt</button>
        </form>
    </>
}

