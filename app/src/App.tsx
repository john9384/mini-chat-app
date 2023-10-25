import React from "react"
import "./App.css"
import io from "socket.io-client"

const socket = io("http://localhost:4000")

function App() {
  const [currentMessage, setCurrentMessage] = React.useState("")
  const [messages, setMessages] = React.useState<any>([])
  const sendMessage = () => {
    socket.emit("send_message", { message: currentMessage })
    setCurrentMessage("")
  }

  React.useEffect(() => {
    socket.on("recieved_message", (data) => {
      setMessages([...messages, data.message])
    })
  }, [socket])
  console.log(messages)
  return (
    <div className="App">
      <div>
        <br></br>
        <input
          type="text"
          placeholder="Input message"
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
        />
        <button onClick={sendMessage}>Send message</button>
      </div>
      <div>
        {messages.length > 0 &&
          messages.map((message: any) => <p>{message}</p>)}
      </div>
    </div>
  )
}

export default App
