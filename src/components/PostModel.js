import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { postArticleAPI } from "../actions";
import { getFirestore, serverTimestamp } from "firebase/firestore";


// creating the post model to show the post that are being stored in the database and also the interactive box to made post
const PostModel = (props) => {
    const [editorText, setEditorText] = useState("");
    const [shareImage, setShareImage] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [assetArea, setAssetArea] = useState("");


    const handleChange = (e) => {
        const image = e.target.files[0];

        if (image === '' || image === undefined) {
            alert(`Not an image, the file is a ${typeof image}`);
            return;
        }
        setShareImage(image);
    };

    const switchAssetArea = (area) => {
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    };

    const postArticle = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }

        const payload = {
            image: shareImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: serverTimestamp(),
        };

        props.postArticle(payload);
        reset(e);
    };

    //reseting the post editor
    const reset = (e) => {
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        props.handleClick(e);
    };

    return (
        <>
            {props.showModel === 'open' && (
                <Container>
                    <Content>
                        <Header>
                            <h2>Create a post</h2>
                            <button onClick={(event) => reset(event)}>
                                <img src="/images/close-icon.svg" alt="" />
                            </button>
                        </Header>
                        <SharedContent>
                            <UserInfo>
                                {props.user.photoURL ? (
                                    <img src={props.user.photoURL} />
                                ) : (
                                    <img src="/images/user.svg" alt="" />
                                )}
                                <span>{props.user.displayName}</span>
                            </UserInfo>
                            <Editor>
                                <textarea value={editorText}
                                    onChange={(e) => setEditorText(e.target.value)}
                                    placeholder="What do you want to talk about?"
                                    autoFocus={true}
                                />
                                {assetArea === 'image' ? (
                                    <UploadImage>
                                        <input
                                            type="file"
                                            accept="image/gif, image/jpeg, image/png"
                                            name="image"
                                            id="file"
                                            style={{ display: "none" }}
                                            onChange={handleChange}
                                        />
                                        <p>
                                            <label htmlFor="file" style={{ cursor: 'pointer' }}>Select image to share</label>
                                        </p>
                                        {shareImage && <img src={URL.createObjectURL(shareImage)} alt="Shared" />}
                                    </UploadImage>
                                ) : (
                                    assetArea === 'media' &&
                                    (<>
                                        <input type="text"
                                            placeholder="Please input a video link"
                                            value={videoLink}
                                            onChange={(e) => setVideoLink(e.target.value)}
                                        />
                                        {videoLink && (
                                            <ReactPlayer width={'100%'} url={videoLink} />
                                        )}
                                    </>
                                    )
                                )}

                            </Editor>
                        </SharedContent>
                        <ShareCreations>
                            <AttachAssets>
                                <AssetButton onClick={() => switchAssetArea("image")}>
                                    <img src="/images/share-image.svg" alt="" />
                                </AssetButton>
                                <AssetButton onClick={() => switchAssetArea("media")}>
                                    <img src="/images/share-video.svg" alt="" />
                                </AssetButton>
                            </AttachAssets>

                            <ShareComment>
                                <AssetButton>
                                    <img src="/images/share-comment.svg" alt="" />
                                    Anyone
                                </AssetButton>
                            </ShareComment>
                            <PostButton disabled={!editorText ? true : false} onClick={(event) => postArticle(event)}>
                                Post
                            </PostButton>
                        </ShareCreations>
                    </Content>
                </Container>
            )}
        </>
    );
};

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    color: black;
    background-color: rgba(0, 0, 0, 0.8);
    animation: fadeIn 0.3s;
`;

const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button{
        &:hover{
            cursor: pointer;
        }
        height: 40px;
        width: 40px;
        min-width: auto;
        background: none;
        border: none;
        color: rgba(0, 0, 0, 0.15);
        svg, img{
            pointer-events: none;
            
        }
    }
`;

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg, img{
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }

    span{
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`;

const ShareCreations = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;

`;

const AssetButton = styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    cursor: pointer;
    min-width: auto;
    color: rgba(0,0,0,0.5);
    &:hover{
        background-color: aliceblue;
    }
`;

const AttachAssets = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;
    ${AssetButton}{
        width: 50px;
        justify-content: center;
        margin-left: 5px;
        border-radius: 5px;
        border: none;
        box-shadow: 0 0 0 1px rgba(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    }
`;

const ShareComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0,0,0,0.15);
    ${AssetButton}{
        svg{
            margin-right: 5px;
        }
    }
    button{
        width: 90px;
        justify-content: center;
        justify-content: space-between;
        font-weight: 500;
        border: none;
        border-radius: 5px;
        box-shadow: 0 0 0 1px rgba(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    }
`;

const PostButton = styled.button`
    min-width: 70px;
    border-radius:20px;
    padding-left: 16px;
    font-size: 14px;
    font-weight: 500;
    padding-right: 16px;
    background-color: ${props => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
    color: ${props => (props.disabled ? "rgba(0,0,0,1)" : 'white')};
    &:hover{
        cursor: pointer;
        background-color: ${props => (props.disabled ? 'rgba(0,0,0,0.08)' : "green")};

    }
`;

const Editor = styled.div`
    padding: 12px 24px;
    border: none;
    textarea{
        width: 100%;
        min-height: 100px;
        border: none;
        outline: none;
        border-radius: 5px;
        resize: none;

    }
    input{
        width: 100%;
        height: 35px;
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 20px;
    }
`;


const UploadImage = styled.div`
    text-align: center;
    img{
        width: 100%;
        margin-top: 5px;
    }
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    }
};

const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModel);