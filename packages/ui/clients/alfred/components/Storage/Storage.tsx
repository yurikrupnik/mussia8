import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// import axios from "axios";
import firebase from "../../utils/firebase";

// function getBuckets() {
//     // firebase.storage().
// }

const Storage = () => {
    const [user] = useAuthState(firebase.auth());
    // console.log("a", a);
    // console.log("c", c);
    useEffect(() => {
        // console.log("user", user);
        const listRef = firebase.storage().ref("docs/");
        listRef
            .listAll()
            .then((res) => {
                console.log("res", res); // eslint-disable-line
                res.prefixes.forEach((folderRef) => {
                    // All the prefixes under listRef.
                    // You may call listAll() recursively on them.
                    console.log(folderRef); // eslint-disable-line
                });
                res.items.forEach((itemRef) => {
                    // All the items under listRef.
                    console.log(itemRef); // eslint-disable-line
                });
            })
            .catch((error) => {
                console.log(error); // eslint-disable-line
                // Uh-oh, an error occurred!
            });
        // axios
        //     .get("https://storage.googleapis.com/storage/v1/b", {
        //         params: {
        //             project: "mussia8"
        //         }
        //     })
        //     .then((r) => {
        //         console.log({ r });
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        console.log("user", user?.email);
    }, [user?.email]);
    return (
        <Container>
            <Grid>Storage</Grid>
        </Container>
    );
};

export default Storage;
