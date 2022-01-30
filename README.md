# Keyboard

Keyboard is an Makecode Arcade extension for making custom keyboards and reading the value

> Keyboard works only with JavaScript

# Example

```
keyboard.create(function(input) {
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
