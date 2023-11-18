import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { touchEvent } from '@/utils'

class SwiperFun {
    /**
     * offsetElement
     * speed
     * */ 
    constructor(options = {}) {
        const { offsetElement } = options;
        const offsetBase = offsetElement.offsetWidth;
        const offsetTotalValue =  offsetBase * offsetElement.children.length;

        if (!offsetElement || offsetElement.children.length < 2) throw new Error('swiper children < 2');

        if (offsetElement) {
            offsetElement.transform3d = this.setElementTransform3d.bind(this, offsetElement);
            offsetElement.firstChild.transform3d = this.setElementTransform3d.bind(this, offsetElement.firstChild);
            offsetElement.lastChild.transform3d = this.setElementTransform3d.bind(this, offsetElement.lastChild);
            offsetElement.removeTransform3d = this.removeElementTransform3d.bind(this, offsetElement);
            offsetElement.firstChild.removeTransform3d = this.removeElementTransform3d.bind(this, offsetElement.firstChild);
            offsetElement.lastChild.removeTransform3d = this.removeElementTransform3d.bind(this, offsetElement.lastChild);
        }
        this.options = {
            offset: 0,
            offsetBase,
            offsetTotalValue,
            speed: 300,
            ...options
        };
        offsetElement.lastChild.transform3d([-offsetTotalValue], '0ms');
    }

    setElementTransform3d(element, arrTranslate = [], transition) {
        const DU = 'px';
        const reg = /^(\-|\+)?\d+(\.\d+)?$/;
        const [a = `0${DU}`, b = `0${DU}`, c = `0${DU}`] = arrTranslate;
        const x = reg.test(a) ? a + DU : a ;
        const y = reg.test(b) ? b + DU : b;
        const z = reg.test(c) ? c + DU : c;

        element.style.transform = `translate3d(${x}, ${y}, ${z})`;
        if (transition) element.style.transition = `transform ${transition}`;

        return element
    }

    removeElementTransform3d(element, arrTranslate = [], transition) {
        const DU = 'px';
        const reg = /^(\-|\+)?\d+(\.\d+)?$/;
        const [a = `0${DU}`, b = `0${DU}`, c = `0${DU}`] = arrTranslate;
        const x = reg.test(a) ? a + DU : a ;
        const y = reg.test(b) ? b + DU : b;
        const z = reg.test(c) ? c + DU : c;

        if (arrTranslate.length) element.style.transform = `translate3d(${x}, ${y}, ${z})`;
        else element.style.transform = null;
        if (transition) element.style.transition = `transform ${transition}`;
        // else element.style.removeProperty('transition');
        else element.style.transition = null;

        return element
    }

    actionLeft() {
        const {
            offsetBase,
            offsetTotalValue,
            offsetElement,
            speed
        } = this.options;
        const { firstChild, lastChild } = offsetElement;
       
        this.options.offset += offsetBase;
        offsetElement.transform3d([-this.options.offset], `${speed}ms`);

        if (this.options.offset === offsetBase) {
            lastChild.removeTransform3d();
        } else if (this.options.offset + offsetBase === offsetTotalValue) {
            firstChild.transform3d([this.options.offset + offsetBase]);
        } else if (this.options.offset === offsetTotalValue) {
            setTimeout(() => {
                offsetElement.removeTransform3d();
                firstChild.removeTransform3d();
                lastChild.removeTransform3d([-this.options.offset]);
                this.options.offset = 0;
            }, 200);
        }
    }

    actionRight() {
        const {
            offsetBase,
            offsetTotalValue,
            offsetElement,
            speed
        } = this.options;
        const { firstChild, lastChild } = offsetElement;
        const firstChildStyle = getComputedStyle(firstChild).transform || firstChild.currentStyle.transform;
        
        if (this.options.offset === 0) {
            offsetElement.transform3d([offsetBase], `${speed}ms`);
            setTimeout(() => {
                lastChild.removeTransform3d();
                firstChild.transform3d([offsetTotalValue]);
                offsetElement.transform3d([-(offsetTotalValue -  offsetBase)], '0ms');
            }, 200);
            this.options.offset = offsetTotalValue - offsetBase;
            return;
        }

        if (this.options.offset === offsetBase) {
            lastChild.transform3d([-offsetTotalValue], '0ms');
        } else if (this.options.offset > 0 && firstChildStyle !== 'none') {
            firstChild.removeTransform3d();
        }

        this.options.offset -= offsetBase;
        offsetElement.transform3d([-this.options.offset], `${speed}ms`);
    }

    preactionLeft(preoffset, transition) {
        this.options.offsetElement.transform3d([-(this.options.offset + preoffset)], transition);
    }

    preactionRight(preoffset, transition) {
        this.options.offsetElement.transform3d([-(this.options.offset - preoffset)], transition);
    }
}

export default class Swiper extends React.PureComponent {
    swiperContainerRef = React.createRef();
    swiperRef = React.createRef();
    _swiper;

    componentDidMount() {
    }

    componentDidUpdate(props) {
       if (this.swiperRef.current && props.children) this.initSwiper();
    }

    initSwiper() {
        const { autoplay, delay } = this.props;
        const offsetElement = this.swiperRef.current;
        let swiperInterval;
        
        offsetElement.childNodes.forEach((element) => {
            element.classList.add('swiperItem')
        });
        this._swiper = new SwiperFun({
            offsetElement
        });

        touchEvent({
            targetElement: offsetElement,
            onStart: () => {
                swiperInterval && clearInterval(swiperInterval);
            },
            onMove: (touchInfo) => {
                const { startx, movex } = touchInfo;
                const Dvalue =  startx - movex;
                const { speed } = this._swiper.options;

                // 向左
                if (Dvalue > 0 && Math.abs(Dvalue) < 40) {
                    this._swiper.preactionLeft(Math.abs(Dvalue), `${speed}ms`);
                    // 向右
                } else if (Dvalue < 0 && Math.abs(Dvalue) < 40) {
                    this._swiper.preactionRight(Math.abs(Dvalue), `${speed}ms`);
                }
            },
            onEnd: ({ direction, touchInfo }) => {
                const { startx, movex } = touchInfo;
                const Dvalue =  startx - movex;
                const { speed } = this._swiper.options;

                if (autoplay && delay >= 1000) swiperInterval = this.autoplay(this._swiper, delay);

                if (Math.abs(Dvalue) < 40) {
                    if (Dvalue > 0) {
                        this._swiper.preactionLeft(0, `${speed}ms`);
                    } else if (Dvalue < 0) {
                        this._swiper.preactionRight(0, `${speed}ms`);
                    }
                    return;
                }

                if (direction === '-x') {
                    this._swiper.actionLeft();
                } else if (direction === 'x') {
                    this._swiper.actionRight();
                }
            }
        });

        if (autoplay && delay >= 1000) swiperInterval = this.autoplay(this._swiper, delay);
    }

    autoplay(swiper, delay) {
        const interval = setInterval(() => {
            swiper.actionLeft();
        }, delay);

        return interval
    }

    render() {
        return (
           <div className='swiperContainer' ref={this.swiperContainerRef}>
                <div className='swiper' ref={this.swiperRef}>
                    {this.props.children}
                </div>
           </div>
        )
    }
}

Swiper.propTypes = {
    autoplay: PropTypes.bool,
    delay: PropTypes.number
 }
  
 Swiper.defaultProps = {
    autoplay: false,
    delay: 3000
 }
 