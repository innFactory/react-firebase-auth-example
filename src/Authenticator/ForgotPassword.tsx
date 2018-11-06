import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import CardBox from './CardBox';
import { Button, TextField, Typography, CircularProgress } from '../../../node_modules/material-ui';
import { FlowState } from '../../model/model';
import Firebase from '../../FirebaseApp';

export namespace FilterCard {
    export interface Props {
        authFlowCallback: Function;
        email: string | null;
        snackbarFunction: Function;
    }

    export interface State {
    }
}

class FilterCard extends React.Component<WithStyles & FilterCard.Props> {

    constructor(props?: (WithStyles & FilterCard.Props), context?: any) {
        super(props as any, context);
    }

    state = {
        emailInput: '',
        error: '',
        loading: false,
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
                headerText={'Passwort vergessen'}
                padding={0}
                contentMarginTop={0}
                minHeight={250}
                height={260}
            >
            <div style={{ width: 400 }}>
                <TextField
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
                >
                    {this.state.error}
                </Typography>
                <Button
                    variant="raised"
                    color="primary"
                    size="medium"
                    disabled={this.state.loading}
                    className={this.props.classes.LoginButton}
                    onClick={() => {
                        this.setState({loading: true});
                        Firebase.auth().sendPasswordResetEmail(
                            this.state.emailInput)
                            .then(() => {
                                this.props.snackbarFunction(
                                    true,
                                    'Email zum Zurücksetzten des Passworts an ' + this.state.emailInput + ' gesendet'
                                );
                                this.setState({loading: false});
                                this.props.authFlowCallback(
                                    FlowState.SIGNIN, this.state.emailInput ? this.state.emailInput : null
                                );
                            })
                            .catch((error: any) => {
                                this.setState({ 
                                    error: error.message,
                                    loading: false
                                 });
                            });
                    }}
                >Passwort zurücksetzten
                 
                </Button>
                {this.state.loading && <CircularProgress size={24} className={this.props.classes.buttonProgress} />}
                <Typography
                    className={this.props.classes.signUp}
                    onClick={() => this.props.authFlowCallback(
                        FlowState.SIGNIN, this.state.emailInput ? this.state.emailInput : null
                    )}
                >Zurück zum Login
                </Typography>
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
    buttonProgress: {
        color: 'gray',
        position: 'relative',
        display: 'block',
        top: -48,
        marginBottom: -24,
        marginLeft: 'auto',
        marginRight: 'auto'
      },
    LoginButton: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        marginBottom: 20,
        width: 280,
    },
    error: {
        color: 'red',
        width: 'auto',
        marginLeft: 30,
        marginRight: 30,
        textAlign: 'left',
        marginTop: -4,
        marginBottom: 15,
        height: 16,
    },
    forgotPassword: {
        width: 'auto',
        marginLeft: 30,
        marginRight: 'auto',
        color: 'gray',
        '&:hover': {
            color: 'black',
            cursor: 'pointer',
        }
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
        marginTop: 25,
        marginLeft: 30,
        marginRight: theme.spacing.unit,
        width: 330,
    },

});

export default withStyles(styles)<FilterCard.Props>(FilterCard);