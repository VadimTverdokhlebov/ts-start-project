export async function sendRequest(url: string | Request | URL, requestData: any) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const responseData = await response.json();
    return responseData;
  } catch (err: any) {
    throw new Error(err);
  }
}
