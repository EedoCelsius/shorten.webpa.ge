
document.addEventListener("DOMContentLoaded", function () {
    const A_settings = ["domain", "password", "vaildUntil", "visitLimit", "email"]
    const disabledRecently = { domain: false, password: false, vaildUntil: false, visitLimit: false, email: false }
    for (let i = 0; i < A_settings.length; i++) {
        document.getElementById(A_settings[i] + "Text").onclick = function () {
            if (disabledRecently[A_settings[i]]) return
            (document.getElementById(A_settings[i] + "Checkbox").checked) ? disable(A_settings[i]) : enable(A_settings[i])
        }
        document.getElementById(A_settings[i] + "Checkbox").onclick = function () {
            (document.getElementById(A_settings[i] + "Checkbox").checked) ? enable(A_settings[i]) : disable(A_settings[i])
        }

        if (A_settings[i] !== "domain")
            document.getElementById(A_settings[i] + "Input").onblur = function () {
                if (document.getElementById(A_settings[i] + "Input").value === "") disable(A_settings[i])
            }
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
            document.getElementById(S_setting + "Input").value = 100
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

        disabledRecently[S_setting] = true
        setTimeout(function () { disabledRecently[S_setting] = false }, 500)
    }
})
