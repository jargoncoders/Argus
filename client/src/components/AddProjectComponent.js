import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'software',
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };


  render() {
    const {classes} = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Project
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="title">Project Title</InputLabel>
              <Input id="title" name="title" autoComplete="title" autoFocus />
            </FormControl>
            <FormControl component="fieldset" className={classes.formControl} fullWidth>
              <FormLabel component="legend" fullWidth>Project Type</FormLabel>
              <RadioGroup
                aria-label="Type"
                name="type"
                className={classes.group}
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel value="software" control={<Radio />} label="Software" />
                <FormControlLabel value="hardware" control={<Radio />} label="Hardware" />
              </RadioGroup>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="github">Project Github Link</InputLabel>
              <Input id="github" name="github" autoComplete="github"/>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="github">Project Presentation Link</InputLabel>
              <Input id="github" name="github" autoComplete="github"/>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="github">Project Video Link</InputLabel>
              <Input id="github" name="github" autoComplete="github"/>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add Project
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

AddProject.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddProject);
