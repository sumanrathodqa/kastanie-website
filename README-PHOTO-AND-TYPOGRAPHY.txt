KASTANIE: Photo CTA + typography fix (October 2026)

What was wrong:
All original 'Foto senden' buttons opened a mailto: URL, which may look inert when no email client is configured in Chrome or the OS.

What changed:
- All photo CTAs now open an accessible on-page dialog.
- The dialog lets users open their email app OR copy the address hallo@kastanie.wien.
- The photo must still be attached by the visitor in their chosen email service. The site neither uploads nor stores plant photos.
- The contact section also contains a visible email address, copy control, and text for visitors without JavaScript.
- Typography now uses roughly 34-56px h1, 27-38px h2, 16-17px body text, and at least 14px for supporting copy.
- Hero imagery has a less aggressive crop on desktop.
- Both DE and EN Zoho form links remain configured.

Checks before publishing:
1. Open index.html and en.html (or preview with a local server), click every photo CTA and verify the dialog opens.
2. Click Copy address, paste into a text editor, verify the value.
3. Click Open email app on a device configured for mailto; attach a photo manually.
4. Test both embedded Zoho Forms and verify records appear in Zoho Forms > Entries.
5. Review the privacy pages and Impressum for current legal/compliance details.
6. Publish only after review. Nothing is deployed automatically.
