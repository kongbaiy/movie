import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        component: null,
      };
    }
    componentDidMount() {
      importComponent().then((cmp) => {
        this.setState({ component: cmp.default }); //.default 是模块有default输出接口
      });
    }
    //或者使用async/await 写成
    /* async componentDidMount() {
        const { default: component } = await importComponent(); //解构
        this.setState({
          component: component
        });
      } */
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent