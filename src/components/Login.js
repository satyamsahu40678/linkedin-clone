import styled from 'styled-components';

const Login = (props) => {
    return (
        <Container>
            <Nav>
                <a href='/'>
                    <img src='/images/login-logo.svg' alt='' />
                </a>
                <div>
                    <Join>
                        Join Me
                    </Join>
                    <SignIn>
                        Sign in
                    </SignIn>
                </div>
            </Nav>

            <Section>
                <Hero>
                    <h1>Welcome to Your Community</h1>
                    <img src='/images/login-hero.svg' alt='' />
                </Hero>
                <Form>
                    <Google>
                        <img src='/images/google.svg' alt=''/>
                        Sign in with Google
                    </Google>
                </Form>
            </Section>

        </Container>
    );
};

const Container = styled.div`
    padding: 0px;
`;

const Nav = styled.div`
    max-width: 1128px;
    margin: auto;
    padding: 12px 0 16px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    flex-wrap: nowrap; //beacuse of no rap our nav bar won't go in next line 

    & > a{
        width: 135px;
        height: 34px;

        @media (max-width: 768px){
            padding: 0 5px;
        }
    }
`;

const Join = styled.a`
    font-size: 16px;
    padding: 10px 12px;
    text-decoration: none;
    border-radius: 4px;
    color: rgb(0, 0, 0, 0.6);
    margin-right: 12px;
    &:hover{
        background-color: rgb(0, 0, 0, 0.08);
        color: rgba(0, 0, 0, 0.9);
        text-decoration: none;
        cursor: pointer;
    }
`;

const SignIn = styled.a`
    box-shadow: inset 0 0 0 2px #0a66c2;
    color: #0a66c2;
    border-radius: 24px;
    transition-duration: 180ms;
    font-size: 16px;
    font-weight: 600;
    line-height: 40px;
    padding: 10px 24px; //24px width type padding and 10px height type of padding
    text-align: center;
    background-color: rgba(0, 0, 0, 0);
    &:hover{
        background-color: #0a66c2;
        color: white;
        text-decoration: none;
        cursor: pointer;
    }
`;

const Section = styled.section`
    display: flex;
    align-content: start;
    min-height: 700px;
    padding-bottom: 140px;
    padding-top: 40px;
    right: 50px;
    paint-order: 60px 0;
    position: relative;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1130px;
    align-items: center;
    margin: auto;
    @media (max-width: 768px){
        margin: auto;
        right: 0px;
        min-height: 0px;
    }
`;

const Hero = styled.div`
    width: 100%;
    h1 {
        margin-top: 230px;
        padding-bottom: 0;
        text-align: center;
        width: 55%;
        font-size: 56px;
        color: #4877c9;
        font-weight: 600;
        line-height: 70px;
        @media (max-width: 768px){
            margin: 0;
            text-align: center;
            font-size: 50px;
            width: 100%;
            line-height: 2;
            
        }
    }

    img{
        /* z-index: -1; //so that text that overlapping it is always on top */
        width: 700px;
        height: 670px;
        top: 50px;
        position: absolute;
        bottom: -2px;
        right: -150px;
        @media(max-width: 768px){
            top: 400px;
            width: initial;
            position: initial;
            height: initial;
            margin-top: 20px;
        }
    }
`;

const Form = styled.div`
    margin-top: 50px;
    padding-left: 60px;
    left: 10px;
    align-items: center;
    width: 500px;
    @media (max-width: 768px){
        /* margin-top: px; */
        width: 100%;
        padding-left: 50px;
        padding-right: 50px;
    }
`;

const Google = styled.button`
    display: flex;
    justify-content: center;
    background-color: #fff;
    align-items: center;
    height: 56px;
    width: 100%;
    border-radius: 28px;
    box-shadow: inset 0 0 0 1px rgba(0 0 0 / 60%), inset 0 0 0 2px rgba(0 0 0 /0%), inset 0 0 0 1px rgba(0 0 0 / 0%);
    vertical-align: middle;
    z-index: 0;
    transition-duration: 180ms;
    font-size: 25px;
    color: rgba(0, 0, 0, 0.6);
    &:hover{
        background-color: rgba(207,207,207,.25);
        color: rgba(0,0,0,1);
        /* font-weight: bold; */
        cursor: pointer;
    }

    img{
        padding: 5px;
    }

    @media (max-width: 768px){
        font-size: 20px;
    }
`;
export default Login;