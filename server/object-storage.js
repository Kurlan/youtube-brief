import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { S3Client, GetObjectCommand, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

export class MissingObjectError extends Error {
  constructor(key) {
    super(`Object not found: ${key}`);
    this.name = "MissingObjectError";
    this.code = "MISSING_OBJECT";
  }
}

function isMissing(error) {
  return error?.name === "NoSuchKey" || error?.name === "NotFound" || error?.$metadata?.httpStatusCode === 404;
}

function createS3Storage({ bucket, region, endpoint }) {
  const client = new S3Client({
    region: region || "auto",
    endpoint: endpoint || undefined,
    forcePathStyle: Boolean(endpoint),
  });

  return {
    kind: "s3",
    describe() {
      return `s3://${bucket}`;
    },
    async put(key, body, contentType) {
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: body,
          ContentType: contentType,
        }),
      );
      return key;
    },
    async exists(key) {
      try {
        await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
        return true;
      } catch (error) {
        if (isMissing(error)) {
          return false;
        }
        throw error;
      }
    },
    async getStream(key) {
      try {
        const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
        return response.Body;
      } catch (error) {
        if (isMissing(error)) {
          throw new MissingObjectError(key);
        }
        throw error;
      }
    },
  };
}

function createFileStorage({ rootDir }) {
  fs.mkdirSync(rootDir, { recursive: true });

  function resolve(key) {
    const target = path.resolve(rootDir, key);
    if (!target.startsWith(path.resolve(rootDir) + path.sep)) {
      throw new Error(`Refusing to access object outside the storage root: ${key}`);
    }
    return target;
  }

  return {
    kind: "file",
    describe() {
      return `file://${rootDir}`;
    },
    async put(key, body) {
      const target = resolve(key);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      await fs.promises.writeFile(target, body);
      return key;
    },
    async exists(key) {
      return fs.existsSync(resolve(key));
    },
    async getStream(key) {
      const target = resolve(key);
      if (!fs.existsSync(target)) {
        throw new MissingObjectError(key);
      }
      return Readable.from(fs.createReadStream(target));
    },
  };
}

/**
 * Uses the configured S3-compatible bucket (Tigris in production) when a bucket
 * name is present, and falls back to the local filesystem so development needs
 * no object storage credentials.
 */
export function createObjectStorage({ bucket, region, endpoint, localDir }) {
  if (bucket) {
    return createS3Storage({ bucket, region, endpoint });
  }
  return createFileStorage({ rootDir: localDir });
}
