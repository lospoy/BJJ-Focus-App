<template>
<div class="flex rounded-md bg-med-grey justify-center">

  <!-- LEFT SIDE -->
  <v-btn
    @click="changeOption('left')"
    class="self-center -ml-1 w-1/2 py-1 rounded-md text-xs font-medium"
    :class="{
      'bg-dark-grey text-white shadow-md': option === 'left',
      'bg-med-grey text-black shadow-none': option !== 'left',
    }"
  >
    {{ titleLeft }}
  </v-btn>

  <!-- RIGHT SIDE -->
  <v-btn
    @click="changeOption('right')"
    class="self-center -mr-1 w-1/2 py-1 rounded-md text-xs font-medium shadow-none"
    :class="{
      'bg-dark-grey text-white shadow-md': option === 'right',
      'bg-med-grey text-black shadow-none': option !== 'right',
    }"
  >
    {{ titleRight }}
  </v-btn>

</div>
</template>

<script>
import { ref, inject, onMounted } from 'vue'; // inject is required for the emitter (EventBus)

export default {
  name: "Switcher",
  props: {
    titleLeft: {
      type: String,
      default: "Left",
    },
    titleRight: {
      type: String,
      default: "Right",
    },
    active: {
      type: Boolean,
    }
  },
  setup(props) {
    const titleLeft = ref(null)
    const titleRight = ref(null)

    const option = ref('left')

    // Emitter (EventBus) this section emits an event that can be listened to globally
    const emitter = inject('emitter')

    function changeOption(newOption) {
      option.value = newOption
      if(newOption === 'left') emitter.emit('switcherLeft', true)
      if(newOption === 'right') emitter.emit('switcherRight', true)
    }

    function assignProps(props) {
      props.titleLeft = titleLeft.value
      props.titleRight = titleRight.value
    }

    // setTimeout(() => {
    //   assignProps(props)
    // }, 500);

    return {
      option, changeOption, assignProps
    }
  }
};
</script>