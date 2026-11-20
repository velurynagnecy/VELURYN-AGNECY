'use client';

import { useState, useId, type FormEvent, type ReactNode } from 'react';
import {
  Paperclip,
  Link2,
  Smile,
  Image as ImageIcon,
  Lock,
  PenLine,
  MoreVertical,
  Trash2,
  ChevronDown,
  Sparkles,
  Check,
  Loader2,
  SendHorizontal,
} from 'lucide-react';
import { SITE } from '../../data/site';

export type FormField = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'url' | 'tel' | 'textarea';
  required?: boolean;
  placeholder?: string;
  half?: boolean;
};

export type GmailComposeFormProps = {
  /** Target subject line for email routing */
  subject: string;
  /** Custom form fields */
  fields: FormField[];
  /** Extra hidden data attributes */
  extra?: Record<string, string>;
  /** Form submission button text */
  button?: string;
  /** Submission API endpoint (e.g. FormSubmit) */
  endpoint?: string;
  /** Optional footnote or privacy disclaimer */
  note?: ReactNode;
  /** Optional custom recipient display (defaults to VELURYN AGNECY contact) */
  recipientEmail?: string;
  recipientName?: string;
  /** Category or context badge (e.g. 'Studio', 'Talent', 'Brand', 'Careers') */
  category?: string;
  /** Layout mode: 'split' (side-by-side) or 'stacked' */
  layout?: 'split' | 'stacked';
  /** Optional callback on successful submit */
  onSuccess?: () => void;
  className?: string;
};

