<!---
All working until https://youtu.be/vScIosucURI?t=682
Implementing basic search first
--->
<template>
  <input
    type="text"
    name="student-search"
    class="p-2 text-grey-500 focus:outline-none"
    @keyup="search" />
</template>

<script>


export default {
  name: "StudentSearch",
  setup() {
    function search(e) {
        let search = e.target.value.trim()
        console.log(search)
    }

    return { search }
  }
};
</script>
