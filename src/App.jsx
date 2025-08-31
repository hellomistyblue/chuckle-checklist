import { useEffect, useState } from "react"
import { postJoke, getAllJokes, patchJoke, deleteJoke } from "./services/jokeService"


export const App = () => {
  const [allJokes, setAllJokes] = useState([])
  const [jokeText, setJokeText] = useState("")
  const [toldJokes, setToldJokes ] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([]) 

  useEffect(
    () => {
      getAllJokes().then(
        (jokesArray) => {
          setAllJokes(jokesArray)
        }
      )
      console.log(allJokes, "first")
    },
    []
  )

  useEffect(
    () => {
      const filteredTold = allJokes.filter(
        (jokeItem) => jokeItem.told === true
      )
      setToldJokes(filteredTold)
      const filteredUntold = allJokes.filter(
        (jokeItem) => jokeItem.told === false
      )
      setUntoldJokes(filteredUntold)
      console.log(allJokes, "second")
    }, 
    [allJokes]
  )

  const handleAddJoke = async () => { 
    await postJoke(jokeText)
    const updatedJokes = await getAllJokes()
    setAllJokes(updatedJokes)    
    setJokeText("")
  }
  const handleEditJoke = async (editedJokeObject) => {
    await patchJoke(editedJokeObject)
    const updatedJokes = await getAllJokes()
    setAllJokes(updatedJokes)
  }

  const handleDeleteJoke = async (deletedJokeObject) => {
    await deleteJoke(deletedJokeObject)
    const updatedJokes = await getAllJokes()
    setAllJokes(updatedJokes)
  }

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
        value={jokeText}
        onChange={(event) => { 
          setJokeText(event.target.value) 
        }}
      />
      <button 
        onClick={() => { handleAddJoke() }}
        className="joke-input-submit">
          Send Joke!
      </button>
    </div>
    <div className="joke-lists-container">
      <div className="joke-list-container">
          <h2>Untold <span className="untold-count">{untoldJokes.length}</span></h2>
          <ul>
            {untoldJokes.map(
              (untoldJoke) => {
                return (
                  <li key={untoldJoke.id} className="joke-list-item">
                    <p className="joke-list-item-text">{untoldJoke.text}</p>
                    <div>
                      <button className="joke-list-action-toggle"
                      onClick={() => { 
                        handleDeleteJoke(untoldJoke)
                      }}                    
                      >🗑️</button>
                      <button className="joke-list-action-toggle"
                      onClick={() => { 
                        handleEditJoke(untoldJoke)
                      }}                    
                      >❌</button>
                    </div>
                  </li>
                )
              }
            )}
          </ul>
      </div>
      <div className="joke-list-container">
          <h2>Told <span className="told-count">{toldJokes.length}</span></h2>
          <ul>
            {toldJokes.map(
              (toldJoke) => {
                return (
                  <li key={toldJoke.id} className="joke-list-item">
                    <p className="joke-list-item-text">{toldJoke.text}</p>
                    <div>
                      <button className="joke-list-action-toggle"
                      onClick={() => { 
                        handleDeleteJoke(toldJoke)
                      }}                    
                      >🗑️</button>                      
                      <button className="joke-list-action-toggle"
                      onClick={() => { 
                        handleEditJoke(toldJoke)
                      }}>✅</button>                      
                    </div>
                  </li>
                )
              }
            )}
          </ul>
      </div>
    </div>
  </div>
}


