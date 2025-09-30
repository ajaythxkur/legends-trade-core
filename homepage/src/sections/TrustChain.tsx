import { Marquee } from '@/components/marque'
import Section from '@/components/section';
import { Tagline } from '@/components/typography';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

const reviews = [
  {

    img: "/webflow.png",
  },
  {

    img: "/webflow.png",
  },
  {

    img: "/webflow.png",
  },
  {

    img: "/webflow.png",
  },
  {

    img: "/webflow.png",
  },
  {

    img: "/webflow.png",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);


const TrustChain = () => {
  return (
    <Section padding='py-[40px] px-[0px] text-center md:py-[112px] md:px-[0px]'>
      <Tagline>Trusted by top chains, wallets, and protocols</Tagline>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </Marquee>
        {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div> */}
      </div>
    </Section>
  )
}

export default TrustChain


const ReviewCard = ({
  img,

}: {
  img: string;

}) => {
  return (
    <div
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden",
      )}
    >
      <Image height={56} width={200} alt="" src={img} />
    </div>
  );
};