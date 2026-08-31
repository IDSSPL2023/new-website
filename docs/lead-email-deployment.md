# IDSSPL website lead email setup

Both website lead forms use one secure AWS endpoint:

- **Talk To An Expert** sends a detailed expert-enquiry notification.
- **Download Brochure** sends a brochure-lead notification before the PDF download starts.
- Every submission is retained in the private DynamoDB table even if email delivery is temporarily unavailable.
- AWS SES sends the branded notification to `info@idsspl.com`; no email password or secret is exposed in the browser.

## 1. Verify the sender in Amazon SES

In AWS Console, open **Amazon SES** in `ap-south-1`, then open **Configuration → Identities → Create identity**.

Verify either:

- the complete `idsspl.com` domain (recommended), or
- `info@idsspl.com` as an email-address identity.

If the SES account is still in sandbox mode, the recipient must also be verified. Request production access before accepting public website traffic.

## 2. Deploy the lead stack

Deploy `infra/brochure-lead-capture.yml` as a CloudFormation stack in `ap-south-1`.

Suggested stack name: `idsspl-website-leads`

Parameters:

- `AllowedOrigin`: the exact production website origin, without a trailing slash.
- `NotificationEmail`: `info@idsspl.com`
- `SenderEmail`: `info@idsspl.com`
- `LeadTableName`: keep the default unless the existing table uses another name.

The deployment creates or updates:

- a private encrypted DynamoDB lead table;
- a validated Lambda Function URL;
- SES notification delivery;
- narrowly scoped execution permissions.

## 3. Connect GitHub production deployment

Copy the CloudFormation `LeadEndpoint` output.

In GitHub, open **Settings → Environments → production → Environment variables** and add:

- Name: `VITE_LEAD_ENDPOINT`
- Value: the complete `LeadEndpoint` URL

The production workflow injects this endpoint while building the website. Never store AWS credentials or email passwords in a `VITE_` variable.

## 4. Deploy and test

Push to `main` or manually run the **Deploy website to S3** workflow.

Submit one test through each form and confirm:

1. the visitor receives the correct success state;
2. the brochure downloads only after a successful capture;
3. `info@idsspl.com` receives the branded notification;
4. the **Reply To Lead** button addresses the visitor directly;
5. the corresponding record exists in the DynamoDB table.

## Notification subjects

- `[IDSSPL] New Expert Enquiry — Organization — Lead Name`
- `[IDSSPL] New Brochure Lead — Organization — Lead Name`

The HTML email includes contact details, requested solution, message or notes, source page, language, submission time, consent context, and direct reply/call actions.
