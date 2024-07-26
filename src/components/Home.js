import styled from "styled-components";
import LeftSide from "./LeftSide";
import Middle from "./Middle";
import RightSide from "./RightSide";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.user) {
            navigate('/');
        }
    }, [!props.user, navigate]);

    return (
        <Container>
            <Section>
                <h5>
                    <a>
                        Are you hiring? -  
                    </a>
                </h5>
                    
                <p>- Find talented/non-talented people here. And give them high salary please.</p>
            </Section>
            <Layout>
                <LeftSide />
                <Middle />
                <RightSide />
            </Layout>
        </Container>
    );
};

const Container = styled.div`
    padding-top: 54px;
    max-width: 100%;
`;

const Content = styled.div`
    max-width: 1128px;
    margin-left: auto;
    margin-right: auto;
`;

const Section = styled.section`
    min-height: 50px;
    padding: 16px 0;
    box-sizing: content-box;
    text-align: center;
    text-decoration: underline;
    display: flex;
    justify-content: center;

    h5{
        color: #0a66c2;
        font-size: 14px;
        a{
            font-weight: 700;
        }
    }

    p{
        font-size: 14px;
        color: #434649;
        font-weight: 600;
    }

    @media(max-width:768px){
        flex-direction: column;
        padding: 0 5px;

        p{

        }
    }
`;

const Layout = styled.div`
    display: grid;
    grid-template-areas: 
        "leftside middle rightside";
    grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
    column-gap: 25px;
    row-gap: 25px;
    margin: 25px 0;
    
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        padding: 0 5px;
    }
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

export default connect(mapStateToProps)(Home);
