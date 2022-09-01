<template>
    <button>{{ title }}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        title: {
            type: String,
            default: 'Submit'
        }
    }
}
</script>
