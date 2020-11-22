import React, {useState, useEffect} from 'react';
import { PageHeader, Card } from 'antd';
//import api from '../mock_api';
import db from '../firebase';
import { Media, Player, controls } from 'react-media-player'
const { PlayPause, MuteUnmute, CurrentTime , Progress , SeekBar, Duration, Volume , Fullscreen } = controls

const Post = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [video, setVideo] = useState('');

    useEffect(() => {
        let postRef = db
            .collection('users')
            .doc(props.uid)
        .collection('posts')
            .doc(props.id)
        postRef
            .get().then(doc => {
                let {content, title, video} = doc.data();
                setTitle(title)
                setContent(content)
                setVideo(video)
            })
    },[])
    return (
        <div className="post_container">
           <div className="page_header_container">
                <PageHeader
                    style={{
                        border: '1px solid rbg(235, 237, 240)',
                    }}
                    title={title}
            />
            </div>

            <div className="post_conten_container">
                <Card style={{ marginTop: '20px' }}>
                    <Media>
                <div className="media">
                <div className="media-player">
                            <Player src={video}  style={{width: '100%'}}/>
                </div>
                <div className="media-controls">
                   <PlayPause />
                   <CurrentTime />
                    <Progress />
                    <SeekBar />
                    <Duration />
                    <MuteUnmute />
                    <Volume />
                    <Fullscreen />
                </div>
                </div>
            </Media>
                </Card>
                <br /><br /><br />
                <div dangerouslySetInnerHTML={{ __html: content }} />
                <div style={{ height: '100px' }}>&nbsp;</div>
            </div>
        </div>
    )
}

export default Post;