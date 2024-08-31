// lecture one this is used-- 2 and 3.....
import {useState, useContext} from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';


// from 11 to 62 lecture one checked....
const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image= styled('img')({
    width: 110,
    margin: 'auto',
    display:'flex',
    padding: '50px 0 0'
})

const Wrapper = styled(Box)`
padding: 25px 35px;
display: flex;
flex:1;
flex-direction: column;
& > div, & > button, & > P {
margin-top: 20px;
}
`

const LoginButton = styled(Button)`
text-transform: none;
background:#FB641B;
color: #fff;
height: 48px;
border-radius:2px;
`

const SignupButton = styled(Button)`
text-transform:none;
background:#fff;
color:#2874f0;
height: 48px;
border-radius:2px;
box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Error = styled(Typography)`
font-size:10px;
color: #ff6161;
line-height: 0;
margin-top: 10px;
font-weight: 600;
`

const Text= styled(Typography)`
color: #878787;
font-size: 20px;
`

const loginInitialValues = {
    username: '',
    password: ''
}
const signupInitialValues = {
   name:'',
   username:'',
   password:''
}

// from 75 to 77 lecture on except the use of is userAuthentication which is used in lecture 2nd....
const Login = ({isUserAuthenticated}) => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    // const image='https://img.freepik.com/premium-vector/word-concept-color-geometric-shapes-blog_205544-13021.jpg';


    //point 81 lecture one checked...
    const [account, toggleAccount] = useState('login');


    const [signup, setSignup] = useState(signupInitialValues);  
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');

    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    //from 92 to 94 lecture one checked....
    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value});
    }

    const signupUser = async() => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login')
        }else {
            setError('something went wrong try again later!')
        }
    }

    const onValueChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const loginUser = async () => {
        // console.log(login);
        try{
        let response = await API.userLogin(login);
        console.log(response);
        if (response.isSuccess) {
            setError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ username: response.data.username, name: response.data.name });
            isUserAuthenticated(true);
            navigate('/');

        } else {
            setError('something went wrong! please try again later');
        }
        }catch (error) {
        console.error('Login error:', error);
        setError('Server error occurred. Please try again later.');
    }
    };

    // lecture 1 from 134 except name and onChange function in textfield,point number 145, point number 157 to 168.....checked no error....
    return(
        <Component>
            <Box>
            <Image src={imageURL} alt="logo"/>
            {
                account ==='login' ?
            
            <Wrapper>
            <TextField variant="filled" onChange={(e) => onValueChange(e)} name="username" label="Enter username"></TextField>
            <TextField variant="filled" onChange={(e) => onValueChange(e)} name="password" label="Enter password"></TextField> 

            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
            <Text style={{ textAlign:'center'}}>OR</Text>
            <SignupButton onClick={()=>toggleSignup()}> Create an account</SignupButton>
            </Wrapper>
:
            <Wrapper>
            <TextField variant="filled" onChange={(e) => onInputChange(e)} name='name' label="Name"></TextField>    
            <TextField variant="filled" onChange={(e) => onInputChange(e)} name='username' label="Enter username"></TextField>
            <TextField variant="filled" onChange={(e) => onInputChange(e)} name='password' label="Enter password"></TextField>

            {error && <Error>{error}</Error>}
            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text style={{ textAlign:'center'}}>OR</Text>
            <LoginButton variant="contained" onClick={()=>toggleSignup()}>Already have an account</LoginButton>
            </Wrapper>
}
            </Box>
        </Component>
    )
}

export default Login;
