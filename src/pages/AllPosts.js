import React from 'react';
import Forum from '../components/Forum';
import ForumNewForm from '../components/ForumNewForm';
import "../style/AllPost.css" 

function AllPosts() {
    return (
        <div>
            <h1>A-SOCIAL Forum</h1>
            <Forum />
            <ForumNewForm />
        </div>
    );
}

export default AllPosts;