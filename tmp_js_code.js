
// GAME_RUNNER: Java Array Quest -- defeat 6 monsters by answering Java array quiz questions!

// --- Engine imports ---
import GameControl from '/assets/js/GameEnginev1/essentials/GameControl.js';
import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1/essentials/Player.js';
import Npc from '/assets/js/GameEnginev1/essentials/Npc.js';

// =======================================================================
//  MODULE 1 - QuizBank
// =======================================================================
var QuizBank = {
  data: {
    'Array Knight': [
      {
        q: "Which is the correct way to declare an array of integers in Java?",
        choices: [
          "int arr = new int[10];",
          "int[] arr = new int[10];",
          "array int arr = new int[10];",
          "int arr[] = int[10];"
        ],
        answer: 1
      },
      {
        q: "What is the default value for elements in a new int array?",
        choices: ["null", "0", "false", "undefined"],
        answer: 1
      },
      {
        q: "Which of these is a valid array initializer?",
        choices: [
          "int[] nums = {1, 2, 3};",
          "int[] nums = new int{1, 2, 3};",
          "int[] nums = (1, 2, 3);",
          "int[] nums = [1, 2, 3];"
        ],
        answer: 0
      },
      {
        q: "What is the default value for a boolean array element?",
        choices: ["null", "true", "false", "0"],
        answer: 2
      }
    ],

    'Index Sorcerer': [
      {
        q: "Given int[] arr = {5, 10, 15}; what is arr[1]?",
        choices: ["5", "10", "15", "20"],
        answer: 1
      },
      {
        q: "For int[] arr = new int[7]; what is the last valid index?",
        choices: ["6", "7", "8", "0"],
        answer: 0
      },
      {
        q: "What does arr.length return for int[] arr = {2,4,6,8}?",
        choices: ["3", "4", "5", "8"],
        answer: 1
      },
      {
        q: "Accessing arr[arr.length] throws which exception?",
        choices: [
          "NullPointerException",
          "ArrayIndexOutOfBoundsException",
          "IllegalArgumentException",
          "IndexOutOfBoundsException"
        ],
        answer: 1
      }
    ],

    'Loop Warrior': [
      {
        q: "int[] nums = {1,3,5,7}; int sum = 0; for(int i=0; i<nums.length; i++) sum += nums[i]; What is sum?",
        choices: ["16", "14", "15", "10"],
        answer: 0
      },
      {
        q: "To iterate backwards, which loop is correct?",
        choices: [
          "for(int i=nums.length; i>=0; i--)",
          "for(int i=nums.length-1; i>=0; i--)",
          "for(int i=nums.length-1; i>0; i--)",
          "for(int i=nums.length; i>0; i--)"
        ],
        answer: 1
      },
      {
        q: "Which loop visits only odd indices?",
        choices: [
          "for(int i=0; i<nums.length; i+=2)",
          "for(int i=1; i<nums.length; i+=2)",
          "for(int i=0; i<=nums.length; i++)",
          "for(int i=2; i<nums.length; i++)"
        ],
        answer: 1
      }
    ],

    'For-Each Mage': [
      {
        q: "Correct enhanced for-loop syntax for int[] data?",
        choices: [
          "for(int n in data)",
          "for(int n : data)",
          "foreach(int n : data)",
          "for(data : int n)"
        ],
        answer: 1
      },
      {
        q: "In for(int n : nums) { n = 99; } does this change nums?",
        choices: [
          "Yes, modifies the array",
          "No, n is a copy",
          "Depends on the array type",
          "Throws an exception"
        ],
        answer: 1
      },
      {
        q: "When is enhanced for-loop preferred?",
        choices: [
          "When needing the index",
          "When modifying elements",
          "When reading all elements",
          "When array has one element"
        ],
        answer: 2
      }
    ],

    'Matrix Dragon': [
      {
        q: "Declare a 2x3 int 2D array?",
        choices: [
          "int[][] mat = new int[2][3];",
          "int[][] mat = new int[3][2];",
          "int mat[][] = new int[2,3];",
          "int[2][3] mat;"
        ],
        answer: 0
      },
      {
        q: "For int[][] mat = new int[4][5]; mat.length is?",
        choices: ["5", "4", "20", "9"],
        answer: 1
      },
      {
        q: "Access row 2, col 1 in mat (0-indexed)?",
        choices: ["mat[1][2]", "mat[2][1]", "mat(2,1)", "mat.get(2,1)"],
        answer: 1
      },
      {
        q: "Correct nested loop for all cells?",
        choices: [
          "for(int r=0; r<mat.length; r++) for(int c=0; c<mat[0].length; c++)",
          "for(int r=0; r<mat.length; r++) for(int c=0; c<mat[r].length; c++)",
          "for(int r=1; r<mat.length; r++) for(int c=1; c<mat[r].length; c++)",
          "for(int r=0; r<=mat.length; r++) for(int c=0; c<=mat[r].length; c++)"
        ],
        answer: 1
      }
    ],

    'Arrays API Sage': [
      {
        q: "Import needed for Arrays class?",
        choices: [
          "import java.util.Arrays;",
          "import java.lang.Arrays;",
          "import java.io.Arrays;",
          "No import"
        ],
        answer: 0
      },
      {
        q: "Arrays.fill(arr, 5) does what?",
        choices: [
          "Fills index 5",
          "Sets all elements to 5",
          "Returns index of 5",
          "Removes 5s"
        ],
        answer: 1
      },
      {
        q: "After Arrays.sort(arr), order is?",
        choices: [
          "Random",
          "Descending",
          "Ascending",
          "Unchanged"
        ],
        answer: 2
      },
      {
        q: "Arrays.toString(arr) returns?",
        choices: [
          "Memory address",
          "Readable string like [1,2,3]",
          "Array length",
          "Sorted array"
        ],
        answer: 1
      }
    ]
  },

  pick: function(npcId) {
    var pool = this.data[npcId];
    if (!pool || !pool.length) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  },

  check: function(q, idx) {
    return idx === q.answer;
  }
};

