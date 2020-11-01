import React, {useState} from 'react';
import { PageHeader, Input, Button } from 'antd';
import { auth } from '../firebase';
import { navigate , Link } from '@reach/router';

const SignIn = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const OnEmailChange = (event) => setEmail(event.target.value);
    const onPasswordChange = (event) => setPassword(event.target.value);


    const onSignIn = () => {
        console.log('sign in')
        console.log(email, password)


        auth.signInWithEmailAndPassword(email, password)
            .then(function (result) {
                console.log('user signed in ');
                navigate('/blogs/:uid/posts');

            }).catch(function (error) {
                console.log('error in sigin in');
                console.log(error);
                // NOTE: need to clear fields if there was an error
            });

        setEmail('');
        setPassword('');

    }

    return (
        <div className="Sign_up_container">
            <div className="page_header_container">
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                    }}
                    title="Sign In"
                />
            </div>
            <div className="sign_up_container_inputs" style={{ marginTop: '20px' }}>

                <div className="post_input_container">
                    <div className="post_input_title">
                        <h2>Email</h2>
                    </div>

                    <div className="post_input">
                        <Input placeholder="Email" onChange={OnEmailChange} />
                    </div>
                </div>


                <div className="post_input_container">
                    <div className="post_input_title">
                        <h2>Password</h2>
                    </div>

                    <div className="post_input">
                        <Input.Password placeholder="Password" onChange={onPasswordChange} />
                    </div>
                </div>


                <div>
                    <div style={{ float: "left" }}>
                        <Link to="/sign_up">Don't have an account, Create One</Link>
                    </div>
                    <div className="post_input_button">
                        <Button type="primary" size="large" onClick={onSignIn} >Sign In</Button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SignIn;