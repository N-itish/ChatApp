<template>
  <div id="adminPanel">
      <admin-router></admin-router>
  </div>
</template>
<script>
import AdminRouter from '../../router/AdminRouter';
export default {
  name:"adminPanel",
  components:{
    AdminRouter
  }
}
</script>


