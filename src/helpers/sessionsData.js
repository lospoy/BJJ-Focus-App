import { updateSession } from "../services/sessionService";


export async function addStudentsToSession(sessionId, students) {
  try {
    const res = await updateSession(sessionId, {
      who: {
          students: students.reduce((s, a) => {
              s.push({_id: a})
              return s
          }, [])
      },
    });
      // Success button visual feedback
      console.log(res.status)
      if(res.status === 201) { await buttonSuccess() }
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
}

console.log('hey this is sessionsData.js')