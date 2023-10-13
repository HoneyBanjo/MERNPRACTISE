import { useState, useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"


const Suggestion = () => {


    // USER STUFF
    const { user } = useAuthContext()
    const { dispatch } = useWorkoutsContext()
    const [suggestion, setSuggestion] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isDone, setIsDone] = useState(false)
    const [again, setAgain] = useState(true)
    const [refPage, setRefPage] = useState(false)


    const [sendUser, setSendUser] = useState({
        gender: "",
        height: "",
        weight: "",
        age: "",
        medicalConditions: "",
        injuries: "",
        injuryHistory: "",
        exerciseHistory: "",
        exercisePreferences: "",
        dislikedExercises: "",
        fitnessGoals: "",
        timeCommitment: "",
        equipmentAccess: "",
        stressLevels: "",
        sleepPatterns: "",
        dietaryHabits: "",
        dietaryRestrictions: ""
    })

    // WORKOUT STUFF

    
    
    useEffect(() => {
        // This effect will run whenever sendUser changes
        

        const gestuff = async () => {
            const userinfo = JSON.parse(localStorage.getItem('user'))

        setSendUser({
            gender: userinfo.gender,
            height: userinfo.height,
            weight: userinfo.weight,
            age: userinfo.age,
            medicalConditions: userinfo.medicalConditions,
            injuries: userinfo.injuries,
            injuryHistory: userinfo.injuryHistory,
            exerciseHistory: userinfo.exerciseHistory,
            exercisePreferences: userinfo.exercisePreferences,
            dislikedExercises: userinfo.dislikedExercises,
            fitnessGoals: userinfo.fitnessGoals,
            timeCommitment: userinfo.timeCommitment,
            equipmentAccess: userinfo.equipmentAccess,
            stressLevels: userinfo.stressLevels,
            sleepPatterns: userinfo.sleepPatterns,
            dietaryHabits: userinfo.dietaryHabits,
            dietaryRestrictions: userinfo.dietaryRestrictions
        })

        }
        
        gestuff()
        console.log("useEffect ran")

      }, [refPage]);

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
                
                if (key === 'Exercise') {
                    // Set the entire description as the exercise title
                    data.Exercise = value;
                }
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

    const handleAccept = async (e) => {
        e.preventDefault()

        console.log(suggestion)

        // store this data to workout suggestions?


        for (const workout of suggestion) {


            const workoutData = {
                title: Object.values(workout)[0],
                load: workout['Load in kg'],
                reps: workout['Repetitions'],
                sets: workout['Sets'],
                rest: workout['Rest'],
                user_id: user._id
            };

            console.log(workoutData)

            const response = await fetch('/api/workouts/', {
                method: 'POST',
                body: JSON.stringify(workoutData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {

                console.log("new workout added", json)
                dispatch({type: 'CREATE_WORKOUT', payload: json})
            }

        }

        setRefPage(true)

    }


    return ( 
        <div>
            <button onClick={handleClick}> {again ? "Want a suggestion ?" : "Want another one?"} </button>
            {isLoading ? <div className="loading"> Loading... </div> : ""}
            <div>
                {suggestion.map((exercise, index) => (
                    <div key={index} className="exercise">
                        <h2>{Object.values(exercise)[0]}</h2>
                        <p>Load: {exercise['Load in kg']}</p>
                        <p>Repetitions: {exercise['Repetitions']}</p>
                        <p>Sets: {exercise['Sets']}</p>
                        <p>Rest: {exercise['Rest']}</p>
                    </div>
                ))}
            </div>
            {isDone && <button onClick={handleAccept}> Accept workout</button>}
            
        </div>

     );
}
 
export default Suggestion;