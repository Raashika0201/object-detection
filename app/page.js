"use client";
import dynamic from 'next/dynamic';
const ObjectDetection = dynamic(() => import('../components/object-detection'), { ssr: false });
//import ObjectDetection from "../components/object-detection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1
      className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter md:px-6 text-center">
      Thief Detection Alarm</h1>
      <ObjectDetection />
    </main>
  );
}
