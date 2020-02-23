<template>
  <div id="app">
    <md-tabs md-sync-route md-alignment="centered" id="top-bar">
      <md-tab md-label="Home" to="/" exact></md-tab>
      <md-tab md-label="IMC" to="/imc" exact></md-tab>
    </md-tabs>
    <router-view id="main" class="md-layout md-gutter md-alignment-center-center"></router-view>
    <md-bottom-bar md-sync-route md-type="fixed" md-theme="bottom-bar-light" id="bottom-bar">
      <md-bottom-bar-item to="/" exact md-label="Home" md-icon="home"></md-bottom-bar-item>
      <md-bottom-bar-item to="/imc" exact md-label="IMC" md-icon="face"></md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
export default {
  created() {
    setTimeout(() => {
      document.getElementById('loading').style.display = 'none';
    });
  },
};
</script>
