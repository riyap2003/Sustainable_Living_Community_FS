function Validation(values) {
    let error = {};

    // Regular expression patterns
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (values.email==="") {
        error.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
        error.email = "Invalid email format";
    }
    else{
        error.email=""
    }

    if (values.password==="") {
        error.password = "Password should not be empty";
    } else if (!passwordPattern.test(values.password)) {
        error.password = "Invalid password";
    }
    else{
        error.password=""
    }

    return error;
}
 export default Validation;