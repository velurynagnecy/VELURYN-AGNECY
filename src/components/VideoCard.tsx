import { useState } from 'react';
import type { WorkItem } from '../data/site';

/** A video card. Shows a placeholder until a video is set in data/site.ts. */
export default function VideoCard({ item, index }: { item: WorkItem; index: number }) {
  const [playing, setPlaying] = useState(false);
  const v = item.video;
  const wide = item.ratio === '16:9';
  const posterSrc = item.poster ? (item.poster.startsWith('/') ? item.poster : `/images/site/${item.poster}`) : undefined;
  return (
    <figure className={`vcard ${wide ? 'wide' : ''}`}>
      <div className="vframe" style={{ aspectRatio: wide ? '16 / 9' : '9 / 16' }}>
        {v?.type === 'mp4' && (
          <video
            src={v.src}
            poster={posterSrc}
            controls
            playsInline
            preload={posterSrc ? 'none' : 'metadata'}
          />
        )}
        {v?.type === 'youtube' &&
          (playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${v.src}?autoplay=1&rel=0`}
              title={`${item.title} ${item.kind}`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button className="vplay" onClick={() => setPlaying(true)} aria-label={`Play ${item.title}`}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          ))}
        {!v && (
          <div className="vph">
            <span className="vnum">{String(index + 1).padStart(2, '0')}</span>
            <span className="vsoon">Video coming soon</span>
          </div>
        )}
      </div>
      <figcaption>
        <b>{item.title}</b>
        <span>
          {item.kind} · {item.language} · {item.ratio}
        </span>
        <small>{item.brief}</small>
      </figcaption>
    </figure>
  );
}
