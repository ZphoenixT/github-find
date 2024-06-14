import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [username, setUsername] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.trim() !== '') {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.status === 200) {
          navigate(`/profile/${username}`);
        } else if (response.status === 404) {
          setUserNotFound(true);
        } else {
          console.error('Unexpected response:', response);
        }
      } catch (error) {
        console.error('Error checking GitHub API:', error);
      }
    }
  };

  return (
    <div className='finderBox center flex'>
      <div className='middle'>
        <h1>
        <FontAwesomeIcon icon={faGithub} />
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='userName'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </form>
        
        {userNotFound && (
          <p className='notFound'>User not found</p>
        )}
        <h2>Welcome to Github Finder</h2>
      </div>
    </div>
  );
}

export default Search;