import { create } from "zustand";
import PocketBase from "pocketbase";

export const pocketBaseUrl = import.meta.env.VITE_POCKETBASE_URL;
if (!pocketBaseUrl) {
  throw new Error("VITE_POCKETBASE_URL is required");
}

const pb = new PocketBase(pocketBaseUrl);

export const sessionConfiguratorStore = create((set, get) =>({

     // this is the method to set the Album ID
     setAlbumID: (albumID) => {
        console.log("Setting the Album ID ", albumID)
        set({albumID: albumID});
    },

    // this is the method to fetch the album from pocketbase
    fetchAlbum: async () => {

        // get the albumID from the Session Store
        // get the album details
        const albumID = get().albumID;
        console.log("The albumID derived from session store is ", albumID)

        if (!albumID) {
            console.log("Album ID is null before retrieving the details from POCKETBASE and hence returning")
            return;
        }

        try {

            const stoyees_from_db = await pb.collection("Stoyee").getFullList(albumID)

            console.log("The stoyees from DB are ", ...stoyees_from_db)

            // set the stoyees_from_db into the session store
            set({stoyees_from_db: stoyees_from_db})

        } catch(error) {
            console.error("ERROR FETCHING THE ALBUM FROM POCKETBASE ", error)
        }
    },

}));