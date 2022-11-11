<template>
    <div class="max-w-screen-md mx-auto px-4 py-10">
        <!-- Status Message -->
        <div
            v-if="statusMsg || errorMsg"
            class="mb-10 p-4 bg-light-grey rounded-md shadow-lg"
        >
            <p class="text-at-light-orange">
                {{ statusMsg }}
            </p>
            <p class="text-red-500 shadow-lg">
                {{ errorMsg }}
            </p>
        </div>

        <!-- SAVE SESSION -->
        <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
            <!-- Form -->
            <form
                @submit.prevent="getStudent"
                class="flex flex-col gap-y-4 w-full"
            >
                <h1 class="text-3xl text-at-light-orange self-center">Save Session</h1>

                <!-- Date -->
                <div class="flex flex-col">
                <label for="date" class="text-sm text-at-light-orange">
                    Date
                </label>
                <input
                    type="date"
                    class="p-2 text-grey-500 focus:outline-none"
                    id="date"
                    v-model="date"
                />
                </div>

                <!-- Teacher -->
                <div class="flex flex-col">
                <label for="teacher" class="text-sm text-at-light-orange">
                    Teacher
                </label>
                <select
                    required
                    class="p-2 text-grey-500 focus:outline-none"
                    id="teacher"
                    v-model="teacher"
                >
                <option :value="teacher">Carlos Campoy</option>
                </select>
                </div>

                <!-- Topic -->
                <div class="flex flex-col">
                <label for="topic" class="text-sm text-at-light-orange">
                    Topic
                </label>
                <select
                    class="p-2 text-grey-500 focus:outline-none"
                    id="topic"
                    v-model="topic"
                >
                    <option :value="backControl">Back Control</option>
                    <option :value="halfGuard">Half Guard</option>
                    <option :value="sideControl">Side Control</option>
                    <option :value="mount">Mount</option>
                    <option :value="closedGuard">Closed Guard</option>
                    <option :value="deLaRiva">De La Riva</option>
                    <option :value="openGuard">Open Guard</option>
                    <option :value="turtle">Turtle</option>
                </select>
                </div>

                <!-- Student Search -->
                <div class="flex flex-col">
                <label for="student" class="text-sm text-at-light-orange">
                    Search student
                </label>
                <input
                    type="text"
                    required
                    class="p-2 text-grey-500 focus:outline-none"
                    id="student"
                    v-model="student"
                />
                </div>

                <Button title="Search" />
            </form>
        </div>

        <!-- student list and save button -->
        <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg mt-4">
            <!-- Form -->
            <form
                @submit.prevent="session"
                class="flex flex-col gap-y-2 w-full"
            >
            <!--- STUDENT LIST --->
            <div class="flex flex-col items-center">
                <span>{{ studentList }}</span>
            </div>

                <Button :title='buttonTitle' :color='buttonColor' />
            </form>
        </div>

        <!-- MY STATS -->
        <div class="p-5 bg-light-grey rounded-md shadow-lg flex flex-col justify-center mt-4">
          <div class="rounded-md bg-at-light-orange mb-2 self-center">
            <span class="flex text-m text-white px-24">Latest Session Saved</span>
          </div>
            <div class="flex pl-4 px-6 justify-center">
                  <ul class="list-inside space-y-1 justify-center list-disc">
                    <li class="text-l text-dark-grey uppercase -mb-1">Date: {{ latestSessionSavedDate }}</li>
                    <li class="text-l text-dark-grey uppercase">Topic: {{ latestSessionSavedTopic }}</li>
                  </ul>
            </div>
        </div>

    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { getAllHumans } from '../services/humanService'
import { getAllTechniques } from '../services/bjj_services/techniqueService'
import { getAllFocusLessons } from '../services/bjj_services/focusLessonService'
import { saveSession, getAllSessions } from '../services/sessionService'
import moment from 'moment'

// components import
import Button from "../components/Button.vue";

