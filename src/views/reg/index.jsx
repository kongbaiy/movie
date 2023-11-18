import React from 'react';
import styles from './index.module.scss';
import { withRouter } from 'react-router-dom';
import { Toast } from '@/components/lib';
import { phone as UtiPhone, password as UtiPassword } from '@/utils/RegExp';
import api from '@/api';

class Index extends React.Component {
    state = {
        form: {}
    };
    formRef = React.createRef();

    handleFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(this.formRef?.current);
        const username = formData.get('username');
        const phone = formData.get('phone');
        const password = formData.get('password');

        if (!username) {
            Toast.show({
                message: '用户名不能为空',
                position: 'bottom'
            });
        } else if (!UtiPhone.test(phone)) {
            Toast.show({
                message: '手机号格式错误',
                position: 'bottom'
            });
        } else if (!UtiPassword.test(password)) {
            Toast.show({
                message: '密码格式错误',
                position: 'bottom'
            });
        } else {
            this.sendReg({
                username,
                phone,
                password
            });
        }
    }

    sendReg = async (params = {}) => {
        const { status } = await api.reg(params);

        if (status) {
            this.props.history.push('/login');
        }
    }
    
    render() {
        return (
            <form className={styles.container} ref={this.formRef} onSubmit={this.handleFormSubmit}>
                <div className={styles.regInfo}>
                    <p className={styles.title}>注册</p>
                    <label htmlFor="username" className={styles.regLabel}>用户名</label>
                    <input type="text" name="username" maxLength={20} id="username" className={styles.regInput} />

                    <label htmlFor="phone" className={styles.regLabel}>手机号</label>
                    <input type="text" name="phone" maxLength={11} id="phone" className={styles.regInput} />

                    <label htmlFor="password" className={styles.regLabel}>密码</label>
                    <input type="password" name="password" id='password' maxLength={20} className={styles.regInput} />
                    <input type="submit" value="提交" className={styles.regSubmit} />
                </div>
            </form>
        )
    }
}

export default withRouter(Index);