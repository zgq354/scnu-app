import React from 'react';
import { DualRing } from 'react-css-spinners';

export default function Loading() {
  return (
    <div style={{ width: '300px', margin: '6em auto 0', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <DualRing color="#666" />
    </div>
  );
}