// =======================================================================
//  MODULE 2 - ScoreTracker
// =======================================================================
var ScoreTracker = {
  _beaten: {},
  TOTAL: 6,
  mark:    function(id) { this._beaten[id] = true; },
  has:     function(id) { return this._beaten[id] === true; },
  count:   function()   { return Object.keys(this._beaten).length; },
  allDone: function()   { return this.count() >= this.TOTAL; },
  reset:   function()   { this._beaten = {}; }
};

// =======================================================================
//  MODULE 3 - QuizOverlay
// =======================================================================
var QuizOverlay = {
  open: false,
  _esc: null,

  THEME: {
    card:   'linear-gradient(145deg,#2a1a0a,#4a2a1a)',
    accent: '#ff6b35',
    btn:    '#3a2a1a',
    good:   '#4caf50',
    bad:    '#f44336'
  },

  show: function(npcId, flavor) {
    if (this.open) return;
    this.open = true;

    if (ScoreTracker.has(npcId)) {
      this._flash('Already defeated! Seek another foe.', this.THEME.good);
      return;
    }

    var q = QuizBank.pick(npcId);
    if (!q) { this.open = false; return; }

    var self = this;
    var overlay = this._makeOverlay();
    var card    = this._makeCard();

    var hdr = document.createElement('h2');
    hdr.textContent = npcId;
    hdr.style.cssText = 'color:' + this.THEME.accent + ';margin:0 0 4px;font-size:1.25em;text-shadow:0 0 10px ' + this.THEME.accent + ';';
    card.appendChild(hdr);

    var fl = document.createElement('p');
    fl.textContent = flavor;
    fl.style.cssText = 'color:#ffcc99;font-style:italic;font-size:0.85em;margin:0 0 14px;';
    card.appendChild(fl);

    var qBox = document.createElement('pre');
    qBox.style.cssText = 'background:#1a0f0a;border:1px solid rgba(255,107,53,0.2);border-radius:8px;padding:12px;font-family:Consolas,monospace;font-size:0.92em;color:#ffddcc;margin:0 0 18px;text-align:left;white-space:pre-wrap;word-break:break-word;';
    qBox.textContent = q.q;
    card.appendChild(qBox);

    var btnWrap = document.createElement('div');
    btnWrap.style.cssText = 'display:flex;flex-direction:column;gap:9px;';
    q.choices.forEach(function(choice, idx) {
      var btn = document.createElement('button');
      btn.style.cssText = 'padding:11px 16px;border:1.5px solid rgba(255,107,53,0.3);border-radius:8px;background:' + self.THEME.btn + ';color:#ffcc99;font-family:Consolas,monospace;font-size:0.93em;cursor:pointer;text-align:left;';
      btn.textContent = String.fromCharCode(65 + idx) + ')  ' + choice;
      btn.onmouseenter = function() {
        btn.style.borderColor = self.THEME.accent;
        btn.style.background  = '#5a3a2a';
        btn.style.color       = '#fff';
        btn.style.boxShadow   = '0 0 12px rgba(255,107,53,0.3)';
      };
      btn.onmouseleave = function() {
        btn.style.borderColor = 'rgba(255,107,53,0.3)';
        btn.style.background  = self.THEME.btn;
        btn.style.color       = '#ffcc99';
        btn.style.boxShadow   = 'none';
      };
      btn.onclick = function() { self._answer(npcId, q, idx, overlay); };
      btnWrap.appendChild(btn);
    });
    card.appendChild(btnWrap);

    var hint = document.createElement('p');
    hint.textContent = 'Press Escape to dismiss without answering';
    hint.style.cssText = 'color:#664;font-size:0.72em;margin:14px 0 0;';
    card.appendChild(hint);

    overlay.appendChild(card);
    document.body.appendChild(overlay);
    this._esc = function(e) { if (e.key === 'Escape') self._close(overlay); };
    document.addEventListener('keydown', this._esc);
  },

  _answer: function(npcId, q, idx, overlay) {
    var ok = QuizBank.check(q, idx);
    if (ok) {
      ScoreTracker.mark(npcId);
      HUD.update();
    }
    this._close(overlay);
    if (ok && ScoreTracker.allDone()) {
      var self = this;
      setTimeout(function() { self._showVictory(); }, 200);
      return;
    }
    var msg   = ok ? 'Correct! ' + npcId + ' is defeated!' : 'Incorrect -- study the lesson and try again!';
    var color = ok ? this.THEME.good : this.THEME.bad;
    this._flash(msg, color);
  },
  
  _flash: function(text, color) {
    var self = this;
    var overlay = this._makeOverlay('rgba(0,0,0,0.75)');
    var box = document.createElement('div');
    box.style.cssText = 'background:#2a1a0a;color:#fff;border-radius:16px;padding:32px 36px;max-width:440px;width:88%;text-align:center;border:2px solid ' + color + ';box-shadow:0 0 40px ' + color + '44;';

    var p = document.createElement('p');
    p.textContent = text;
    p.style.cssText = 'font-size:1.1em;line-height:1.5;margin:0 0 18px;';
    box.appendChild(p);

    var btn = document.createElement('button');
    btn.textContent = 'Continue';
    btn.style.cssText = 'padding:10px 36px;border:none;border-radius:8px;background:' + color + ';color:#000;font-size:1em;font-weight:bold;cursor:pointer;';
    btn.onclick = function() { self._close(overlay); };
    box.appendChild(btn);

    overlay.appendChild(box);
    document.body.appendChild(overlay);
    this._esc = function(e) { if (e.key === 'Escape') self._close(overlay); };
    document.addEventListener('keydown', this._esc);
  },
  
  _showVictory: function() {
    var overlay = this._makeOverlay();
    var box = document.createElement('div');
    box.style.cssText = 'background:linear-gradient(145deg,#1a0f0a,#3a2a1a);color:#fff;border-radius:20px;padding:44px 40px;max-width:520px;width:92%;text-align:center;border:3px solid #ff6b35;box-shadow:0 0 80px rgba(255,107,53,0.3);';

    var trophy = document.createElement('div');
    trophy.style.cssText = 'font-size:4.5em;margin-bottom:8px;';
    trophy.textContent = '🏆';
    box.appendChild(trophy);

    var title = document.createElement('h1');
    title.textContent = 'ARRAY CHAMPION';
    title.style.cssText = 'color:#ff6b35;font-size:2.2em;margin:0 0 12px;text-shadow:0 0 20px #ff6b35;letter-spacing:2px;';
    box.appendChild(title);

    var sub1 = document.createElement('p');
    sub1.textContent = 'All 6 monsters have been defeated!';
    sub1.style.cssText = 'font-size:1.15em;color:#ffcc99;margin-bottom:8px;';
    box.appendChild(sub1);

    var sub2 = document.createElement('p');
    sub2.textContent = 'You command the full power of Java arrays -- declaration, indexing, loops, enhanced for, 2D arrays, and the Arrays API.';
    sub2.style.cssText = 'font-size:0.95em;color:#aa88;margin-bottom:24px;line-height:1.6;';
    box.appendChild(sub2);

    var btn = document.createElement('button');
    btn.textContent = 'Continue Questing';
    btn.style.cssText = 'padding:13px 44px;border:none;border-radius:10px;background:#ff6b35;color:#000;font-size:1.1em;font-weight:bold;cursor:pointer;';
    btn.onclick = function() { overlay.remove(); };
    box.appendChild(btn);

    overlay.appendChild(box);
    document.body.appendChild(overlay);
  },

  _makeOverlay: function(bg) {
    var d = document.createElement('div');
    d.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:' + (bg || 'rgba(0,0,0,0.88)') + ';display:flex;align-items:center;justify-content:center;z-index:10000;font-family:Segoe UI,sans-serif;';
    return d;
  },

  _makeCard: function() {
    var c = document.createElement('div');
    c.style.cssText = 'background:' + this.THEME.card + ';color:#ffddcc;border-radius:18px;padding:30px 34px;max-width:560px;width:92%;box-shadow:0 0 50px rgba(255,107,53,0.1);border:1.5px solid rgba(255,107,53,0.25);text-align:center;';
    return c;
  },

  _close: function(overlay) {
    if (overlay && overlay.parentNode) overlay.remove();
    if (this._esc) document.removeEventListener('keydown', this._esc);
    this.open = false;
  }
};

