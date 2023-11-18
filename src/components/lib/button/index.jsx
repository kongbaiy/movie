import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { filterObjectAttr } from '@/utils';

export default class Index extends React.PureComponent {
    getButtonSize(size = Index.defaultProps.size) {
        const buttonSize = {
            large: 'large',
            small: 'small',
            mini: 'mini'
        };
        const _className = buttonSize[size] ? `button__${buttonSize[size]}` : '';

        return _className
    }

    getButtonType(type) {
        const buttonType = {
            primary: 'primary',
            info: 'info',
            primary: 'primary',
            warning: 'danger',
        };
        const _className = buttonType[type] ? `button__${buttonType[type]}` : '';

        return _className
    }

    getButtonClass = ()=> {
        const { size, type, border, text } = this.props;
        let _type = this.getButtonType(type);

        if (_type && border) _type += `__border`;
        if (_type && text) _type += `__text`;

        let classNameArr = [this.getButtonSize(size), _type].filter(Boolean);

        return classNameArr.join()?.replace(/\,/g, ' ')
    }

    render() {
        const { children, className } = this.props;
        const otherProps = filterObjectAttr(this.props, Object.keys(Index.propTypes));
        const buttonClassName = this.getButtonClass();

        return (
            <button {...otherProps} className={className || buttonClassName}>
                {children}
            </button>
        )
    }
}

Index.propTypes = {
   size: PropTypes.string,
   type: PropTypes.string,
   border: PropTypes.bool,
   text: PropTypes.bool
}
 
Index.defaultProps = {
    size: 'small', // large small mini,
    // type: '',  // primary info warning danger
    border: false,
    text: false
}
