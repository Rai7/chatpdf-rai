import { PutObjectCommand, PutObjectCommandOutput, S3 } from "@aws-sdk/client-s3";

export async function uploadToS3(
  file: File
): Promise<{ file_key: string; file_name: string }> {
  // initialize your S3 client in us‑east‑1 (N. Virginia)
  const s3 = new S3({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  });

  const file_key =
    "uploads/" + Date.now().toString() + "-" + file.name.replace(/\s+/g, "-");

  // assemble the PutObjectCommand
  const cmd = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: file_key,
    Body: file,
    ContentType: file.type,
  });

  // send it
  await s3.send(cmd);

  return {
    file_key,
    file_name: file.name,
  };
}

export function getS3Url(file_key: string) {
  // your bucket endpoint in us‑east‑1
  return `https://${process.env.S3_BUCKET_NAME}.s3.us-east-1.amazonaws.com/${file_key}`;
}
