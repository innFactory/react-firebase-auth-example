import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Authenticator from '../components/Authenticator/Authenticator';
import { RootState } from '../reducers';

export namespace LoginPage {
  export interface Props extends RouteComponentProps<void>, WithStyles<typeof styles> {
    isLogin: boolean;
  }
}

class LoginPage extends React.Component<LoginPage.Props> {

  static getDerivedStateFromProps(nextProps: Readonly<LoginPage.Props>) {

    if (nextProps.isLogin) {
      nextProps.history.push('/home');
    }

    // return new state
    return {};
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Authenticator
          onSuccess={() => this.props.history.push('/home')}
          privacyPolicyUrl={'asdf'}
          siteNoticeUrl={'asdf'}
        />
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flex: 1,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

function mapStateToProps(state: RootState) {
  return {
    isLogin: state.isLogin
  };
}

export default withStyles(styles)(connect(mapStateToProps)(LoginPage));
