<template>
    <div class="px-2 py-4 bg-light-grey rounded-md shadow-md flex flex-col justify-center mb-4">
        <div class="rounded-md bg-at-light-orange mb-2 self-center">
          <span class="flex text-m text-white px-14">Skills Exposure</span>
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
import { ref, onMounted } from "vue"
import { setTrainingData } from "../helpers/trainingData"
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
  setup(props) {
    const skillData = ref(null);
    let delayed

    const chartOptions = {
      layout: {
        padding: {left: -3, right: 5, top: 5, bottom: 0},
      },
      scales: {
        x: {
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
    
    const getLessonName = id => {   // running it locally since it's just 8 ids that will not change
      if(id === backControl) return 'Back Control'
      if(id === halfGuard) return 'Half Guard'
      if(id === sideControl) return 'Side Control'
      if(id === closedGuard) return 'Closed Guard'
      if(id === mount) return 'Mount'
      if(id === deLaRiva) return 'De La Riva'
      if(id === openGuard) return 'Open Guard'
      if(id === turtle) return 'Turtle'
    }

    const getSkillData = async() => {
      const sessionsAttendedPerTopic = store.methods.getStudent().training.sessionsPerTopic // [ "Focus lesson ID", number of attended sessions w/ that topic ID ]
      
      const getLessonsAndNumberAttended = async() => {
        const focusArray = []
  
        sessionsAttendedPerTopic.map(e => {
            focusArray.push([getFocusLesson(e[0]), e[1]])
        })
        return focusArray
      }

      const getSkillsAndNumberAttended = async() => {
        const skillsArray = []
        const res = await getLessonsAndNumberAttended()
        
        res.map(e => {
          skillsArray.push([e[0], e[1]])
        })
        return skillsArray
      }

      // sessionsPerTopic.find(e => e[0] === backControl) ? '' : sessionsPerTopic.push([backControl, 0])
      // sessionsPerTopic.find(e => e[0] === halfGuard) ? '' : sessionsPerTopic.push([halfGuard, 0])
      // sessionsPerTopic.find(e => e[0] === sideControl) ? '' : sessionsPerTopic.push([sideControl, 0])
      // sessionsPerTopic.find(e => e[0] === closedGuard) ? '' : sessionsPerTopic.push([closedGuard, 0])
      // sessionsPerTopic.find(e => e[0] === mount) ? '' : sessionsPerTopic.push([mount, 0])
      // sessionsPerTopic.find(e => e[0] === deLaRiva) ? '' : sessionsPerTopic.push([deLaRiva, 0])
      // sessionsPerTopic.find(e => e[0] === openGuard) ? '' : sessionsPerTopic.push([openGuard, 0])
      // sessionsPerTopic.find(e => e[0] === turtle) ? '' : sessionsPerTopic.push([turtle, 0])

      // const res = sessionsPerTopic.map(e => [getLessonName(e[0]), e[1]])
      skillData.value = res
    }

    const processTrainingData = async(id) => {
      await setTrainingData(id)
    }

    onMounted(() => {
      processTrainingData(props.id)
    })
    
    setTimeout(() => {
      getSkillData()
    }, 2000);

    return {
      skillData, chartOptions
    };
  }
};
</script>
