import { useEffect, useState } from "react";
import {useUserContext} from "../hooks/useUserContext"
import { useAuthContext } from "../hooks/useAuthContext";


const UserDetails = () => {
    const {user} = useAuthContext()


    // Physical stuff 
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState(''); // For the Age


    // Medical stuff
    const [medicalConditions, setMedicalConditions] = useState(''); // For Medical Conditions
    const [injuries, setInjuries] = useState(''); // For Injuries
    const [injuryHistory, setInjuryHistory] = useState(''); // For Injury History


    // Exercise stuff
    const [exerciseHistory, setExerciseHistory] = useState(''); // For Exercise History
    const [exercisePreferences, setExercisePreferences] = useState(''); // For Exercise Preferences
    const [dislikedExercises, setDislikedExercises] = useState(''); // For Disliked Exercises
    const [fitnessGoals, setFitnessGoals] = useState(''); // For the Fitness Goals


    // Resources
    const [timeCommitment, setTimeCommitment] = useState(''); // For Time Commitment
    const [equipmentAccess, setEquipmentAccess] = useState(''); // For Equipment Access

    const [stressLevels, setStressLevels] = useState(''); // For Stress Levels
    const [sleepPatterns, setSleepPatterns] = useState(''); // For Sleep Patterns


    // Nutrition stuff 

    const [dietaryHabits, setDietaryHabits] = useState(''); // For Dietary Habits
    const [dietaryRestrictions, setDietaryRestrictions] = useState(''); // For Dietary Restrictions

  

    useEffect(() => {
        

        const getData = async () => {

            console.log("still works", user._id)
            

            const response = await fetch('/api/user/info/' + user._id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            setGender(json.gender)
            setHeight(json.height)
            setWeight(json.weight)
            setAge(json.age)
            setMedicalConditions(json.medicalConditions)
            setInjuries(json.injuries)
            setInjuryHistory(json.injuryHistory)
            setExerciseHistory(json.exerciseHistory)
            setExercisePreferences(json.exercisePreferences)
            setDislikedExercises(json.dislikedExercises)
            setFitnessGoals(json.fitnessGoals)
            setTimeCommitment(json.timeCommitment)
            setEquipmentAccess(json.equipmentAccess)
            setStressLevels(json.stressLevels)
            setSleepPatterns(json.sleepPatterns)
            setDietaryHabits(json.dietaryHabits)
            setDietaryRestrictions(json.dietaryRestrictions)
            
        }
        
        getData()  

    }, [])
    

    const handleSubmit = async (e) => {
        e.preventDefault()


        const userInfo = {
            gender, 
            height, 
            weight,
            age,
            medicalConditions,
            injuries,
            injuryHistory,
            exerciseHistory,
            exercisePreferences,
            dislikedExercises,
            fitnessGoals,
            timeCommitment,
            equipmentAccess,
            stressLevels,
            sleepPatterns,
            dietaryHabits,
            dietaryRestrictions
        }

        const sendData = async () => {
            const response = await fetch('/api/user/info/' + user._id, {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            setGender(response.gender)
            setHeight(response.height)
            setWeight(response.weight)
            setAge(response.age)
            setMedicalConditions(response.medicalConditions)
            setInjuries(response.injuries)
            setInjuryHistory(response.injuryHistory)
            setExerciseHistory(response.exerciseHistory)
            setExercisePreferences(response.exercisePreferences)
            setDislikedExercises(response.dislikedExercises)
            setFitnessGoals(response.fitnessGoals)
            setTimeCommitment(response.timeCommitment)
            setEquipmentAccess(response.equipmentAccess)
            setStressLevels(response.stressLevels)
            setSleepPatterns(response.sleepPatterns)
            setDietaryHabits(response.dietaryHabits)
            setDietaryRestrictions(response.dietaryRestrictions)

        }
        

        sendData()


    }

    return ( 
        <div className="form-container">
            <h3>Give your info man</h3>
            <form className="form-d" onSubmit={handleSubmit}>

                <div className="form-inner">
                    <div className="form-column">
                    <h3> Physical stuff </h3>

                    <h4>Gender: {gender}</h4>
                    <input
                        type="text"
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                        // className={emptyFields.includes("title") ? 'error' : ''}
                    />

                    
                    <h4>Height: {height}</h4>

                    <input
                        type="text"
                        onChange={(e) => setHeight(e.target.value)}
                        value={height}
                        // className={emptyFields.includes("load") ? 'error' : ''}
                    />

                    <h4>Weight: {weight}</h4>

                    <input
                        type="text"
                        onChange={(e) => setWeight(e.target.value)}
                        value={weight}
                        // className={emptyFields.includes("reps") ? 'error' : ''}
                    />

                    <h4>Age: {age}</h4>
                    <input
                        type="text"
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                        // className={emptyFields.includes("title") ? 'error' : ''}
                    />

                    </div>

                    <div className="form-column">
                    <h3> Medical stuff </h3>

                    <h4>Medical Conditions: {medicalConditions}</h4>
                    <input
                        type="text"
                        onChange={(e) => setMedicalConditions(e.target.value)}
                        value={medicalConditions}
                        // className={emptyFields.includes("title") ? 'error' : ''}
                    />
                    <h4>Injuries right now: {injuries}</h4>
                    <input
                        type="text"
                        onChange={(e) => setInjuries(e.target.value)}
                        value={injuries}
                        // className={emptyFields.includes("title") ? 'error' : ''}
                    />
                <h4>Injury History: {injuryHistory}</h4>
                    <input
                        type="text"
                        onChange={(e) => setInjuryHistory(e.target.value)}
                        value={injuryHistory}
                        // className={emptyFields.includes("title") ? 'error' : ''}
                    />


                    </div>                

                    <div className="form-column">
                        <h3> Exercise stuff</h3>

                        <h4>Fitness Goals: {fitnessGoals}</h4>
                        <input
                            type="text"
                            onChange={(e) => setFitnessGoals(e.target.value)}
                            value={fitnessGoals}
                            // className={emptyFields.includes("title") ? 'error' : ''}
                        />

                        <h4>Exercise History: {exerciseHistory}</h4>
                        <input
                            type="text"
                            onChange={(e) => setExerciseHistory(e.target.value)}
                            value={exerciseHistory}
                            // className={emptyFields.includes("title") ? 'error' : ''}
                        />
                                        
                        <h4>Exercise Preferences: {exercisePreferences}</h4>
                        <input
                            type="text"
                            onChange={(e) => setExercisePreferences(e.target.value)}
                            value={exercisePreferences}
                            // className={emptyFields.includes("title") ? 'error' : ''}
                        />

                        <h4>Exercises Disliked: {dislikedExercises}</h4>
                        <input
                            type="text"
                            onChange={(e) => setDislikedExercises(e.target.value)}
                            value={dislikedExercises}
                            // className={emptyFields.includes("title") ? 'error' : ''}
                        />

                    </div>

                    <div className="form-column">
                    <h3> Nutrition </h3>
                    <h4>Dietary Habits: {dietaryHabits}</h4>
                        <input
                            type="text"
                            onChange={(e) => setDietaryHabits(e.target.value)}
                            value={dietaryHabits}
                            // className={emptyFields.includes("title") ? 'error' : ''}
                        />
                        <h4>Dietary Restrictions: {dietaryRestrictions}</h4>
                        <input
                            type="text"
                            onChange={(e) => setDietaryRestrictions(e.target.value)}
                            value={dietaryRestrictions}
                            // className={emptyFields.includes("title") ? 'error' : ''}
                        />
                    </div>
                    
                    <div className="form-column">
                        <h3> Resources </h3>
                        <h4>Time Commitment: {timeCommitment}</h4>
                        <input
                            type="text"
                            onChange={(e) => setTimeCommitment(e.target.value)}
                            value={timeCommitment}
                            // className={emptyFields.includes("title") ? 'error' : ''}
                        />

                        <h4>Equipment Access: {equipmentAccess}</h4>
                        <input
                            type="text"
                            onChange={(e) => setEquipmentAccess(e.target.value)}
                            value={equipmentAccess}
                            // className={emptyFields.includes("title") ? 'error' : ''}
                        />

                        <h4>Stress Levels: {stressLevels}</h4>
                        <input
                            type="text"
                            onChange={(e) => setStressLevels(e.target.value)}
                            value={stressLevels}
                            // className={emptyFields.includes("title") ? 'error' : ''}
                        />
                        <h4>Sleep Patterns: {sleepPatterns}</h4>
                        <input
                            type="text"
                            onChange={(e) => setSleepPatterns(e.target.value)}
                            value={sleepPatterns}
                            // className={emptyFields.includes("title") ? 'error' : ''}
                        />

                    </div>
                </div>            

                <button>Add info</button>
            </form>

        </div>
     );
}
 
export default UserDetails;