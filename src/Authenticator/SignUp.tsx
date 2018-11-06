import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import CardBox from './CardBox';
import { Button, Typography, TextField, CircularProgress, Checkbox } from '../../../node_modules/material-ui';
import Firebase from '../../FirebaseApp';
import { FlowState } from '../../model/model';

export namespace FilterCard {
    export interface Props {
        authFlowCallback: Function;
        email: string | null;
        snackbarFunction: Function;
        siteNoticeUrl: string;
        privacyPolicyUrl: string;
    }

    export interface State {
    }
}

class FilterCard extends React.Component<WithStyles & FilterCard.Props> {

    constructor(props?: (WithStyles & FilterCard.Props), context?: any) {
        super(props as any, context);
    }

    state = {
        passwordInput: '',
        emailInput: '',
        error: '',
        loading: false,
        termsAccepted: false,
    };

    componentDidMount() {
        if (this.props.email && !this.state.emailInput) {
            this.setState({ emailInput: this.props.email });
        }
    }

    handleChange = (name: any) => (event: any) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return (
            <CardBox
                shadowDepth={8}
                headerText={'Registrieren'}
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
                        placeholder="name@email.com"
                        value={this.state.emailInput}
                        onChange={this.handleChange('emailInput')}
                        className={this.props.classes.textField}
                        margin="normal"
                    />
                    <Typography
                        className={this.props.classes.error}
                        variant="caption"
                        color="error"
                    >{this.state.error}
                    </Typography>
                    <TextField
                        style={{ marginBottom: 34 }}
                        error={this.state.error.length !== 0}
                        id="passwordInput"
                        label="Passwort"
                        className={this.props.classes.textField}
                        value={this.state.passwordInput}
                        onChange={this.handleChange('passwordInput')}
                        type="password"
                        placeholder="●●●●●●●●"
                        autoComplete="current-password"
                        margin="normal"
                    />
                    <Button
                        disabled={this.state.loading}
                        variant="raised"
                        color="primary"
                        size="medium"
                        className={this.props.classes.LoginButton}
                        onClick={() => {
                            if (!this.state.termsAccepted) {
                                this.setState({
                                    error: 'Nutzungs und Datenschutzbestimmungen müsssen aktzeptiert werden'
                                });
                            } else {
                                this.setState({ loading: true });
                                Firebase.auth().createUserWithEmailAndPassword(
                                    this.state.emailInput, this.state.passwordInput
                                ).then((user: any) => {
                                    console.log(user);

                                }).catch((error: any) => {
                                    // Handle Errors here.
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

                        }}
                    >Registrieren
                    </Button>
                    {this.state.loading && <CircularProgress size={24} className={this.props.classes.buttonProgress} />}
                    <Typography
                        className={this.props.classes.signIn}
                        onClick={() => this.props.authFlowCallback(
                            FlowState.SIGNIN, this.state.emailInput ? this.state.emailInput : null
                        )}
                    >Zurück zum Login
                    </Typography>
                    <div
                        className={this.props.classes.check}
                    >
                        <Checkbox
                            className={this.props.classes.checkbox}
                            checked={this.state.termsAccepted}
                            onChange={() => this.setState({ termsAccepted: !this.state.termsAccepted })}
                            value="Auf diesem Gerät eingeloggt bleiben?"
                            color="primary"
                        />
                        <Typography
                            className={this.props.classes.checklabel}
                            variant="caption"
                        >
                            Ich habe die
                            <span
                                className={this.props.classes.termslink}
                                onClick={() => window.open(this.props.siteNoticeUrl, '_blank')}
                            >
                                {' Nutzungs- '}
                            </span>
                            und
                            <span
                                className={this.props.classes.termslink}
                                onClick={() => window.open(this.props.privacyPolicyUrl, '_blank')}
                            >
                                {' Datenschutzbestimmungen '}
                            </span>
                            gelesen und aktzeptiere diese
                        </Typography>
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
    termslink: {
        color: theme.palette.primary.main,
        cursor: 'pointer',
        '&:hover': {
            color: 'darkblue'
        },
        '&:click': {
            color: 'gray',
        }
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
    signIn: {
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
    check: {
        position: 'relative',
        display: 'inline-block',
        top: -110,
        marginBottom: -24,
        marginLeft: 23,
        width: 'auto',
        height: 50
    },
    checklabel: {
        display: 'inline-block',
        position: 'relative',
        marginTop: 0,
        top: 1,
        width: 160
    },
    checkbox: {
        position: 'relative',
        top: -15
    }

});

export default withStyles(styles)<FilterCard.Props>(FilterCard);