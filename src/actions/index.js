// actions/index.js
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then((payload) => {
                // Handle the signed-in user info.
                console.log(payload);
                // Dispatch actions if needed
            })
            .catch((error) => {
                // Handle Errors here.
                alert(error.message);
            });
    };
}
