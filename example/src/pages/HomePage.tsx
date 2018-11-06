import { createStyles, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Todo } from '../model/model';
import { RootState } from '../reducers';

export namespace HomePage {
  export interface Props extends RouteComponentProps<void>, WithStyles<typeof styles> {
    todoList: Todo[];
    isLogin: boolean;
  }
}

class HomePage extends React.Component<HomePage.Props> {

  static getDerivedStateFromProps(nextProps: Readonly<HomePage.Props>) {

    console.log(nextProps.isLogin);
    if (!nextProps.isLogin) {
      nextProps.history.push('/');
    }

    // return new state
    return {};
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Typography variant="h4" gutterBottom>
          You have {this.props.todoList.length} TODOs in your list!
        </Typography>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

function mapStateToProps(state: RootState) {
  return {
    todoList: state.todoList,
    isLogin: state.isLogin
  };
}

export default withStyles(styles)(connect(mapStateToProps)(HomePage));
