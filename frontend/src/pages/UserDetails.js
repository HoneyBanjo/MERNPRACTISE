import { useEffect, useState } from "react";
import {useUserContext} from "../hooks/useUserContext"
import { useAuthContext } from "../hooks/useAuthContext";


const UserDetails = () => {

    // const {user} = useUserContext()
    // i just dont know how this works man

    const {dispatch} = useAuthContext()



    const [userId, setUserId] = useState("")
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [gender, setGender] = useState("")

    useEffect(() => {

        const response = JSON.parse(localStorage.getItem('user'))
        
        setUserId(response.userid)
        setGender(response.gender)
        setHeight(response.height)
        setWeight(response.gender)


    }, [])
    

    const handleSubmit = async (e) => {
        e.preventDefault()


        const userInfo = {gender, height, weight}

        const response = await fetch("/api/user/info/")

        // add the new state as updation to backend


    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
            <h3>Give your info man</h3>

                <label>Gender</label>
                <input
                    type="text"
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                    // className={emptyFields.includes("title") ? 'error' : ''}
                />

                <label>Give height in cm</label>
                <input
                    type="text"
                    onChange={(e) => setHeight(e.target.value)}
                    value={height}
                    // className={emptyFields.includes("load") ? 'error' : ''}
                />

                <label>Give weight in kg</label>
                <input
                    type="text"
                    onChange={(e) => setWeight(e.target.value)}
                    value={weight}
                    // className={emptyFields.includes("reps") ? 'error' : ''}
                />

                <button>Add workout</button>
            </form>

            <h1>Here will be user details</h1>
            
        </div>
     );
}
 
export default UserDetails;