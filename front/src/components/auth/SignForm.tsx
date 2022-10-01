import '../../App.css';
import React, {useState} from 'react';
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import profileIcon from "../../resources/icon/profile.png";
import {changePassword, signIn, updateAdmin} from "../../service/AuthService";
import {showNotification} from "../../service/NotificationService";
import {NotificationType, SignFormType} from "../../util/CommonTypes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";

interface SignFormProps {
    formType: SignFormType;
}

/**
 * Sing in/update email form
 *
 * @param formType form switcher
 * @returns sing in/update email form
 */
export const SignForm = ({formType}: SignFormProps) => {

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<any>({});
    const setField = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const handleSubmit = (e : any) => {
        e.preventDefault();

        setLoading(true);

        const processSuccessSubmit = () => {
            window.location.href = "/";
        }

        const processErrorSubmit = (error: any) => {
            setLoading(false);

            if (error && error.response) {
                showNotification(error.response.data.error, NotificationType.ERROR);
            }
        }

        if (formType === SignFormType.SIGN_IN) {
            signIn(form.email, form.password)
                .then(
                    processSuccessSubmit,
                    processErrorSubmit
                );
        } else if (formType === SignFormType.UPDATE_ADMIN) {
            updateAdmin(form.email)
                .then(
                    processSuccessSubmit,
                    processErrorSubmit
                );
        } else if (formType === SignFormType.CHANGE_PASSWORD) {
            changePassword(form.email, form.oldPassword, form.password, form.confirmPassword)
                .then(
                    processSuccessSubmit,
                    processErrorSubmit
                );
        }
    };

    const emailInput = (
        <InputGroup>
            <InputGroup.Text>@</InputGroup.Text>
            <FormControl
                placeholder="Email"
                aria-label="Email"
                name="email"
                onChange={ e => setField('email', e.target.value) }
            />
        </InputGroup>
    )

    const passwordInput = (placeholder: string, name: string) => {
        return <InputGroup className="mt-3">
                <InputGroup.Text className={"sign-from-fa-input-icon-wrap"}>
                    <FontAwesomeIcon icon={faLock}/>
                </InputGroup.Text>
                <FormControl
                    type="password"
                    placeholder={placeholder}
                    aria-label={placeholder}
                    name={name}
                    onChange={e => setField(name, e.target.value)}
                />
            </InputGroup>
    }

    return (
        <div className="sign-form-wrap">
            <Form>
                <img className="sign-form-profile-icon" src={profileIcon} alt="Profile icon"/>

                <div className="text-center sign-form-header-wrap">
                    <h5>Sign in to Blog</h5>
                </div>


                <i className="fa-pencil" title="Edit"></i>

                {formType === SignFormType.SIGN_IN && emailInput}
                {formType === SignFormType.SIGN_IN && passwordInput("Password", "password")}

                {formType === SignFormType.CHANGE_PASSWORD && emailInput}
                {formType === SignFormType.CHANGE_PASSWORD && passwordInput("Old password", "oldPassword")}
                {formType === SignFormType.CHANGE_PASSWORD && passwordInput("New password", "password")}
                {formType === SignFormType.CHANGE_PASSWORD && passwordInput("Confirm password", "confirmPassword")}

                {formType === SignFormType.UPDATE_ADMIN && emailInput}

                <Button variant="outline-primary w-100 mt-5 mb-3"
                        type="submit"
                        onClick={handleSubmit}>
                    {loading && <span className="spinner-border spinner-border-sm mr-2"> </span>}

                    {formType === SignFormType.SIGN_IN && <span>Sign in</span>}
                    {formType === SignFormType.CHANGE_PASSWORD && <span>Change</span>}
                    {formType === SignFormType.UPDATE_ADMIN && <span>Change</span>}
                </Button>
            </Form>
        </div>
    )
}