// =======================================================================
//  MODULE 4 - HUD
// =======================================================================
var HUD = {
  el: null,
  NPCS: [
    'Array Knight',
    'Index Sorcerer',
    'Loop Warrior',
    'For-Each Mage',
    'Matrix Dragon',
    'Arrays API Sage'
  ],

  create: function() {
    var old = document.getElementById('array-quest-hud');
    if (old) old.remove();
    this.el = document.createElement('div');
    this.el.id = 'array-quest-hud';
    this.el.style.cssText = 'position:fixed;top:12px;right:12px;z-index:9999;background:linear-gradient(145deg,#2a1a0a,#4a2a1a);border:2px solid rgba(255,107,53,0.3);border-radius:14px;padding:12px 18px;color:#ffddcc;font-family:Segoe UI,sans-serif;box-shadow:0 0 24px rgba(255,107,53,0.1);min-width:200px;';
    document.body.appendChild(this.el);
    this.update();
  },

  update: function() {
    if (!this.el) return;
    var self = this;
    this.el.innerHTML = '';

    var title = document.createElement('div');
    title.style.cssText = 'font-weight:bold;font-size:1.05em;color:#ff6b35;margin-bottom:6px;';
    title.textContent = 'Array Quest';
    this.el.appendChild(title);

    this.NPCS.forEach(function(npc) {
      var row = document.createElement('div');
      var beaten = ScoreTracker.has(npc);
      row.style.cssText = 'font-size:0.82em;padding:2px 0;color:' + (beaten ? '#4caf50' : '#886') + ';';
      row.textContent = (beaten ? '[X] ' : '[ ] ') + npc;
      self.el.appendChild(row);
    });

    var score = document.createElement('div');
    score.style.cssText = 'margin-top:8px;font-size:0.88em;color:#ffcc99;border-top:1px solid rgba(255,107,53,0.1);padding-top:6px;';
    score.textContent = ScoreTracker.count() + '/6 defeated';
    this.el.appendChild(score);
  },

  destroy: function() {
    if (this.el) { this.el.remove(); this.el = null; }
  }
};

