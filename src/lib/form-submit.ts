const formSubmitEndpoint = "https://formsubmit.co/ajax/info@idsspl.com";

type FormSubmitResult = {
  success?: boolean | string;
  message?: string;
};

export async function sendLeadEmail(fields: Record<string, string>) {
  const sourceUrl =
    typeof window === "undefined"
      ? "https://www.idsspl.com/"
      : `${window.location.origin}${window.location.pathname}`;

  const response = await fetch(formSubmitEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _template: "table",
      _captcha: "false",
      _url: sourceUrl,
      ...fields,
    }),
  });

  const result = await response
    .json()
    .then((body: FormSubmitResult) => body)
    .catch(() => undefined);

  const explicitlyFailed = result?.success === false || result?.success === "false";
  if (!response.ok || explicitlyFailed) {
    throw new Error(result?.message || `Lead delivery failed with status ${response.status}`);
  }
}
