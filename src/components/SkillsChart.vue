<template>
    <div class="px-2 py-4 bg-light-grey rounded-md shadow-md flex flex-col justify-center mb-4">
        <div class="rounded-md bg-at-light-orange mb-2 self-center">
          <span class="flex text-m text-white px-14">Skill Growth</span>
        </div>
          <bar-chart
            :data="skillData"
            :colors="['#dfcd6d']"
            :dataset="{borderWidth: 1000, barThickness: 30, borderRadius: 3}"
            :library="chartOptions"
          >
          </bar-chart>
    </div>
</template>

<script>
import { ref } from "vue"
import { getFocusLesson } from "../services/bjj_services/focusLessonService"
import store from "../store/store"

export default {
  name: "SkillsChart",
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup() {
    const skillData = ref(null);
    const test1 = ref(null)
    let delayed

    const chartOptions = {
      layout: {
        padding: {left: -3, right: 5, top: 5, bottom: 0},
      },
      scales: {
        x: {
          min: 0,
          max: 1600, // 6 months of perfect attendance
          ticks: {
            display: false,
          },
        },
        y: {
          ticks: {
            font: {
              size: 14,
              weight: 'bolder',
              color: 'black',
            },
          },
        },
      },
      animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
      },
    }

    // technique.move.category types
    //
    // pass
    // entry
    // escape
    // submission
    // sweep
    // takedown

    const processSkillData = async() => {
      try {
        const sessionsAttendedPerTopic = store.methods.getStudent().training.sessionsPerTopic
        // ARRAY OF ARRAYS [string, integer]
        // String: that Focus lesson's ID
        // Integer: number of attended sessions that match the string's topic ID

        const lessons = await Promise.all(sessionsAttendedPerTopic.map(async e => ([await getFocusLesson(e[0]), e[1]])))
        // ARRAY OF ARRAYS [object, integer]
        // Object: that lesson's object
        // Integer: number of attended sessions related to the lesson's object

        const les = [...lessons] // hard copy of lessons

        const skills = les.map(e => [e[0].skills, e[1]])
        // ARRAY OF [ object, integer ]
        // Object: Skills object of the lesson
        // Integer: number of attended sessions related to the skills object

        const multiplier = (obj, multiplier) => Object.fromEntries(
          Object.entries(obj).map(([name, value]) => [name, value * multiplier])
        )
        const sumOfSkills = skills.map(e => multiplier(e[0], e[1]))
        // ARRAY OF [ object ]
        // Object: skills values multiplied by number of attended lessons of that topic

        const count = (arr, key) => {
          return arr.reduce((r, a) => {
            return r + a[key]
          }, 0)
        }

        skillData.value = [
          ["Pass", count(sumOfSkills, 'pass')],
          ["Entry", count(sumOfSkills, 'entry')],
          ["Escape", count(sumOfSkills, 'escape')],
          ["Submission", count(sumOfSkills, 'submission')],
          ["Sweep", count(sumOfSkills, 'sweep')],
          ["Takedown", count(sumOfSkills, 'takedown')]
        ]
        // ARRAY of [ string, integer ]
        // String: skill name
        // Integer: total points acquired through all-time attendance

        skillData.value = skillData.value.sort((a, b) => b[1] - a[1])
        // SORTS in descending order, from highest to least exposure

        console.log(skillData.value)

      } catch (error) {
        console.error(error)
      }
    }
    
    setTimeout(() => {
      processSkillData()
    }, 2000);

    return {
      skillData, chartOptions, test1
    };
  }
};
</script>
