import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Button from '../button';

const dialogOptionConfig = {
    title: '提示',
    message: '',
    titleAlign: 'left'
};

const initContainer = () => {
    let container =  document.querySelector('.dialogContainer');

    if (container) {
        container.style.display = 'block';
    } else {
        container = document.createElement('div');
        container.setAttribute('class', 'dialogContainer');
        document.body.appendChild(container);
        const offsetHeight = container.offsetHeight;
        container.setAttribute('class', 'dialogContainer dialogContainer__active');
    }
}

const unmountContainer = () => {
    const element = document.querySelector('.dialogContainer');
    
    if (!element) return false;

    element.style.display = 'none';
    const unmountElement = ReactDOM.unmountComponentAtNode(element);
    if (unmountElement && element.parentNode ) element.parentNode.removeChild(element);
}

export default class Dialog extends React.PureComponent {
    static confirm(options) {
        const { 
            title, 
            message, 
            onCancel, 
            onConfirm,
            cancelControlDialogShow = false,
            confirmControlDialogShow =  false
        } = { ...dialogOptionConfig, ...options };
     
        initContainer();
           
        const handleCancel = () => {
            // if (typeof onCancel === 'function') {
            //     const status = onCancel();
            //     if (status === false) unmountContainer();
            // }

            // if (!cancelControlDialogShow) {
            //     unmountContainer();
            // }
            const status = typeof onCancel === 'function' && onCancel();
            if (status === false || !cancelControlDialogShow) unmountContainer();
        }
   
        const handleConfirm = () => {
        //    if (typeof onConfirm === 'function') {
        //         const status = onConfirm();
        //         if (status === false) unmountContainer();
        //     }

        //     if (!confirmControlDialogShow) {
        //         unmountContainer();
        //     }
            const status = typeof onConfirm === 'function' && onConfirm();
            if (status === false || !confirmControlDialogShow) unmountContainer();
        }

        ReactDOM.render(
            <>
                <div className='dialogHeader'>
                    <p className='title'>{title}</p>
                </div>
                <div className='dialogBody'>
                    <div className='message'>{message}</div>
                    <div className='tastButtons text__right'>
                        <Button size='mini' onClick={handleCancel}>取消</Button>
                        <Button type='primary' text size='mini' onClick={handleConfirm}>确认</Button>
                    </div>
                </div>
            </>,
            document.getElementsByClassName('dialogContainer')[0]
        )
    }
}
