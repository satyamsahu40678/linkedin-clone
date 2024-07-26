import { useEffect } from "react";
import { getArticlesAPI } from "../actions";
import { deleteArticle } from "../actions";
import { useState } from "react";
import styled from "styled-components";
import PostModel from "./PostModel";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import Gemini from "./Gemini";

const Middle = (props) => {
    const [showModel, setShowModel] = useState("closed");
    // const [articleToDelete, setArticleToDelete] = useState(null);

    useEffect(() => {
        props.getArticles();
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }

        switch (showModel) {
            case "open":
                setShowModel("close");
                break;
            case "close":
                setShowModel("open");
                break;
            default:
                setShowModel("close");
                break;
        }
    };

    const [likedArticles, setLikedArticles] = useState({});

    const handleLike = (articleId) => {
        setLikedArticles((prevLikes) => ({
            ...prevLikes,
            [articleId]: !prevLikes[articleId],
        }));
    };


    const handleDelete = (e, article) => {
        e.preventDefault();
        // Assuming `sharedImg` is the identifier for deletion
        props.deleteArticle(article.sharedImg, "", article.video);
    };
    



    return (
        <>
            {
                props.articles.length === 0 ? (
                    <p>There are no articles yet!</p>
                ) : (
                    <Container>
                        <Gemini />
                        <ShareBox>
                            <div>
                                {props.user && props.user.photoURL ? (
                                    <img src={props.user.photoURL} alt="" />
                                ) : (

                                    <img src="/images/user.svg" alt="" />
                                )}
                                <button onClick={handleClick}
                                    disabled={props.loading ? true : false}>Start a post</button>
                            </div>
                            <div>
                                <button>
                                    <img src="/images/photo-icon.svg" alt="" />
                                    <span>Photo</span>
                                </button>
                                <button>
                                    <img src="/images/video-icon.svg" alt="" />
                                    <span>Video</span>
                                </button>
                                <button>
                                    <img src="/images/event-icon.svg" alt="" />
                                    <span>Event</span>
                                </button>
                                <button>
                                    <img src="/images/article-icon.svg" alt="" />
                                    <span>Write Article</span>
                                </button>
                            </div>
                        </ShareBox>
                        <Content>
                            {
                                props.loading && <img src="/images/spin-loader.svg" alt="" />
                            }

                            {props.articles.length > 0 && props.articles.map((article, key) => (
                                <Article key={key}>
                                    <SharedActor>
                                        <a>
                                            <img src={article.actor.image} alt="" />
                                            <div>
                                                <span>
                                                    {article.actor.title}
                                                </span>
                                                <span>
                                                    {article.actor.description}
                                                </span>
                                                <span>
                                                    {article.actor.date ? article.actor.date.toDate().toLocaleDateString() : 'Date not available'}
                                                </span>
                                            </div>
                                        </a>
                                        <Delete onClick={(e) => handleDelete(e, article)}>
                                            <img src="/images/delete-icon.svg" alt="Delete" />
                                        </Delete>


                                    </SharedActor>
                                    <Description>
                                        {article.description}
                                    </Description>
                                    <SharedImg>
                                        <a>
                                            {
                                                !article.sharedImg && article.video ? (
                                                    <ReactPlayer width={'100%'} url={article.video} />
                                                )
                                                    :
                                                    (
                                                        article.sharedImg && <img src={article.sharedImg} alt="" />
                                                    )
                                            }

                                        </a>
                                    </SharedImg>
                                    <SocialCounts>
                                        <li>
                                            <button>
                                                <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
                                                <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt="" />
                                                <span>75</span>
                                            </button>
                                        </li>
                                        <li>
                                            <a>
                                                {article.comments} Comments
                                            </a>
                                        </li>
                                    </SocialCounts>
                                    <SocialActions>
                                        <button onClick={() => handleLike(article.id)}>
                                            {likedArticles[article.id] ? (
                                                <img src="/images/like-icon-click.svg" alt="Liked" />
                                            ) : (
                                                <img src="/images/like-icon.svg" alt="Like" />
                                            )}
                                            <span>Like</span>
                                        </button>
                                        <button>
                                            <img src="/images/comment-icon.svg" alt="" />
                                            <span>Comment</span>
                                        </button>
                                        <button>
                                            <img src="/images/repost-icon.svg" alt="" />
                                            <span>Repost</span>
                                        </button>
                                        <button>
                                            <img src="/images/send-icon.svg" alt="" />
                                            <span>Send</span>
                                        </button>
                                    </SocialActions>
                                </Article>
                            ))};
                        </Content>

                        <PostModel showModel={showModel} handleClick={handleClick} />
                    </Container>
                )}
        </>
    );
};


