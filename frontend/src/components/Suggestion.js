import { useState, useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"


const Suggestion = () => {


    // USER STUFF
    const { user } = useAuthContext()
    const [suggestion, setSuggestion] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isDone, setIsDone] = useState(false)
    const [again, setAgain] = useState(true)

    const [sendUser, setSendUser] = useState({
        gender: "",
        height: "",
        weight: ""
    })

    // WORKOUT STUFF

    
    
    useEffect(() => {
        // This effect will run whenever sendUser changes
        

        const gestuff = async () => {
            const userinfo = JSON.parse(localStorage.getItem('user'))

        setSendUser({
            gender: userinfo.gender,
            height: userinfo.height,
            weight: userinfo.weight
        })

        }
        
        gestuff()

      }, []);

    const handleClick = async (e) => {
        e.preventDefault()
        
        setIsLoading(true)

        const response = await fetch('/api/workouts/generate/generate', {
            method: 'POST',
            body: JSON.stringify(sendUser),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        // VERSION 1
        const unformatted = json.workout.content
        console.log("this is answer: ", json.workout.content)
        const formatSections = unformatted.split('\n\n');
        console.log("this is formatted sections", formatSections)
        const formatObjects = [];
        
        for (const section of formatSections) {
            const lines = section.split('\n');
            console.log("this is lines", lines)
            const data = {};


            for (const line of lines) {
                const [key, value] = line.split(': ');
                // data[key.startsWith('- ') ? key.slice(2) : key] = value;
                if (!key.startsWith(' - ')) {
                    data[key] = value;
                  }
                data[key] = value;
              }

              formatObjects.push(data)

        }
                
        console.log("this is formatted objects: ", formatObjects)

        setSuggestion(formatObjects)
        setIsLoading(false)
        setAgain(false)
        setIsDone(true)


        // VERSION 2

        // // Split the string into an array of lines
        // const lines = json.trim().split('\n');

        // // Initialize an empty array to store exercise objects
        // const exercises = [];

        // // Iterate through the lines and convert them to objects
        // lines.forEach((line, index) => {
        // const parts = line.split(', '); // Split the line by ', ' to extract exercise details
        // const exerciseObject = {};

        // parts.forEach((part) => {
        //     const [key, value] = part.split(': '); // Split each part by ': ' to get key and value
        //     exerciseObject[key] = value; // Assign the key-value pair to the object
        // });

        // exercises.push(exerciseObject); // Add the object to the array
        // });

        // setSuggestion(exercises)



        // The formatObjects should look like this:
        /*
            [
        {Exercise 1: 'Squats', Load: 'Barbell', - Load: 'Barbell', Repetitions: '8-10', - Repetitions: '8-10'}
        {Exercise 2: 'Bench Press', Load: 'Dumbbells', - Load: 'Dumbbells', Repetitions: '8-10', - Repetitions: '8-10'}
        {Exercise 3: 'Deadlifts', Load: 'Barbell', - Load: 'Barbell', Repetitions: '6-8', - Repetitions: '6-8'}
        {Exercise 4: 'Bent-Over Rows', Load: 'Barbell', - Load: 'Barbell', Repetitions: '8-10', - Repetitions: '8-10'}
            ]
        */

            // input can look like this
            /*
            Exercise 1: Squats, Load: Bodyweight, Repetitions: 12
            Exercise 2: Push-ups, Load: Bodyweight, Repetitions: 10
            Exercise 3: Lunges, Load: Bodyweight, Repetitions: 12 (each leg)
            Exercise 4: Plank, Load: Bodyweight, Repetitions: Hold for 30 seconds
            */


    }

    const handleAccept = (e) => {
        e.preventDefault()




    }


    return ( 
        <div>
            <button onClick={handleClick}> {again ? "Want a suggestion ?" : "Want another one?"} </button>
            {isLoading ? <div className="loading"> Loading... </div> : ""}
            <div>
                {suggestion.map((exercise, index) => (
                    <div key={index} className="exercise">
                        <h2>{Object.values(exercise)[0]}</h2>
                        <p>Load: {exercise['Load']}</p>
                        <p>Repetitions: {exercise['Repetitions']}</p>
                    </div>
                ))}
            </div>
            {isDone && <button onClick={handleAccept}> Accept workout</button>}
            
        </div>

     );
}
 
export default Suggestion;