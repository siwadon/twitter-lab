import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import yellow from '@material-ui/core/colors/yellow';

import SearchBar from '../SearchBar';
import Twitter from '../../lib/Twitter';
import TweetList from '../TweetList/TweetList';

/**
 * Main component for our
 */
class App extends Component {
  constructor() {
    super();

    this.state = {
      count: 20,
      query: '',
      result: {},
      sort: 'Retweet',
    };

    this.handleCountChange = this.handleCountChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleCountChange(event) {
    const count = parseInt(event.target.value, 10);
    this.setState({ count }, this.handleSearchClick);
  }

  handleQueryChange(event) {
    const query = event.target.value;
    this.setState({ query });
  }

  async handleSearchClick() {
    const response = await Twitter.search(this.state.query, this.state.count);
    this.setState({ result: response });
  }

  handleSortChange(event) {
    const sort = event.target.value;
    console.log(sort);
    this.setState({ sort });
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Grid item>
              <Typography variant="title" color="inherit">
                Twitter Content Lab
              </Typography>
            </Grid>
            <Grid item>
              <SearchBar
                count={this.state.count}
                handleCountChange={this.handleCountChange}
                handleQueryChange={this.handleQueryChange}
                handleSearchClick={this.handleSearchClick}
                handleSortChange={this.handleSortChange}
                query={this.state.query}
                sort={this.state.sort}
              />
            </Grid>
          </Toolbar>
        </AppBar>
        <TweetList tweets={this.state.result.statuses} sort={this.state.sort} />
      </Fragment>
    );
  }
}

App.propTypes = {
  /**
   * Class names object to override or extend style
   */
  classes: PropTypes.object.isRequired,
};

const styles = {
  appBar: {
    background: yellow[500],
  },
  toolbar: {
    justifyContent: 'space-between',
  },
};

export default withStyles(styles)(App);
