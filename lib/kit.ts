const KIT_API_BASE = "https://api.kit.com/v4";

type KitErrorResponse = {
  errors?: string[];
};

function kitHeaders(apiKey: string) {
  return {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey,
  };
}

async function parseKitError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as KitErrorResponse;
    if (data.errors?.length) return data.errors.join(", ");
  } catch {
    // fall through
  }
  return `Kit API error (${response.status})`;
}

/** Upsert a subscriber by email (Kit V4). */
export async function upsertKitSubscriber(apiKey: string, emailAddress: string) {
  const response = await fetch(`${KIT_API_BASE}/subscribers`, {
    method: "POST",
    headers: kitHeaders(apiKey),
    body: JSON.stringify({
      email_address: emailAddress,
      state: "active",
    }),
  });

  if (response.status === 200 || response.status === 201 || response.status === 202) {
    return;
  }

  throw new Error(await parseKitError(response));
}

/** Add an existing subscriber to a Kit form by email. */
export async function addKitSubscriberToForm(
  apiKey: string,
  formId: string,
  emailAddress: string,
  referrer?: string,
) {
  const response = await fetch(`${KIT_API_BASE}/forms/${formId}/subscribers`, {
    method: "POST",
    headers: kitHeaders(apiKey),
    body: JSON.stringify({
      email_address: emailAddress,
      ...(referrer ? { referrer } : {}),
    }),
  });

  // 200 = already on form, 201 = newly added
  if (response.status === 200 || response.status === 201) {
    return;
  }

  throw new Error(await parseKitError(response));
}

/** Tag a subscriber by email (Kit V4). Subscriber must already exist. */
export async function tagKitSubscriber(apiKey: string, tagId: string, emailAddress: string) {
  const response = await fetch(`${KIT_API_BASE}/tags/${tagId}/subscribers`, {
    method: "POST",
    headers: kitHeaders(apiKey),
    body: JSON.stringify({ email_address: emailAddress }),
  });

  // 200 = already tagged, 201 = newly tagged
  if (response.status === 200 || response.status === 201) {
    return;
  }

  throw new Error(await parseKitError(response));
}

export async function subscribeEmailToKit(
  apiKey: string,
  formId: string,
  emailAddress: string,
  referrer?: string,
  tagId?: string,
) {
  await upsertKitSubscriber(apiKey, emailAddress);
  await addKitSubscriberToForm(apiKey, formId, emailAddress, referrer);
  if (tagId) {
    await tagKitSubscriber(apiKey, tagId, emailAddress);
  }
}
