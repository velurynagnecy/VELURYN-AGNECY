import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const KEY = 'cookieConsent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let seen: string | null = null;
    try {
      seen = localStorage.getItem(KEY);
    } catch {
      /* storage blocked */
    }
    if (seen) return;
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const choose = (v: string) => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* storage blocked */
    }
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div className="cookie" role="dialog" aria-label="Cookies">
      <p>
        We use cookies to improve your experience and understand site use. See our <Link to="/privacy">Privacy Policy</Link>.
      </p>
      <div className="row">
        <button className="btn primary" onClick={() => choose('true')}>
          Accept all
        </button>
        <button className="btn ghost" onClick={() => choose('declined')}>
          Decline
        </button>
      </div>
    </div>
  );
}
