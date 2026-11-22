import { v2 as cloudinary } from 'cloudinary';
import { AppError } from '../errors/app-error.js';

function getConfig() {
  const cloud_name = (process.env.CLOUDINARY_NAME || process.env.CLOUDINARY_CLOUD_NAME || '').trim();
  const api_key = (process.env.CLOUDINARY_APY_KEY || process.env.CLOUDINARY_API_KEY || '').trim();
  const api_secret = (process.env.CLOUDINARY_APY_SECRET || process.env.CLOUDINARY_API_SECRET || '').trim();
  return { cloud_name, api_key, api_secret };
}

export function isCloudinaryConfigured() {
  const { cloud_name, api_key, api_secret } = getConfig();
  return Boolean(cloud_name && api_key && api_secret);
}

/**
 * Sube una imagen o PDF (en Data URI base64) a Cloudinary y retorna su URL segura.
 */
export async function uploadAdjunto(dataUri, nombre = 'adjunto') {
  const cfg = getConfig();
  if (!cfg.cloud_name || !cfg.api_key || !cfg.api_secret) {
    throw new AppError(
      'Cloudinary no está configurado. Define CLOUDINARY_NAME, CLOUDINARY_APY_KEY y CLOUDINARY_APY_SECRET en .env.',
      500
    );
  }
  cloudinary.config({
    cloud_name: cfg.cloud_name,
    api_key: cfg.api_key,
    api_secret: cfg.api_secret,
    secure: true
  });

  const cleanName = String(nombre || 'adjunto')
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 50);

  const res = await cloudinary.uploader.upload(dataUri, {
    folder: 'famicash/adjuntos',
    public_id: `${Date.now()}_${cleanName}`,
    resource_type: 'auto'
  });

  return {
    url: res.secure_url,
    publicId: res.public_id,
    resourceType: res.resource_type
  };
}
