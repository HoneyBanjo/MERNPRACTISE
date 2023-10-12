import { useEffect, useState } from "react";
import {useUserContext} from "../hooks/useUserContext"
import { useAuthContext } from "../hooks/useAuthContext";


const UserDetails = () => {

    // const {user} = useUserContext()
    // i just dont know how this works man

    const {user} = useAuthContext()



    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [gender, setGender] = useState("")

    

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

            
        }
        

        getData()

        
        


    }, [])
    

    const handleSubmit = async (e) => {
        e.preventDefault()


        const userInfo = {gender, height, weight}

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

        }
        

        sendData()


    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
            <h3>Give your info man</h3>

                
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

                <button>Add info</button>
            </form>

        </div>
     );
}
 
export default UserDetails;