function getRandomAttackValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      countRound: 0,
    };
  },
  computed: {
    monsterBarStyles() {
      return {width: this.monsterHealth + '%'};
    },
    playerBarStyles() {
      return {width: this.playerHealth + '%'};
    },
    mayUseSpecialAttack() {
      return this.countRound % 3 != 0;
    }
  },
  methods: {
    attackMonster() {
      const attackValue = getRandomAttackValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.countRound += 1;
    },
    attackPlayer() {
      const attackValue = getRandomAttackValue(8, 15);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      const attackValue = getRandomAttackValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.countRound += 1;
    },
  }
});

app.mount('#game');
