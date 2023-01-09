<template>
    <div class="flex flex-col px-2 bg-light-grey rounded-md shadow-md justify-center mb-2">
      <!-- HEADER AND CHART -->
        <div class="self-center">
          <h2 class="flex text-4xl text-at-light-orange py-4">Balance Board</h2>
        </div>
        <bar-chart
          :data="topicData"
          :colors="['#dfcd6d']"
          :dataset="{borderWidth: 1000, barThickness: 30, borderRadius: 3}"
          :library="chartOptions"
        >
        </bar-chart>
    </div>
</template>

<script>
import { ref } from "vue"
import store from "../store/store"

export default {
  name: "TopicsChart",
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup() {
    const topicData = ref(null);
    let delayed

    const chartOptions = {
      layout: {
        padding: {left: -3, right: 0, top: 0, bottom: 0},
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

    // Focus Lesson Ids
    const backControl = "63476ca77c0c4048382acb04"
    const halfGuard = "634ed31717260c95e351de8d"
    const sideControl = "634ed53c17260c95e351decb"
    const closedGuard = "634ed77517260c95e351dfa3"
    const mount = "634ecefa9f04894fb818c868"
    const deLaRiva = "634edb2337829d81a79048ab"
    const openGuard = "638eaab8964f267814d40a89"
    const turtle = "638ead84964f267814d40ad7"
    
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

    const getLessonData = async() => {
      const sessionsPerTopic = store.methods.getStudent().training.sessionsPerTopic

      sessionsPerTopic.find(e => e[0] === backControl) ? '' : sessionsPerTopic.push([backControl, 0])
      sessionsPerTopic.find(e => e[0] === halfGuard) ? '' : sessionsPerTopic.push([halfGuard, 0])
      sessionsPerTopic.find(e => e[0] === sideControl) ? '' : sessionsPerTopic.push([sideControl, 0])
      sessionsPerTopic.find(e => e[0] === closedGuard) ? '' : sessionsPerTopic.push([closedGuard, 0])
      sessionsPerTopic.find(e => e[0] === mount) ? '' : sessionsPerTopic.push([mount, 0])
      sessionsPerTopic.find(e => e[0] === deLaRiva) ? '' : sessionsPerTopic.push([deLaRiva, 0])
      sessionsPerTopic.find(e => e[0] === openGuard) ? '' : sessionsPerTopic.push([openGuard, 0])
      sessionsPerTopic.find(e => e[0] === turtle) ? '' : sessionsPerTopic.push([turtle, 0])

      const res = sessionsPerTopic.map(e => [getLessonName(e[0]), e[1]])
      topicData.value = res
    }
    
    setTimeout(() => {
      getLessonData()
    }, 2000);

    return {
      topicData, chartOptions
    };
  }
};
</script>
