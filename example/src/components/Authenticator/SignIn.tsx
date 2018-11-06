import FirebaseNamespace from '@firebase/app';
import { Button, CircularProgress, StyleRulesCallback, Switch, TextField, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import Firebase from '../../FirebaseApp';
import CardBox from './CardBox';
import { FlowState } from './FlowState';

export namespace FilterCard {
    export interface Props {
        authFlowCallback: Function;
        email: string | null;
        snackbarFunction: Function;
        onSuccess: Function;
    }

    export interface State {
    }
}

class FilterCard extends React.Component<WithStyles & FilterCard.Props> {

    state = {
        passwordInput: '',
        emailInput: '',
        error: '',
        loading: false,
        stayLoggedIn: false,
    };

    nameInput = undefined;

    handleChange = (name: any) => (event: any) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleKeyPress, true);
    }
    componentDidMount() {
        document.addEventListener('keydown', this._handleKeyPress, true);
        if (this.props.email && !this.state.emailInput) {
            this.setState({ emailInput: this.props.email });
        }
        if (this.nameInput !== undefined) {
            // @ts-ignore 
            this.nameInput.focus();
        }

    }
    _handleKeyPress = (ev: KeyboardEvent) => {
        if (ev.keyCode === 13) {
            this.login();
        }
    }

    login = () => {
        this.setState({ loading: true });
        // @ts-ignore
        var cred = FirebaseNamespace.auth.EmailAuthProvider.credential(
            this.state.emailInput,
            this.state.passwordInput,
        );

        var persistence = this.state.stayLoggedIn ?
            // @ts-ignore
            FirebaseNamespace.auth.Auth.Persistence.LOCAL :
            // @ts-ignore
            FirebaseNamespace.auth.Auth.Persistence.SESSION;

        Firebase.auth().setPersistence(persistence);

        Firebase.auth().signInAndRetrieveDataWithCredential(cred).then((user) => {
            // this.props.actions.redirectToEndpoint('/');
            this.props.onSuccess();
        }).catch((error: any) => {
            // Handle Errors here .
            var errorCode = error.code;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('Email already associated with another account.');
                // Handle account linking here, if using.
            } else {
                this.setState({
                    error: error.message,
                    loading: false
                });
            }
        });
    }

    render() {
        return (
            <CardBox
                shadowDepth={8}
                headerText={'Einloggen'}
                padding={0}
                contentMarginTop={0}
                minHeight={300}
                height={365}
            >
                <div style={{ width: 420 }}>
                    <TextField
                        style={{ marginTop: 20 }}
                        error={this.state.error.length !== 0}
                        id="emailInput"
                        label="E-Mail"
                        tabIndex={0}
                        autoFocus
                        placeholder="name@email.com"
                        value={this.state.emailInput}
                        onChange={this.handleChange('emailInput')}
                        className={this.props.classes.textField}
                        margin="normal"
                        inputRef={(input: any) => { this.nameInput = input; }}
                    />
                    <Typography
                        className={this.props.classes.error}
                        variant="caption"
                        color="error"
                    >{this.state.error}
                    </Typography>
                    <TextField
                        error={this.state.error.length !== 0}
                        id="passwordInput"
                        label="Passwort"
                        tabIndex={1}
                        style={{ fontSize: 100 }}
                        className={this.props.classes.textField}
                        placeholder="●●●●●●●●"
                        value={this.state.passwordInput}
                        onChange={this.handleChange('passwordInput')}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                    />
                    <Typography
                        className={this.props.classes.forgotPassword}
                        variant="caption"
                        onClick={() =>
                            this.props.authFlowCallback(
                                FlowState.FORGOTPW,
                                this.state.emailInput ? this.state.emailInput : null
                            )}
                    >Passwort vergessen?
                    </Typography>
                    <Button
                        disabled={this.state.loading}
                        variant="contained"
                        color="primary"
                        size="medium"
                        tabIndex={2}
                        className={this.props.classes.LoginButton}
                        onClick={() => {
                            this.login();
                        }}
                    >Login
                    </Button>
                    <Typography
                        className={this.props.classes.signUp}
                        onClick={() => this.props.authFlowCallback(
                            FlowState.SIGNUP, this.state.emailInput ? this.state.emailInput : null
                        )}
                    >Noch kein Account? Hier Registrieren
                    </Typography>
                    <div
                        className={this.props.classes.switch}
                    >
                        <Switch
                            checked={this.state.stayLoggedIn}
                            onChange={() => this.setState({ stayLoggedIn: !this.state.stayLoggedIn })}
                            value="Auf diesem Gerät eingeloggt bleiben?"
                            color="primary"
                        />
                        <Typography
                            className={this.props.classes.switchlabel}
                            variant="caption"
                            onClick={() => this.setState({ stayLoggedIn: !this.state.stayLoggedIn })}
                        >
                            Eingeloggt bleiben?
                        </Typography>
                        {this.state.loading &&
                            <CircularProgress size={24} className={this.props.classes.buttonProgress} />}
                    </div>
                </div>
            </CardBox>
        );
    }
}

const styles: StyleRulesCallback = theme => ({
    FilterCard: {
        minHeight: 370,
        maxHeight: 370,
        overflow: 'scroll',
        paddingTop: 0
    },
    switch: {
        position: 'relative',
        display: 'inline-block',
        top: -110,
        marginBottom: -24,
        marginLeft: 22,
        width: 'auto',
        height: 50
    },
    switchlabel: {
        display: 'inline-block',
        position: 'relative',
        marginTop: 1,
        top: 1
    },
    buttonProgress: {
        color: 'gray',
        position: 'relative',
        display: 'inline-block',
        top: -36,
        marginBottom: -24,
        marginLeft: 282,
        marginRight: 'auto'
    },
    LoginButton: {
        display: 'inline-block',
        marginLeft: 250,
        marginRight: 'auto',
        marginTop: 25,
        width: 130,
        marginBottom: 30,
    },
    forgotPassword: {
        width: 'auto',
        marginLeft: 30,
        marginRight: 'auto',
        marginBottom: 10,
        color: 'gray',
        '&:hover': {
            color: 'black',
            cursor: 'pointer',
        }
    },
    error: {
        color: 'red',
        width: 'auto',
        marginLeft: 30,
        marginRight: 30,
        textAlign: 'left',
        marginTop: -4,
        marginBottom: 5,
        height: 16,
    },
    signUp: {
        width: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        marginBottom: 20,
        color: 'gray',
        '&:hover': {
            color: 'black',
            cursor: 'pointer',
        }
    },
    list: {
        padding: 0,
        height: 243,
        overflow: 'scroll',
    },
    textField: {
        marginLeft: 30,
        marginRight: theme.spacing.unit,
        width: 340,
    },

});

export default withStyles(styles)(FilterCard);