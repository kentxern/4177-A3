//Author: Shiwen(Lareina) Yang & Khaled Al-Mahbashi
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Tabs, Tab, Typography, Box, Grid } from "@mui/material";
import { Page, Post, PageTitle, CourseCard, CircularProgress } from "../components";
import { useUser } from '../providers';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ pt: 3, pb: "10px" }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export const MainFeed = () => {
  const { user: currentUser } = useUser();
  const { _id: userId, followedCourses: followedCoursesIds } = currentUser;

  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [followedCourses, setFollowedCourses] = useState([]);

  const fetchFollowedCourses = async (followedCoursesIds) => {
    try {
      const response = await fetch("/api/course/get_by_ids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseIds: followedCoursesIds }),
      });
      if (response.status === 200) {
        const result = await response.json();
        setFollowedCourses(result.data);
      } else {
        console.error("Failed to fetch courses");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFollowedCourses(followedCoursesIds);
  }, [followedCoursesIds]);

  // Khaled: fetching saved posts by Id, lines (58-98 and some lines in return)
  
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    // Call the backend API to retrieve the saved post IDs
    fetchSavedPosts().then((savedPostIds) => {
      setSavedPosts(savedPostIds);
    });
  }, []);

  // Function to fetch the saved post IDs from the User API
  const fetchSavedPosts = async () => {
    try {
      const response = await fetch(`/api/user/savedPosts`);

      if (response.ok) {
        const data = await response.json();
        return data; // Return the array of saved post IDs
      } else {
        console.error('Failed to fetch saved posts:', response.status);
        return []; // Return empty array 
      }
    } catch (err) {
      console.error('Error fetching saved posts:', err);
      return []; // Return empty array 
    }
  };

  // Fetch the post information using the post ID from the Post API
  const getPostById = async (postId) => {
    try {
      // Call the backend API to get the post by ID
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error fetching post:', err);
      return null;
    }
  };
  return (
    <Page>
      <PageTitle title={"Main Feed"} link={"/"} />

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabIndex}
            onChange={(_, newIndex) => setTabIndex(newIndex)}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="My Courses" />
            <Tab label="Saved Posts" />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          {loading && <CircularProgress fullScreen />}
          {!loading && followedCourses.length > 0 && (
            <Grid container direction="row" justifyContent="flex-start" spacing={2}>
              {followedCourses.map((course) => (
                <Grid item key={course._id} xs={12} sm={6} md={4} lg={3}>
                  <CourseCard
                    userId={userId}
                    courseId={course._id}
                    courseNumber={course.number}
                    title={course.subject + " " + course.number + " " + course.title}
                    creditHours={course.credit_hours}
                    flags={course.flags}
                    followed={true}
                    bgImage={null}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          {!loading && followedCourses.length === 0 && (
            <Typography>
              No course has been followed yet ! Go to{" "}
              <Link to={"/browse-courses"}>Browse Courses Page</Link> !
            </Typography>
          )}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {/* <Typography>No post has been saved yet !</Typography> */}
          <Typography>Saved Posts</Typography>
          {savedPosts.map((postId) => (
            <div key={postId}>
              <Post post={getPostById(postId)} />
            </div>
          ))}          
        </TabPanel>
      </Box>
    </Page>
  );
};
