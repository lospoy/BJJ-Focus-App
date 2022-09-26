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

        <!-- Create -->
        <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
            <!-- Form -->
            <form
                @submit.prevent="getStudent"
                class="flex flex-col gap-y-4 w-full"
            >
                <h1 class="text-2xl text-at-light-orange">Save Session</h1>

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
                <option value="carlos-campoy">Carlos Campoy</option>
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

                <Button title="Save Session" />
                
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
        // *****************MOST RECENT SITUATION***************
        // studentList and humanIdList are not behaving like arrays, but objects instead
        // I want them to be arrays so I can push student name and human ids into them, respectively
        // https://javascript.plainenglish.io/list-rendering-with-vue-js-v-for-directive-91a0a7756a68

        // Create data
        const teacher = ref(null)
        const topic = ref('')
        const student = ref(null)
        // gotta use reactive when dealing with objects/arrays
        const studentList = reactive([]) // Initialize empty array show attending student list in DOM
        const humanIdList = reactive([]) // Initialize empty array to store human ids for POST

        // Current teacher is only Carlos
        const carlosHumanId = '630e5c2da1c2a0bcf246c383'

        // Error variables
        const statusMsg = ref(null)
        const errorMsg = ref(null)
        
        const getStudent = async () => {
            // Retrieve object with all humans in database
            const allHumans = await getAllHumans()
            // Get student object based on first name search
            const foundStudent = allHumans.filter(human => human.name.first.toLowerCase() === student.value.toLowerCase())
            // Get student's name as string
            const studentName = foundStudent.map(x => x.name.first + " " + x.name.last)[0]
            // Get student's human ID ***JUST A STRING SO IT WILL NEED TO BE CONVERTED TO OBJECT ID***
            const studentHumanId = foundStudent.map(x => x._id)[0]

            // debugging
            console.log(studentName)
            console.log(studentHumanId)

            const addStudentToList = async () => studentList.push(studentName)
            const addHumantoAttendance = async () => humanIdList.push(studentHumanId)
            
            return addStudentToList(), addHumantoAttendance()
        }

        // Save session
        // update attendance object and POST to API
        const session = async () => {
            try {
              await saveSession({
                when: {
                    date: moment().format()
                },
                who: {
                    teacher: { _id: carlosHumanId },
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
              router.push({ name: "Home" });
            } catch (error) {
              errorMsg.value = error.message;
              setTimeout(() => {
                errorMsg.value = null;
              }, 5000);
            }
        }
        return { teacher, student, topic, statusMsg, errorMsg, getStudent, session, studentList, humanIdList }
    },
}
</script>
