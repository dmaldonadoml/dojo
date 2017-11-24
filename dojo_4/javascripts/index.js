const createPacman = require('./pacman')
const createCherry = require('./cherry')
const createBiscuit = require('./biscuit')
const createPellet = require('./pellet')
const createPhanton = require('./phanton')
const describePacman = (pacman) => {
    console.log(`Pacman weight: ${pacman.getWeight()}, state: ${pacman.getStatus()}`)
}

var keypress = require('keypress');

keypress(process.stdin);

const ProtoEmptySpace = {
    id: 'empty space',
    acceptPacman() {
        return true
    }
}

const createEmptySpace = () => {
    return Object.create(ProtoEmptySpace)
}

const ProtoWall = {
    id: 'wall',
    acceptPacman() {
        return false
    }
}

const createWall = () => {
    return Object.create(ProtoWall)
}
const emoji = (emoji) => {
    return {
        emoji,
        visible() {
            return emoji
        }
    }
}
const none = emoji(' ')
const positionable = (entity, emoji, current = [0,0]) => {


    return {
        emoji,
        entity,
        current,
        up() {
            const [x, y] = this.current
            return [x, (y - 1)]
        },
        right() {
            const [x, y] = this.current
            return [ (x + 1) , y]
        },
        down() {
            const [x, y] = this.current
            return [x, (y + 1)]
        },
        left() {
            const [x, y] = this.current
            return [( x - 1 ), y]
        },
        setCurrent(current) {
            this.current = current
        },
        show() {
            return this.emoji.visible()
        }
    }
}
const cherry = positionable(createCherry(), emoji('🍒'))
const phanton = positionable(createPhanton(), emoji('👻'))
const pacman = positionable(createPacman(), emoji('😀'), [1, 0])

const defaultMatrix = [
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', '|', ' ', '|', ' ', cherry, '|'],
    [' ', ' ', ' ', '|', phanton, '|', ' ', ' ', ' '],
    ['|', ' ', ' ', '|', ' ', '|', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
]
const gameOverMatrix = [
    [' --- GAME OVER --- ']
]

const createMatrix = (matrix) => {

    return matrix
    .map((row, x) => {

        return row.map((cell, y) => {
            if (cell === ' ') {
                return positionable(createEmptySpace(), emoji(cell), [x, y])
            }
            if (cell === '|') {
                return positionable(createWall(), emoji(cell), [x, y])
            }
            cell.setCurrent([x, y])
            return cell
        })
    })
}
let matrix;

const draw = (matrix) => {
    
    process.stdout.write('\033c');
    const [pacman_x, pacman_y] = pacman.current
    
    matrix.forEach((row, y) => {

        const nana = row.map((cell, x) => {

            if (pacman_x === x && pacman_y === y) {
                return pacman.show()
            }

            return cell.show()
        })
        console.log(nana.join(' '))
    })
    pacman.entity.describe(describePacman)
}

const checkCollition = (thing, pacman) => {
    return thing.entity.acceptPacman(pacman.entity)
}

matrix = createMatrix(defaultMatrix)
matrix[pacman.current[1]][pacman.current[0]] = pacman
draw(matrix)

process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }

    let {current, id} = pacman

    matrix = createMatrix(defaultMatrix)

    const Pointer = {
        point: current,
        checkCollition(direction) {
            let next = this.getNextByDirection(direction)

            const collide = checkCollition(next, pacman)

            if (collide)  {
                this[direction]()
            }
        },
        getNextByDirection(direction) {
            const [x, y] = pacman[direction]()
            return matrix[y][x]
        },
        speed: 1,
        update_y(value) {
            pacman.current[1] += value
        },
        update_x(value) {
            pacman.current[0] += value
        },
        up() {
            this.update_y(-this.speed)
        },
        right() {
            this.update_x(this.speed)
        },
        down() {
            this.update_y(this.speed)
        },
        left() {
            this.update_x(-this.speed)
        }
    }

    const control = ['left', 'right', 'down', 'up']
    if (control.indexOf(key.name) !== -1) {

        Pointer.checkCollition(key.name)
        
        if (pacman.entity.getStatus() === 'dead') {
            process.stdin.pause();
            return console.log('GAME OVER')
        }

        return draw(matrix)
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();