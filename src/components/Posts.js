import React, {useState,useEffect} from 'react';
import { PageHeader } from 'antd';
import PostSnippet from './PostSnippet';
import api from '../mock_api';
import _ from 'lodash';
import db from '../firebase';


const Posts = (props) => {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        let postsRef = db.collection('posts')

        postsRef
            .get()
            .then(posts => {
                posts.forEach(post => {
                    let data = post.data()
                    let {id} = post
                    let payload = {
                        id,
                        ...data
                    }
                    setPosts((posts) => [...posts,payload])
                })
            })
    },[])
    return (
        <div className="posts_container">
            <div className="page_header_container">
                <PageHeader
                style={{
                    border: '1px solid rbg(235, 237, 240)',
                }}
                title="Posts"
            />
            </div>
            <div className="articles_container">
                {
                    _.map(posts, (article,idx) => (
                        <PostSnippet
                            key={idx}
                            id={article.id}
                            title={_.capitalize(article.title)}
                            content={article.content.substring(0,1000)}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default Posts;