// Gets user's training data from server and sets it in the store
// Used in /views/StudentStats.vue
import { getAllSessions } from "../services/sessionService";
import store from './store';

export async function setTrainingData() {
  const user = await store.methods.getUser()
  const allSessions = await getAllSessions()

  const sessionsAttendedByUser = allSessions.filter(session => JSON.stringify(session.who.students).includes(user.human))
  const sessionsUnattendedByUser = allSessions.filter(session => !JSON.stringify(session.who.students).includes(user.human))
  
  const focusSessions = sessionsAttendedByUser.length

  const firstSessionAttendedByUser = sessionsAttendedByUser[0]
  const firstSession = new Date(firstSessionAttendedByUser.when.date)

  const latestSessionAttendedByUser = sessionsAttendedByUser[sessionsAttendedByUser.length-1]
  const diffInDays = new Date(latestSessionAttendedByUser.when.date) - new Date(firstSessionAttendedByUser.when.date) // in miliseconds
  const daysSinceLatestSession = Math.floor(diffInDays / (1000 * 60 * 60 * 24 ))

  const totalTrainedInMsInMs = new Date() - new Date(firstSessionAttendedByUser.when.date)  // in miliseconds
  const weeksTrained = totalTrainedInMsInMs / (1000 * 60 * 60 * 24 ) / 7

  store.methods.setTraining({
    unattendedSessions: sessionsUnattendedByUser,
    focusSessions: focusSessions,
    firstSession: firstSession,
    latestSession: latestSessionAttendedByUser.when.date,
    weeksTrained: weeksTrained,
    daysSinceLatestSession: daysSinceLatestSession,
    attendedSessions: sessionsAttendedByUser
  })
}
