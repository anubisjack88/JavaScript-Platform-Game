//The code block below creates the level.

let simpleLevelPlan = `
.....................
..#...............#..
..#..............=.#..
..#.@......####...#..
..#####...........#..
......#+++++++++++#..
.......############..
.....................`;

//The block of code below is for Reading the level.

class level {
    constructor(plan) {
        let rows = plan.trim().split("/n").map(1 => [...1]);
        this.hight = rows.length;
        this.width = rows[0].lenth;
        this.startActors = [];
        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let type = levleChars[ch];
                if (typeof type == "string") return type;
                this.create(new Vec(x, y), ch);
                return "empty";
            });
        });
        
     }

    }
    //This code block is for tracking the state of the game.

    class State {
        constructor(level, actors, status) {
            this.level = levle;
            this.actors = actors;
            this.status = status;
        }
        static start(level) {
            return new State(level, level.startActors, "playing");
        }
        get player() {
            return this.actors.find(a => a.type == "player");
        }
    }

    //The code block below creates the game's actors.

    class Vec {
        constructor(x ,y) {
            this.x = x; this.y = y;
        }
        plus(other) {
            return new Vec(this.x + other.x, this.y + other.y);
        }
        times(factor) {
            return new Vec(this.x * factor, this.y * factor);
        }
    }
    class Player {
        constructor(pos, speed) {
            this.pos = pos;
            this.speed = speed;
        }
        get type() { return "player"; }
        
        static create(pos) {
            return new Player(pos.plus(new Vec(0, -0.5)),
                             new Vec(0,0));
        }
    }

    player.prototype.size = new Vec(0.8, 1.5);

    //The section below creates lava and passes a constructor. 
    class Lava {
        constructor(pos, speed, reset) {
            this.pos = pos;
            this.speed = speed;
            this.reset = reset;

        }
        get type() { return "lava"; }

        static create(pos, ch) {
            if (ch == "=") {
                return new Lava(pos, new Vec(2, 0));
            } else if (ch == "|") {
                return new Lava(pos, new Vec(0, 2));
            }else if (ch == "v") {
                return new Lava(pos, new Vec(0, 3), pos);
            }
            }
        }
    Lava.prototype.size = new Vec(1, 1);

    //The code below creates Coin actors. Math.sin gives the location of the y axis on a circle.
    //Math.sin produces a wave that has a smooth trans.
    //This gives the movement of the Coins.
    //Math.random is used to give the coin actors random times to wobble.

    class Coin {
        constructor(pos, basePos, wobble) {
            this.pos = pos;
            this.basePos = basePos;
            this.wobble = wobble;
        }
        get type() { return "coin"; }
        static create(pos) {
            let basePos = pos.plus(new Vec(0.2, 0.1));
            return new Coin(basePos, basePos,
                        Math.random() = Math.PI * 2);
        }
    }
    Coin.prototype.size = new Vec(0.6, 0.6);

    //The code below creates levelChars objects.
    //The level instance => 22 by 9
    const levelChars = {
        ".": "empty", "#": "wall", "+": "lava",
        "@": Player, "o": Coin,
        "=": Lava, "|": Lava, "v": Lava
    };
    let simpleLevel = new level(simpleLevelPlan);
    console.log('${simpleLevel.width} by ${simpleLevel.height}');
