// Radio & Serial Assignment
// 
// The Engineering Design Document IS REQUIRED for this Assignment.
// You can find it in the General Channel -> Files -> Class Materials -> Engineering Design Template.docx
// Scenario: Two micro:bit users are separated by a large distance and must send codes to each other
// in order to stop a Zombie Frog invasion.  User A, Master Pollywog can only send Numbers.
// User B, Commander Boffo can only send String.  Because any red LED light will alert the Zombie Frogs
// as to their position, Master and Commander have decided to use the Serial functions of the micro:bit.
// Operation 1.  Master Pollywog will send the code 892.
// This matches the code book so that upon receipt, Commander Boffo can send the text, "WeaponsReady".
// Operation 2. When Master Pollywog receives "WeaponsReady" the number code "555" will be sent.
// Commander Boffo can then reply with, "Launched!"
// 
// If the codes do not match, special key words are sent to alert the receiver that an error might have happened
// or that their systems are corrupted by the Frogs.  In those cases, the code 7 equates to "HeartFrogs"
// and must be seen on both sides.  This will prevent any Frogs from locating the Commander or the Master.
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber)
    if (receivedNumber == 892) {
        serial.writeLine("WeaponsReady")
    } else if (receivedNumber == 555) {
        serial.writeLine("Death to Zombies!")
    } else {
        Broken(7)
    }
})
function Broken (code: number) {
    if (code == 7) {
        serial.writeLine("HeartFrogs")
    }
}
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(892)
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
    if (receivedString == "WeaponsReady") {
        radio.sendNumber(555)
    } else if (receivedString == "Death to Zombies!") {
        radio.sendValue("name", 0)
    } else {
        Broken(7)
    }
})
radio.setGroup(23)
