import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);
import {ScrollTrigger} from "gsap/all";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 3;
  const nextVideodRef = useRef(null);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video ", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          ease: "power1.inOut",
          onStart: () => nextVideodRef.current.play(),
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(()=>{
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
      borderRadius:'0 0 40% 10% '
    });


    gsap.from('#video-frame',{
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius:'0 0 0 0',
      ease:'power1.inOut',  
      scrollTrigger:{
        trigger:'#video-frame',
        start:'center center',
        end:'bottom center',
        scrub:'true'
      }
    })
  })


  useEffect(()=>{
if(loadedVideos===totalVideos-1){
  setIsLoading(false)
}
  },[loadedVideos])
  const handVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const getVideoSource = (index) => `videos/hero-${index}.mp4`;
  return (
    <div className="relative w-screen h-dvh overflow-x-hidden ">

{isLoading &&(
  <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
    <div className="three-body">
<div className="three-body__dot" />
<div className="three-body__dot" />
<div className="three-body__dot" />
    </div>
  </div>
)}



      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideodRef}
                src={getVideoSource(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center "
                onLoadedData={handVideoLoad}
              />
            </div>
          </div>

          <video
            ref={nextVideodRef}
            src={getVideoSource(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center "
            onLoadedData={handVideoLoad}
          />

          <video
            src={getVideoSource(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 size-full object-cover object-center"
            onLoadedData={handVideoLoad}
          />
        </div>
        <h1 className="special-font hero-heading  absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>i</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br />
              UnLeash the Play Economy
            </p>
            <Button
              id="watch-trailor"
              title="Watch Trailor"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading  absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
