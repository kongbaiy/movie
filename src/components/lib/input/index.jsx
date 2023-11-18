import React from 'react';
import './index.scss';
import PropTypes from 'prop-types'

const InputContainerBlank = (props) => {
    return props.fixed ? <div className='inputContainer__blank'></div> : null
}

export default class Index extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputContainerStyles: {
                position: null,
                backgroundColor: 'rgba(255, 255, 255, 1)',
            }
        }
    }

    componentDidMount() {
       if (this.props.fixed) this.setInputContainerStyles('position', 'fixed');
    }

    handleFocus = () => {
        const { fixed } = this.props;
        const { backgroundColor } = this.state;
        
        if (fixed && backgroundColor != 'rgba(255, 255, 255, 1)') 
        this.setInputContainerStyles('backgroundColor', 'rgba(255, 255, 255, 1)');
    }

    handleBlur = () => {
        const { fixed } = this.props;
        
        if (fixed) this.setInputContainerStyles('backgroundColor', 'rgba(255, 255, 255, 0.3)');
    }

    setInputContainerStyles(key, value) {
        if (!key || !value) return;

        const newInputContainerStyles = {...this.state.inputContainerStyles};

        newInputContainerStyles[key] = value;
        this.setState({
            inputContainerStyles: newInputContainerStyles
        });
    }

    render() {
        const { inputContainerStyles } = this.state;
        const { inputAttr, fixed } = this.props;
      
        return (
            <>
                <div 
                    style={inputContainerStyles} 
                    className="inputContainer"
                >
                    <input 
                        className="input" 
                        {...inputAttr}
                        onFocus={this.handleFocus} 
                        onBlur={this.handleBlur}
                    />
                </div>
                <InputContainerBlank 
                    fixed={fixed} 
                />
            </>
        )
    }
}

Index.propTypes = {
    inputAttrs: PropTypes.any,
    fixed: PropTypes.bool
}

Index.defaultProps = {
    fixed: false
}