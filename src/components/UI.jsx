import { atom, useAtom } from "jotai";
import { useEffect } from "react";

import {sessionConfiguratorStore, pocketBaseUrl} from  "../store"

//import { SliderApp} from "./SliderApp"

// const pictures = [
//   "book-page-1-compressed",
//   "DSC00933",
//   "DSC00966",
//   "DSC00983",
//   "DSC01011",
//   "DSC01040",
//   "DSC01064",
//   "DSC01071",
//   "DSC01103",
//   "DSC01145",
//   "DSC01420",
//   "DSC01461",
//   "DSC01489",
//   "DSC02031",
//   "DSC02064",
//   "DSC02069",
// ];

export const pageAtom = atom(0);

// export const pages = [
//   {
//     front: "book-cover",
//     back: pictures[0],
//     pagelink: ""
//   },
// ];
// for (let i = 1; i < pictures.length - 1; i += 1) {
//   if(i === 1) {
//     pages.push({
//       front: pictures[i-1 % pictures.length],
//       back: pictures[i% pictures.length],
//       pagelink: "6e4y0tz3a1h6x33",
//       //back: pictures[(i + 1) % pictures.length],
//     });
//   } else if(i === 2) {
//     pages.push({
//       front: pictures[i-1 % pictures.length],
//       back: pictures[i% pictures.length],
//       pagelink: "v08k6xv1zc81t3d",
//       //back: pictures[(i + 1) % pictures.length],
//     });
//   } else {
//     pages.push({
//       front: pictures[i-1 % pictures.length],
//       back: pictures[i% pictures.length],
//       pagelink: "",
//       //back: pictures[(i + 1) % pictures.length],
//     });
//   }
// }

// pages.push({
//   front:  "book-back",
//   back: "book-back",
//   pagelink: "",
// });

export let pages = [];

export const UI = () => {

  const stoyees_from_db = sessionConfiguratorStore((state) => state.stoyees_from_db);

  console.log("The stoyees from DB are ", stoyees_from_db);

  // const pictures_from_db = stoyees_from_db
  // ? stoyees_from_db.map(stoyee_from_db => {stoyee_from_db.id, stoyee_from_db.thumbnail}) 
  // : []; // Ensure pictures_from_db is always an array

  const pictures_from_db = stoyees_from_db
    ? stoyees_from_db.map(stoyee_from_db => ({
      id: stoyee_from_db.id,
      thumbnail: stoyee_from_db.thumbnail
    }))
  : [];
  
  
  console.log("The pictures from the DB are ", pictures_from_db);


  pages = [
    {
      front: {"id":"000000000000002","thumbnail":"book_cover_5mzje60jr2.jpg"},
      back: pictures_from_db[0],
      pagelink: "",      
    },
  ];
  for (let i = 1; i < pictures_from_db.length - 1; i += 1) {
    if(i === 1) {
      pages.push({
        front: pictures_from_db[i-1 % pictures_from_db.length],
        back: pictures_from_db[i% pictures_from_db.length],
        pagelink: "6e4y0tz3a1h6x33",           
      });
    } else if(i === 2) {
      pages.push({
        front: pictures_from_db[i-1 % pictures_from_db.length],
        back: pictures_from_db[i% pictures_from_db.length],
        pagelink: "v08k6xv1zc81t3d",            
      });
    } else {
      pages.push({
        front: pictures_from_db[i-1 % pictures_from_db.length],
        back: pictures_from_db[i% pictures_from_db.length],
        pagelink: "",         
      });
    }
  }
  
  // pages.push({
  //   front: {"id": "000000000000001", "thumbnail": "book_back_esjtener91.jpg"},
  //   back: {"id": "000000000000001", "thumbnail":"book_back_esjtener91.jpg"},
  //   pagelink: "",
   
  // });

  console.log("THE MOST IMPORTANT PAGES ARE ", pages)

  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <>
      <main className=" pointer-events-none select-none z-10 fixed  inset-0  flex justify-between flex-col">
        {/* <a
          className="pointer-events-auto mt-10 ml-10"
          href="https://lessons.wawasensei.dev/courses/react-three-fiber"
        > */}
          <img className="w-20" src="/images/wawasensei-white.png" />
        {/* </a> */}

        {/* <div style={{ width: '100%', height: '100vh' }}>
          <SliderApp />
        </div> */}

        <div className="w-full overflow-auto pointer-events-auto flex justify-center ">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => {
                  {console.log("The page number is ", index)}
                  setPage(index)
                }}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => {
                {console.log("The page number is ", pages.length)}
                setPage(pages.length)
              }}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      <div className="fixed inset-0 flex items-center -rotate-2 select-none hidden">
        <div className="relative">
          <div className="bg-white/0  animate-horizontal-scroll flex items-center gap-8 w-max px-8">
            <h1 className="shrink-0 text-white text-10xl font-black ">
              Wawa Sensei
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              React Three Fiber
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">
              Three.js
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Ultimate Guide
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Tutorials
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Learn
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">
              Practice
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Creative
            </h2>
          </div>
          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
            <h1 className="shrink-0 text-white text-10xl font-black ">
              Wawa Sensei
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              React Three Fiber
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">
              Three.js
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Ultimate Guide
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Tutorials
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Learn
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">
              Practice
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Creative
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};
