# IDSSPL website lead email setup

Both website forms use FormSubmit's free AJAX email delivery service:

- **Talk To An Expert** emails the full enquiry to `info@idsspl.com`.
- **Download Brochure** emails the lead before starting the PDF download.
- The website keeps its existing branded form UI and does not redirect visitors away from IDSSPL.
- No AWS Lambda, DynamoDB, SES identity, email password, or paid form backend is required.

## One-time activation

After the replacement is deployed, submit one test form. FormSubmit will send an activation message to `info@idsspl.com`. Open that message and activate the form endpoint.

Until this one-time activation is completed, live enquiries cannot be forwarded.

## Test both forms

After activation, submit one test through each form and confirm:

1. the visitor receives the correct success state;
2. the brochure downloads after the lead is accepted;
3. `info@idsspl.com` receives the enquiry in the table email layout;
4. replying to the notification addresses the visitor;
5. the subject clearly identifies the lead type, organisation, and person.

## Notification subjects

- `[IDSSPL] New Expert Enquiry — Organization — Lead Name`
- `[IDSSPL] New Brochure Lead — Organization — Lead Name`

The notification includes contact details, requirement, source page, language, consent context, and submission time.
