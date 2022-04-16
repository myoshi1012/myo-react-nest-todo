const pwd = (await $`pwd`).stdout.trim();
const swaggerFileName = `swagger-spec.json`;
const swaggerFilePath = `${path.join(pwd, '..')}/server/${swaggerFileName}`;
const outDir = 'src/api/autogen';
const userId = await $`id -u ${process.env.USER}`;
const userGroupId = await $`id -g ${process.env.USER}`;

await $`cp ${swaggerFilePath} ./`;

await $`rm -r ${outDir}`;

await $`docker run \
--rm \
-u ${userId}:${userGroupId} \
-v "${pwd}:/local" \
openapitools/openapi-generator-cli generate \
-i /local/${swaggerFileName} \
-g typescript-axios \
-o /local/${outDir}
`;
