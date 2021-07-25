<template>
  <div>
    <h1>Users</h1>
    <datatable :thead="header" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: ["Name", "Email", "Role"],
    };
  },
};
</script>