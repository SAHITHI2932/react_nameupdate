import React, { useState } from 'react';

function UserProfile({name,setName,age}) {
    // Defining the state
    const [newName,setNewName] = useState('');

    return (
        <div>
            <p>Name : {name}</p>
            <p>Age : {age}</p>

            {age > 18 ? <p>Your are an adult</p> : <p>You are a minor</p>}

            <p>Enter name:
            <input type='text' value={newName} onChange={(e) => setNewName(e.target.value)}/>
            </p>
            <br/>
            <button type="submit" onClick={()=> setName(newName)}>Update Name</button>
        </div>
    )
}

export default UserProfile;