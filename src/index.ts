import {useCallback, useRef, useState} from 'react';

const useAutoReadOTP = () => {
    const [otp, setOtpValue] = useState<string>('');
    const abortMethod = useRef<null | (() => void)>(null);

    const abortListening = useCallback(() => {
        if(typeof abortMethod.current === 'function') {
            abortMethod.current();
        }
    }, [abortMethod]);

    const initOtpListener = useCallback(() => {
        if ('OTPCredential' in window) {
            window.addEventListener('DOMContentLoaded', e => {
              const ac = new AbortController();
              abortMethod.current = () => ac.abort();
              
              navigator.credentials.get({
                // @ts-ignore
                otp: { transport:['sms'] },
                signal: ac.signal
              }).then(otp => {
                // @ts-ignore
                setOtpValue(otp?.code)
              }).catch(err => {
                console.log(err);
              });
            });
          }
    }, []);

    return {otp, initOtpListener, abortListening};
};

export default useAutoReadOTP;