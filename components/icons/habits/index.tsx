import React from 'react';
import { TargetIcon } from './TargetIcon';
import { WaterDropIcon } from './WaterDropIcon';
import { BookOpenIcon } from './BookOpenIcon';
import { DumbbellIcon } from './DumbbellIcon';
import { MoonIcon } from './MoonIcon';
import { AppleIcon } from './AppleIcon';

const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  target: TargetIcon,
  water: WaterDropIcon,
  book: BookOpenIcon,
  dumbbell: DumbbellIcon,
  moon: MoonIcon,
  apple: AppleIcon,
};

export const availableHabitIcons = Object.keys(iconMap);

interface HabitIconProps extends React.SVGProps<SVGSVGElement> {
  iconName: string;
}

export const HabitIcon: React.FC<HabitIconProps> = ({ iconName, ...props }) => {
  const IconComponent = iconMap[iconName] || TargetIcon;
  return <IconComponent {...props} />;
};