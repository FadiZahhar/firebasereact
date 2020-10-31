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
                extra={<Link to={`/post/${props.id}`}>Read Full Article</Link>}
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