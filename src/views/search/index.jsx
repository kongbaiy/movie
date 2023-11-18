import React from 'react';
import styles from './index.module.scss';
import api from '@/api';
import { withRouter } from 'react-router-dom';

import { Input, Rate } from '@/components/lib';


const getSearchTitleKey = (key, value) => {
    const content = value.replaceAll(key, `<span class="${styles.searchKey}">${key}</span>`);
    return content
}

const List = (props) => {
    const { data = [], searchKey, handleClick } = props;
    
    return (
        <div className={styles.list}>
            {
                data.map((item) => (
                    <div className={styles.listItem} key={item._id} onClick={() => handleClick && handleClick(item._id)}>
                        <img src={item.picture} alt={item.title} loading='lazy' className={styles.listItemImg} />
                        <div className={styles.listItemInfo}>
                            <p className={styles.listItemTitle} dangerouslySetInnerHTML={{ __html: getSearchTitleKey(searchKey, item.title) }}></p> 
                            <p className={styles.listItemDate}>日期：{item.date}</p>
                            <p className={styles.listItemPerformer}>主演：{item.performer}</p>
                            <Rate readonly defaultValue={item.score / 2} score={item.score} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputAttrs: {
                autoFocus: true
            },
            list: [],
            searchKey: ''
        };
    }

    onChangeDebounce = (e) => {
        this.lastTime && clearTimeout(this.lastTime);
        this.lastTime = setTimeout(() => {
            const { value } = e.target;

            if (value.trim()) {
                this.getFilmList({ title: value });
            } else {
                this.setState({
                    list: []
                });
            }
        }, 1000);
    }

    handleList = (id) => {
       this.props.history.push(`/detail?detailId=${id}`);
    }

    getFilmList = async (params) => {
        const { status, data } = await api.filmList(params);

        status && this.setState({
            list: data.records,
            searchKey: params.title
        });
    }

    render() {
        const { inputAttrs, list, searchKey } = this.state;

        return (
            <>
                <Input
                    fixed
                    inputAttr={{
                        ...inputAttrs, 
                        onInput: this.onChangeDebounce
                    }}
                />
                <List 
                    data={list} 
                    searchKey={searchKey} 
                    handleClick={this.handleList}
                />
            </>
        )
    }
}