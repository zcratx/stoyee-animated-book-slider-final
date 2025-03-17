import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";

import { useEffect } from "react";

import {sessionConfiguratorStore} from  "./store"

function App() {

  // I first get the album details from the DB and then store them

  const setAlbumID = sessionConfiguratorStore((state) => state.setAlbumID);
  const fetchAlbum = sessionConfiguratorStore((state) => state.fetchAlbum);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const albumIDFromUrl = params.get("albumID");
    console.log("The ALBUM ID RECEIVED FROM THE URL IS ", albumIDFromUrl);
    
    if (albumIDFromUrl) {
      setAlbumID(albumIDFromUrl);

      // Fetch album details after setting the ID
      console.log("Now fetching the album from the DB")
      fetchAlbum();

    }
  }, []);

  return (
    <>
      <UI />
      <Loader />
      <Canvas shadows camera={{
          position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
          fov: 45,
        }}>
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
}

export default App;
