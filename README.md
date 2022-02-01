# Keyboard

![GitHub top language](https://img.shields.io/github/languages/top/PowerUpStudios/keyboard?style=for-the-badge)

Keyboard is an Makecode Arcade extension for making custom keyboards and reading the value

> Keyboard works only with JavaScript

# Usage

```
keyboard.create(start_x: number, start_y: number, onenter: (input: string) => void, onchange: (input: string) => void, cursorimg?: Image, chars?: Array<string>)
```

# Example

```
keyboard.create(0, 0, function(input) {
 console.log("Entered input: " + input)
}, function(input) {
 console.log("Input changed: " + input)
}, img`
    1 1 1 1 1 1 1 1 1
    1 . . . . . . . 1
    1 . . . . . . . 1
    1 . . . . . . . 1
    1 . . . . . . . 1
    1 . . . . . . . 1
    1 . . . . . . . 1
    1 . . . . . . . 1
    1 1 1 1 1 1 1 1 1
`)
```

> The recommended cursor size is 9x9
