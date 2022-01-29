//%block="Keyboard" color=#00cbff icon="\uf11c"
namespace keyboard {
    //%block="Create Keyboard With Cursor Img %cursorimg X %start_x Y %start_y Chars %chars" color=#00cbff blockId="createKeyboard"
    export function createKeyboard(cursorimg?: Image, start_x = 0, start_y = 0, chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",", ":", " "]) {
            pause(200)
            let input = ""
            let cursor = sprites.create(cursorimg)
            let cursor_x = 10 + start_x
            let cursor_y = 80 + start_y
            cursor.setPosition(cursor_x, cursor_y)
            let cursor_pos_x = [0]
            let cursor_pos_y = [0]
            let cursor_chars = [{ x: 0, y: 0, char: "" }]
            let btns = [textsprite.create("")]
            let x = start_x
            let y = start_y
            let x_reset = false
            let old_y = y
            cursor_pos_x.splice(0, 1)
            cursor_pos_y.splice(0, 1)
            cursor_chars.splice(0, 1)
            btns[0].destroy()
            btns.splice(0, 1)
            for (let char = 0; char < chars.length; char++) {
                let btn = textsprite.create(chars[char])
                y = (Math.floor(char / 21) * 8) + start_y
                if (old_y != y) {
                    old_y = y
                    x_reset = true
                }
                x += 1
                if (x_reset) {
                    x = start_x + 1
                    x_reset = false
                }
                btn.setPosition(3 + (x * 7), 80 + y)
                if (cursor_pos_x.indexOf(3 + (x * 7)) == -1) {
                    cursor_pos_x.push(3 + (x * 7))
                }
                if (cursor_pos_y.indexOf(80 + y) == -1) {
                    cursor_pos_y.push(80 + y)
                }
                if (cursor_chars.indexOf({ x: 3 + (x * 7), y: 80 + y, char: chars[char] }) == -1) {
                    cursor_chars.push({ x: 3 + (x * 7), y: 80 + y, char: chars[char] })
                }
                btns.push(btn)
            }
            let enter_btn = sprites.create(img`
            . . . . . . .
            . . . . 1 . .
            . . . . . 1 .
            . 1 1 1 1 1 1
            . . . . . 1 .
            . . . . 1 . .
            . . . . . . .
        `)
            enter_btn.setPosition(150 + start_x, 88 + start_y)
            cursor_pos_x.push(150 + start_x)
            cursor_pos_y.push(88 + start_y)
            cursor_chars.push({ x: 150 + start_x, y: 88 + start_y, char: "enter" })
            let back_btn = sprites.create(img`
            . . . . . . .
            . . 1 . . . .
            . 1 . . . . .
            1 1 1 1 1 1 .
            . 1 . . . . .
            . . 1 . . . .
            . . . . . . .
        `)
            back_btn.setPosition(143, 88)
            cursor_pos_x.push(143)
            cursor_pos_y.push(88)
            cursor_chars.push({ x: 143 + start_x, y: 88 + start_y, char: "back" })
            forever(function () {
                if (controller.right.isPressed() && cursor_pos_x.indexOf(cursor_x + 7) != -1) {
                    cursor_x += 7
                    pause(200)
                }
                if (controller.left.isPressed() && cursor_pos_x.indexOf(cursor_x - 7) != -1) {
                    cursor_x -= 7
                    pause(200)
                }
                if (controller.up.isPressed() && cursor_pos_y.indexOf(cursor_y - 8) != -1) {
                    cursor_y -= 8
                    pause(200)
                }
                if (controller.down.isPressed() && cursor_pos_y.indexOf(cursor_y + 8) != -1) {
                    cursor_y += 8
                    pause(200)
                }
                if (controller.A.isPressed()) {
                    for (let char = 0; char < cursor_chars.length; char++) {
                        if (cursor_x == cursor_chars[char].x && cursor_y == cursor_chars[char].y) {
                            if (cursor_chars[char].char != "enter" && cursor_chars[char].char != "back") {
                                input += cursor_chars[char].char
                                pause(200)
                            } else {
                                if (cursor_chars[char].char != "back") {
                                    cursor.destroy()
                                    for (let btn = 0; btn < btns.length; btn++) {
                                        btns[btn].destroy()
                                    }
                                    enter_btn.destroy()
                                    back_btn.destroy()
                                    return input
                                } else {
                                    input = input.slice(0, -1)
                                    pause(200)
                                }
                            }
                        }
                    }
                }
                cursor.setPosition(cursor_x, cursor_y)
                return null
            })
    }
}