// =======================================================================
//  MODULE 5 - WelcomeScreen
// =======================================================================
var WelcomeScreen = {
  shown: false,

  show: function(container, onStart) {
    var self = this;
    self.shown = true;

    container.style.position = 'relative';

    var overlay = document.createElement('div');
    overlay.id = 'array-quest-welcome';
    overlay.style.cssText = [
      'position:absolute', 'top:0', 'left:0', 'width:100%', 'height:100%',
      'background:linear-gradient(145deg,#1a0f0a,#2a1a0a,#4a2a1a)',
      'display:flex', 'flex-direction:column', 'align-items:center',
      'justify-content:center', 'z-index:10000',
      'font-family:Segoe UI,sans-serif'
    ].join(';') + ';';

    var title = document.createElement('div');
    title.textContent = 'Welcome Adventurer!';
    title.style.cssText = [
      'font-size:5.5em', 'font-weight:900', 'letter-spacing:6px',
      'color:#ffffff',
      'text-shadow:' + [
        '-5px -5px 0 #ff6b35',
         '5px -5px 0 #ff6b35',
        '-5px  5px 0 #ff6b35',
         '5px  5px 0 #ff6b35',
        '-5px  0   0 #ff6b35',
         '5px  0   0 #ff6b35',
         '0   -5px 0 #ff6b35',
         '0    5px 0 #ff6b35',
         '0 0 40px rgba(255,107,53,0.4)'
      ].join(','),
      'margin-bottom:48px',
      'user-select:none'
    ].join(';') + ';';
    overlay.appendChild(title);

    var btn = document.createElement('button');
    btn.textContent = 'Begin Quest';
    btn.style.cssText = [
      'background:#ff6b35',
      'color:#fff',
      'border:none',
      'padding:13px 48px',
      'font-size:1.15em',
      'font-weight:bold',
      'border-radius:30px',
      'cursor:pointer',
      'letter-spacing:1px',
      'box-shadow:0 4px 22px rgba(255,107,53,0.55)',
      'transition:transform 0.1s, box-shadow 0.1s'
    ].join(';') + ';';
    btn.onmouseenter = function() {
      btn.style.transform = 'scale(1.07)';
      btn.style.boxShadow = '0 6px 30px rgba(255,107,53,0.75)';
    };
    btn.onmouseleave = function() {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '0 4px 22px rgba(255,107,53,0.55)';
    };
    btn.onclick = function() {
      overlay.remove();
      self.shown = false;
      if (onStart) onStart();
    };
    overlay.appendChild(btn);

    container.appendChild(overlay);
  }
};

