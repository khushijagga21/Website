// ------------------------------------------------------------------
// ARQO — Contact details
// Edit these values with your real handles/numbers/email.
// ------------------------------------------------------------------

export const CONTACT = {
  // Email that form submissions + "Email" button are sent to.
  email: 'Info@arqodesigncollective.com',

  // WhatsApp number in FULL international format, digits only.
  // Example: India +91 98765 43210  ->  '919876543210'
  whatsappNumber: '919671501010',

  // Instagram handle WITHOUT the @ symbol.
  instagramHandle: 'arqodesigncollective',

  // Studio / location label (display only)
  location: 'Hisar, Zirakpur, India',
}

export const contactLinks = {
  whatsapp: (message?: string) =>
    `https://wa.me/${CONTACT.whatsappNumber}${
      message ? `?text=${encodeURIComponent(message)}` : ''
    }`,

  instagram: () => `https://instagram.com/${CONTACT.instagramHandle}`,

  email: (subject?: string, body?: string) => {
    const params = new URLSearchParams()
    if (subject) params.set('subject', subject)
    if (body) params.set('body', body)
    const query = params.toString()
    return `mailto:${CONTACT.email}${query ? `?${query}` : ''}`
  },
}
