import React from 'react';
import styles from './index.module.scss';
import api from '@/api';

import { Rate } from '@/components/lib'

export default class Index extends React.Component {
    componentDidMount() {
        const searchParams = new URLSearchParams(this.props.location.search);
        const detailId = searchParams.get('detailId');

        if (detailId) this.getDetail({ detailId });
    }

    async getDetail(params) {
        const { status, data } = await api.detail(params);
        // console.log(data);
    }

    render() {
        return (
            <div>
                <div className={styles.cover}></div>
                <div className={styles.basicInfo}>
                    <img src="" alt="" className={styles.performer} />
                    <div className={styles.info}>
                        <p className={styles.title}></p>
                        {/* <Rate readonly defaultValue={item.score / 2} score={item.score}/> */}
                        <p className={styles.date}></p>
                    </div>
                </div>
            </div>
        )
    }
}