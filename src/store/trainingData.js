// Gets a student's (human) training data from server and sets it in the store
// Used in /views/StudentStats.vue
import { getAllSessions } from "../services/sessionService";
import store from './store';

export async function setTrainingData(humanId) {
  const allSessions = await getAllSessions()
  const sessionsAttended = allSessions.filter(session => JSON.stringify(session.who.students).includes(humanId))
  const sessionsUnattended = allSessions.filter(session => !JSON.stringify(session.who.students).includes(humanId))
  const focusSessions = sessionsAttended.length
  const firstSessionAttended = sessionsAttended[0]
  const firstSession = new Date(firstSessionAttended.when.date)
  const latestSessionAttended = sessionsAttended[sessionsAttended.length-1]
  const diffInMs = new Date() - new Date(latestSessionAttended.when.date) // in miliseconds
  const daysSinceLatestSession = Math.floor(diffInMs / (1000 * 60 * 60 * 24 ))
  const totalTrainedInMsInMs = new Date(latestSessionAttended.when.date) - new Date(firstSessionAttended.when.date)  // in miliseconds
  const weeksTrained = Math.round(totalTrainedInMsInMs / (1000 * 60 * 60 * 24 ) / 7)

  const arrayOfTopics = sessionsAttended.map(session => session.what.focus._id)
  const sumOfTopics = arrayOfTopics.reduce((obj, item) => {
    if(!obj[item]) {  //checks if topic ID exists, otherwise it declares it
      obj[item] = 0;
    }
    obj[item]++;  //adds +1 every time it finds one
    return obj;
  }, {});

  const arr = []
  for (const [key, value] of Object.entries(sumOfTopics)) {
    arr.push([key, value]);
  }
  const sessionsPerTopic = arr
  
  // Sets data retrieved above in store.student.training
  store.methods.setTraining({
    allSessions: allSessions,
    unattendedSessions: sessionsUnattended,
    focusSessions: focusSessions,
    firstSession: firstSession,
    latestSession: latestSessionAttended.when.date,
    weeksTrained: weeksTrained,
    daysSinceLatestSession: daysSinceLatestSession,
    attendedSessions: sessionsAttended,
    sessionsPerTopic: sessionsPerTopic
  })
}
