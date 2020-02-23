<template>
  <div class="md-layout">

    <form novalidate id="imc" class="md-size-15" @submit.prevent="doCalcIMC" v-if="!IMC">
      <md-card-header>
        <div class="md-title">Cálculo de IMC</div>
      </md-card-header>
      <md-field>
        <label>Peso</label>
        <md-input v-model="weight" type="number"></md-input>
        <span class="md-suffix">kg</span>
      </md-field>
      <md-field>
        <label>Altura</label>
        <md-input v-model="height" type="number"></md-input>
        <span class="md-suffix">cm</span>
        <span class="md-helper-text">Sem vírgulas, ex.: 170cm</span>
      </md-field>
      <div style="margin-top:10px">
        <md-radio v-model="gender" :value="genders[0]" class="md-primary">Masculino</md-radio>
        <md-radio v-model="gender" :value="genders[1]">Feminino</md-radio>
      </div>
      <div id="imc-submit">
        <md-button type="submit" class="md-raised md-accent" id="imc-submit-button">Calcular IMC</md-button>
      </div>
      <section id="imc-info">
        * Este teste não deve substituir a consulta a um nutricionista.
      </section>
    </form>

    <section style="text-align:center" v-else>
      <p>
        <md-icon class="md-size-2x">linear_scale</md-icon>
      </p>

      <section id="imc-display">
        <h3>Seu IMC</h3>
        <p>{{ IMC }}</p>
      </section>

      <section class="imc-values" style="margin-bottom:15px" v-if="IMC!=2">
        <md-chip class="md-accent">Necessita atenção!</md-chip>
      </section>

      <section class="imc-values">
        <h3>{{ IMCValue[0] }}</h3>
        <p>{{ IMCValue[1] }}</p>
      </section>

      <section class="imc-values" style="margin-top:15px">
        <p>Seu peso atual: {{ weight }}kg</p>
        <p>Sua altura: {{ height }}cm</p>
      </section>

      <section class="imc-values" style="margin-top:15px">
        <h3>Seu peso ideal</h3>
        <p>Entre {{ parseInt(idealWeight)-10 }}kg e {{ parseInt(idealWeight)+10 }}kg</p>
        <p style="font-size:12px;">* Estes valores podem variar de pessoa para pessoa.</p>
      </section>

      <p>
        <md-button type="button" class="md-raised md-accent" id="imc-submit-button" @click="clearValues">Limpar</md-button>
      </p>

      <p>
        <md-icon class="md-size-2x">linear_scale</md-icon>
      </p>

    </section>

  </div>
</template>

<script>
export default {
  data() {
    return {
      gender: null,
      genders: [
        { title: 'Masculino', value: 0.90 },
        { title: 'Feminino', value: 0.85 },
      ],
      weight: null,
      idealWeight: null,
      height: null,
      IMC: 0.0,
      IMCValue: null,
      IMCIndex: null,
      IMCValues: [
        // Menos do que 17 -> Muito abaixo do peso
        ['Menos do que 17', 'Muito abaixo do peso'],
        // Entre 17 e 18,49 -> Abaixo do peso
        ['Entre 17 e 18,49', 'Abaixo do peso'],
        // Entre 18,5 e 24,9 -> Peso normal
        ['Entre 18,5 e 24,9', 'Peso normal'],
        // Entre 25 e 29,9 -> Sobrepeso
        ['Entre 25 e 29,9', 'Sobrepeso'],
        // Entre 30 e 34,9 -> Obesidade grau 1
        ['Entre 30 e 34,9', 'Obesidade grau 1'],
        // Entre 35 e 39,9 -> Obesidade grau 2
        ['Entre 35 e 39,9', 'Obesidade grau 2'],
        // Mais do que 40 -> Obesidade grau 3
        ['Mais do que 40', 'Obesidade grau 3 (mórbida)'],
      ],
    };
  },

  created() {
    this.gender = localStorage.gender || this.genders[0];
    this.weight = localStorage.weight || null;
    this.idealWeight = localStorage.idealWeight || null;
    this.height = localStorage.height || null;
    this.IMC = localStorage.IMC || null;
    this.IMCIndex = localStorage.IMCIndex || null;
    this.IMCValue = this.IMCIndex ? this.IMCValues[this.IMCIndex] : null;
  },

  methods: {
    doCalcIMC() {
      if (!this.weight || !this.height) return;
      //
      this.sending = true;
      if (this.height[1] === ',' || this.height[1] === '.') {
        this.height = this.height.substr(0, 1) + this.height.substr(2);
      }
      this.idealWeight = (this.height - 100) * this.gender.value;
      localStorage.idealWeight = this.idealWeight;
      localStorage.weight = this.weight;
      localStorage.height = this.height;
      //
      // IMC = Peso ÷ (Altura × Altura)
      this.IMC = (this.weight / (this.height * this.height)) * 10000;
      this.IMC = this.IMC.toFixed(1);
      // Menos do que 17
      if (this.IMC < 7) this.IMCIndex = 0;
      // Entre 17 e 18,49
      if (this.IMC >= 17 && this.IMC <= 19.49) this.IMCIndex = 1;
      // Entre 18,5 e 24,9
      if (this.IMC >= 18.5 && this.IMC <= 24.9) this.IMCIndex = 2;
      // Entre 25 e 29,9
      if (this.IMC >= 25 && this.IMC <= 29.9) this.IMCIndex = 3;
      // Entre 30 e 34,9
      if (this.IMC >= 30 && this.IMC <= 34.9) this.IMCIndex = 4;
      // Entre 35 e 39,9
      if (this.IMC >= 35 && this.IMC <= 39.9) this.IMCIndex = 5;
      // Mais do que 40
      if (this.IMC >= 40) this.IMCIndex = 6;
      this.IMCValue = this.IMCValues[this.IMCIndex];
      localStorage.IMC = this.IMC;
      localStorage.IMCIndex = this.IMCIndex;
    },

    clearValues() {
      this.weight = null;
      this.idealWeight = null;
      this.height = null;
      this.gender = this.genders[0];
      this.IMC = null;
      this.IMCValue = null;
      //
      localStorage.removeItem('weight');
      localStorage.removeItem('idealWeight');
      localStorage.removeItem('height');
      localStorage.removeItem('gender');
      localStorage.removeItem('IMC');
      localStorage.removeItem('IMCIndex');
    },
  },
};
</script>
