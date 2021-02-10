const DEFAULT_BUTTON = 'appointments';
const availableButtons = ['appointments', 'how-it-works', /*'volunteering'*/]

const init = () => {
    Array.from(document.querySelectorAll('#menu li a')).forEach(button => button.style.display = 'none');

    availableButtons.forEach(name => {
        const button = document.getElementById(`${name}-button`);
        if (button) {
            button.style.display = 'block';
            button.addEventListener('click', () => navAction(name))
        }
        else {
            console.log(`button not found for ${name}`)
        }
    })
    const qsParams = getParams(window.location.search);
    const defaultButton = qsParams['button'] || DEFAULT_BUTTON;
    navAction(defaultButton)
    //initVimeo()
}

const navAction = (which) => {
    if (!which) return;
    Array.from(document.getElementsByClassName('active-button')).forEach(button => button.classList.remove('active-button'));
    const button = document.querySelector(`#${which}-button`)
    button.parentElement.className += 'active-button';
    document.querySelector('#displayed-content').innerHTML = document.querySelector(`#content-${which}`).innerHTML;
}

const getParams = (searchString) => {
    const params = [];
    try {
        const pairStrs = searchString.replace('?', '').split('&');
        // special setup for single parameter to indicate default button
        if (pairStrs.length == 1 && !pairStrs.includes('=')) {
            return [{ button: pairsStr }]
        }
        pairStrs.forEach(pair => {
            const pName = pair.split.length == 2 ? pair.split('=')[0] : 'button';
            const pVal = pair.split.legnth == 2 ? pair.split('=')[1] : pair.split('=')[0];
            params.push({ [pName]: pVal });
        })
    } catch (err) {
        return [];
    }
    return params;
}


const initVimeo = () => {
    const placeholder = document.querySelector('.vp-placeholder');
    const placeholderThumb = document.querySelector('.vp-placeholder-thumb');
    const videoWidth = parseInt('960');
    const videoHeight = parseInt('540');
    const thumb = new Image();
    thumb.onload = function () {
        const videoAspectRatio = videoWidth / videoHeight;
        const imageAspectRatio = this.width / this.height;
        if (imageAspectRatio <= 0.95 * videoAspectRatio || imageAspectRatio >= 1.05 * videoAspectRatio) {
            const rect = placeholder.getBoundingClientRect();
            const placeholderWidth = rect.right - rect.left;
            const placeholderHeight = rect.bottom - rect.top;
            const viewportWidth = window.innerWidth / placeholderWidth * 100;
            const viewportHeight = window.innerHeight / placeholderHeight * 100;
            placeholderThumb.style.height = 'calc(' + this.height + ' / ' + this.width + ' * ' + viewportWidth + 'vw)';
            placeholderThumb.style.maxWidth = 'calc(' + this.width + ' / ' + this.height + ' * ' + viewportHeight + 'vh)';
        }
        placeholder.style.visibility = 'visible';
    };
    thumb.src = "https://i.vimeocdn.com/video/722705085.jpg?mw=80&q=85";
}


const variableSafe = (anyString) => {
    if (!anyString === '') {
        return 'empty';
    }
    let retVal = anyString;
    if (isInteger('' + anyString.charAt(0))) {
        retVal = digits[parseInt(charAt(0))] + '-' + anyString.slice(1);
    }
    retVal = retVal.trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/_+/, '-')
        .replace(/\W+/g, '')
        .replace(/w+/g, '-')
        .replace(/-+/, '-');
    console.log(`${anyString} converted to ${retVal}`);
    return retVal;
}

const digits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']