export default {
    name: 'session',
    components: {
        Button,
    },
    setup() {
        // CURRENTLY THE ONLY CURRICULUM IS FOCUS LESSONS
        // OTHER TYPES OF SESSIONS THAT ARE NOT FOCUS @18:15PM WILL REQUIRE TESTING

        const statusMsg = ref(null)
        const errorMsg = ref(null)

        // These are Focus Lesson IDs
        const backControl = "63476ca77c0c4048382acb04"
        const mount = "634ecefa9f04894fb818c868"
        const halfGuard = "634ed31717260c95e351de8d"
        const sideControl = "634ed53c17260c95e351decb"
        const closedGuard = "634ed77517260c95e351dfa3"
        const deLaRiva = "634edb2337829d81a79048ab"
        const openGuard = ""
        const turtle = ""
        const teacher = ref(null)
        const latestSessionSavedDate = ref(null)
        const latestSessionSavedTopic = ref(null)

        // Human IDs
        const carlosCampoy = '630e5c2da1c2a0bcf246c383'

        // Create data
        teacher.value = carlosCampoy
        const topic = ref('')
        const student = ref(null)
        const date = ref(null)
        // gotta use reactive when dealing with objects/arrays
        const studentList = reactive([]) // Initialize empty array show attending student list in DOM
        const humanIdList = reactive([]) // Initialize empty array to store human ids for POST
        const techniqueList = reactive([]) // Initialize empty array to show session techniques in DOM
        const techniqueIdArray = reactive([]) // Initialize empty array to store technique ids for POST

        // INFO
        const displayLatestSessionSaved = async() => {
            const allSessions = await getAllSessions()
            const allFocusLessons = await getAllFocusLessons()
            const latestLessonId = allSessions[allSessions.length-1].what.focus._id

            latestSessionSavedDate.value = new Date(allSessions[allSessions.length-1].when.date).toLocaleDateString()
            latestSessionSavedTopic.value = allFocusLessons.filter(position => JSON.stringify(position._id).includes(latestLessonId))[0].topic
        }
        displayLatestSessionSaved()
        
        // Button success visual feedback
        let buttonColor = ref(null)
        let buttonTitle = ref("Save")

        const buttonSuccess = async () => {
            buttonTitle.value = "Saving Session..."
            buttonColor.value = "orange"
            setTimeout(() => {
                buttonTitle.value = "Session Saved"
                buttonColor.value = "#33872a"
            }, 900);
            setTimeout(() => {
                buttonTitle.value = "Save"
                buttonColor.value = ""
            }, 2500);
        }

        // Date & Focus Lesson time formatting
        const focusLessonTime = 'T18:15:00Z'
        const getDate = _ => {
            // if date has not been selected, default to NOW
            if(!date.value) { return moment().format() }
            // otherwise return date selected
            return date.value + focusLessonTime
        }
        
        // Retrieve student in search
        const getStudent = async () => {
            // Retrieve object with all humans in database
            const allHumans = await getAllHumans()
            // Get student object based on first name search
            const foundStudent = allHumans.filter(human => human.name.first.toLowerCase() === student.value.toLowerCase())
            // Get student's name as string
            const studentName = foundStudent.map(x => x.name.first + " " + x.name.last)[0]
            // Get student's human ID ***JUST A STRING SO IT WILL NEED TO BE CONVERTED TO OBJECT ID***
            const studentHumanId = foundStudent.map(x => x._id)[0]

            const addStudentToList = async () => studentList.push(studentName)
            const addHumantoAttendance = async () => humanIdList.push(studentHumanId)
            
            return addStudentToList(), addHumantoAttendance()
        }

        // Retrieve technique in search
        const getTechnique = async () => {
            // Retrieve object with all techniques in database
            const allTechniques = await getAllTechniques()
            // Get technique object based on position && move && variation search
            const foundTechnique = allTechniques.filter(technique => technique.name.first.toLowerCase() === student.value.toLowerCase())
            // Get student's name as string
            const techniqueName = foundTechnique.map(x => x.name.first + " " + x.name.last)[0]
            // Get student's technique ID ***JUST A STRING SO IT WILL NEED TO BE CONVERTED TO OBJECT ID***
            const techniqueId = foundTechnique.map(x => x._id)[0]

            const addTechniqueToList = async () => techniqueList.push(techniqueName)
            const addTechniqueIdToArray = async () => techniqueIdArray.push(techniqueId)
            
            return addTechniqueToList(), addTechniqueIdToArray()
        }

        // Save session
        // update attendance object and POST to API
        const session = async () => {
            try {
              const res = await saveSession({
                when: {
                    date: getDate()
                },
                who: {
                    teacher: { _id: teacher.value },
                    // creates array with '_id' as key and human id string as value
                    students: humanIdList.reduce((s, a) => {
                        s.push({_id: a})
                        return s
                    }, [])
                },
                what: {
                    focus: { _id: topic.value }
                }
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
        return {
            teacher, student, date, topic, statusMsg, errorMsg,
            backControl, mount, halfGuard, sideControl, closedGuard, deLaRiva, openGuard, turtle,
            techniqueList, techniqueIdArray, getTechnique,
            getStudent, session, studentList, humanIdList, getDate,
            buttonColor, buttonTitle, buttonSuccess,
            latestSessionSavedDate, latestSessionSavedTopic
        }
    },
}
</script>
