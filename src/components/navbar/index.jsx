import React from "react";
import styles from "./index.module.scss";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Index extends React.PureComponent {
    constructor(props) {
        super(props);
        this.scrollTagElement = React.createRef();
        this.state = {
            navbarBackgroundColorAlpha: 1
        };
    }

    componentDidMount() {
        console.log('navbar componentDidMount');

        if (this.scrollTagElement?.current) {
            window.addEventListener('scroll', this.handleScroll);
        }
    }

    componentDidUpdate() {
        console.log('navbar componentDidUpdate');
    }

    componentWillUnmount() {
        this.setState = () => false;
        window.removeEventListener('scroll', () => {});
    }

    handleScroll = (e) => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const { current } = this.scrollTagElement;
        const maxAlphaBase = 100;

        if (scrollTop >= current?.offsetHeight && maxAlphaBase - scrollTop > 40) {
            this.setState({
                navbarBackgroundColorAlpha: parseInt(maxAlphaBase - scrollTop) / maxAlphaBase
            });
            return;
        }

        /**
         * react组件已经被销毁，而此时我们的异步操作（通常为调用接口更改state操作）还未结束。
         * 当我们的异步执行完成后要执行setState操作时，已经无法获得组件信息，由此造成该异常！，因此需要判断
         * */ 
        // this && this.setState({
        //     navbarBackgroundColorAlpha: parseInt(maxAlphaBase - scrollTop) / maxAlphaBase
        // });
        this.setState({
            navbarBackgroundColorAlpha: parseInt(maxAlphaBase - scrollTop) / maxAlphaBase
        });
    }

    handleSerch = () => {
        const { searchRoute, onSearch, history } = this.props;

        if (searchRoute) {
            const { pathname, query } = searchRoute || {};

            history.push({
                pathname: pathname || searchRoute,
                query
            });
            return;
        }

        if (typeof onSearch === 'function') onSearch();
    }

    getNavbarStyle = () => {
        const { navbarBackgroundColorAlpha } = this.state;
        const alpha = navbarBackgroundColorAlpha > 0.3 ? navbarBackgroundColorAlpha : 0.3;
        const style = {
            backgroundColor: `rgba(255,255,255,${alpha})`,
            boxShadow: `0 2px 20px 0 rgba(0,0,0,0.1)`
        };

        if (navbarBackgroundColorAlpha < 1) delete style.boxShadow;

        return style
    }
  
    render() {
        const navbarStyle = this.getNavbarStyle();
        
        return (
            <>
                <div className={styles.navbar} style={navbarStyle}>
                    <svg t="1685807325362" className={styles.navbarMenu} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8904" onClick={this.props.onMenu}>
                        <path d="M128 192v128h768V192H128z m0 384h576V448H128v128z m0 256h384v-128H128v128z" p-id="8905" fill="#bfbfbf"></path>
                    </svg>
                    <svg t="1685806894217" className={styles.navbarSearch} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4154" onClick={this.handleSerch}>
                        <path d="M192 480a256 256 0 1 1 512 0 256 256 0 0 1-512 0m631.776 362.496l-143.2-143.168A318.464 318.464 0 0 0 768 480c0-176.736-143.264-320-320-320S128 303.264 128 480s143.264 320 320 320a318.016 318.016 0 0 0 184.16-58.592l146.336 146.368c12.512 12.48 32.768 12.48 45.28 0 12.48-12.512 12.48-32.768 0-45.28" fill="#979797" p-id="4155"></path>
                    </svg>
                </div>
                <div className={styles.navbarBlank} ref={this.scrollTagElement}></div>
            </>
        )
    }
}

Index.propTypes = {
    searchRoute: PropTypes.string || PropTypes.object,
    onMenu: PropTypes.func,
    onSearch: PropTypes.func,
}
 
Index.defaultProps = {
}

export default withRouter(Index)
