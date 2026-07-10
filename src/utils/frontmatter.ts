import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import type { Parent } from 'unist';
import type { RehypePlugin, RemarkPlugin } from '@astrojs/markdown-remark';

export const readingTimeRemarkPlugin: RemarkPlugin = () => {
  return function (tree, file) {
    const textOnPage = toString(tree);
    const readingTime = Math.ceil(getReadingTime(textOnPage).minutes);

    if (typeof file?.data?.astro?.frontmatter !== 'undefined') {
      file.data.astro.frontmatter.readingTime = readingTime;
    }
  };
};

const repeatedSeoBoilerplate = [
  'if you choose to implement any of the examples described in this article, please conduct a careful evaluation first.',
  'this site assumes no responsibility for losses resulting from implementations made without prior evaluation.',
];

export const stripRepeatedSeoBoilerplateRemarkPlugin: RemarkPlugin = () => {
  return function (tree) {
    const stripFromParent = (parent: Parent) => {
      parent.children = parent.children.filter((node) => {
        const text = toString(node).trim().toLowerCase();
        if (
          (node.type === 'paragraph' || node.type === 'blockquote') &&
          repeatedSeoBoilerplate.some((sentence) => text.includes(sentence))
        ) {
          return false;
        }

        if ('children' in node && Array.isArray(node.children)) stripFromParent(node as Parent);
        return true;
      });
    };

    stripFromParent(tree);
  };
};

export const responsiveTablesRehypePlugin: RehypePlugin = () => {
  return function (tree) {
    visit(tree, 'element', function (node, index, parent) {
      if (node.tagName !== 'table' || !parent || typeof index !== 'number' || !Array.isArray(parent.children)) return;

      if (parent.type === 'element' && parent.properties?.['data-responsive-table']) return;

      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['overflow-x-auto', 'my-6'],
          'data-responsive-table': 'true',
        },
        children: [node],
      };
    });
  };
};

export const lazyImagesRehypePlugin: RehypePlugin = () => {
  return function (tree) {
    if (!tree.children) return;

    visit(tree, 'element', function (node) {
      if (node.tagName === 'img') {
        node.properties.loading = 'lazy';
        node.properties.decoding = 'async';
      }
    });
  };
};
