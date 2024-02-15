import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
function App() {
  const [username, setusername] = useState("");
  const [chatActive, setChatActive] = useState(false);
   const [messages , setmessages ] = useState([])
   const [NewMessage , newSetmessage ] = useState('')

   useEffect(()=>{
   socket.on('recieved-message',(message)=>{
    setmessages([...messages,message])
   })
   },[messages,socket])
   
   function handleSubmit(e){
    e.preventDefault()

    const messageData = {
      message : NewMessage,
      user:username,
      time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() ,
   }
   !NewMessage == "" ? socket.emit('send-message',messageData) : alert('message cannot be empty ')

  newSetmessage('')

  }
   

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      {chatActive ? (
        <div className="rounded-md p-2 w-full md:w-[80vw] lg:w-[40vw] ">
          <h1 className="text-center font-bold text-xl uppercase">Room Chat </h1>
          <div>
            <div className="overflow-y-scroll h-[80vh] lg:h-[60vh]">
            {
              messages.map((message , index)=>{
                return <div key={index} className={`flex rounded-md shadow-md my-5 w-fit ${username === message.user && "ml-auto"}` }> 
                  <div className="bg-green-400 flex justify-center items-center rounded-l-md">
                      <h3 className="font-bold text-lg px-2">{message.user.charAt(0).toUpperCase()}</h3>
                  </div>
                  <div className="px-2 bg-white rounded-md">
                    <span className="text-sm">{message.user}</span>
                    <h3 className="font-bold">{message.message}</h3>
                    <span className="text-xs text-right ">{message.time}</span>

                  </div>
                </div>
              })
            }

            </div>
            <form onSubmit={handleSubmit} className="flex md:gap-4 justify-between ">
              <input type="text" placeholder="Type your message...." className="w-full py-2 rounded-md border-2 outline-none px-3" 
                onChange={(e)=>newSetmessage(e.target.value)}
                value={NewMessage}
              />
            <button className="px-3 py-2 bg-green-600 text-white rounded-md font-bold " type="submit">Submit</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen gap-2 flex justify-center items-center ">
          <input
            type="text"
            name=""
            id=""
            value={username}
            placeholder="Add Your Username "
            className="text-center px-3 py-2 outline-none border-2 rounded-md"
            onChange={(e) => setusername(e.target.value)}
          />
          <button
            onClick={() => !username == "" && setChatActive(true)}
            className="bg-green-600 text-white px-3 py-2 rounded-md "
          >
            Start chat{" "}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
