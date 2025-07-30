# Chai aur backend series

This is a practice on backend with javascript

- [Model link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj?origin=share)



Mongoose-Aggregate-paginate-v2  => Package for writing aggregation queries

bcrypt => A core nodejs package help in hassing the passwords

JsonWebToken => JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.
                JSON Web Tokens are a good way of securely transmitting information between parties. Because JWTs can be signed—for example, using public/private key pairs—you can be sure the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with.

Major difference between bcrypt and JsonWebToken:  A token format (JSON Web Token) used to securely transmit information between parties (e.g., server → client)	 and  bcrypt is a password‑hashing algorithm used to safely store passwords. 

with help of (Pre middleware function)Hooks we can encrypt , Just before the storage of data we will run this and encrypt data.

File Uploading: Multer and cloudinary is used

middleware: (multer)  When a user uploads a file, the raw HTTP body is multipart-encoded.
Express alone does not know how to extract that into a file path or buffer.



Async is salt wherever you fill particular computation will take time just write it there...

