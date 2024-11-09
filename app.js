function getRandomAttackValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      countRound: 0,
      winner: null,
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // draw
        this.winner = 'draw';
      }

      if (value <= 0) {
        // player lost
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // draw
        this.winner = 'draw';
      }

      if (value <= 0) {
        // monster lost
        this.winner = 'player';
      }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return {width: '0%'};
      }
      return {width: this.monsterHealth + '%'};
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return {width: '0%'};
      }
      return {width: this.playerHealth + '%'};
    },
    mayUseSpecialAttack() {
      return this.countRound % 3 != 0;
    }
  },
  methods: {
    startGame() {
      this.monsterHealth = 100;
      this.playerHealth  = 100;
      this.countRound    = 0;
      this.winner        = null;
    },
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
    healPlayer() {
      const healValue = getRandomAttackValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      }
      else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
      this.countRound += 1;
    },
    surrender() {
      this.winner = 'monster';
    },
  }
});

app.mount('#game');
