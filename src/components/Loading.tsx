import React from 'react';
import Spinner from 'react-spinner-material';


export default function Loading() {
  return (
    <div style={{ width: '300px', margin: '6em auto 0', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <Spinner size={60} spinnerColor={"#029ffd"} spinnerWidth={4} visible={true} />
    </div>
  );
}
