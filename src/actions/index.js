import { auth, provider, storage } from "../firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { signInWithPopup } from "firebase/auth";
import { SET_USER } from "./actionType";
import db from "../firebase";

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
})

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
                }
            );
        }
        else if(payload.video){
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
        }
    };
}