// =======================================================================
//  MODULE 6 - ArrayQuestLevel
// =======================================================================
class ArrayQuestLevel {
  constructor(gameEnv) {
    const path = gameEnv.path;
    const W    = gameEnv.innerWidth;
    const H    = gameEnv.innerHeight;

    ScoreTracker.reset();
    HUD.create();

    const bgData = {
      name: 'array_quest',
      greeting: 'Welcome to Array Dungeon! Find the 6 monsters and prove your Java array mastery.',
      src: path + '/images/gamify/forest.png',
      pixels: { height: 574, width: 1025 }
    };

    const playerData = {
      id: 'Hero',
      greeting: 'I will conquer the arrays!',
      src: path + '/images/gamify/chillguy.png',
      SCALE_FACTOR: 5,
      STEP_FACTOR: 1000,
      ANIMATION_RATE: 50,
      INIT_POSITION: { x: W / 2 - 28, y: H - H / 5 },
      pixels: { height: 512, width: 384 },
      orientation: { rows: 4, columns: 3 },
      down:      { row: 0, start: 0, columns: 3 },
      downRight: { row: 1, start: 0, columns: 3, rotate:  Math.PI / 16 },
      downLeft:  { row: 2, start: 0, columns: 3, rotate: -Math.PI / 16 },
      left:      { row: 2, start: 0, columns: 3 },
      right:     { row: 1, start: 0, columns: 3 },
      up:        { row: 3, start: 0, columns: 3 },
      upLeft:    { row: 2, start: 0, columns: 3, rotate:  Math.PI / 16 },
      upRight:   { row: 1, start: 0, columns: 3, rotate: -Math.PI / 16 },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 }
    };

