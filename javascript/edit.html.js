
document.addEventListener("DOMContentLoaded", function () {
    const A_settings = ["domain", "password", "vaildUntil", "visitLimit", "email"]
    for (let i = 0; i < A_settings.length; i++) {
        document.getElementById(A_settings[i] + "Text").addEventListener("click", function () {
            (document.getElementById(A_settings[i] + "Checkbox").checked) ? disable(A_settings[i]) : enable(A_settings[i])
        })
        document.getElementById(A_settings[i] + "Checkbox").addEventListener("click", function () {
            (document.getElementById(A_settings[i] + "Checkbox").checked) ? enable(A_settings[i]) : disable(A_settings[i])
        })

        if (A_settings[i] !== "domain")
            document.getElementById(A_settings[i] + "Input").addEventListener("blur", function () {
                setTimeout(function () {
                    if (document.getElementById(A_settings[i] + "Input").value === "")
                        disable(A_settings[i])
                    else if (A_settings[i] === "email" && ValidateEmail(document.getElementById("emailInput").value) === false)
                        alert("This does not seem like a valid email address!")
                }, 500)
            })

        const A_events = ["propertychange", "change", "keyup", "paste", "input"]
        A_events.forEach(function (S_event) {
            document.getElementById("domainInput").addEventListener(S_event, function () {
                const A_prefixChars = Array.from(document.getElementById("domainInput").value)
                for (let i = 0; i < A_prefixChars.length; i++)
                    if (A_prefixChars[i] === "." || validateUrl(`http://${(i === 0) ? "" : "i"}${A_prefixChars[i]}i.webpa.ge`) === false)
                        A_prefixChars[i] = null
                document.getElementById("domainInput").value = A_prefixChars.filter(function (S_char) { return S_char !== null }).join("")
            })
        })
        document.getElementById("domainInput").addEventListener("blur", function () {
            const A_prefixChars = Array.from(document.getElementById("domainInput").value)
            for (let i = A_prefixChars.length - 1; i >= 0; i--)
                if (validateUrl(`http://i${A_prefixChars[i]}.webpa.ge`) === false)
                    A_prefixChars[i] = null
                else break
            document.getElementById("domainInput").value = A_prefixChars.filter(function (S_char) { return S_char !== null }).join("")
        })
    }

    function enable(S_setting) {
        document.getElementById(S_setting + "Input").disabled = false
        document.getElementById(S_setting + "Checkbox").checked = true

        if (S_setting === "domain") {
            document.getElementById(S_setting + "Select").disabled = false
            document.getElementById(S_setting + "Input").placeholder = "Prefix (Optional)"
        }
        else if (S_setting === "visitLimit") {
            document.getElementById(S_setting + "Input").placeholder = ""
            document.getElementById(S_setting + "Input").value = document.getElementById(S_setting + "Input").value || 100
        }
        else {
            document.getElementById(S_setting + "Input").placeholder = ""
            document.getElementById(S_setting + "Input").focus()
        }
    }

    function disable(S_setting) {
        document.getElementById(S_setting + "Input").disabled = true
        document.getElementById(S_setting + "Checkbox").checked = false
        document.getElementById(S_setting + "Input").placeholder = "Disabled"

        if (S_setting === "domain")
            document.getElementById(S_setting + "Select").disabled = true
    }
})

function validateUrl(S_url) {
    try {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(new URL(S_url).origin);
    }
    catch {
        return false
    }
}

function ValidateEmail(S_email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(S_email)
}