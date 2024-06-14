import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

function Profile() {
  
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const [reposData, setReposData] = useState([]);
  
  const token = process.env.REACT_APP_GITHUB_TOKEN; 
  const userEndpoint = `https://api.github.com/users/${username}`;
  const reposEndpoint = `https://api.github.com/users/${username}/repos`;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch User Information
        const userResponse = await axios.get(userEndpoint, options);
        setUserData(userResponse.data);

        // Fetch User Repositories
        const reposResponse = await axios.get(reposEndpoint, options);
        const sortedRepos = reposResponse.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setReposData(sortedRepos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (username) {
      fetchUserProfile();
    }
  }, [username, options, reposEndpoint, userEndpoint]);

  return (
    <motion.section
    className='container'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
      <>
        {userData && (
          <div className='center'>
            <div className='pPic'>
              <img src={userData.avatar_url} alt={`${userData.name}'s avatar`} />
            </div>
            <h1 className='pName'>{userData.name}</h1>
            <div className='pNumbers'>
              <div className='nRepo nBox center'>
                <p>{userData.public_repos}</p>
                <h3>Repositories</h3>
              </div>
              <div className='nFollowing nBox center'>
                <p>{userData.following}</p>
                <h3>Following</h3>
              </div>
              <div className='nFollowers nBox center'>
                <p>{userData.followers}</p>
                <h3>Followers</h3>
              </div>
            </div>
            <button onClick={() => window.location.href = userData.html_url}>
              Go To GitHub
            </button>
          </div>
        )}

        <div className='center repoBox'>
          {reposData.map(repo => (
            <div className='pRepos' key={repo.id}>
              <div className='flex rDate'>
                <p className='rName'>{repo.name}</p>
                <p>Updated at {new Date(repo.updated_at).toLocaleDateString()}</p>
              </div>
              <p>{repo.description}</p>
            </div>
          ))}
        </div>
      </>
    </motion.section>
  );
}

export default Profile;
