import React, {useState} from 'react';
import { Menu } from 'antd';
import { navigate,Link } from '@reach/router';
import { auth } from './firebase';

const AppNav = (props) => {



  const onSignOut = () => {
    console.log('signing out')

    auth.signOut().then(function () {
        console.log('user signed out');
        props.user = false;
        navigate('/sign_in');
    }).catch(function (error) {
      console.log('an error happened');
    })
    }
    return(
        <div className="app_main_navigation">
          <Menu mode="horizontal">
            <Menu.Item key="posts">
              <Link to={`/blogs/${props.user.uid}/posts`}>All Materials</Link>
            </Menu.Item>

            {
              props.user &&
              <Menu.Item key="create_post">

              <Link to="/create_post">Create Post</Link>

              </Menu.Item>
            }


            {
              !props.user
                ?
                <Link to="sign_in" style={{ float: 'right' }}>Sign In</Link>
                :
                <a href="#" onClick={onSignOut} style={{ float: 'right' }}>Sign Out</a>
            }
          </Menu>
        </div>
    )
}

export default AppNav;