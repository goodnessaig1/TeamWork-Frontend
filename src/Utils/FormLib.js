import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useField } from "formik";
import { useState } from "react";
import './FormLib.css'


export const TextInput = ({icon, ...props}) =>{
    const [field, meta] = useField(props)
    const [show, setShow ] = useState(false)

    return (
        <div style={{position: "relative"}}>
            <div className="contactes">
                <label htmlFor={props.name}>
                    {props.label}
                </label>
                <div className="input_icon_container">
                    <span className="input_icon left_icon">
                        {icon}
                    </span>
                    <input
                        className="inputs" 
                        {...field}
                        {...props}
                    type={props.type !=="password"  || show ? "text"  : "password"}
                    />
                </div>
                {
                    props.type === "password" && (
                        <span onClick={()=> setShow(!show)} className="input_icon right_icon">
                        {show && <Visibility/> }
                        {!show && <VisibilityOff/> }
                        </span>
                )}
                </div>
                {
                    meta.touched && meta.error ? (
                        <div className="error_message">
                            {meta.error}
                        </div>
                    ): (
                        <div style={{ visibility: "hidden" }} className="error_message">
                        
                        </div>

                    )
                }
        </div>
    )
}