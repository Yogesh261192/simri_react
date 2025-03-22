import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

// Extend the `MAPPING` object with your custom icon mappings
const MAPPING = {
  'cart.fill': 'shopping-cart', // Items tab
  'car.fill': 'directions-car', // Rides tab
  'gearshape.fill': 'settings', // Settings tab
  'truck.fill': 'local-shipping', // Delivery tab
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as const;

type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
}) {
  const materialIconName = MAPPING[name]; // Resolve MaterialIcons name
  if (!materialIconName) {
    console.error(`Unknown icon name: ${name}`);
    return null; // Return null if icon is not mapped
  }

  return <MaterialIcons color={color} size={size} name={materialIconName} style={style} />;
}
