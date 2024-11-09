function getRandomAttackValue(min, max) {
  return Math.floor(Math.random() - (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
    };
  },
  methods: {
    attackMonster() {
      const attackValue = getRandomAttackValue(5, 12);
      this.monsterHealth -= attackValue; 
      this.attackPlayer();
    },
    attackMonster() {
      const attackValue = getRandomAttackValue(8, 15);
      this.playerHealth -= attackValue; 
    },
  }
});

app.mount('#game');
