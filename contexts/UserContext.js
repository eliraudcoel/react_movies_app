import React, { useState } from 'react';

const UserContext = React.createContext([{}, () => {}]);

const UserContextProvider = (props) => {
  const [user, updateUser] = useState({});
  return (
    <UserContext.Provider value={[user, updateUser]}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };