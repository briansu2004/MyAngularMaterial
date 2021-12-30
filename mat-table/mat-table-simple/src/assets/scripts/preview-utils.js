// Full-screen preview logic
const previewHeader = document.querySelector('[data-preview]');
const previewUnderline = document.querySelector('[data-preview-underline]');
const closeButton = document.querySelector('[data-preview-close]');

let searchParams = {};

if (window.location.search) {
    const params = window.location.search.substring(1).split('&');

    for (let i = 0; i < params.length; i++) {
        const splitParam = params[i].split('=');
        if (!splitParam[0]) continue;
        searchParams[splitParam[0]] = splitParam[1] || true;
    }
}

function hideContent(elem) {
    elem.style.display = 'none';
};

// If we are not in the full screen preview, remove preview header
if (searchParams.componentPreview === 'true') {
    hideContent(previewHeader);
    hideContent(previewUnderline);
// If we are in the full screen preview, add functionality to close button
} else {
    closeButton.addEventListener('click', function() {
        window.top.close();
    });
}

//disable clicks in iframe to prevent cors issues
if (window.frameElement) {
    let footerLinks = Object.values(document.getElementsByClassName('ontario-footer__link'));
    if (footerLinks) {
        footerLinks.forEach(function (item) {
            item.addEventListener('click', function (event) {
                event.preventDefault()
            })
        })
    }
}
