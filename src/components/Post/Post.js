import React, {useState,useRef,useEffect} from "react";
import "./Post.scss"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import {Link} from "react-router-dom"
import { Container } from "@mui/material";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    textAlign : "left",
    margin : 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  },
  link: {
      textDecoration : "none",
      boxShadow : "none",
      color : "white"
  }
}));


  
//Props = Parent ve child componentlar arasında iletilen data.

//İlk olarak bize gelen propsları alırız
//Post component'ının amacı post bilgilerini tutmak bu yüzden data yı çekme işini home da yaptık
function Post(props){
   
    const {postId,userId,userName,title,text} = props;
    /*const classes = styled();*/
    const [expanded,setExpanded] = useState(false);
    const classes = useStyles();
    const [liked,setLiked] = useState(false);
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [commentList,setCommentList] = useState([]);
    const isInitialMount = useRef(true);//ilk kez mi load ediliyo tutmak için
   
    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments(); 
        console.log({commentList})
      };

    const handleLike = () =>{
       setLiked(!liked);
    }

    const refreshComments = () => {
      fetch("/comments?postId"+postId)
      .then(res => res.json())
      .then(
          
          (result) => { 
              setIsLoaded(true);
              setCommentList(result);
          },
          (error)=>{
              
              setIsLoaded(true);
              setError(error);
          }
      )
  }
  useEffect(() => {
    if(isInitialMount.current)
      isInitialMount.current=false;
    else
      refreshComments();
  },[commentList])

    var date = new Date();
    let datenow = date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear(); 
    return (
        
        <div>
        <Card sx={{ width: 1000 }}>
      <CardHeader
       
        avatar={
          <Link className={classes.link} to={{pathname : '/users/' + userId}} >  
          <Avatar aria-label="recipe" className={classes.avatar}>
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          </Link>
        }
        
        
        title={title}
        subheader={datenow}
      />
    
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton  onClick={handleLike}
                    aria-label="add to favorites">
          
          <FavoriteIcon style={liked?{color : "red"}:null}/>
        </IconButton> 
        <IconButton
           className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
          })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
                    >
            <CommentIcon />
        </IconButton>
        
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed className={classes.container}>
            {error? "error" :
            isLoaded? commentList.map(comment => (
            <Comment userId = {1} userNAme={"USER"} text={comment.text}></Comment>
          )):"Loading"}
          <CommentForm userId = {1} userNAme={"USER"} postId={postId}></CommentForm>
        </Container>
      </Collapse>
    </Card>
        </div>
    );
}
export default Post;