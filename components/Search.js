import React, { useEffect, useState } from 'react';
import { SearchBar } from 'react-native-elements';

export default function Search(props) {
  // States
  const [searchText, setSearchText] = useState(props.searchText);

  useEffect(() => {
    setSearchText(searchText);
  }, [searchText]);

  return (
    <SearchBar
      placeholder="Type Here..."
      onChangeText={props.updateCallback}
      value={searchText}
      {...props}
    />
  );
}