    function makeNpc(id, greeting, sprite, pixels, pos, scaleFactor, orient, downAnim) {
      return {
        id:             id,
        greeting:       greeting,
        _quizFlavor:    greeting,
        src:            path + sprite,
        SCALE_FACTOR:   scaleFactor,
        ANIMATION_RATE: 110,
        pixels:         pixels,
        INIT_POSITION:  pos,
        orientation:    orient,
        down:           downAnim,
        hitbox: { widthPercentage: 0.3, heightPercentage: 0.3 },
        interact: function() { QuizOverlay.show(id, greeting); }
      };
    }

    const arrayKnight = makeNpc(
      'Array Knight',
      'I guard array creation! Prove your declaration skills.',
      '/images/gamify/animwizard.png',
      { width: 264, height: 192 },
      { x: W * 0.08, y: H * 0.12 },
      4,
      { rows: 4, columns: 4 },
      { row: 0, start: 0, columns: 4 }
    );

    const indexSorcerer = makeNpc(
      'Index Sorcerer',
      'MAGIC INDEXING... Show me your bounds knowledge.',
      '/images/gamify/robot.png',
      { width: 627, height: 316 },
      { x: W * 0.80, y: H * 0.10 },
      8,
      { rows: 3, columns: 6 },
      { row: 1, start: 0, columns: 6 }
    );

    const loopWarrior = makeNpc(
      'Loop Warrior',
      'I charge through loops! Demonstrate your iteration prowess.',
      '/images/gamify/wizard.png',
      { width: 256, height: 352 },
      { x: W * 0.05, y: H * 0.48 },
      4,
      { rows: 1, columns: 1 },
      { row: 0, start: 0, columns: 1 }
    );

    const forEachMage = makeNpc(
      'For-Each Mage',
      'The enhanced loop is my spell -- know its incantation?',
      '/images/gamify/enderman.png',
      { width: 343, height: 503 },
      { x: W * 0.82, y: H * 0.44 },
      4,
      { rows: 1, columns: 1 },
      { row: 0, start: 0, columns: 1 }
    );

    const matrixDragon = makeNpc(
      'Matrix Dragon',
      'I breathe 2D fire! Navigate my dimensions.',
      '/images/gamify/shark.png',
      { width: 306, height: 388 },
      { x: W * 0.12, y: H * 0.72 },
      4,
      { rows: 1, columns: 1 },
      { row: 0, start: 0, columns: 1 }
    );

    const arraysApiSage = makeNpc(
      'Arrays API Sage',
      'Wisdom of java.util.Arrays -- wield it wisely.',
      '/images/gamify/octopus.png',
      { width: 801, height: 301 },
      { x: W * 0.68, y: H * 0.74 },
      6,
      { rows: 1, columns: 1 },
      { row: 0, start: 0, columns: 1 }
    );

    const npcDataList = [
      arrayKnight, indexSorcerer, loopWarrior,
      forEachMage, matrixDragon, arraysApiSage
    ];

    function proximityInteract(e) {
      if (WelcomeScreen.shown) return;
      if (e.key.toLowerCase() !== 'e') return;
      if (QuizOverlay.open) return;
      const playerObj = gameEnv.gameObjects && gameEnv.gameObjects.find(
        function(o) { return o.spriteData && o.spriteData.id === 'Hero'; }
      );
      if (!playerObj) {
        document.removeEventListener('keydown', proximityInteract);
        return;
      }
      var px = playerObj.position.x + playerObj.width / 2;
      var py = playerObj.position.y + playerObj.height / 2;
      var nearest = null, nearestDist = Infinity;
      for (var i = 0; i < npcDataList.length; i++) {
        var nd = npcDataList[i];
        var npcObj = gameEnv.gameObjects.find(
          function(o) { return o.spriteData && o.spriteData.id === nd.id; }
        );
        if (!npcObj) continue;
        var nx = npcObj.position.x + npcObj.width / 2;
        var ny = npcObj.position.y + npcObj.height / 2;
        var dist = Math.sqrt((px - nx) * (px - nx) + (py - ny) * (py - ny));
        if (dist < nearestDist) { nearestDist = dist; nearest = nd; }
      }
      if (nearest && nearestDist < 250) {
        QuizOverlay.show(nearest.id, nearest._quizFlavor);
      }
    }
    WelcomeScreen.show(gameEnv.gameContainer, function() {});
    document.addEventListener('keydown', proximityInteract);

    var hintEl = document.createElement('div');
    hintEl.id = 'array-quest-hint';
    hintEl.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.75);color:#ff6b35;padding:6px 18px;border-radius:20px;font-family:Segoe UI,sans-serif;font-size:0.9em;pointer-events:none;opacity:0;transition:opacity 0.3s;z-index:9990;border:1px solid rgba(255,107,53,0.4);';
    document.body.appendChild(hintEl);

    var hintInterval = setInterval(function() {
      var pObj = gameEnv.gameObjects && gameEnv.gameObjects.find(
        function(o) { return o.spriteData && o.spriteData.id === 'Hero'; }
      );
      if (!pObj) { clearInterval(hintInterval); hintEl.remove(); return; }
      var ppx = pObj.position.x + pObj.width / 2;
      var ppy = pObj.position.y + pObj.height / 2;
      var minDist = Infinity, nearName = '';
      for (var j = 0; j < npcDataList.length; j++) {
        var nd2 = npcDataList[j];
        var no2 = gameEnv.gameObjects.find(
          function(o) { return o.spriteData && o.spriteData.id === nd2.id; }
        );
        if (!no2) continue;
        var d2 = Math.sqrt(
          (ppx - (no2.position.x + no2.width/2)) * (ppx - (no2.position.x + no2.width/2)) +
          (ppy - (no2.position.y + no2.height/2)) * (ppy - (no2.position.y + no2.height/2))
        );
        if (d2 < minDist) { minDist = d2; nearName = nd2.id; }
      }
      if (minDist < 250 && !QuizOverlay.open && !WelcomeScreen.shown) {
        hintEl.textContent = 'Press E to challenge ' + nearName;
        hintEl.style.opacity = '1';
      } else {
        hintEl.style.opacity = '0';
      }
    }, 100);

    this.classes = [
      { class: GameEnvBackground, data: bgData },
      { class: Player,            data: playerData },
      { class: Npc,               data: arrayKnight },
      { class: Npc,               data: indexSorcerer },
      { class: Npc,               data: loopWarrior   },
      { class: Npc,               data: forEachMage  },
      { class: Npc,               data: matrixDragon },
      { class: Npc,               data: arraysApiSage }
    ];
  }
}

export const gameLevelClasses = [ArrayQuestLevel];
export { GameControl };