const availableButtons = ['appointments', 'how-it-works', 'contact-us']
const DEFAULT_BUTTON = 'appointments';
const CONTACT_EMAIL = 'k4kvolunteering@gmail.com';

const init = () => {
    Array.from(document.querySelectorAll('#menu li a')).forEach(button => button.style.display = 'none'); availableButtons.forEach(name => {
        const button = document.getElementById(`${name}-button`);
        if (button) {
            button.style.display = 'block';
            button.addEventListener('click', () => navAction(name))
        }
        else {
            console.log(`button not found for ${name}`)
        }
    })
    Array.from(document.querySelectorAll('#appt-instructions li')).forEach((li, i) => {
        li.classList += (i % 2 == 1) ? ' odd' : ' even'
    });
    Array.from(document.querySelectorAll('a.email')).forEach(mailLink => mailLink.setAttribute('href', `mailto:${CONTACT_EMAIL}`));

    const qsParams = getParams(window.location.search);
    const defaultButton = qsParams['button'] || DEFAULT_BUTTON;
    navAction(defaultButton)
}

const navAction = (which) => {
    if (!which) return;
    Array.from(document.getElementsByClassName('active-button')).forEach(button => button.classList.remove('active-button'));
    const button = document.querySelector(`#${which}-button`)
    button.parentElement.className += 'active-button';
    document.querySelector('#displayed-content').innerHTML = document.querySelector(`#content-${which}`).innerHTML;
}

const getParams = (searchString) => {
    const params = {};
    try {
        const paramArray = [];
        const pairStrs = searchString.replace('?', '').split('&');
        // special setup for single parameter to indicate default button
        pairStrs.forEach(pair => {
            const pName = pair.split('=').length == 2 ? pair.split('=')[0] : 'button';
            const pVal = pair.split('=').legnth == 2 ? pair.split('=')[1] : pair.split('=')[0];
            paramArray.push({ [pName]: pVal });
        })
        paramArray.forEach(param => Object.assign(params, param))
    } catch (err) {
        return {};
    }
    return params;
}