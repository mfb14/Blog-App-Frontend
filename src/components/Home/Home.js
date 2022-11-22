import {makeStyles} from '@material-ui/core/styles'
import React,{useEffect,useState} from "react";
import Post from "../Post/Post";
import "./Home.scss"
import PostForm from '../Post/PostForm';

const useStyles = makeStyles(theme => ({
    container : {
        display:"flex",
        flexwrap :"wrap",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",    
        backgroundColor: '#f0f5ff',
    },
}));

function Home (){

     /*
    **React de her bir objenin bir state i olur
    **Post Component ımızın PostListesi olacak
    **Loaded(Data geldi mi gelmedi mi diye)kontrol edeceğimiz state
    */ 

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const classes = useStyles();
    
     /*
    **fetch-> API yazmak için kullanırız
    **Önce url den data yı fetch ederiz
    **Daha sonra gelen response u parse ederiz
    **Pars ettikten sonra ya bize bir resuşt gelebilr ya da hata oluşmuş olabilir
    */
    const refreshPosts = () => {
        fetch("/posts")
        .then(res => res.json())
        .then(
            //Result geldiğinde gelen datayı bizim postListe e aktarmamız lazım
            (result) => { 
                setIsLoaded(true);
                setPostList(result);
            },
            (error)=>{
                
                setIsLoaded(true);
                setError(error);
            }
        )
    }
   
    useEffect(() => {
      refreshPosts();
    },[postList])
    if (error){
        return <div>Error!!</div>;
    }else if(!isLoaded){
        return <div>Loading</div>;
    }else {
        return(
            
            <div className={classes.container}>
            <PostForm userId = {1} userName = {"dfsf"} refreshPosts = {refreshPosts}/>
            {postList.map(post => (
            <Post /*postId = {post.postId}*/ userId = {post.userId} userName = {post.userName} title = {post.title} text = {post.text} ></Post>
            ))}
           </div>
        );
    }
 
}
export default Home;