const Container = styled.div`
    grid-area: middle;
`;

const Delete = styled.div`
    padding: 10px;
    
    &:hover {
        cursor: pointer;
    }
`;


const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgba(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
    display: flex;
    flex-direction: column;
    color: #978b7b;
    margin: 0 0 8px;
    background: white;
    div{
        button{
            outline: none;
            color: rgba(0, 0, 0, 0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            font-weight: 600;
        }
        &:first-child{
            display: flex;
            align-items: center;
            padding: 8px 16px 0px 16px;
            img{
                width: 48px;
                border-radius: 50%;
                margin-right: 8px;
            }
            button{
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0,0,0,0.15);
                background-color: white;
                text-align: left;
            }
        }
        &:nth-child(2){
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-bottom: 4px;

            button{
                img{
                    margin: 0 4px 0 -2px;
                }
                span{
                    color: #70b5f9;
                }
            }
        }
    }
`;

const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;
    
`;

const SharedActor = styled.div`
    padding-right: 40px;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    display: flex;
    a{
        margin: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        text-decoration: none;


        img{
            width: 48px;
            height: 48px;
        }

        & > div{
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;

            span{
                text-align: left;
                &:first-child{
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0,0,0,1);
                }
                
                &:nth-child(n+1){
                    font-size: 12px;
                    color: rgba(0,0,0,0.6);
                }
            }
        }
    }

    button{
        position: absolute;
        right: 12px;
        top: 0;
        background: transparent;
        border: none;
        outline: none;
        img{
            width: 25px;
            height: 25px;
        }
    }
`;

const Description = styled.div`
    padding: 0 25px;
    overflow: hidden;
    color: rgba(0 , 0, 0, 0.9);
    font-size: 14px;
    text-align: left;
`;

const SharedImg = styled.div`
    margin-top: 8px;
    padding-bottom: 5px;
    width: 100%;
    display: block;
    position: relative;
    background-color: #f9fafb;
    img{
        object-fit: contain;
        width: 97%;
        height: 97%;
        border-radius: 5px;
    }
`;

const SocialCounts = styled.ul`
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;
    list-style: none;
    li{
        margin-right: 5px;
        font-size: 14px;
        button{
        border-radius: 10px;
        background-color: #fff;
        line-height: 1.33;
        width: 50px;
        padding: 2px;
        box-direction: none;
        border: none;
        display: inline-flex;

        }
    }
    
`;

const SocialActions = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin: 0;
    min-height: 40px;
    padding: 4px 8px;
    margin-left: 4px;
    margin-right: 4px;
    justify-content: space-around;
    /* @media(min-width: 768px){
            width: 50px;
        } */
    button{
        /* display: flex; */
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        width: 150px;
        box-direction: none;
        border: none;
        display: inline-flex;
        padding: 8px;
        color: #0a66c2;
        span{
            margin-left: 6px;
            font-size: 17px;
        }
        @media(min-width: 768px){
            span{
                margin-left: px;
            }
            /* display: flex;
            object-fit: contain; */
            /* overflow: hidden; */
        }
        &:hover{
            cursor: pointer;
            color: white;
            background-color: rgba(0,0,0,0.6);
            transition: ease 0.2s ;
        }
    }
`;

const Content = styled.div`
    text-align: center;
    & > img {
        width: 70px;
    }
`;

const mapStateToProps = (state) => {
    return {
        loading: state.articleState.loading,
        user: state.userState.user,
        articles: state.articleState.articles,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getArticles: () => dispatch(getArticlesAPI()),
    deleteArticle: (articleId) => dispatch(deleteArticle(articleId)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Middle);