import React, {useState,useEffect, useCallback} from 'react';
import { PageHeader, Button  } from 'antd';
import PostSnippet from './PostSnippet';
//import api from '../mock_api';
import _ from 'lodash';
import db from '../firebase';


const Posts = (props) => {

    const [posts, setPosts] = useState([])
    const [limit, setLimit] = useState(5);
    const [morePosts, setMorePosts] = useState(false);


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

    const onPrevious = (event) => {

        if (limit >= 5) {
            let userId = props?.user.uid ? props?.user.uid : props.uid
        let slug = props?.slug ? props.slug : "all"
        setLimit(limit-5);
        getCollection(userId,slug)
        }

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