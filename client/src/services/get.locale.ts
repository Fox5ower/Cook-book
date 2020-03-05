export default function () {
    let href = window.location.href
    let match = href.match(/(\/ru|\/en)/);
    let locale = match[0].substr(1)
    return locale;
}