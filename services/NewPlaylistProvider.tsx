import { createContext, useContext, useState } from "react";

const NewPlaylistContext = createContext({})

export const NewPlaylistProvider = ({ children }: any) => {
  const [newPlaylist, setNewPlaylist] = useState(null)
  const [basedSong, setBasedSong] = useState(null)

  return (
    <NewPlaylistContext.Provider value={{ newPlaylist, setNewPlaylist, basedSong, setBasedSong }}>
      {children}
    </NewPlaylistContext.Provider>
  )
}

export const useNewPlaylist = () => useContext(NewPlaylistContext)