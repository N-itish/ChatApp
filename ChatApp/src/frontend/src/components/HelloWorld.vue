<template>
 <h1>{{ msg }}</h1>
 <h2> hello form the vue js page</h2>
</template>
<script>
export default {
  name: 'HelloWorld',
  data() {
       return  {
        msg: ''
       }
  },
   mounted() {
          const myHeaders = new Headers();
          myHeaders.append('Content-Type','text/plain');
          myHeaders.append('Authorization','Basic '+btoa('nitish@gmail.com:12345'));
          fetch("/api/user/hello",
          {
                method:'GET',
                headers: myHeaders
          }
      ).then((response) => response.text())
        .then((data) => {
            console.log(data);
            this.msg = data;
        });
    }
}
</script>