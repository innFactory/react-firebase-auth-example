import { Button, createStyles, Grid, Theme, Typography, WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions/todo';
import TodoTable from '../components';
import TodoDialog from '../components/TodoDialog';
import { Todo } from '../model/model';
import { RootState } from '../reducers/index';
import { isSmartphone } from '../responsive';

export namespace TodoPage {
  export interface Props extends RouteComponentProps<void>, WithStyles<typeof styles>, WithWidth {
    todoList: Todo[];
    actions: typeof TodoActions;
    isLogin: boolean;
  }

  export interface State {
    open: boolean;
  }
}

class TodoPage extends React.Component<TodoPage.Props, TodoPage.State> {
  state = {
    open: false,
  };

  static getDerivedStateFromProps(nextProps: Readonly<TodoPage.Props>, prevState: Readonly<TodoPage.State>) {

    if (!nextProps.isLogin) {
      nextProps.history.push('/');
    }

    // return new state
    return prevState;
  }

  render() {
    const { classes, actions, todoList, width } = this.props;

    return (
      <Grid
        container
        className={isSmartphone(width) ? classes.mobileRoot : classes.root}
        alignItems={'flex-start'}
        justify={'flex-start'}
      >
        <TodoDialog
          actions={actions}
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        />
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Todo List
        </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.button} variant="contained" color="secondary" onClick={this.handleAddTodo}>
            Add Todo
        </Button>
        </Grid>
        <Grid item xs={12}>
          <TodoTable todoList={todoList} actions={actions} />
        </Grid>
      </Grid>
    );
  }

  handleAddTodo = () => this.setState({ open: true });

}

const styles = (theme: Theme) => createStyles({
  root: {
    padding: theme.spacing.unit * 10,
  },

  mobileRoot: {
    paddingTop: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },

  button: {
    marginBottom: 15,
  },
});

function mapStateToProps(state: RootState) {
  return {
    todoList: state.todoList,
    isLogin: state.isLogin
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(TodoActions as any, dispatch)
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withWidth()(TodoPage)));
