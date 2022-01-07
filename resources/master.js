//For browsers that doesn't support replaceAll function
String.prototype.replaceAll = function (search, replace) { return this.split(search).join(replace) }

function resizeElement(elmnt) {
    if (elmnt.getAttribute("abstyle") === null) {
        if (elmnt.getAttribute("style")) elmnt.setAttribute("abstyle", elmnt.getAttribute("style"))
        else elmnt.setAttribute("abstyle", "")
    }

    for (let i = 0; i < 2; i++) {
        const N_viewportWidth = document.documentElement.offsetWidth, N_viewportHeight = document.documentElement.offsetHeight,
            N_selfWidth = elmnt.offsetWidth, N_selfHeight = elmnt.offsetHeight,
            N_selfShort = (N_selfWidth < N_selfHeight) ? N_selfWidth : N_selfHeight, N_selfLong = (N_selfWidth < N_selfHeight) ? N_selfHeight : N_selfWidth

        let N_parentWidth, N_parentHeight, N_parentShort, N_parentLong
        if (elmnt.parentElement)
            N_parentWidth = elmnt.parentElement.offsetWidth, N_parentHeight = elmnt.parentElement.offsetHeight,
                N_parentShort = (N_parentWidth < N_parentHeight) ? N_parentWidth : N_parentHeight, N_parentLong = (N_parentWidth < N_parentHeight) ? N_parentHeight : N_parentWidth

        S_relativeStyles = (elmnt.getAttribute("relsize") || "")
            .replaceAll("vw(", "calc(" + (N_viewportWidth - 0.01) / 100 + "px * ").replaceAll("vh(", "calc(" + (N_viewportHeight - 0.01) / 100 + "px * ")
            .replaceAll("sw(", "calc(" + (N_selfWidth - 0.01) / 100 + "px * ").replaceAll("sh(", "calc(" + (N_selfHeight - 0.01) / 100 + "px * ")
            .replaceAll("ss(", "calc(" + (N_selfShort - 0.01) / 100 + "px * ").replaceAll("sl(", "calc(" + (N_selfLong - 0.01) / 100 + "px * ")
            .replaceAll("pw(", "calc(" + (N_parentWidth - 0.01) / 100 + "px * ").replaceAll("ph(", "calc(" + (N_parentHeight - 0.01) / 100 + "px * ")
            .replaceAll("ps(", "calc(" + (N_parentShort - 0.01) / 100 + "px * ").replaceAll("pl(", "calc(" + (N_parentLong - 0.01) / 100 + "px * ")

        elmnt.setAttribute("style", elmnt.getAttribute("abstyle") + ";" + S_relativeStyles)
    }
}

HTMLElement.prototype.resizeRelatively = function () {
    resizeElement(this)
    for (let i = 0; i < this.childElementCount; i++)
        try {
            this.children[i].resizeRelatively()
        } catch { }
}

let B_resizedRecently = false
window.addEventListener("resize", function () {
    if (B_resizedRecently === false) {
        document.documentElement.resizeRelatively()
        B_resizedRecently = true
        setTimeout(function () { B_resizedRecently = false, 200 })
    }
    else setTimeout(function () {
        if (B_resizedRecently === false) {
            document.documentElement.resizeRelatively()
            B_resizedRecently = true
            setTimeout(function () { B_resizedRecently = false, 200 })
        }
    }, 200)
})

document.addEventListener("DOMContentLoaded", function () { document.documentElement.resizeRelatively() })