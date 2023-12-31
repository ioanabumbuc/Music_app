import React, { Component } from 'react'

import {
    BrowserRouter as Router,
} from "react-router-dom";

import style from './Login.module.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    state = {
        validUser: true,
        validPassword: true,
        username: '',
        password: '',
        isLoggedIn: false,
    }

    componentDidMount() {
        this.setState({
            validUser: true,
            validPassword: true
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.validUser !== this.props.validUser ||
            prevProps.validPassword !== this.props.validPassword ||
            prevProps.isLoggedIn !== this.props.isLoggedIn) {
            this.setState({
                validUser: this.props.validUser,
                validPassword: this.props.validPassword,
                isLoggedIn: this.props.isLoggedIn
            })
        }
    }

    //HANDLE INPUT CHANGES

    handleUserChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleLoginSubmit = (event) => {
        event.preventDefault();

        let userData = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.handleLoginSubmit(userData);
    }

    handleLogOut() {
        this.setState({
            isLoggedIn: false
        });
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("username", "null")
    }

    //BUTTON DISABLE

    loginButton() {
        if (this.state.username !== '' && this.state.password !== '') {
            return (<Button
                onClick={this.handleLoginSubmit}
                variant="contained"
                className={style.submitButton} >LOGIN</Button>)
        }
        return (<Button
            disabled
            onClick={this.handleLoginSubmit}
            variant="contained"
            className={style.submitButton} >LOGIN</Button>)
    }

    render() {
        return (
            <div className={style.login}>
                {/* user is not logged in */}
                {localStorage.getItem("isLoggedIn") === "false" &&
                    <div className={style.login}>
                        <h1>Log in!</h1>
                        <form className={style.form} onSubmit={this.handleLoginSubmit}>
                            <div className={style.label}>
                                <label className={style.label}>Username</label>
                            </div>
                            <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Required"
                                    defaultValue=""
                                    className={style.textField}
                                    onChange={this.handleUserChange}
                                />
                                {this.state.validUser === false &&
                                    <p className={style.error}>Username doesn't exist - create an account</p>
                                }
                            </div>
                            <div className={style.label}>
                                <label className={style.label}>Password</label>
                            </div>
                            <div>
                                <TextField
                                    className={style.textField}
                                    required
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={this.handlePasswordChange}
                                />
                                {this.state.validPassword === false &&
                                    <p className={style.error}>Incorrect password</p>
                                }
                            </div>
                            <div className={style.buttonDiv}>
                                {this.loginButton()}
                            </div>
                        </form>
                        <p>Don't have an account? Register <a href="/register">here</a></p>
                    </div>}
                {/* user is already logged in - do not show form */}
                {localStorage.getItem("isLoggedIn") === "true" &&
                    <div className={style.loggedIn}>
                        <h1>Logged in successfully as {localStorage.getItem("username")}!</h1>
                        <Router>
                            <div className={style.buttonDiv}>
                                <Button variant="contained"
                                    className={style.goBackButton + ' ' + style.primaryButton}
                                    sx={{ marginBottom: "50px", marginTop: '30px' }}><a href="/">Go Back To Music!</a></Button>
                                <Button variant="contained"
                                    color="secondary"
                                    className={style.goBackButton + ' ' + style.logout} onClick={this.handleLogOut}>Log out</Button>
                            </div>
                        </Router>
                    </div>
                }
            </div>
        )
    }
}
