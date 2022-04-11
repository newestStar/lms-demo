async function newAsset(assetData, categoryId, categoryKey) {
  const { file, cover, ...data } = assetData;
  const formData = new FormData();

  if (categoryKey === 'media-files') {
    formData.append('files', file, file.name);

    if (cover) formData.append('cover', cover, cover.name);
  }

  if (categoryKey === 'bookmarks') {
    if (data.coverFile) formData.append('cover', data.coverFile);
  }

  if (categoryId) formData.append('categoryId', categoryId);

  Object.keys(data).forEach((key) => {
    if (data[key]) {
      formData.append(key, data[key]);
    }
  });

  console.log(JSON.stringify(Object.fromEntries(formData)));

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
