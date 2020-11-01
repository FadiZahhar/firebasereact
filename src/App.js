import './App.css';
import React, {useState} from 'react';
import Posts from './components/Posts';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import { Router, Link } from '@reach/router';
import { Menu } from 'antd';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { auth } from './firebase';

const App = (props) => {

  const [user, setUser] = useState(false)

  auth.onAuthStateChanged(function (user) {
    if (user) {
      // user is signed in.
      console.log('user is signed in');
      console.log(user);
    } else {
      // no user is signed in.
      console.log('no user is signed in ');
    }
    setUser(user);
  });

  const onSignOut = () => {
    console.log('signing out')

    auth.signOut().then(function () {
      console.log('user signed out');
      setUser(false);
    }).catch(function (error) {
      console.log('an error happened');
    })
  }

    return (
      <div className="app_container">
        <div className="app_main_navigation">
          <Menu mode="horizontal">
            <Menu.Item key="posts">
              <Link to="/posts">Posts</Link>
            </Menu.Item>

            {
              user &&
              <Menu.Item key="create_post">

              <Link to="/create_post">Create Post</Link>

              </Menu.Item>
            }


            {
              !user
                ?
                <Link to="sign_in" style={{ float: 'right' }}>Sign In</Link>
                :
                <a href="#" onClick={onSignOut} style={{ float: 'right' }}>Sign Out</a>
            }
          </Menu>
        </div>
        <Router>
          <SignUp path="sign_up" />
          <SignIn path="sign_in"  default />
                <Posts path="posts" user={user} />
                <Post path="post/:id"  user={user} />
                <CreatePost path="create_post"  user={user} />
                <UpdatePost path="update_post/:id"  user={user} />
          </Router>
        </div>
    )
}

export default App;
