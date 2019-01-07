
document.getElementById("random").addEventListener('change', function() {
    if(this.checked) {
        document.getElementById("custom").readOnly = true
        document.getElementById("custom").setAttribute("class", "lock")
    } else {
        document.getElementById("custom").readOnly = false
        document.getElementById("custom").setAttribute("class", "")
    }
})

