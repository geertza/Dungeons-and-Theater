import React, {useState,useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Message from '../components/Message';
import AuthService from '../authorize/AuthService';
//redux
import { connect } from 'react-redux';
import {SetUser} from "../utility/store";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const Login = props=>{
  const [user,setUser] = useState({user: "", password : ""});
  const [message,setMessage] = useState(null);
  
 
  const onChange = e =>{
    setUser({...user,[e.target.name] : e.target.value});
}
  const onSubmit = e =>{
      e.preventDefault();
      AuthService.login(user).then(data=>{
          const { isAuthenticated,username,message} = data;
          if(isAuthenticated){
            console.log("authentictated")
              // authContext.setUser(username);
              // authContext.setIsAuthenticated(isAuthenticated);
              props.history.push('/lobby');
          }
          else{
              setMessage(message);}
      });
  }
  const classes = useStyles();
  console.log(props.state)
  return (
    <Container component="main" maxWidth="xs">
      <button onClick={()=>props.SetUser("123")}>buutoon hherere</button>
      <div>{props.user}</div>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit = {onSubmit}>
          <TextField
            onChange={onChange} 
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="UserName:"
            name="username"
            autoComplete="email"
            autoFocus
          />
          <TextField
           onChange={onChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        {message ? <Message message={message}/> : null}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
const mapStateToProps = (state,ownprops ) => {
  console.log('maps',state)
  return {
    ...ownprops,
    user : state.user
  }
}

const mapDispatchToProps = { SetUser }
export default connect(mapStateToProps,mapDispatchToProps)(Login);