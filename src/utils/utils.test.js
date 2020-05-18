import {
  languageToExtension,
  convertToJSON,
  convertToDisplayString,
} from './utils';

test('languages', () => {
  expect(languageToExtension['java']).toBe('.java');
});

test('convertToJSON', () => {
  const stringExample = `curl -k -X PUT -H "Authorization: Bearer {token}" -H "cache-control: no-cache" -d "{\"description\":\"{role_description}\",\"permissions\":\"{permissions}\"}" "https://{cpd_cluster_host}{:port}/icp4d-api/v1/roles/{role_name}"`;
  const arrayExample = convertToJSON(stringExample);
  expect(arrayExample).toEqual([
    'curl -k -X PUT -H "Authorization: Bearer {token}" -H "cache-control: no-cache" -d "{"description":"{role_description}","permissions":"{permissions}"}" "https://{cpd_cluster_host}{:port}/icp4d-api/v1/roles/{role_name}"',
  ]);
});

test('convertToDisplayString', () => {
  const arrayExample = [
    `curl -k -X PUT -H "Authorization: Bearer {token}" -H "cache-control: no-cache" -d "{\"description\":\"{role_description}\",\"permissions\":\"{permissions}\"}" "https://{cpd_cluster_host}{:port}/icp4d-api/v1/roles/{role_name}"`,
  ];
  const stringExample = convertToDisplayString(arrayExample);
  expect(stringExample).toEqual(
    'curl -k -X PUT -H "Authorization: Bearer {token}" -H "cache-control: no-cache" -d "{"description":"{role_description}","permissions":"{permissions}"}" "https://{cpd_cluster_host}{:port}/icp4d-api/v1/roles/{role_name}"'
  );
});
