"use client";

import React,{useEffect, useRef, useState} from 'react';
import Webcam from 'react-webcam';
import {load as cocoSSDLoad} from '@tensorflow-models/coco-ssd';
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from '@/utils/render-predictions';

let detectInterval;

function ObjectDetection() {
    const [isLoading, setisLoading] = useState(true);

    const webCamRef = useRef(null);
    const  canvasRef = useRef(null);

    const runCoco = async () => {
        setisLoading(true);//set loading state to true when model starts
         const net = await cocoSSDLoad();
        setisLoading(false);//set loading state to false when model loading completes

        detectInterval = setInterval(() => {
           runObjectDetection(net);

        },10)
    };

    async function runObjectDetection(net) {
        if(canvasRef.current && 
            webCamRef.current!== null && 
            webCamRef.current.video?.readyState === 4
        ){
            canvasRef.current.width = webCamRef.current.video.videoWidth;
            canvasRef.current.height = webCamRef.current.video.videoHeight;

            //find all detected objects

            const detectedObjects = await net.detect(
                webCamRef.current.video,
                undefined,
                0.6 
            );

            //console.log(detectedObjects);

            const context = canvasRef.current.getContext("2d");
            
            renderPredictions(detectedObjects, context);

        }
        
    }

    const showMyVideo = () =>{
        if(webCamRef.current!== null && 
        webCamRef.current.video?.readyState === 4){
            const myVideoWidth = webCamRef.current.video.videowidth;
            const myVideoHeight = webCamRef.current.video.videoHeight;

            webCamRef.current.video.width = myVideoWidth;
            webCamRef.current.video.height = myVideoHeight;
        }
    };

    useEffect(() => {
        runCoco();
        showMyVideo();
    }, []);

  return (
    <div className='mt-8'>{
        isLoading? (
            <div className='gradient-text'>Loading AI model </div>
        ):
        <div className='relative flex justify-center items-center gradient p-1.5 rounded-md'>
        
        {/* webcam*/}
        <Webcam
        ref={webCamRef}
          className='rounded-md w-full lg:h-[720px]' muted  
        />
        {/*canvas*/}
        <canvas
         ref = {canvasRef}
         className='absolute top-0 left-0 z-99999 w-full lg:h-[720px]'
        />

        </div>}
    </div>
    
  );
}

export default ObjectDetection