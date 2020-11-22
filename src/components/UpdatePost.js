import db from '../firebase';
import React, { useState, useEffect } from 'react';
import { PageHeader, Input, Button, Select, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { navigate } from '@reach/router';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;


const UpdatePost = (props) => {

    const [material, setMaterial] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [materialDate, setMaterialDate] = useState('');
    const [video, setVideo] = useState('');


    useEffect(() => {
        let postRef = db.collection('users').doc(props.user.uid)
        .collection('posts')
            .doc(props.id)
        postRef
            .get().then(doc => {
                let { material, materialDate, video, content, title } = doc.data();
                console.log(material);
                console.log(materialDate);
                setTitle(title)
                setContent(content)
                setMaterial(material);
                setMaterialDate(materialDate)
                setVideo(video)
            })
    },[])


const onTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const onContentChange = (event) => {
        setContent(event.target.value);
    }

      const onMaterialChange = (value) => {

        setMaterial(value);
    }

     const onVideoChange = (event) => {
        setVideo(event.target.value);
    }


    const onDateChange = (date, dateString) => {

        setMaterialDate(dateString);
    }


    const onUpdatePost = () => {
        let postRef = db.collection('users').doc(props.user.uid).collection('posts').doc(props.id);
        let payload = { material, title, content, materialDate, video }

        postRef.update(payload)
            .then(function(doc) {
                console.log("document successfully updated!",doc);
            });

        navigate('/blogs/:uid/posts');

    }


    return (
           <div className="create_post_container">
            <div className="page_header_container">
                <PageHeader
                    style={{
                        border: '1px solid rgb(235,237,240)',
                    }}
                    title="Update Material Context"
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
                        <CKEditor
                    editor={ ClassicEditor }
                    data={content}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setContent(data);
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />

                        </div>
                </div>


                <div className="post_input_container">
                    <div className="post_input_video">
                        <h2>Date of material</h2>
                    </div>
                        <div className="post_input">
                        <DatePicker size="large" onChange={onDateChange}  />
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
                    <Button type="primary" size="large" onClick={onUpdatePost}>Update Material</Button>
                </div>


            </div>
        </div>
    )

}

export default UpdatePost;