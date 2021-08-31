import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import classes from './Auth.module.css';

const Auth = () => {
    const dispatch = useDispatch();

    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailTouched, setEmailTouched] = useState(false);

    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordTouched, setPasswordTouched] = useState(false);

    const enteredEmailIsValid = enteredEmail.includes('@');
    const emailIsInvalid = !enteredEmailIsValid && emailTouched;

    const enteredPasswordIsValid =
        enteredPassword !== '' && enteredPassword.length >= 8;
    const passwordIsInvalid = !enteredPasswordIsValid && passwordTouched;

    let formIsValid = false;

    if (enteredEmailIsValid && enteredPasswordIsValid) {
        formIsValid = true;
    }

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };

    const emailBlurHandler = () => {
        setEmailTouched(true);
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    const passwordBlurHandler = () => {
        setPasswordTouched(true);
    };

    const loginHandler = (event) => {
        event.preventDefault();
        setEmailTouched(true);
        setPasswordTouched(true);

        if (!enteredEmailIsValid && !enteredPasswordIsValid) {
            return;
        }

        dispatch(authActions.login());

        setEmailTouched(false);
        setPasswordTouched(false);
    };

    const emailInputClasses = `${classes.control} ${
        emailIsInvalid ? classes.invalid : ''
    }`;
    const passwordInputClasses = `${classes.control} ${
        passwordIsInvalid ? classes.invalid : ''
    }`;

    return (
        <main className={classes.auth}>
            <section>
                <form onSubmit={loginHandler}>
                    <div className={emailInputClasses}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                        />
                        {emailIsInvalid && (
                            <p className={classes.error}>
                                <strong>Please enter a valid email.</strong>
                            </p>
                        )}
                    </div>
                    <div className={passwordInputClasses}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                        />
                    </div>
                    {passwordIsInvalid && (
                        <p className={classes.error}>
                            <strong>
                                Please enter a password of at least 8
                                characters.
                            </strong>
                        </p>
                    )}
                    <button disabled={!formIsValid}>Login</button>
                </form>
            </section>
        </main>
    );
};

export default Auth;
