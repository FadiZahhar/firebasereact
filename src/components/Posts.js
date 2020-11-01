import React, {useState,useEffect} from 'react';
import { PageHeader } from 'antd';
import PostSnippet from './PostSnippet';
//import api from '../mock_api';
import _ from 'lodash';
import db from '../firebase';


const Posts = (props) => {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        db.collection('users').doc(props.user.uid).collection('posts')
            .onSnapshot(async posts => { // allows to subscribes
                let postsData = await posts.docs.map(post => {
                    let data = post.data()
                    let { id } = post
                    let payload = {
                        id,
                        ...data
                    }
                    return payload
                });

                setPosts(postsData)
            }) // end on snapshot
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
                            content={article.content.substring(0, 1000)}
                            user={props.user}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default Posts;