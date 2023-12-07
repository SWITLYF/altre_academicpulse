// FollowButton.js
import React, { useState, useEffect } from 'react';
import { getUserProfile, incrementFollowersCount } from './appwriteService';

const FollowButton = () => {
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setFollowersCount(userProfile.followersCount || 0);
      } catch (error) {
        console.error('Error fetching user profile', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleFollowClick = async () => {
    try {
      await incrementFollowersCount();
      setFollowersCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Error incrementing followers count', error);
    }
  };

  return (
    <div>
      <p>Followers: {followersCount}</p>
      <button onClick={handleFollowClick}>Follow</button>
    </div>
  );
};

export default FollowButton;
