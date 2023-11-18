import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';


class Rate extends React.Component {
    onRate = (e) => {
        const { value } = e.target.dataset;
        const { handleClick } = this.props;

        if (typeof handleClick === 'function') handleClick(value);
    }

    render() {
        const { value = 0 } = this.props;
        
        return (
            <div className='rate' onClick={this.onRate}>
                <span className={`rateLeft ${value >= 0.5 && 'rateLeft__active'}`} data-value={0.5}></span>
                <span className={`rateRight ${value >= 1 && 'rateRight__active'}`} data-value={1}></span>
            </div>
        )
    }
}

export default class Group extends React.PureComponent {
    constructor(props) {
        super(props);

        this.defaultData = [0,0,0,0,0];
        this.state = {
            data: [...this.defaultData]
        }
    }

    componentDidMount() {
        this.props.defaultValue && this.setRate(this.props.defaultValue);
    }

    handleRate = (value, index) => {
        const { readonly, onChange } = this.props;

        if (!readonly) this.setRate(index, value);
        if (typeof onChange === 'function') onChange(index + Number(value));
    }

    setRate(num, defaultValue) {
        let [integer, decimal] = num.toString().split('.');
        const newData = [...this.defaultData];

        decimal = '0.' + decimal;

        for (let i = 0;i <= integer; i++) {
            if (i === Number(integer)) newData[i] = Number(defaultValue || decimal); 
            else newData[i] = 1;
        }

        this.setState({
            data: newData
        });
    }

    render() {
        return (
            <div className='rateContainer'>
                {
                    this.state.data.map((value, index) => 
                        <Rate 
                            key={index} 
                            value={value}
                            handleClick={(value) => this.handleRate(value, index)}
                        />
                    )
                }
                <span 
                    className='rateNumber' 
                    hidden={!this.props.score} 
                >
                    {this.props.score}
                </span>
            </div>
        )
    }
}

Group.propTypes = {
    defaultValue: PropTypes.number,
    readonly: PropTypes.bool,
    onChange: PropTypes.func,
    score: PropTypes.number
}
Group.defaultProps = {
    defaultValue: 0,
    readonly: false,
    score: 0
}