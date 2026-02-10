"use client";

import React from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';

interface SkillsRadarProps {
    data: { subject: string; A: number; fullMark: number }[];
}

export function SkillsRadar({ data }: SkillsRadarProps) {
    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#A0AEC0" strokeOpacity={0.3} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#4A5568', fontSize: 10, fontWeight: 'bold' }} />
                    <Radar
                        name="Candidate"
                        dataKey="A"
                        stroke="#7C3AED"
                        strokeWidth={4}
                        fill="#7C3AED"
                        fillOpacity={0.4}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#E0E5EC', color: '#4A5568', boxShadow: '5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff' }}
                        itemStyle={{ color: '#7C3AED', fontWeight: 'bold' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
