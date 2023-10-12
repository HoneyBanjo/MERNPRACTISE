import { useEffect,useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import Suggestion from "../components/Suggestion"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const {user} = useAuthContext()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }

      setIsLoading(false);

    }

    if (user) {
      fetchWorkouts()
    }

  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.length > 0 ? (
          workouts.map(workout => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))
        ) : (
          <Suggestion />
        )}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home