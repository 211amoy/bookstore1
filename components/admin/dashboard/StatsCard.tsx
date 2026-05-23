import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

type StatsCardProps = {
  title: string;
  value: number;
  change: string;
  icon: React.ReactNode;
};

export default function StatsCard({
  title,
  value,
  change,
  icon,
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
}
