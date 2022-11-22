import React, {useState} from "react";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, InputAdornment, OutlinedInput, Avatar, Button} from "@material-ui/core";


const useStyles = makeStyles((theme)=>({

    comment:{
        display : "flex",
        flexWrap: "wrap",
        justifyContent:"flex-start",
        alignItems :"center",
    },
    small:{
        width:theme.spacing(4),
        height:theme.spacing(4),
    },
    link:{
        textDecoration:"none",
        boxShadow:"none",
        color:"white"

    }
}));

function CommentForm(props){
    const {postId,userId,userName}=props;
    const classes = useStyles();
    const [text,setText]= useState("");
    
    const saveComments = () => {
        fetch("/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: postId, 
            userId : userId,
            text : text,
          }),
        })
          .then((res) => res.json())
          .catch((err) => console.log(err))
    }
    const handleSubmit = () => {
        saveComments();
    }

    return(

        <CardContent className={classes.comment}>
        <OutlinedInput 
        id="outlined-adornment-amount"
        multiline
        inputProps = {{maxLength : 25}}
        fullWidth
        //value = {text}
        startAdornment = {
            <InputAdornment position = "start">
                <Link  className={classes.link} to={{pathname : '/users/' + userId}}>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {userName.charAt(0).toUpperCase()}
                    </Avatar>
                </Link>
            </InputAdornment>
        }

        endAdornment={
            <InputAdornment position = "end">
               <Button
                        variant = "contained"
                        style = {{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color: 'white'}}
                        onClick = {handleSubmit}
                        >Comment</Button>
            </InputAdornment>
        }
        value={text}
        ></OutlinedInput>
        </CardContent>
    )
}

export default CommentForm;