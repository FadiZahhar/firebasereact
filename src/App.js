import './App.css';
import React, {useState} from 'react';
import Posts from './components/Posts';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import { Router } from '@reach/router';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AppNav from './AppNav';
import { auth } from './firebase';

const App = (props) => {

  const [user, setUser] = useState(false)

  auth.onAuthStateChanged(function (user) {
    if (user) {
      // user is signed in.
      console.log('user is signed in');

    } else {
      // no user is signed in.
      console.log('no user is signed in ');
    }
    setUser(user);

  })

    return (
      <div className="app_container">
        {
          user &&
          <AppNav user={user} />
        }
        <Router>
          <SignUp path="sign_up" />
          <SignIn path="sign_in"  default />
          <Posts path="blogs/:uid/posts" user={user} />
          <Posts path="blogs/:uid/posts/arabic" user={user} slug="arabic" />
          <Posts path="blogs/:uid/posts/english" user={user} slug="english" />
          <Posts path="blogs/:uid/posts/french" user={user} slug="french" />
          <Posts path="blogs/:uid/posts/science" user={user} slug="science" />
          <Posts path="blogs/:uid/posts/culture" user={user} slug="culture" />
          <Posts path="blogs/:uid/posts/music" user={user} slug="music" />
          <Posts path="blogs/:uid/posts/movies" user={user} slug="movies" />
                <Post path="blogs/:uid/post/:id"  user={user} />
                <CreatePost path="create_post"  user={user} />
                <UpdatePost path="update_post/:id"  user={user} />
          </Router>
        </div>
    )
}

export default App;
