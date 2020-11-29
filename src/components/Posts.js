import React, {useState,useEffect, useCallback} from 'react';
import { PageHeader, Button, DatePicker, Input  } from 'antd';
import PostSnippet from './PostSnippet';
//import api from '../mock_api';
import _ from 'lodash';
import db from '../firebase';


const Posts = (props) => {

    const [posts, setPosts] = useState([])
    const [limit, setLimit] = useState(5);
    const [morePosts, setMorePosts] = useState(false);
    const [title, setTitle] = useState('');


    function getCollection(userId,slug) {
        let collection = db.collection('users').doc(userId).collection('posts')
                if (slug != "all") {
            collection = collection.where('material',"==",slug)
        }

            collection.limit(limit).onSnapshot(async posts => { // allows to subscribes
                let postsData = await posts.docs.map(post => {
                    let data = post.data()
                    let { id } = post
                    let payload = {
                        id,
                        ...data
                    }
                    return payload
                });
                setMorePosts(posts.docs.length >= limit)
                setPosts(postsData)
            }) // end on snapshot
    }


    function filterCollection(userId,slug,materialDate) {
        let collection = db.collection('users').doc(userId).collection('posts').where('materialDate', "==", materialDate)
                if (slug != "all") {
            collection = collection.where('material',"==",slug)
        }

            collection.limit(limit).onSnapshot(async posts => { // allows to subscribes
                let postsData = await posts.docs.map(post => {
                    let data = post.data()
                    let { id } = post
                    let payload = {
                        id,
                        ...data
                    }
                    return payload
                });
                setMorePosts(posts.docs.length >= limit)
                setPosts(postsData)
            }) // end on snapshot
    }


    function filterWord(userId,slug,word) {
        let collection = db.collection('users').doc(userId).collection('posts').where('title','==',word);
                if (slug != "all") {
            collection = collection.where('material',"==",slug)
        }

            collection.limit(limit).onSnapshot(async posts => { // allows to subscribes
                let postsData = await posts.docs.map(post => {
                    let data = post.data()
                    let { id } = post
                    let payload = {
                        id,
                        ...data
                    }
                    return payload
                });
                setMorePosts(posts.docs.length >= limit)
                setPosts(postsData)
            }) // end on snapshot
    }

    useEffect(() => {
        let userId = props?.user.uid ? props?.user.uid : props.uid
        let slug = props?.slug ? props.slug : "all"
        getCollection(userId,slug)

    }, [])

    const onNext = (event) => {

        if (morePosts) {
            let userId = props?.user.uid ? props?.user.uid : props.uid
            let slug = props?.slug ? props.slug : "all"
            let temp = limit + 5;
            setLimit(temp);
            getCollection(userId,slug)
        }

    } // update the callback if the state changes


    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const onDateChange = (event) => {

        let userId = props?.user.uid ? props?.user.uid : props.uid
        let slug = props?.slug ? props.slug : "all"
        filterCollection(userId,slug,formatDate(event))
        

    }


    const onSearchChange = (event) => {
        setTitle(event.target.value);
    }
    const onSearch = (event) => {

        let userId = props?.user.uid ? props?.user.uid : props.uid
        let slug = props?.slug ? props.slug : "all"
        filterWord(userId,slug,title)
        

    }

    return (
        <div className="posts_container">
            <div className="page_header_container">
                <PageHeader
                style={{
                    border: '1px solid rbg(235, 237, 240)',
                }}
                title="All Materials"
                />
<h2>Choose a date to filter or search a word</h2>
<DatePicker size="large" onChange={onDateChange} /> <Input id="serch" name="search" placeholder="Search a word" value={title} onChange={onSearchChange}  style={{
                        width: '300px',
                    }}/> <button onClick={onSearch}>Search</button>
            </div>

            <div className="articles_container">
                {
                    _.map(posts, (article,idx) => (
                        <PostSnippet
                            key={idx}
                            id={article.id}
                            title={_.capitalize(article.title)}
                            content={article.content.substring(0, 1000)}
                            user={props.user}
                            uid={props.uid}
                        />
                    ))
                }
            </div>
            <br /><br /><br />
            <Button type="primary" onClick={onNext}>Next</Button>
            <br /><br /><br />
        </div>
    )
}

export default Posts;