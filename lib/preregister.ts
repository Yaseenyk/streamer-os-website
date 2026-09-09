// Pre-registration capture. Shared by the modal (components/PreRegisterModal)
// and the inline forms embedded in blog posts and the hero, so there is exactly
// one place that knows how a signup is delivered.
//
// Delivered via EmailJS's REST API (client-side, works on the static export) to
// the site contact inbox. The public key is safe to expose — that's EmailJS's
// design.
const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
const EMAILJS_SERVICE = 'service_560nh3i';
const EMAILJS_TEMPLATE = 'template_dyb1k4x';
const EMAILJS_PUBLIC_KEY = 'mB56akvK2qStLNadU';
const PREREGISTER_INBOX = 'contact@streamerosai.com';

export const SIGNUP_ERROR =
  'Something went wrong — you weren’t added to the list. Please try again in a moment.';

/**
 * Send one pre-registration. `source` records which surface converted (e.g.
 * `blog:best-obs-settings-for-low-cpu-streaming`, `hero`, `modal`) so the
 * inbox shows which pages actually earn signups — otherwise every lead looks
 * identical and there is no way to tell what is working.
 */
export async function submitPreRegistration(email: string, source: string): Promise<void> {
  const response = await fetch(EMAILJS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE,
      template_id: EMAILJS_TEMPLATE,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
        name: 'streamerOS Pre-Registration',
        email,
        message: `New streamerOS pre-registration from ${email} (source: ${source})`,
        to_email: PREREGISTER_INBOX,
        reply_to: email,
      },
    }),
  });
  if (!response.ok) {
    throw new Error(`EmailJS returned ${response.status}`);
  }

  trackSignup(source);
}

/**
 * Report the conversion to Plausible with the surface that earned it.
 *
 * The source is already written into the notification email, but an inbox
 * cannot be counted. This is what makes "which page actually earns signups"
 * answerable — create a goal named `Signup` in Plausible to see it broken down
 * by source. Analytics must never be able to break a signup, so it is fired
 * after the send succeeded and every failure is swallowed.
 */
function trackSignup(source: string): void {
  try {
    const plausible = (window as unknown as {
      plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
    }).plausible;
    plausible?.('Signup', { props: { source } });
  } catch {
    // Never let a blocked or missing analytics script surface to the visitor.
  }
}
