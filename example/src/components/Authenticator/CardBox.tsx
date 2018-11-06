import { Grid, LinearProgress, ListSubheader, StyleRulesCallback, WithStyles, withStyles, WithTheme } from '@material-ui/core';
import * as React from 'react';

export namespace CardBox {
    export interface Props extends WithStyles<typeof styles>, WithTheme {
        hidden?: boolean;
        shadowDepth: number;
        headerText?: string;
        padding: number;
        minHeight?: number;
        maxHeight?: number;
        height?: number;
        contentMarginTop?: number;
        loading?: boolean;
        headerRedirect?: string;
    }
}

class CardBox extends React.Component<WithStyles & CardBox.Props> {

    /**
     * @returns header for cardbox if props.headerText is set
     */
    renderHeader() {

        if (this.props.headerText) {
            let marginBottom = this.props.contentMarginTop !== undefined ? this.props.contentMarginTop : 8;
            var cursorStyle: any = { marginBottom: marginBottom };
            if (this.props.headerRedirect) {
                cursorStyle = {
                    marginBottom: marginBottom, cursor: 'pointer'
                };
            }
            var styleName = this.props.headerRedirect ?
                this.props.classes.hoverStyle :
                this.props.classes.ListSubheader;

            if (this.props.headerRedirect) {
                return (
                    <ListSubheader
                        className={styleName}
                        component="div"
                        style={cursorStyle}
                    >
                        {this.props.headerText}
                    </ListSubheader >
                );
            } else {
                return (
                    <ListSubheader
                        className={styleName}
                        component="div"
                        style={cursorStyle}
                    >
                        {this.props.headerText}
                    </ListSubheader >
                );
            }
        }
        return;
    }

    render() {
        let shadowStyle = {};
        if (this.props.theme !== undefined) {
            shadowStyle = {
                minHeight: this.props.minHeight + 'px',
                maxHeight: this.props.maxHeight + 'px',
                height: this.props.height + 'px',
                boxShadow: this.props.theme.shadows[this.props.shadowDepth],
            };
        }

        if (!this.props.hidden) {
            return (
                <Grid
                    xs
                    item
                    className={this.props.classes.contentPaper}
                    style={shadowStyle}
                >
                    {this.renderHeader()}
                    {this.props.loading &&
                        <LinearProgress color="primary" variant="query" className={this.props.classes.query} />
                    }
                    <div className={this.props.classes.content} style={{ padding: this.props.padding }}>
                        {this.props.children}
                    </div>
                </Grid>
            );
        }
        return null;
    }
}

const styles: StyleRulesCallback = theme => ({
    contentPaper: {
        width: 2000,
        padding: '0px !important',
        backgroundColor: 'white',
        borderRadius: 2,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        marginBottom: 26,
    },
    ListSubheader: {
        paddingTop: 0,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.dark,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2
    },
    query: {
        marginTop: '-10px'
    },
    hoverStyle: {
        paddingTop: 0,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.dark,
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: 'pointer'
        }
    }

});

export default withStyles(styles, { withTheme: true })(CardBox);