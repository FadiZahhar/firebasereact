import React, {useState} from 'react';
import { PageHeader, Input, Button } from 'antd';
import { auth } from '../firebase';
import { navigate, Link } from '@reach/router';

const SignUp = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChange = (event) => setEmail(event.target.value);
    const onPasswordChange = (event) => setPassword(event.target.value);


    const onSignUp = () => {
        console.log('sign up')
        console.log(email, password)


        auth.createUserWithEmailAndPassword(email, password)
            .then(function (result) {
                console.log('user signed up ');
                navigate('/blogs/:uid/posts');
            })
            .catch(function (error) {
                console.log('error in signup')

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
                title="Sign Up"
            />
        </div>
        <div className="sign_up_container_inputs" style={{marginTop: '20px'}}>

            <div className="post_input_container">
                <div className="post_input_title">
                <h2>Email</h2>
                </div>

                <div className="post_input">
                    <Input placeholder="Email" onChange={onEmailChange} />
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
                    <Link to="/sing_in">Already have an account</Link>
                </div>
                <div className="post_input_button">
                    <Button type="primary" size="large" onClick={onSignUp} >Sign Up</Button>
                </div>

             </div>

        </div>
    </div>

    )


}

export default SignUp;