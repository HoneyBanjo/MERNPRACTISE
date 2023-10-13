import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [sets, setSets] = useState("")
    const [rest, setRest] = useState("")
    const [equipment, setEquipment] = useState("")

    
    const [error, setError] = useState("")
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError("You must be logged in")
            return
        }

        const workout = {title, load, reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)
            setEmptyFields([])
            console.log("new workout added", json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    } 



    return (
        <div>
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>

            <label>Exercize title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? 'error' : ''}
            />

            <label>Sets: </label>
            <input
                type="number"
                onChange={(e) => setSets(e.target.value)}
                value={sets}
                className={emptyFields.includes("sets") ? 'error' : ''}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes("reps") ? 'error' : ''}
            />

            <label>Load in kg:</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes("load") ? 'error' : ''}
            />
            <label>Rest in seconds: </label>
            <input
                type="number"
                onChange={(e) => setRest(e.target.value)}
                value={rest}
                className={emptyFields.includes("load") ? 'error' : ''}
            />
            <label>Equipment: </label>
            <input
                type="text"
                onChange={(e) => setEquipment(e.target.value)}
                value={equipment}
                className={emptyFields.includes("load") ? 'error' : ''}
            />

            



            <button>Add workout</button>
            {error && <div className="error">{error}</div>}
        </form>

        

        </div>
        

    )
}

export default WorkoutForm;