const { createMetroConfiguration } = require('expo-yarn-workspaces')

const config = createMetroConfiguration(__dirname)

module.exports = {
  ...config,
  resolver: {
    ...(config.resolver || {}),
    sourceExts: [...(config.resolver?.sourceExts || []), 'md', 'mdx'],
  },
}
