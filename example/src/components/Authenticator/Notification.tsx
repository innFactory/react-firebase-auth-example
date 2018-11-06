import { Snackbar, StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import * as React from 'react';

export namespace Notification {
    export interface Props {
        key: string;
        open: boolean;
        message: string;
        autohideDuration: number;
        origin: SnackbarOrigin;
        onExit: Function;
    }
    export interface State {
        open: boolean;
    }
}

class Notification extends React.Component<WithStyles & Notification.Props> {

    state = {
        open: false
    };

    static getDerivedStateFromProps(nextProps: Readonly<Notification.Props>, prevState: Readonly<Notification.State>) {
        // return new state
        return {
            open: nextProps.open
        };
    }

    shouldComponentUpdate(nextProps: Notification.Props, nextState: Notification.State) {
        // Only re-render when snackbar is going from closed to open
        return !this.state.open && nextState.open;
    }

    render() {
        return (
            <Snackbar
                key={this.props.key}
                anchorOrigin={this.props.origin}
                open={this.state.open}
                autoHideDuration={this.props.autohideDuration}
                message={<span id="message-id">{this.props.message}</span>}
                onExit={() => this.props.onExit(false, '')}
            />
        );
    }
}

const styles: StyleRulesCallback = theme => ({

});

export default withStyles(styles, { withTheme: true })(Notification);