function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getMonsterGallery() {
  return [
    'images/monster_1.jpeg',
    'images/monster_2.jpeg',
    'images/monster_3.jpeg',
    'images/monster_4.jpeg',
    'images/monster_5.jpeg',
    'images/monster_6.jpeg',
  ];
}

function getHeroGallery() {
  return [
    'images/hero_1.jpeg',
    'images/hero_2.jpeg',
    'images/hero_3.jpeg',
    'images/hero_4.jpeg',
    'images/hero_5.jpeg',
    'images/hero_6.jpeg',
  ];
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      countRound: 0,
      winner: null,
      logMessageList: [],
      monsterImageList: getMonsterGallery(),
      heroImageList: getHeroGallery(),
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
    },
    monsterImage() {
      const randomIndex = getRandomValue(0, this.monsterImageList.length);
      return this.monsterImageList[randomIndex];
    },
    heroImage() {
      const randomIndex = getRandomValue(0, this.heroImageList.length);
      return this.heroImageList[randomIndex];
    },
  },
  methods: {
    startGame() {
      this.monsterHealth    = 100;
      this.playerHealth     = 100;
      this.countRound       = 0;
      this.winner           = null;
      this.logMessageList   = [];
      this.monsterImageList = getMonsterGallery();
      this.heroImageList    = getHeroGallery();
    },
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
      this.countRound += 1;
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue);
    },
    specialAttackMonster() {
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
      this.countRound += 1;
    },
    healPlayer() {
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      }
      else {
        this.playerHealth += healValue;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();
      this.countRound += 1;
    },
    surrender() {
      this.winner = 'monster';
    },
    addLogMessage(who, what, value) {
      this.logMessageList.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
    logMessageByClass(logMessage) {
      return {'log--player': logMessage.actionBy === 'player', 'log--monster': logMessage.actionBy === 'monster'};
    },
    capitalizeFirstLetter(name) {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    },
  }
});

app.mount('#game');
