/* eslint-disable import/prefer-default-export */
import { Node, ReactNodeViewRenderer, mergeAttributes } from '@bubbles-ui/editors';
import { keys, isEmpty } from 'lodash';
import { getAuthorizationTokenForAllCenters } from '@users/session';
import { IMAGE_ASSET, VIDEO_ASSET, AUDIO_ASSET, URL_ASSET } from './mock/data';
import { LibraryPlayer } from './LibraryPlayer';

const ASSET_KEYS = keys({
  ...VIDEO_ASSET,
  ...AUDIO_ASSET,
  ...IMAGE_ASSET,
  ...URL_ASSET,
  processed: true,
});

function appendAuthorizationToUrl(url) {
  if (!url || url === 'null') {
    return undefined;
  }

  const authTokens = getAuthorizationTokenForAllCenters();

  const _url = new URL(url.startsWith('http') ? url : window.location.origin + url);

  _url.searchParams.set('authorization', authTokens);

  return _url.href;
}

export const LibraryExtension = Node.create({
  name: 'library', // unique name for the Node
  group: 'block', // belongs to the 'block' group of extensions
  selectable: true, // so we can select the Card
  draggable: true, // so we can drag the Card
  atom: true, // is a single unit

  addAttributes() {
    return {
      asset: {
        default: {},
        parseHTML: (element) => JSON.parse(element.getAttribute('asset')),
        /**
         * The idea is to render an html tag like <library name="asset.name" url="asset.url" />
         * So, in order to do that, we need to spread all the asset props as nodetag attributes.
         */
        renderHTML: ({ asset: { canAccess, ...asset } }) => {
          const cleanAsset = ASSET_KEYS.reduce((prev, curr) => {
            const item = prev;
            const attr = asset[curr];
            if (attr) {
              item[curr] = attr;
            }
            return item;
          }, {});

          return {
            ...cleanAsset,
            tags: JSON.stringify(cleanAsset.tags || []),
            metadata: JSON.stringify(cleanAsset.metadata || []),
          };
        },
      },
      width: {
        default: '100%',
      },
      display: {
        default: 'card',
      },
      align: {
        default: 'left',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'library',
        getAttrs: (element) => {
          const asset = ASSET_KEYS.reduce((prev, curr) => {
            const item = prev;
            const attr = element.getAttribute(curr);
            if (attr) {
              item[curr] = attr;
            }
            return item;
          }, {});

          if (!isEmpty(asset)) {
            asset.url = appendAuthorizationToUrl(asset.url);
            asset.cover = appendAuthorizationToUrl(asset.cover);
            asset.tags = asset.tags ? JSON.parse(asset.tags) : [];
            asset.metadata = asset.metadata ? JSON.parse(asset.metadata) : [];
            asset.fileType = asset.fileType || asset.filetype;
            element.setAttribute('asset', JSON.stringify(asset));
          }

          return true;
        },
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['library', mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      setLibrary:
        (attributes) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: attributes }),
      unsetLibrary:
        () =>
        ({ commands }) =>
          commands.deleteSelection(),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(LibraryPlayer);
  },
});
