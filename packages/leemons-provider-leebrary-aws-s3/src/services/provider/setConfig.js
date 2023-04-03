const { table } = require('../tables');

const havePermissions = async (s3, config) => {
  try {
    await s3
      .putObject({
        Bucket: config.bucket.trim(),
        Key: '__test.json',
        Body: JSON.stringify({ test: true }),
        ACL: 'private',
        ContentType: 'application/json',
      })
      .promise();
    await s3
      .deleteObject({
        Bucket: config.bucket.trim(),
        Key: '__test.json',
      })
      .promise();
    return true;
  } catch (error) {
    return false;
  }
};

async function setConfig(newConfig, { transacting } = {}) {
  const configs = await table.config.find({}, { transacting });

  const s3 = new global.utils.aws.S3({
    accessKeyId: newConfig.accessKey.trim(),
    secretAccessKey: newConfig.secretAccessKey.trim(),
    region: newConfig.region.trim(),
  });

  try {
    // Si el bucket no existe intentamos crearlo
    if (!(await havePermissions(s3, newConfig))) {
      await s3
        .createBucket({
          Bucket: newConfig.bucket.trim(),
          CreateBucketConfiguration: {
            LocationConstraint: newConfig.region.trim(),
          },
        })
        .promise();
    }
  } catch (e) {
    throw new Error(
      'The bucket does not exist or there are no permissions to upload/read/delete files.'
    );
  }

  if (configs.length > 0)
    return table.config.update({ id: configs[0].id }, newConfig, { transacting });
  return table.config.create(newConfig, { transacting });
}

module.exports = { setConfig };
