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

const ProtoCollideable = {
    acceptPacman() {
        return true
    },
    acceptPhanton() {
        return true
    }
}

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
const positionable = (entity, emoji, collideable, current = [0,0]) => {

    return {
        emoji,
        entity,
        current,
        collideable,
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

const createCollideable = (specs) => {

    const collideable = Object.create(ProtoCollideable)
    Object.assign(collideable, specs)
    return collideable
}

const pacmanCollide = createCollideable()
const phantonCollide = createCollideable({
    acceptPacman(pacman) {
        const [x, y] = pacman.current
        pacman = positionable(createEmptySpace(), emoji('X'), [x, y])
    }
})
const cherryCollide = createCollideable({
    acceptPacman(pacman) {
        makeCherry = false
        return true
    }
})
const wallCollide = createCollideable({
    acceptPacman(pacman) {
        return false
    }
})

const cherry = positionable(createCherry(), emoji('🍒'), cherryCollide)
const phanton = positionable(createPhanton(), emoji('👻'), phantonCollide, [4, 2])
const pacman = positionable(createPacman(), emoji('😀'), pacmanCollide, [1, 0])

console.log(1, cherry.entity.acceptPacman + '')

const defaultMatrix = [
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', '|', ' ', '|', ' ', ' ', '|'],
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
                return positionable(createEmptySpace(), emoji(cell), pacmanCollide, [x, y])
            }
            if (cell === '|') {
                return positionable(createWall(), emoji(cell), wallCollide, [x, y])
            }
            cell.setCurrent([x, y])
            return cell
        })
    })
}
let matrix;

const draw = (matrix) => {
    
    process.stdout.write('\033c');

    matrix.forEach((row, y) => {

        const nana = row.map((cell, x) => {
            return cell.show()
        })
        console.log(nana.join(' '))
    })
    pacman.entity.describe(describePacman)
}

const checkCollition = (next_cell, pacman) => {
    next_cell.entity.acceptPacman(pacman.entity)

    console.log(JSON.stringify(next_cell))

    console.log(2, next_cell.entity.acceptPacman + '')

    return next_cell.collideable.acceptPacman(pacman)
}

matrix = createMatrix(defaultMatrix)
matrix[pacman.current[1]][pacman.current[0]] = pacman
draw(matrix)

let makeCherry = false

const setCherry = setInterval(() => {
    makeCherry = true
}, 3000)

process.stdin.on('keypress', function (ch, key) {

    if (key && key.ctrl && key.name == 'c') {
        clearInterval(setCherry)
        process.stdin.pause();
    }

    let {current, id} = pacman

    matrix = createMatrix(defaultMatrix)

    if (makeCherry) {
        matrix[0][4] = cherry
    }

    const Pointer = {
        point: current,
        checkCollition(direction) {
            let next = this.getNextByDirection(direction)
            console.log('collide: ', next.show(), pacman.show())
            const collide = checkCollition(next, pacman)

            if (collide)  {
                this[direction]()
            }
            const [x, y] = pacman.current
            matrix[y][x] = pacman
        },
        getNextByDirection(direction) {
            const [x, y] = pacman[direction]()
            console.log(y, x)
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
            clearInterval(setCherry)
            return console.log('GAME OVER')
        }

        return draw(matrix)
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();