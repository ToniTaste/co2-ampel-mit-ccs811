input.onButtonPressed(Button.A, function () {
    t_co2 = !(t_co2)
})
function zeigeOLED () {
    oledssd1306.clearDisplay()
    oledssd1306.setTextXY(0, 0)
    oledssd1306.writeString("Messwerte:")
    oledssd1306.setTextXY(1, 0)
    oledssd1306.writeString("CO2: ")
    oledssd1306.writeNumber(co2)
    oledssd1306.setTextXY(2, 0)
    oledssd1306.writeString("TVOC: ")
    oledssd1306.writeNumber(tvoc)
}
input.onButtonPressed(Button.AB, function () {
    t_ton = !(t_ton)
})
input.onButtonPressed(Button.B, function () {
    t_tvoc = !(t_tvoc)
})
let tvoc = 0
let co2 = 0
let t_ton = false
let t_tvoc = false
let t_co2 = false
SG33.address(true)
t_co2 = false
t_tvoc = false
t_ton = true
oledssd1306.initDisplay()
oledssd1306.flipScreen()
basic.forever(function () {
    co2 = SG33.eCO2()
    tvoc = SG33.TVOC()
    if (co2 < 1000 && tvoc < 400) {
        basic.setLedColor(0x00ff00)
    } else if (co2 < 1400 && tvoc < 400) {
        basic.setLedColor(0xff0000)
    } else {
        basic.setLedColor(0x0000ff)
        if (t_ton) {
            music.playMelody("C5 B A G F E D C ", 200)
        }
    }
    zeigeOLED()
    if (t_co2) {
        Zahlencodierung.zeigeNSorobancodiertAn(co2)
        t_co2 = !(t_co2)
    } else if (t_tvoc) {
        Zahlencodierung.zeigeNSorobancodiertAn(tvoc)
        t_tvoc = !(t_tvoc)
    }
    basic.pause(5000)
    basic.clearScreen()
})
