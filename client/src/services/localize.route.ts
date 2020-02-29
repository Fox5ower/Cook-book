export default function (route: string) {
    let locale = localStorage.getItem("locale");
    if (!locale) {
        localStorage.setItem("locale", navigator.language.substr(0, 2))
        locale = localStorage.getItem("locale");
    } else {
        if (locale && locale.match(/(ru|en)/)) {
            console.log("Ok locale");
            return `/${locale}/${route}`;
        } else {
            console.log("Not ok");
            let browserLocale = navigator.language
            let locale = browserLocale.substr(0, 2);
            return `/${locale}/${route}`;
        }
    }
}