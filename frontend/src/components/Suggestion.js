import { useState, useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"


const Suggestion = () => {

    const { user } = useAuthContext()

    const [suggestion, setSuggestion] = useState([])
    

    const [sendUser, setSendUser] = useState({
        gender: "",
        height: "",
        weight: ""
    })
    
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
        

        const response = await fetch('/api/workouts/generate/generate', {
            method: 'POST',
            body: JSON.stringify(sendUser),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
  

        const unformatted = json.workout.content
        const formatSections = unformatted.split('\n\n');
        const formatObjects = [];
        
        for (const section of formatSections) {
            const lines = section.split('\n');
            const data = {};


            for (const line of lines) {
                const [key, value] = line.split(': ');
                // data[key.startsWith('- ') ? key.slice(2) : key] = value;
                if (!key.startsWith('- ')) {
                    data[key] = value;
                  }
                data[key] = value;
              }

              formatObjects.push(data)

        }

        // The formatObjects should look like this:
        /*
            [
        {Exercise 1: 'Squats', Load: 'Barbell', - Load: 'Barbell', Repetitions: '8-10', - Repetitions: '8-10'}
        {Exercise 2: 'Bench Press', Load: 'Dumbbells', - Load: 'Dumbbells', Repetitions: '8-10', - Repetitions: '8-10'}
        {Exercise 3: 'Deadlifts', Load: 'Barbell', - Load: 'Barbell', Repetitions: '6-8', - Repetitions: '6-8'}
        {Exercise 4: 'Bent-Over Rows', Load: 'Barbell', - Load: 'Barbell', Repetitions: '8-10', - Repetitions: '8-10'}
            ]
        */



        
        console.log(formatObjects)
        

        

        setSuggestion(formatObjects)
        

    }



    return ( 
        <div>
            <button onClick={handleClick}> This will give a suggestion </button>
            
            <div>
            {suggestion.map((exercise, index) => (
            <div key={index} className="exercise">
            <h2>{Object.values(exercise)[0]}</h2>
            <p>Load: {exercise['Load']}</p>
            <p>Repetitions: {exercise['Repetitions']}</p>
        </div>
      ))}
            </div>
        </div>

     );
}
 
export default Suggestion;