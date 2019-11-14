<template>
  <div>
    <div id="center">
      <section id="top">
        <img src="/static/img/logo.png" alt="logo tadeufitness" id="top-image" />
        <h2>Bem vindo!</h2>
        <h3>
          tadeu.fitness
          <small>(beta)</small>
        </h3>
      </section>
      <section id="links">
        <md-button class="md-raised md-accent" id="imc" to="/imc">
          Calcule o seu IMC
        </md-button>
      </section>
      <section id="about">
        <h4>Sobre este app</h4>
        <p>Esta é uma versão <strong>beta</strong>, portanto algumas funcionalidades podem não funcionar da forma esperada, e/ou possuir poucas funcionalidades.</p>
        <p>Em breve teremos novidades por aqui!</p>
        <p id="follow">
          <md-button class="md-raised md-primary" href="https://instagram.com/tadeu.fitness" target="_blank">
            Me acompanhe no Instagram.
          </md-button>
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped lang="sass">
  @import '@/assets/sass/Home.sass'
</style>

<script>
export default {
  name: 'Home',
};
</script>

