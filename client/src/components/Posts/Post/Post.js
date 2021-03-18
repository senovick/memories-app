import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Menu, MenuItem } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleMoreClick = (e) => {
      setAnchorEl(e.currentTarget);
    };

    const handleClose = (e) => {
      if(e.currentTarget.textContent != "")       
        setCurrentId(post._id);      
      setAnchorEl(null);
    };
  
    return (
      <div>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.creator}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="small" onClick={handleMoreClick}><MoreHorizIcon fontSize="default" title="More" /></Button>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount > 0 ? post.likeCount : ''} </Button>
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
        </CardActions>
      </Card>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
      </Menu>
    </div>
    );
  };
export default Post;