// Authors: Shiwen(Lareina), Vrund Patel

const express = require("express");
const User = require("../models/user");
const Course = require("../models/course");
const router = express.Router();

// Lareina: PUT call to follow course
router.put("/follow", async (req, res) => {
  const body = req.body;
  const { userId, courseId } = body;

  try {
    if (!userId || !courseId) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect Request!" });
    }

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!course || !user) {
      return res
        .status(404)
        .json({ success: false, message: "User or Course not found" });
    }

    // Check if the user is already following the course
    if (user.followedCourses.includes(courseId)) {
      return res
        .status(409)
        .json({ success: false, message: "User is already following the course" });
    }

    // Update the user's followedCourses array with the course ID
    user.followedCourses.push(courseId);
    await user.save();

    res.json({ success: true, message: "Course followed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// Lareina: PUT call to unfollow course
router.put("/unfollow", async (req, res) => {
  const body = req.body;
  const { userId, courseId } = body;

  try {
    if (!userId || !courseId) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect Request!" });
    }

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!course || !user) {
      return res
        .status(404)
        .json({ success: false, message: "User or Course not found" });
    }

    // Check if the user is already following the course
    if (!user.followedCourses.includes(courseId)) {
      return res
        .status(409)
        .json({ success: false, message: "User is not following the course" });
    }

    // Remove the courseId from the user's followedCourses array 
    user.followedCourses.pull(courseId);
    await user.save();

    res.json({ success: true, message: "Course unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// Khaled: add saved post
router.post('/savePost', async (req, res) =>{
  const body = req.body;
  const { postId } = req.body;
  const userId = body;

  try {
    if (!userId) {
      return res.status(404).json({ success: false, data: "Incorrect Request!" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Add postID to the savedPosts array
    User.savedPosts.push(postId);
    User.save()
    .then(() =>{
      return res.status(200).json({ message: 'Post saved successfully' });
    })
    .catch((err) =>{
      return res.status(400).json({ message: 'Failed to save post' + err });
    })
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" } + error);
  }

    
})

// Khaled: Get saved posts
router.get('/savedPosts', async (req, res) =>{
  const body = req.body;

  const userId = body;

  try {
    if (!userId) {
      return res.status(404).json({ success: false, data: "Incorrect Request!" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Display saved posts
    return res.status(200).json(user.savedPosts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" + error});
  }

})
//Author: Vrund Patel
//adding user's details to the database (user's registration)
router.post('/x', async(req, res) => {

    const {firstName, lastName, type, email, password} = req.body

    if( !firstName || !lastName || !type || !email || !password ){
        return res.status(422).json({ error: "At least one of field is missing" });
    }

    try {
        
        const exist = await User.findOne({ email: email });

        if(exist){
            return res.status(422).json({ error: "Email already exist" })
        }

        const user = new User({firstName, lastName, type, email, password});
        const userRegister = await user.save()

        if(userRegister){
            res.status(201).json({ message: "User registerd successfully :)"})
        }
        else{
            res.status(500).json({ error: "Registration Failed :(" })
        }
    } catch (error) {
        console.log(` error ${error}`)
    }
});

//Author: Vrund Patel
//Authenticates the user crendentials
router.post('/signin', async(req, res) => {
    
    try {
        
        const {email, password} = req.body

        if( !email || !password){
            return res.status(400).json({error: "Atleast one of the field is empty from backend"})
        }

        const userLogin = await User.findOne( {email: email} )
        if(userLogin){

            if(password === userLogin.password){
                res.status(200).json({message: "Signin Successful :)", data: userLogin})
            }
            else{
                res.status(400).json({error: "Invalid Credentails :( "})
            }
        }
        else{
            res.status(400).json({error: "Invalid Credentials :( "})
        }
        
    } catch (error) {
        console.log(error)
    }
})

//Lareina: Get user detail by id
router.get('/:id', async(req, res) => {
  const userId = req.params.id;
    try {
        if(!userId) {
            return res.status(404).json({success: false, data: "Incorrect Request!"});
        }
    } catch(err) {
        return res.status(500).json({message: "Internal server error!"});
    }

    try {
      User.findById(userId)
        .then((user) => res.status(200).json({ success: true, data: user}))
        .catch((err) => res.status(500).json({ success: false, error: 'Error fetching user by Id' }));
    } catch (error) {
      return res.status(500).json({ success: false, message: "Failed to user by Id" });
    }
})

module.exports = router;
