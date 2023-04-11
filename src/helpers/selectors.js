export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(d => d.name === day);
  if (!selectedDay) {
    return [];
    }
  const appointments = selectedDay.appointments.map(id => state.appointments[id]);
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  
  const interviewer = state.interviewers[interview.interviewer];
    return {
      student: interview.student,
      interviewer: interviewer
    };
  }

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find(d => d.name === day);
  if (!selectedDay) {
    return [];
  }
  const interviewers = selectedDay.interviewers.map((id) => state.interviewers[id]);
  return interviewers;
}