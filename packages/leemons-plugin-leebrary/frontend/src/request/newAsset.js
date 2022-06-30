import { isString } from 'lodash';

async function newAsset(assetData, categoryId, categoryKey) {
  const { file, cover, ...data } = assetData;
  const formData = new FormData();

  if (categoryKey === 'media-files') {
    formData.append('files', file, file.name);

    if (cover && isString(cover)) formData.append('cover', cover);
    if (cover && cover.name) formData.append('cover', cover, cover.name);
  }

  if (categoryKey === 'bookmarks') {
    if (cover) formData.append('cover', cover);
  }

  if (categoryId) formData.append('categoryId', categoryId);

  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined && (typeof data[key] !== 'string' || data[key]?.length > 0)) {
      formData.append(key, data[key]);
    }
  });

  return leemons.api('leebrary/assets', {
    allAgents: true,
    method: 'POST',
    body: formData,
    headers: {
      'content-type': 'none',
    },
  });
}

export default newAsset;
