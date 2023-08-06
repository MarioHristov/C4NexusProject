// function fillContent(pageId) {
//     document.getElementById('gallery-link').href = '/html_pages/locations/'+ pageId.replace(/\s/g, "") + '.html#gallery';
//     document.querySelector('.gibberish-box h1').innerHTML = pageId ;
// }
function addScript(src) {
    var script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
}