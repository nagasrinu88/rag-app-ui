import crypto from 'crypto';

function generateHMACSignature({ secretKey, timestamp, params , body }) {
    // Validate inputs
    if (!secretKey || !timestamp) {
        throw new Error('Missing required signature components');
    }

    params = params || {};
    body = body || {};

    // params = typeof params === 'object' ? JSON.parse(params) : params;
    // body = typeof body === 'object' ? JSON.parse(body) : body;

    // Normalize inputs
    const normalizedParams = params ? (typeof params === 'string' ? params : JSON.stringify(sortObjectKeys(params))) : '';
    const normalizedBody = body ?
        (typeof body === 'string' ? body : JSON.stringify(sortObjectKeys(body))) : '';

    // Create signature payload
    const signaturePayload = `${timestamp}.${normalizedParams}.${normalizedBody}`;
    console.log("Signature payload is", signaturePayload);

    // Generate HMAC
    return crypto
        .createHmac('sha256', secretKey)
        .update(signaturePayload)
        .digest('hex');
}

function sortObjectKeys(obj) {
    return Object.keys(obj)
        .sort()
        .reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
        }, {});
}

export { generateHMACSignature };