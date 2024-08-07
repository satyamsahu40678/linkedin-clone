import { auth, provider, storage } from "../firebase";
import { getFirestore, collection, addDoc, doc, deleteDoc, where, getDocs, writeBatch } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { signInWithPopup } from "firebase/auth";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES, DELETE_ARTICLE } from "./actionType";
import db from "../firebase";
import { query, orderBy, onSnapshot } from "firebase/firestore";

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});

export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status,
});

export const getArticles = (payload) => (
    {
        type: GET_ARTICLES,
        payload: payload,
    });

export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then((payload) => {
                // Handle the signed-in user info.
                dispatch(setUser(payload.user));
                // Dispatch actions if needed
            })
            .catch((error) => {
                // Handle Errors here.
                alert(error.message);
            });
    };
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user));
            }
        });
    }
}


export function signOutAPI() {
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch(setUser(null));
        }).catch((error) => {
            console.log(error.message);
        });
    };
}


export function postArticleAPI(payload) {
    return async (dispatch) => {

        dispatch(setLoading(true));

        if (payload.image !== '') {
            const storageRef = ref(getStorage(), `images/${payload.image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, payload.image);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Progress: ${progress}%`);
                },
                (error) => console.log(error.code),
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    const db = getFirestore();
                    await addDoc(collection(db, "articles"), {
                        actor: {
                            description: payload.user.email,
                            title: payload.user.displayName,
                            date: payload.timestamp,
                            image: payload.user.photoURL,
                        },
                        video: payload.video,
                        sharedImg: downloadURL,
                        comments: 0,
                        description: payload.description,
                    });
                    dispatch(setLoading(false));
                }
            );
        }
        else if (payload.video) {
            dispatch(setLoading(true));
            await addDoc(collection(db, "articles"), {
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                video: payload.video,
                sharedImg: "",
                comments: 0,
                description: payload.description,
            });
            dispatch(setLoading(false));
        }
    };
}


export function getArticlesAPI() {
    return (dispatch) => {
        const db = getFirestore();
        const articlesRef = collection(db, "articles");
        const articlesQuery = query(articlesRef, orderBy("actor.date", "desc"));

        onSnapshot(articlesQuery, (snapshot) => {
            const payload = snapshot.docs.map((doc) => doc.data());
            // console.log(payload);
            // Dispatch the payload to the Redux store here if needed
            // dispatch({ type: 'SET_ARTICLES', payload });
            dispatch(getArticles(payload));
        });
    };
}


export const deleteArticle = (article) => async (dispatch) => {
    console.log("Article to delete:", article);
    console.log("Shared Image:", article.sharedImg);
    console.log("Video:", article.video);

    const db = getFirestore();

    try {
        const articlesRef = collection(db, "articles");
        let q;

        if (article.sharedImg) {
            q = query(articlesRef, where("sharedImg", "==", article.sharedImg));
        } else if (article.video) {
            q = query(articlesRef, where("video", "==", article.video));
        } else {
            console.error("No identifier provided for deletion.");
            return;
        }

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No matching documents found.");
        } else {
            const batch = writeBatch(db);
            querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });

            await batch.commit();

            dispatch({ 
                type: DELETE_ARTICLE, 
                payload: { sharedImg: article.sharedImg, video: article.video } 
            });
        }
    } catch (error) {
        console.error("Error deleting article: ", error);
    }
};
