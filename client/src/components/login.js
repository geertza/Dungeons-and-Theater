import React, {useState} from 'react';
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
// import Container from '@material-ui/core/Container';
// import Message from '../components/Message';
import AuthService from '../authorize/AuthService';
import Paper from '@material-ui/core/Paper';

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


const Login = props=>{
      const useStyles = makeStyles((theme) => ({
      root: {
        height: '100vh',
      },
      // image: {
      //   backgroundImage: 'url()',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundColor:
      //     theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      // },
      paper: {
        margin: theme.spacing(8, 4),
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
          const classes = useStyles();
        

        const [player,setPlayer] = useState({username: "", password : ""});
        const [message,setMessage] = useState(null);
        const quickuser = {username: "andy", password : "pass"}
        const username = {player}.username
        let room = 'lobby'
        const onChange = e =>{
          setPlayer({...player,[e.target.name] : e.target.value});
        }
        
        const onSubmitform = e =>{
          e.preventDefault();
          AuthService.login(quickuser).then(data=>{
            
            console.log('login = ',data)  
            const { isAuthenticated} = data;  
            if(isAuthenticated){
              
              // socket.emit('join', { username, room }, (error) => {
              //   if(error) {
              //     alert(error);
              //   }
              // })   
              
              props.history.push('/chat');
          }
          else{
             setMessage(message);
            }
          });
        }
      
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
             
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={onSubmitform}>
              <TextField
               onChange={onChange} 
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="email"
               label="Character Name"
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
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
export default Login;