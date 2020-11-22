import db from '../firebase';
import React, { useState } from 'react';
import { PageHeader, Input, Button, Select } from 'antd';
import { navigate } from '@reach/router';
const { TextArea } = Input;
const { Option } = Select;

const CreatePost = (props) => {

    const [material, setMaterial] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [video, setVideo] = useState('');

    const onMaterialChange = (event) => {
        setMaterial(event);
    }

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    }

     const onVideoChange = (event) => {
        setVideo(event.target.value);
    }

    const onContentChange = (event) => {
        setContent(event.target.value);
    }

    const onCreatePost = () => {
        let postRef = db.collection('users').doc(props.user.uid).collection('posts');
        let payload = { title, content, video }

        postRef.add(payload)
            .then(function (doc) {
                console.log("document successfully written", doc.id);
            });

        setMaterial('');
        setTitle('');
        setContent('');
        setVideo('');
        navigate('/blogs/:uid/posts');

    }

    return (
        <div className="create_post_container">
            <div className="page_header_container">
                <PageHeader
                    style={{
                        border: '1px solid rgb(235,237,240)',
                    }}
                    title="Create Material Context"
                    />
            </div>

            <div className="post_inputs_container">


                <div className="post_input_container">
                    <div className="post_input_title">
                        <h2>Material</h2>
                    </div>
                        <div className="post_input">
                        <Select defaultValue={material} style={{ width: 120 }} onChange={onMaterialChange}>
                         <Option value="arabic">Arabic</Option>
                          <Option value="french">French</Option>
                         <Option value="culture">Culture</Option>
                         <Option value="science">Science</Option>
                         <Option value="science">Math</Option>
                        </Select>
                        </div>
                </div>


                <div className="post_input_container">
                    <div className="post_input_title">
                        <h2>Title</h2>
                    </div>
                        <div className="post_input">
                        <Input placeholder="Post Title" value={title} onChange={onTitleChange} />
                        </div>
                </div>


                <div className="post_input_container">
                    <div className="post_input_title">
                        <h2>Context</h2>
                    </div>

                        <div className="post_input">
                        <TextArea rows={10} onChange={onContentChange} value={content} />
                        </div>
                </div>



                <div className="post_input_container">
                    <div className="post_input_video">
                        <h2>Video Link</h2>
                    </div>
                        <div className="post_input">
                        <Input placeholder="Post Video" value={video} onChange={onVideoChange} />
                        </div>
                </div>

                <div className="post_input_button">
                    <Button type="primary" size="large" onClick={onCreatePost}>Create Post</Button>
                </div>


            </div>
        </div>
    )

}

export default CreatePost;