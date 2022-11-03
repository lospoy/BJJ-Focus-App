<template>
  <button
    type="{{ type }}"
    class="self-center mt-6 py-2 px-20 rounded-sm self-start text-sm text-white bg-gold duration-200 border-solid border-2 border-transparent hover:bg-at-faint-orange hover:text-light-grey"
    :style="{ background: color}"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: {
      type: String,
      default: "Submit",
    },
    type: {
      type: String,
      default: "submit",
    },
    color: {
      type: String,
    },
  },
};
</script>
