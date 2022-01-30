namespace keyboard {
    export function create(x: number, y: number, onenter: (input: string) => void, onchange: (input: string) => void, cursorimg?: Image, chars? : Array<string>) {
        pause(200)
        let input = ""
        let cursor = sprites.create(cursorimg)
        let cursor_x = 10
        let cursor_y = 80
        cursor.setPosition(cursor_x, cursor_y)
        if (!chars) {
            chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",", ":", "/", "+", "-", "*", ">", "\\", "[", "]", "{", "}", "|", ";", "(", ")", "^", "%", "$", "!", "#", "^", "<", " "]
        }
        let cursor_pos_x = [0]
        let cursor_pos_y = [0]
        let cursor_chars = [{ x: 0, y: 0, char: "" }]
        let btns = [textsprite.create("")]
        let x_reset = false
        let old_y = y
        cursor_pos_x.splice(0, 1)
        cursor_pos_y.splice(0, 1)
        cursor_chars.splice(0, 1)
        btns[0].destroy()
        btns.splice(0, 1)
        for (let char = 0; char < chars.length; char++) {
            let btn = textsprite.create(chars[char])
            y = Math.floor(char / 21) * 8
            if (old_y != y) {
                old_y = y
                x_reset = true
            }
            x += 1
            if (x_reset) {
                x = 1
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
        enter_btn.setPosition((3 + (x * 7)) + 14, 80 + y)
        cursor_pos_x.push((3 + (x * 7)) + 14)
        cursor_pos_y.push(80 + y)
        cursor_chars.push({ x: (3 + (x * 7)) + 14, y: 80 + y, char: "enter" })
        let back_btn = sprites.create(img`
        . . . . . . .
        . . 1 . . . .
        . 1 . . . . .
        1 1 1 1 1 1 .
        . 1 . . . . .
        . . 1 . . . .
        . . . . . . .
    `)
        back_btn.setPosition((3 + (x * 7)) + 7, 80 + y)
        cursor_pos_x.push((3 + (x * 7)) + 7)
        cursor_pos_y.push(80 + y)
        cursor_chars.push({ x: (3 + (x * 7)) + 7, y: 80 + y, char: "back" })
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
                            onchange(input)
                            pause(200)
                        } else {
                            if (cursor_chars[char].char != "back") {
                                cursor.destroy()
                                for (let btn = 0; btn < btns.length; btn++) {
                                    btns[btn].destroy()
                                }
                                enter_btn.destroy()
                                back_btn.destroy()
                                onenter(input)
                                input = ""
                            } else {
                                input = input.slice(0, -1)
                                onchange(input)
                                pause(200)
                            }
                        }
                    }
                }
            }
            cursor.setPosition(cursor_x, cursor_y)
        })
    }
}