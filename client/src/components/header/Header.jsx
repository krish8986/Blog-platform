

import { AppBar, Toolbar, Typography, styled } from '@mui/material';

import { Link } from 'react-router-dom';

const Component = styled(AppBar)`
    background: #FFFFFF;
    color: #000;
    `;

const Container = styled(Toolbar)`
   justify-content: center;
   & > a {
       padding: 20px;
       color: #000;
       text-decoration: none;
       }
       `
    //    const Link = styled(Typography)

const Header = () => {

    return (
        <Component>
            <Container>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact us</Link>
                <Link to='/login'>Log out</Link>
            </Container>
        </Component>
    )
}

export default Header;