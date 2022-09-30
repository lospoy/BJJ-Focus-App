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

        <!-- SESSION -->
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
                <option value="carlosCampoy">Carlos Campoy</option>
                </select>
                </div>

                <!-- Topic -->
                <div class="flex flex-col">
                <label for="topic" class="text-sm text-at-light-orange">
                    Topic
                </label>
                <input
                    type="text"
                    required
                    class="p-2 text-grey-500 focus:outline-none"
                    id="topic"
                    v-model="topic"
                />
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


        <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
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
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { getAllHumans } from '../services/humanService'
import { saveSession } from '../services/sessionService'
import moment from 'moment'

// components import
import Button from "../components/Button.vue";

export default {
    name: 'session',
    components: {
        Button,
    },
    setup() {
        // Human IDs
        const carlosCampoy = '630e5c2da1c2a0bcf246c383'

        // Create data
        const teacher = carlosCampoy
        const topic = ref('')
        const student = ref(null)
        const date = ref(null)
        // gotta use reactive when dealing with objects/arrays
        const studentList = reactive([]) // Initialize empty array show attending student list in DOM
        const humanIdList = reactive([]) // Initialize empty array to store human ids for POST
        // Error variables
        const statusMsg = ref(null)
        const errorMsg = ref(null)
        
        // Button variables
        let buttonColor = ref(null)
        let buttonTitle = ref("Save New Session")

        // Button success visual feedback
        const buttonSuccess = async () => {
            buttonTitle.value = "Saving Session..."
            buttonColor.value = "orange"
            setTimeout(() => {
                buttonTitle.value = "Session Saved"
                buttonColor.value = "#33872a"
            }, 600);
            setTimeout(() => {
                buttonTitle.value = "Save New Session"
                buttonColor.value = ""
            }, 2200);
        }

        // Date
        const getDate = _ => {
            // if date has not been selected, default to NOW
            if(!date.value) { return moment().format() }
            // otherwise return date selected
            return date.value
        }
        
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

        // Save session
        // update attendance object and POST to API
        const session = async () => {
            try {
              const res = await saveSession({
                when: {
                    date: getDate()
                },
                who: {
                    teacher: { _id: teacher },
                    // creates array with '_id' as key and human id string as value
                    students: humanIdList.reduce((s, a) => {
                        s.push({_id: a})
                        return s
                    }, [])
                },
                what: {
                    lesson: {
                        focus: {
                            topic: topic.value
                        }
                    }
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
        return { teacher, student, date, topic, statusMsg, errorMsg,
                getStudent, session, studentList, humanIdList, getDate,
                buttonColor, buttonTitle, buttonSuccess }
    },
}
</script>
