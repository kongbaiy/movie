import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

const initContainer = (position = 'default') => {
    let container =  document.querySelector('.toastContainer');

    if (container) {
        container.classList.add(`toastContainer__position_${position}`);
        container.style.display = 'block';
    } else {
        container = document.createElement('div');
        container.setAttribute('class', `toastContainer toastContainer__position_${position}`);
        document.body.appendChild(container);
        const offsetHeight = container.offsetHeight;
        container.setAttribute('class', `toastContainer toastContainer__position_${position} toastContainer__active`);
    }
}

const unmountContainer = () => {
    const element = document.querySelector('.toastContainer');

    if (!element) return false;

    element.style.display = 'none';

    const unmountElement = ReactDOM.unmountComponentAtNode(element);
    if (unmountElement && element.parentNode ) {
        element.parentNode.removeChild(element);
    }
}

let timeout;
export default class Toast extends React.PureComponent {
    static show({
        message,
        position = 'default',
        time = 2000
    } = {}) {
        initContainer(position);
        
        if (timeout) clearTimeout(timeout);

        if (time) {
            timeout = setTimeout(() => {
                unmountContainer();
            }, time);
        }

        ReactDOM.render(
            <span className='toastText'>{message}</span>,
            document.getElementsByClassName('toastContainer')[0]
        )
    }
}