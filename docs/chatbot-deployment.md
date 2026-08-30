# IDSSPL AI Chatbot Deployment

The website chatbot is already integrated into every page. Local development uses a safe built-in preview response when no endpoint is configured. Production AI replies use this architecture:

`S3 / CloudFront website → Lambda Function URL → OpenAI Responses API`

The browser never receives the OpenAI API key. Lambda reads it from AWS Secrets Manager. Normal chat conversations are not stored; only visitors who explicitly submit the expert-enquiry form are added to the private DynamoDB lead table.

## 1. Create the OpenAI secret

In AWS Console, open **Secrets Manager → Store a new secret**.

- Secret type: **Other type of secret**
- Key: `OPENAI_API_KEY`
- Value: your OpenAI API key
- Secret name: `idsspl/openai`

Copy the secret ARN after saving. Do not place this value or the API key in the website source code.

## 2. Deploy the chatbot stack

Run this from the project folder, replacing the secret ARN and production origin:

```powershell
aws cloudformation deploy `
  --stack-name idsspl-ai-chatbot `
  --template-file infra/chatbot-api.yml `
  --region ap-south-1 `
  --capabilities CAPABILITY_NAMED_IAM `
  --parameter-overrides `
    OpenAISecretArn="arn:aws:secretsmanager:ap-south-1:ACCOUNT_ID:secret:idsspl/openai-XXXX" `
    AllowedOrigin="https://YOUR_CLOUDFRONT_DOMAIN" `
    AllowedOriginSecondary="http://127.0.0.1:8080"
```

The template creates:

- One Lambda function for AI replies and chatbot lead capture.
- One encrypted DynamoDB table for opted-in leads.
- One short-lived DynamoDB rate-limit table.
- A public Lambda Function URL restricted by CORS and server-side origin checks.
- Least-privilege IAM access to the two tables and the one specified secret.

## 3. Get the chatbot endpoint

```powershell
aws cloudformation describe-stacks `
  --stack-name idsspl-ai-chatbot `
  --region ap-south-1 `
  --query "Stacks[0].Outputs[?OutputKey=='ChatbotEndpoint'].OutputValue" `
  --output text
```

Create `.env.production.local` and add the returned URL:

```text
VITE_CHATBOT_ENDPOINT=https://RETURNED_FUNCTION_URL/
```

Only the Lambda URL is public. Never add `OPENAI_API_KEY` to this file or any `VITE_` variable.

## 4. Build and upload

```powershell
pnpm run build
aws s3 sync dist/client s3://idsspl-new-website-2026 --delete
```

If CloudFront is enabled, invalidate its cache after uploading:

```powershell
aws cloudfront create-invalidation `
  --distribution-id YOUR_DISTRIBUTION_ID `
  --paths "/*"
```

## 5. Verify production

Test these flows from the public website:

1. Ask about AI Core Banking and confirm a relevant answer.
2. Change the site language and confirm the answer follows the selected language.
3. Submit the chatbot expert form and verify the record in `idsspl-chatbot-leads`.
4. Use the brochure quick action and confirm the existing lead form opens.
5. Confirm that requests from an unapproved origin return HTTP 403.

The default model is `gpt-5.4-mini`. It can be changed later through the CloudFormation `OpenAIModel` parameter without editing the website.
