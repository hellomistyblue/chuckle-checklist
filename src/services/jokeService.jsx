export const postJoke = async (newJoke) => {

    if (newJoke !== "") {
        const postOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    text: newJoke,
                    told: false 
                }
            )
        }
        const response = await fetch("http://localhost:8088/jokes", postOptions)       
    }

    else {
        window.alert(`Please enter text to submit joke`)
    }
}


export const getAllJokes = async () => {
    return await fetch(`http://localhost:8088/jokes`).then(res => res.json())
}

export const patchJoke = async (editedJokeObject) => {
        const patchOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    told: !editedJokeObject.told
                }
            )
        }
        const response = await fetch(`http://localhost:8088/jokes/${editedJokeObject.id}`, patchOptions)
}
 
export const deleteJoke = async (deletedJokeObject) => {
    const deleteOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }
    const response = await fetch(`http://localhost:8088/jokes/${deletedJokeObject.id}`, deleteOptions)
}