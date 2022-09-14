import axios from 'axios'
import { sessionService } from 'redux-react-session';
import { USER_SERVER } from '../../Utils/Proxy'
import {
    LOGIN_USER
} from './types';


export const LoginUser = (credentials, history, setFieldError, setSubmitting) => {
    // Make checks and get some 
    return () => {
    const request =  axios.post(`${USER_SERVER}/signin`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then((response) => {
            const { data } = response;

             if (data.status === "Failed") {
                const { message} = data;
                if (message.includes("email")) {
                    setFieldError("email", message)
                }
                if (message.includes("password")) {
                    setFieldError("password", message)
                }
            } else if (data.status === "success") {
                const userData = data.data

                const token = userData.token
                localStorage.setItem('token', token)
                console.log(token)
                sessionService.saveSession(token).then(()=> {
                    sessionService.saveUser(userData).then(()=>{
                        history.push("/home_page")
                    })
                    
                    .catch(err => console.error(err));
                }).catch(err => console.error(err));
            }
            // Complete submission
            setSubmitting(false);
        })
        return {
            type: LOGIN_USER,
            payload: request
        }
        .catch(err => console.error(err));
    }
}

