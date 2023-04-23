import axios from "axios";
const { useState, useEffect } = require("react");

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => {
    setState({ ...state, day });
  };
  

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    }, [])
      .catch(error => {
        console.log(error);
      });
  });

  function updateSpots(num) {
    const dayIndex = findDay(state.day);

    const newDay = {
      ...state.days[dayIndex],
      spots: state.days[dayIndex].spots + num
    }
    const days = [...state.days];
    days[dayIndex] = newDay;

    return days;
  }

  function findDay(day) {
    const days = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    };
    return days[day];
  }


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    let days = updateSpots(-1);

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    let days = updateSpots(1);
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}