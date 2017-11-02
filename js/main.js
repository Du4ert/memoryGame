let app = {
  // options
  board: document.querySelector('.board'),
  cardsTotal: 16,
  colors: ['#5AD2E8',
           '#66EE54',
           '#EC1EEE',
           '#E5A826',
           '#2F041B',
           '#3E4F3C',
           '#595A12',
           '#ED9290',
           ],
  animTime: 800,

  // body
  flipped: [],
  complete: [],
  cards: [],

  // Cards operations
  flipFront: function(elem) {
    elem.classList.add('flipped');
    app.flipped.push(elem);
    if (app.flipped.length === 2) {
      // Two tiles equal
      if (app.compareTiles(elem, app.flipped[0])) {
        app.complete++;
        if (app.complete === app.cardsTotal/2) {
        setTimeout(app.win, app.animTime);
        }

        app.flipped.forEach((item) => app.hideTile(item));
        app.flipped = [];
      }
      // Two tiles different
      else {
        app.flipped.forEach((item) => app.flipBack(item));
        app.flipped =[];
      }
    }
  },

  flipBack: function(elem) {
    setTimeout(() => { elem.classList.remove('flipped'); }, app.animTime );
  },

  hideTile: function(elem) {
    setTimeout(() => {
      elem.classList.add('invisible'); }, app.animTime );
  },

  compareTiles: function(elem1, elem2) {
    return elem1.dataset.number === elem2.dataset.number ? true : false;
  },

  // Board create
  generateCardsArray: function() {
    app.cards = [];
    for (let i = 0; i < app.cardsTotal/2; i++) {
      app.cards.push(i);
      app.cards.push(i);
    }
  },

  shuffleCardsArray: function() {
    let random = 0;
    let temp = 0;
    for (let i = 0; i < app.cards.length; i++) {
      random = Math.round(Math.random() * i);
      temp = app.cards[random];
      app.cards[random] = app.cards[i];
      app.cards[i] = temp;
    }
  },

  generateTiles: function() {
    let content = "";
    for (let i = 0; i < app.cards.length; i++) {
      let cardNumber = app.cards[i];
      let tile = document.createElement('div');
      let front = document.createElement('div');
      let back = document.createElement('div');
      tile.className = 'tile';
      tile.dataset.number = cardNumber;

      let transition = 'all ' + app.animTime/1000 + 's linear 0s';
      tile.style.transition = transition;
      tile.style.webkitTransition = transition;
      tile.style.oTransition = transition;
      tile.style.mozTransition = transition;

      front.style.background = app.colors[cardNumber] + ' top center no-repeat';
      front.innerHTML = cardNumber;
      front.className = 'front';

      back.className = 'back';

      tile.appendChild(front);
      tile.appendChild(back);

      app.board.appendChild(tile);
    }
  },

  clickEvent: function(e) {
    let target = e.target;
    e.preventDefault();
    while (target != this) {
      if (target.matches('.tile:not(.flipped)')) {
        app.flipFront(target);
        return false;
      } else {
        target = target.parentNode;
      }
    }
  },

  win: function() {
    let answer = confirm('Поздравляем, вы выиграли! \r\n Еще раз?');
    app.board.innerHTML = '';
    if (answer) {
      app.start();
    }
  },

  start: function() {
    app.generateCardsArray();
    app.shuffleCardsArray();
    app.generateTiles();
    app.board.addEventListener('click', app.clickEvent);
  }

}