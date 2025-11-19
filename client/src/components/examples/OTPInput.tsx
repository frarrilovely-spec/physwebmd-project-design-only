import { useState } from 'react';
import OTPInput from '../OTPInput';

export default function OTPInputExample() {
  const [otp, setOtp] = useState('');

  return (
    <div className="p-8 bg-background max-w-md mx-auto">
      <OTPInput value={otp} onChange={setOtp} />
      <p className="text-center mt-4 text-sm text-muted-foreground">Value: {otp}</p>
    </div>
  );
}
