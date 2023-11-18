import React from 'react';
import styles from './index.module.scss';
import { Toast } from '@/components/lib';
import api from '@/api';

export default class Index extends React.Component {
    state = {
        form: {}
    };
    formRef = React.createRef();

    componentDidMount() {
       
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(this.formRef?.current);
        const username = formData.get('username');
        const password = formData.get('password');

        if (!username) {
            Toast.show({
                message: '用户名不能空',
                position: 'bottom'
            });
        } else if (!password) {
            Toast.show({
                message: '用户名不能空',
                position: 'bottom'
            });
        } else {
            this.sendLogin({
                username,
                password
            });
        }
    }

    sendLogin = async (params = {}) => {
        const { status, data } = await api.login(params);

        if (status) {
            localStorage.setItem('token', data?.token);
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <form className={styles.container} ref={this.formRef} onSubmit={this.handleFormSubmit}>
            <div className={styles.loginInfo}>
                <p className={styles.title}>登陆</p>
               
                <label htmlFor="username" className={styles.loginLabel}>用户名</label>
                <input type="text" name="username" maxLength={11} id="username" className={styles.loginInput} />

                <label htmlFor="password" className={styles.loginLabel}>密码</label>
                <input type="password" name="password" id='password' maxLength={20} className={styles.loginInput} />
                <input type="submit" value="提交" className={styles.loginSubmit} />
            </div>
        </form>
        )
    }
}