//Author: Kent Chew
import { Grid, Divider, IconButton, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useUser } from '../providers';
import { useState, useEffect } from "react";

export const Post = (props) => {
  const { postTitle, postAuthor, postDate, postDescription, postRating, children } = props;

  const [posts, setPosts] = useState([]);

  // convert postDate to just show YYYY-MM-DD as string
  const formattedDate = new Date(postDate).toISOString().slice(0, 10);

  const { user: currentUser } = useUser();

  const checkIsLiked = (likedByArray) => {
    return likedByArray.includes(currentUser._id);
  };

  // Author : Meet Kumar Patel
  const handleLike = async (title) => {
    await getLatest();
    let requiredPost = posts.filter((post) => post.postTitle === title);
    let isLiked = false;

    if (requiredPost.length > 0) {
      const updatedLikedBy = [...requiredPost[0].likedBy];
      isLiked = checkIsLiked(updatedLikedBy);

      if (!isLiked) {
        updatedLikedBy.push(currentUser._id);
        requiredPost.likedBy = updatedLikedBy;
      }

      console.log(currentUser._id)
      console.log(requiredPost[0]._id)
      try {
        const res = await fetch('/api/post/updateLikedBy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: currentUser._id,
            postId: requiredPost[0]._id,
          }),
        });

        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }


      try {
        const res = await fetch('/api/post/updatePostRating', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rating: parseInt(postRating, 10) + 1,
            postId: requiredPost[0]._id,
          }),
        });

        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }

    }
    

  };

  // Author : Meet Kumar Patel
  const handleDisLike = async (title) => {

    await getLatest();

    let requiredPost = posts.filter((post) => post.postTitle === title);

    if (requiredPost.length > 0) {
      const updatedLikedBy = [...requiredPost[0].likedBy];
      const isLiked = checkIsLiked(updatedLikedBy);

      if (isLiked) {
        try {
          const res = await fetch('/api/post/removeLikedBy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: currentUser._id,
              postId: requiredPost[0]._id,
            }),
          });

          const data = await res.json();
          console.log(data);
        } catch (error) {
          console.error('Error:', error);
        }

        try {
          const res = await fetch('/api/post/updatePostRating', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              rating: parseInt(postRating, 10) - 1,
              postId: requiredPost[0]._id,
            }),
          });

          const data = await res.json();
          console.log(data);
        } catch (error) {
          console.error('Error:', error);
        }

      }
    };
  }


  //Khaled: Handle save button click
  const handleSaveClick = async (postId) => {
    try {
      // Call the backend API to save the post
      const response = await fetch(`/api/user/savePost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }), // Send the post ID in the request body
      });

      if (response.ok) {
        console.log('Post saved!');
        // update UI here to indicate that saved
      } else {
        console.error('Failed to save post:', response.status);
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };


  const getLatest = async () => {
    try {
      const response = await fetch("/api/post");
      if (response.status === 200) {
        const result = await response.json();
        setPosts(result.data);
      } else {
        console.error("Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLatest();
  }, []);

  return (
    <Grid container spacing={2} style={{ padding: "1em", marginTop: "15px" }}>
      <Grid item sm={12} style={{ backgroundColor: "#F9F9F9", padding: "3em" }}>
        <Grid container spacing={2}>
          <Grid item sm={11} xs={11}>
            <Typography variant="h4" gutterBottom>
              {postTitle}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              posted {formattedDate} by {postAuthor}
            </Typography>
            <Divider />
            <Typography variant="body1" gutterBottom style={{ margin: "1vh 0 1vh 0" }}>
              {postDescription}
            </Typography>
          </Grid>
          <Grid item sm={1} xs={1} style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
              }}
            >
              <IconButton onClick={handleSaveClick} size="large" color="secondary" href="">
                <BookmarkBorderIcon />
              </IconButton>
              <IconButton
                size="large"
                color="secondary"
                href=""
                onClick={() => handleLike(postTitle)}
              >
                <ArrowUpwardIcon />
              </IconButton >
              <Typography variant="h6" gutterBottom>
                {postRating}
              </Typography>
              <IconButton
                size="large"
                color="secondary"
                href=""
                onClick={() => handleDisLike(postTitle)}
              >
                <ArrowDownwardIcon />
              </IconButton>
              {children}
            </div >

          </Grid>
        </Grid >
      </Grid >
    </Grid >
  );
};
