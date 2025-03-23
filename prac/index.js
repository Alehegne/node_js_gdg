import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

//session is server dependent
/*
 jwt contains header, payload, and signature
 in payload: we can pass  user id, email,expiration time and other information
 in signature: we can pass secret key, algorithm and token type
 in header: we can pass algorithm and token type
    we can use jwt to authenticate user and authorize user
    we can use jwt to send data to client, or to send data to server
    jwt cant store in the server, it is stateless

dont store sensitive data in jwt, because it is not encrypted
jwt is not encrypted, it is encoded

 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
