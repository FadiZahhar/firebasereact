import './App.css';
import React from 'react';
import Posts from './components/Posts';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import { Router, Link } from '@reach/router';
import { Menu } from 'antd';

const App = (props) => {
    return (
      <div className="app_container">
        <div className="app_main_navigation">
          <Menu mode="horizontal">
            <Menu.Item key="mail">
<Link to="/posts">Posts</Link>


            </Menu.Item>
             <Menu.Item key="app">

                <Link to="/create_post">Create Post</Link>

            </Menu.Item>
          </Menu>
        </div>
        <Router>

                <Posts default />
                <Post path="post/:id" />
                <CreatePost path="create_post" />
                <UpdatePost path="update_post/:id" />
          </Router>
        </div>
    )
}

export default App;
