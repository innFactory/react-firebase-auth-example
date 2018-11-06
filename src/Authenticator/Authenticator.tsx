import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { FlowState } from '../../model/model';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import Firebase from '../../FirebaseApp';
import Notification from './Notification';

export namespace Authenticator {
    export interface Props {
        onSuccess: Function;
        siteNoticeUrl: string;
        privacyPolicyUrl: string;
    }

    export interface State {
        open: boolean;
        message: string;
        authFlowState: string;
        email: string;
    }
}

class Authenticator extends React.Component<WithStyles & Authenticator.Props> {

    constructor(props?: (WithStyles & Authenticator.Props), context?: any) {
        super(props as any, context);
    }

    state = {
        authFlowState: 'signIn',
        email: '',
        message: '',
        open: false
    };

    authFlowStateCallback = (flowState: typeof FlowState, email?: string | null) => {
        this.setState({
            authFlowState: flowState,
        });
        if (email) {
            this.setState({ email: email });
        } else {
            this.setState({ email: '' });
        }
    }

    snackBarCallback = (open: boolean, message: string) => {
        this.setState({ open: open, message: message });
    }

    componentDidMount() {
        console.log(Firebase.auth().currentUser);
    }

    render() {
        return (
            <div style={{ width: 420 }}>
                {this.state.authFlowState === FlowState.SIGNIN &&
                    <SignIn
                        email={this.state.email ? this.state.email : null}
                        authFlowCallback={this.authFlowStateCallback}
                        snackbarFunction={this.snackBarCallback}
                        onSuccess={this.props.onSuccess}
                    />
                }
                {this.state.authFlowState === FlowState.SIGNUP &&

                    <SignUp
                        email={this.state.email ? this.state.email : null}
                        authFlowCallback={this.authFlowStateCallback}
                        snackbarFunction={this.snackBarCallback}
                        privacyPolicyUrl={this.props.privacyPolicyUrl}
                        siteNoticeUrl={this.props.siteNoticeUrl}
                    />
                }
                {this.state.authFlowState === FlowState.FORGOTPW &&
                    <ForgotPassword
                        email={this.state.email ? this.state.email : null}
                        authFlowCallback={this.authFlowStateCallback}
                        snackbarFunction={this.snackBarCallback}
                    />
                }
                <Notification
                    key={'Auth-Notification'}
                    autohideDuration={4000}
                    message={this.state.message}
                    origin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.open}
                    onExit={this.snackBarCallback}
                />
            </div>
        );
    }
}

const styles: StyleRulesCallback = theme => ({
    Authenticator: {
        minHeight: 370,
        maxHeight: 370,
        overflow: 'scroll',
        paddingTop: 0
    },
    ListDeleteButton: {
        margin: '10px'
    },
    list: {
        padding: 0,
        height: 243,
        overflow: 'scroll',
    }

});

export default withStyles(styles)<Authenticator.Props>(Authenticator);