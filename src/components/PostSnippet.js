import React from 'react';
import { Card } from 'antd';
import { Link } from '@reach/router';

const PostSnippet = (props) => {
    return (
        <div className="pst_snippet_container">
            <Card
                style={{ marginTop: 16 }}
                type="inner"
                title={props.title}
                extra={
                    <div className="post_snippet_links">
                        <Link to={`/post/${props.id}`} style={{ marginRight: '20px', float: 'left' }} >Read Full Article</Link>
                        {
                            props.user &&
                            <div className="post_eidt_links">
                                <Link to={`/update_post/${props.id}`}>Edit</Link>
                                <Link to={`/delete_post/${props.id}`}>Delete</Link>
                            </div>
                        }
                    </div>
                }
            >
                <p className="article_content">
                    {
                    props.content.split('\n').map((paragraph, idx) => {
                        return <p key={idx}>{paragraph}</p>;
                    })
                    }
                </p>

                </Card>
        </div>
    )
}

export default PostSnippet;