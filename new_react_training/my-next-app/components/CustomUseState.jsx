import {useState} from "preact";

function theUseState(){
    const [first, setfirst] = useState("yogesh");
    return <>
        <button onClick={()=>{
            setfirst("somesh")
        }}>{first}</button>
    </>

}

export function userTest() {
  return theUseState();
}