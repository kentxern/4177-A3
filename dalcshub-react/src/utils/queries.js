
// Lareina: The Request to update the Follow status
export const handleFollowOrUnfollowQuery = async (userId, courseId, isFollowQuery, userDetailRefresh) => {
    try {
      const url = isFollowQuery ? "/api/user/follow" : "/api/user/unfollow";
      const response = await fetch (url , {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "userId": userId, "courseId": courseId })
      });
      if (response.status === 200) {
        userDetailRefresh(userId);
      } 
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
}