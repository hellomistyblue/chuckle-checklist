import "./App.css"
import { useState } from "react"
import jokeService from "./services/jokeService"


export const App = () => {
  const [jokeText, setJokeText] = useState("")

  return <div>
    <header className="app-heading-container">
      <h1 className="app-heading-text">
        Chuckle Checklist
      </h1>
    </header>
    <div className="joke-add-form">
      <input
        className="joke-input"
        type="text"
        placeholder="New One Liner"
        onChange={(event) => { 
          setJokeText(event.target.value) 
        }}
      />
      <button 
        onClick={() => { jokeService(jokeText) }}
        className="joke-input-submit">
          Send Joke!
      </button>
    </div>
  </div>
}

