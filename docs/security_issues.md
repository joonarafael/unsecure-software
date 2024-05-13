# SECURITY ISSUES

## [A01 Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/ "OWASP/Top 10: Broken Access Control")

"_Bypassing access control checks by modifying the URL (parameter tampering or force browsing), internal application state, or the HTML page, or by using an attack tool modifying API requests._"

### How this is present in my application

User information fetching on route `/user` is not safe. While the user information fetching requires access token, the API request is made based on the URL parameter. You can give any user ID within the URL `?id=` search parameter to query for any user in the database.

## [A02 Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/ "OWASP/Top 10: Cryptographic Failures")

### How this is present in my application

Plaintext passwords -> Hashed passwords

## [A03 Injection](https://owasp.org/Top10/A03_2021-Injection/ "OWASP/Top 10: Injection")

### How this is present in my application

injection in getuser

## [A04 Insecure Design](https://owasp.org/Top10/A04_2021-Insecure_Design/ "OWASP/Top 10: Insecure Design")

### How this is present in my application

Generation of Error Message Containing Sensitive Information,

## [A07 Identification and Authentication Failures](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/ "OWASP/Top 10: Identification and Authentication Failures")

### How this is present in my application
