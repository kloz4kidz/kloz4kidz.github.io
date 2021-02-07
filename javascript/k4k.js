
const init = () => {
    document.querySelectorAll('#menu li').forEach(button => { button.addEventListener('click', event => navAction(event.target)) })
}

const navAction = (target) => {
    console.log(`loading ${target.innerText}`)
    Array.from(document.getElementsByClassName('active-button')).forEach(button => button.classList.remove('active-button'));
    target.parentElement.className += 'active-button';
    document.querySelector('#displayed-content').innerHTML = document.querySelector(`#content-${target.dataset.show}`).innerHTML;
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