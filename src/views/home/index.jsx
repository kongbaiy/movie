import React, { Component } from 'react';
import styles from './index.module.scss';
import Navbar from '@/components/navbar';
import api from '@/api';
import SkeletonList from 'skeleton/home/List';

const Hot = (props) => {
    const { data = [] } = props;

    return (
       <>
            <p className={styles.moduleTitle}>热门</p>
            <SkeletonList visible={data.length}  />
            <div className={styles.hot}>
                {
                    data.map((item) => (
                        <div className={styles.hotItem} key={item._id}>
                            <img src={item.picture} alt={item.title} className={styles.hotImg} />
                            <div className={styles.hotInfo}>
                                <p className={styles.hotData}>{item.date}</p>
                                <p className={styles.hotTitle}>{item.title}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

const List = (props) => {
    const { data = [] } = props;

    return (
        <>
            <p className={styles.moduleTitle}>精选</p>
            <SkeletonList visible={data.length}  />
            <div className={styles.list}>
                {
                    data?.map(item => (
                        <div className={styles.listItem} key={item._id}>
                            <img src={item.picture} alt={item.title} loading='lazy' className={styles.listImg} />
                            <p className={styles.listTitle}>{item.title}</p>
                            <p className={styles.listDate}>{item.date}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filmListParams: {
                page: 1,
                pageSize: 15
            },
            swiperData: [],
            listData: []
        };
    }

    componentDidMount() {
        this.getFilmList();
    }
    
    componentDidUpdate(props, prevState) {
      
    }

    getFilmList = async () => {
        const { filmListParams } = this.state;
        const { status, data } = await api.filmList(filmListParams);
        
        if (status) {
            this.setState({
                swiperData: data?.records.slice(0, 6),
                listData: data?.records.slice(6, 21)
            });
        }
    }

    handleSearch = () => {
        this.props.history.push('/search');
    }
   
    render() {
        const { swiperData, listData } = this.state;

        return (
           <>
                <Navbar onSearch={this.handleSearch}/>
                <Hot  data={swiperData} />
                <List data={listData} />
           </>
        )
    }
}