export function GmailComposeForm({
  subject,
  fields,
  extra = {},
  button = 'Send message',
  endpoint = SITE.formEndpoint,
  note,
  recipientEmail = SITE.email,
  recipientName = 'VELURYN AGNECY',
  category,
  layout = 'split',
  onSuccess,
  className = '',
}: GmailComposeFormProps) {
  const formId = useId();

  // Field values state
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const f of fields) {
      initial[f.name] = '';
    }
    return initial;
  });

  // UI state for Gmail window
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [activeTab, setActiveTab] = useState<'both' | 'form' | 'preview'>('both');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Form submission status
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Handle field change
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Derive sender details
  const firstName = formData['First Name'] || formData['firstName'] || formData['Name'] || '';
  const lastName = formData['Last Name'] || formData['lastName'] || '';
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || (formData['Name'] ?? '');
  const email = formData['Email'] || formData['email'] || '';
  const companyOrBrand =
    formData['Company'] ||
    formData['Brand'] ||
    formData['Area of interest'] ||
    formData['Brand Vertical'] ||
    '';
  const formatOrFocus = formData['Format'] || formData['Focus'] || '';
  const link = formData['Portfolio'] || formData['Link'] || '';
  const messageBody = formData['Message'] || formData['Tell us about it'] || formData['Niche, rates and availability'] || '';

  // Dynamic subject line
  const dynamicSubject = (() => {
    const segments: string[] = [subject];
    if (companyOrBrand) segments.push(companyOrBrand);
    if (formatOrFocus && !companyOrBrand) segments.push(formatOrFocus);
    if (fullName && !companyOrBrand && !formatOrFocus) segments.push(fullName);
    return segments.join(' : ');
  })();

  // Handle form submission
  async function handleSubmit(e?: FormEvent) {
    if (e) e.preventDefault();
    if (status === 'sending') return;

    // Basic required check
    for (const f of fields) {
      if (f.required && !formData[f.name]?.trim()) {
        setStatus('err');
        setStatusMessage(`Please complete the required field: ${f.label}`);
        return;
      }
    }

    setStatus('sending');
    setStatusMessage('Transmitting to Veluryn inbox...');

    try {
      const payload: Record<string, string> = {
        _subject: dynamicSubject,
        _captcha: 'false',
        _template: 'table',
        ...formData,
        ...extra,
      };
      if (category) {
        payload['Inquiry Category'] = category;
      }

      // First try the Rust / Edge backend (/api/contact) for rate-limiting, honeypot validation, and lead logging
      let handledByBackend = false;
      try {
        const apiRes = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (apiRes.ok) {
          handledByBackend = true;
        }
      } catch {
        // Fallback to direct endpoint below if running purely static
      }

      if (!handledByBackend) {
        const data = new FormData();
        for (const [k, v] of Object.entries(payload)) {
          data.append(k, v);
        }

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        });

        if (!res.ok) throw new Error(String(res.status));
      }

      setStatus('ok');
      setStatusMessage('Message sent successfully. Our team will review and reply promptly.');
      onSuccess?.();
    } catch {
      setStatus('err');
      setStatusMessage(`Submission issue. Please email us directly at ${recipientEmail}.`);
    }
  }

  // Reset form
  const handleReset = () => {
    const empty: Record<string, string> = {};
    for (const f of fields) empty[f.name] = '';
    setFormData(empty);
    setStatus('idle');
    setStatusMessage('');
  };

  // Group fields into rows (half-width fields paired)
  const rows: FormField[][] = [];
  for (const f of fields) {
    const last = rows[rows.length - 1];
    if (f.half && last && last.length === 1 && last[0].half) {
      last.push(f);
    } else {
      rows.push([f]);
    }
  }

  return (
    <div className={`gmail-form-wrapper ${className}`}>
      {/* Mobile view switcher */}
      <div className="gmail-mobile-switch">
        <button
          type="button"
          className={`gmail-tab-btn ${activeTab === 'form' || activeTab === 'both' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          Form Details
        </button>
        <button
          type="button"
          className={`gmail-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          Gmail Compose Preview
        </button>
      </div>

      <div className={`gmail-grid ${layout === 'split' ? 'split-layout' : 'stacked-layout'}`}>
        {/* Left Column: Form Controls */}
        <div className={`gmail-form-column ${activeTab === 'preview' ? 'hide-mobile' : ''}`}>
          <form className="gmail-inputs-form" onSubmit={handleSubmit}>
            <input className="hp" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className="gmail-fields-container">
              {rows.map((row, rowIdx) => (
                <div key={rowIdx} className={row.length === 2 ? 'gmail-field-row' : ''}>
                  {row.map((field) => (
                    <div
                      key={field.name}
                      className={`gmail-field-item ${focusedField === field.name ? 'is-focused' : ''}`}
                    >
                      <label htmlFor={`${formId}-${field.name}`}>
                        {field.label}
                        {field.required && <span className="req-star">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          id={`${formId}-${field.name}`}
                          name={field.name}
                          required={field.required}
                          placeholder={field.placeholder || 'Type your message here...'}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          rows={4}
                        />
                      ) : (
                        <input
                          id={`${formId}-${field.name}`}
                          name={field.name}
                          type={field.type || 'text'}
                          required={field.required}
                          placeholder={field.placeholder || ''}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Submit & Note */}
            <div className="gmail-form-footer">
              <button
                type="submit"
                className="gmail-primary-submit-btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <SendHorizontal size={16} />
                    <span>{button}</span>
                  </>
                )}
              </button>

              {note && <div className="gmail-form-note">{note}</div>}
            </div>

            {/* Notification messages */}
            {status === 'ok' && (
              <div className="gmail-status-banner ok" role="status">
                <Check size={16} />
                <span>{statusMessage}</span>
              </div>
            )}
            {status === 'err' && (
              <div className="gmail-status-banner err" role="alert">
                <span>{statusMessage}</span>
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Authentic Google Gmail Compose Window */}
        <div className={`gmail-preview-column ${activeTab === 'form' ? 'hide-mobile' : ''}`}>
          <div className="gmail-compose-window">
            {/* 1. Window Header Bar with decorative macOS traffic light dots */}
            <div className="gmail-header-bar macos-header">
              <div className="macos-traffic-lights" aria-hidden="true">
                <span className="macos-dot macos-close" />
                <span className="macos-dot macos-minimize" />
                <span className="macos-dot macos-zoom" />
              </div>
              <div className="gmail-header-title">
                <span>New Message</span>
                {category && <span className="gmail-header-badge">{category}</span>}
              </div>
              <div className="macos-header-spacer" aria-hidden="true" />
            </div>

            {/* 2. Recipients Bar */}
                <div className="gmail-recipients-row">
                  <span className="gmail-row-label">Recipients</span>
                  <div className="gmail-recipients-list">
                    {/* Primary Agency Recipient Chip */}
                    <div className="gmail-chip primary-chip" title={recipientEmail}>
                      <span className="gmail-chip-avatar">V</span>
                      <span className="gmail-chip-text">{recipientName}</span>
                    </div>

                    {/* Sender Chip (if typed) */}
                    {email && (
                      <div className="gmail-chip sender-chip" title={email}>
                        <span className="gmail-chip-text">
                          From: {fullName ? `${fullName} <${email}>` : email}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="gmail-cc-bcc-actions">
                    <button
                      type="button"
                      className={`gmail-text-btn ${showCc ? 'active' : ''}`}
                      onClick={() => setShowCc((s) => !s)}
                    >
                      Cc
                    </button>
                    <button
                      type="button"
                      className={`gmail-text-btn ${showBcc ? 'active' : ''}`}
                      onClick={() => setShowBcc((s) => !s)}
                    >
                      Bcc
                    </button>
                  </div>
                </div>

                {/* Optional Cc Row */}
                {showCc && (
                  <div className="gmail-extra-row">
                    <span className="gmail-row-label">Cc</span>
                    <span className="gmail-row-val text-muted">team@veluryn.com</span>
                  </div>
                )}

                {/* Optional Bcc Row */}
                {showBcc && (
                  <div className="gmail-extra-row">
                    <span className="gmail-row-label">Bcc</span>
                    <span className="gmail-row-val text-muted">records@veluryn.com</span>
                  </div>
                )}

                {/* 3. Subject Bar */}
                <div className="gmail-subject-row">
                  <input
                    type="text"
                    readOnly
                    className="gmail-subject-input"
                    value={dynamicSubject}
                    placeholder="Subject"
                    title="Live synchronized subject line"
                  />
                </div>

                {/* 4. Message Body Area */}
                <div className="gmail-body-area">
                  <div className="gmail-rendered-content">
                    <p className="gmail-salutation">Hi Veluryn team,</p>

                    <div className="gmail-message-text">
                      {messageBody ? (
                        messageBody.split('\n').map((line, idx) => (
                          <p key={idx} className="gmail-paragraph">
                            {line || <br />}
                          </p>
                        ))
                      ) : (
                        <p className="gmail-placeholder-text">
                          Type your message in the form on the left to watch this Google Gmail
                          inquiry compose live in real-time...
                        </p>
                      )}
                    </div>

                    {/* Auto-composed professional signature */}
                    <div className="gmail-signature-block">
                      <div className="gmail-sig-divider" />
                      <p className="gmail-sig-name">{fullName || 'Your Name'}</p>
                      {companyOrBrand && (
                        <p className="gmail-sig-meta">
                          {companyOrBrand}
                          {formatOrFocus ? ` | ${formatOrFocus}` : ''}
                        </p>
                      )}
                      {email && <p className="gmail-sig-meta">{email}</p>}
                      {link && (
                        <p className="gmail-sig-meta">
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            {link}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 5. Google Gmail Bottom Action Bar */}
                <div className="gmail-bottom-bar">
                  <div className="gmail-bottom-left">
                    {/* Blue Split Send Button */}
                    <button
                      type="button"
                      className="gmail-send-split-btn"
                      onClick={() => handleSubmit()}
                      disabled={status === 'sending'}
                      title="Send this email"
                    >
                      <span className="gmail-send-text">
                        {status === 'sending' ? 'Sending...' : 'Send'}
                      </span>
                      <span className="gmail-send-divider" />
                      <span className="gmail-send-caret">
                        <ChevronDown size={14} />
                      </span>
                    </button>

                    {/* Toolbar Icons */}
                    <div className="gmail-tools-strip">
                      {/* Formatting icon Aa */}
                      <button
                        type="button"
                        className="gmail-tool-icon-btn"
                        title="Formatting options"
                        aria-label="Formatting options"
                      >
                        <span className="gmail-aa-icon">
                          <span>A</span>
                          <span className="small-a">a</span>
                        </span>
                      </button>

                      {/* AI Help me write */}
                      <button
                        type="button"
                        className="gmail-tool-icon-btn"
                        title="Help me write"
                        aria-label="Help me write"
                      >
                        <Sparkles size={16} />
                      </button>

                      {/* Attachment paperclip */}
                      <button
                        type="button"
                        className="gmail-tool-icon-btn"
                        title="Attach files"
                        aria-label="Attach files"
                      >
                        <Paperclip size={16} />
                      </button>

                      {/* Link */}
                      <button
                        type="button"
                        className="gmail-tool-icon-btn"
                        title="Insert link"
                        aria-label="Insert link"
                      >
                        <Link2 size={16} />
                      </button>

                      {/* Emoji */}
                      <button
                        type="button"
                        className="gmail-tool-icon-btn"
                        title="Insert emoji"
                        aria-label="Insert emoji"
                      >
                        <Smile size={16} />
                      </button>

                      {/* Google Drive SVG */}
                      <button
                        type="button"
                        className="gmail-tool-icon-btn"
                        title="Insert files using Drive"
                        aria-label="Insert files using Drive"
                      >
                        <svg className="gmail-drive-icon" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5L7.71 3.5z"
                            fill="#0066DA"
                          />
                          <path
                            d="M16.29 3.5H7.71l6.55 11.5h8.59L16.29 3.5z"
                            fill="#00AC47"
                          />
                          <path
                            d="M14.26 15H5.68L2.25 21h17.18l-5.17-6z"
                            fill="#FFBA00"
                          />
                        </svg>
                      </button>

                      {/* Insert Image */}
                      <button
                        type="button"
                        className="gmail-tool-icon-btn"
                        title="Insert photo"
                        aria-label="Insert photo"
                      >
                        <ImageIcon size={16} />
                      </button>

                      {/* Confidential mode */}
                      <button
                        type="button"
                        className="gmail-tool-icon-btn"
                        title="Toggle confidential mode"
                        aria-label="Toggle confidential mode"
                      >
                        <Lock size={15} />
                      </button>

                      {/* Insert signature */}
                      <button
                        type="button"
                        className="gmail-tool-icon-btn"
                        title="Insert signature"
                        aria-label="Insert signature"
                      >
                        <PenLine size={15} />
                      </button>

                      {/* More options */}
                      <button
                        type="button"
                        className="gmail-tool-icon-btn"
                        title="More options"
                        aria-label="More options"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Discard Draft / Trash */}
                  <div className="gmail-bottom-right">
                    <button
                      type="button"
                      className="gmail-tool-icon-btn discard-btn"
                      onClick={handleReset}
                      title="Discard draft"
                      aria-label="Discard draft"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Floating Gmail Snackbar when sent */}
                {status === 'ok' && (
                  <div className="gmail-toast-snackbar" role="status">
                    <span>Message sent.</span>
                    <button
                      type="button"
                      className="gmail-toast-action"
                      onClick={() => setStatus('idle')}
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
        </div>
      </div>
    </div>
  );
}
export default GmailComposeForm;
