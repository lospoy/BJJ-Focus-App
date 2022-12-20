<template>
    <div class="px-2 py-4 bg-light-grey rounded-md shadow-md flex flex-col justify-center mb-4">
        <div class="rounded-md bg-at-light-orange mb-2 self-center">
          <span class="flex text-m text-white px-24">Balance Board</span>
        </div>
      <bar-chart
        :data="topicData"
        :colors="['#dfcd6d']"
        :dataset="{borderWidth: 1000, barThickness: 20, borderRadius: 3}"
        :library="chartOptions"
      >
      </bar-chart>
    </div>
</template>

<script>
import { ref, onMounted } from "vue"
import { setTrainingData } from "../store/trainingData"
import store from "../store/store"

export default {
  name: "TopicsChart",
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const topicData = ref(null);
    let delayed

    const chartOptions = {
      layout: {
        padding: {left: -3, right: 5, top: 5, bottom: 0},
      },
      scales: {
        x: {
          ticks: {
            display: false
          },
        },
        y: {
          afterFit: (context) => {
            context.height -= 25
          }
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
    
    const getLessonName = id => {   // running it locally since it's just 8 ids that will not change
      if(id === '63476ca77c0c4048382acb04') return 'Back Control'
      if(id === '634ecefa9f04894fb818c868') return 'Mount'
      if(id === '6634ed31717260c95e351de8d') return 'Half Guard'
      if(id === '634ed53c17260c95e351decb') return 'Side Control'
      if(id === '634ed77517260c95e351dfa3') return 'Closed Guard'
      if(id === '634edb2337829d81a79048ab') return 'De La Riva'
      if(id === '638eaab8964f267814d40a89') return 'Open Guard'
      if(id === '638ead84964f267814d40ad7') return 'Turtle'
    }

    const getLessonData = async() => {
      const sessionsPerTopic = store.methods.getStudent().training.sessionsPerTopic
      const res = sessionsPerTopic.map(e => [getLessonName(e[0]), e[1]])
      topicData.value = res
    }

    const processTrainingData = async(id) => {
      await setTrainingData(id)
    }

    onMounted(() => {
      processTrainingData(props.id)
    })
    
    setTimeout(() => {
      getLessonData()
    }, 2000);

    return {
      topicData, chartOptions
    };
  }
};
</script>
