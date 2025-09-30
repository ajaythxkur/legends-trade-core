"use client";

import Section from "@/components/section";
import { H2, H5, H6, PLarge, PXLarge, Tagline } from "@/components/typography";
import React from "react";

const statsData = [
  { title: "Community Members", value: "142,000+", subtitle: "Strong" },
  { title: "Points Traded", value: "3.4M+", subtitle: "Points in Motion" },
  { title: "Total Launches Hosted", value: "52", subtitle: "Projects to Market" },
  { title: "Tokens in Premarket", value: "87", subtitle: "Early-Stage Opportunities" },
];

const Stats: React.FC = () => {
  return (
    <Section className="text-left" aria-labelledby="stats-heading">
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto px-4">
        {/* Left Content */}
        <div className="flex-1">
          <Tagline>Stats</Tagline>
          <H2 id="stats-heading">
            Built. Growing. <br /> Trading.
          </H2>
          <PXLarge weight="regular">
            A snapshot of the community and markets you’re about to join.
          </PXLarge>
          <button
            className="px-5 py-2 mt-7 border-2 rounded-2xl bg-white border-black shadow-sm hover:shadow-md transition-shadow"
            aria-label="Join the community"
          >
            <PLarge weight="medium">Join</PLarge>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid flex-1 max-w-2xl grid-cols-1 sm:grid-cols-2 gap-8 w-full">
          {statsData.map((stat) => (
            <div
              key={stat.title}
              className="bg-[#EBFAE4] w-full h-fit space-y-2 p-4 rounded-2xl min-h-[120px] flex flex-col justify-center"
            >
              <PLarge>{stat.title}</PLarge>
              <H5 className="font-bold">{stat.value}</H5>
              <H6 className="font-bold">{stat.subtitle}</H6>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Stats;
