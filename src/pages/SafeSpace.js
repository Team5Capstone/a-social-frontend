import React from 'react';
import Profile from '../components/Profiles';
 

function SafeSpace({otherUserId}) {
   
    return (
        <div>
            <Profile otherUserId={otherUserId}/>
        </div>
    );
}

export default SafeSpace;