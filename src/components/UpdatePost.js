import db from '../firebase';
import React, { useState, useEffect } from 'react';
import { PageHeader, Input, Button } from 'antd';
import { navigate } from '@reach/router';
const { TextArea } = Input;

const UpdatePost = (props) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        let postRef = db.collection('users').doc(props.user.uid)
        .collection('posts')
            .doc(props.id)
        postRef
            .get().then(doc => {
                let {content, title} = doc.data();
                setTitle(title)
                setContent(content)
            })
    },[])

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const onContentChange = (event) => {
        setContent(event.target.value);
    }

    const onUpdatePost = () => {
        let postRef = db.collection('users').doc(props.user.uid).collection('posts').doc(props.id);
        let payload = { title, content }

        postRef.update(payload)
            .then(function(doc) {
                console.log("document successfully updated!",doc);
            });

        navigate('/posts');

    }

    return (
        <div className="create_post_container">
            <div className="page_header_container">
                <PageHeader
                    style={{
                        border: '1px solid rgb(235,237,240)',
                    }}
                    title="Create Post"
                    />
            </div>

            <div className="post_inputs_container">
                <div className="post_input_container">
                    <div className="post_input_title">
                        <h2>Post Title</h2>
                    </div>
                        <div className="post_input">
                        <Input placeholder="Post Title" value={title} onChange={onTitleChange} />
                        </div>
                </div>


                <div className="post_input_container">
                    <div className="post_input_title">
                        <h2>Post Content</h2>
                    </div>

                        <div className="post_input">
                        <TextArea rows={10} onChange={onContentChange} value={content} />
                        </div>
                </div>

                <div className="post_input_button">
                    <Button type="primary" size="large" onClick={onUpdatePost}>Update Post</Button>
                </div>


            </div>
        </div>
    )

}

export default UpdatePost;