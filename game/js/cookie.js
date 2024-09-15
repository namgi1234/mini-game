export function getCookie (name){
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

export function existingValue (name) {
    var Value = getCookie(name);
    if (!Value) {
        console.log(document.cookie)
        document.cookie = name + " = 0;  max-age=31556926"
      }
}
