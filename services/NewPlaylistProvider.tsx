import { createContext, useContext, useState } from "react";

const NewPlaylistContext = createContext({})

export const NewPlaylistProvider = ({ children }: any) => {
  const [newPlaylist, setNewPlaylist] = useState(null)

  return (
    <NewPlaylistContext.Provider value={{ newPlaylist, setNewPlaylist }}>
      {children}
    </NewPlaylistContext.Provider>
  )
}

export const useNewPlaylist = () => useContext(NewPlaylistContext)