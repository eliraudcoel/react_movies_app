import React, { useState } from 'react';

const UserContext = React.createContext([{}, () => {}]);

const UserContextProvider = (props) => {
  const [user, updateUser] = useState(null);
  return (
    <UserContext.Provider value={[user, updateUser]}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };