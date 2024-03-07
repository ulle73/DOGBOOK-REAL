import React from 'react';
import { Link } from 'react-router-dom';

function Edit({ match }) {
  const { id } = match.params;

  return (
    <div>
      <h2>Edit</h2>
      <p>Edit dog with ID: {id}</p>
      <Link to={`/profile/${id}`}>Back to Profile</Link>
    </div>
  );
}

export default Edit;
