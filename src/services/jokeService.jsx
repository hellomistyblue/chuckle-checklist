const jokeService = async (newJoke) => {
console.log(newJoke)

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



export default jokeService
 