# rn-mdx

Show MDX content in React-Native. Expo compatible.

# Usage

The short version is

1. Get MDX content
2. Feed it into `<RenderMdx />`

Example:

```jsx
import { RenderMdx } from 'rn-mdx'

const MdxComponent = () => {
  let mdxString = `
    This is MDX content! <TextComponent>Very cool!</TextComponent>
    
    <CustomComponent />
    
    More **markdown** text here! 
  `
  
  let customComponents = {
    TextComponent,
    CustomComponent
  }
  
  return (
    <RenderMdx components={customComponents}>
      {mdxString}
    </RenderMdx>
  )
}
```

## Dynamic with runtime

The long version is... longer.

The main question is how to get the MDX content into the app. The easiest way is to have it as a template string in a `.js`, `.ts` or even `.json` file, then you can just import it where ever you need to render it.

The next-easiest method is to configure your app to import `.mdx` files as plain-text and THEN feed it to `<RenderMdx />`. To do this, you need to set up a Webpack build system and use [Asset modules](https://webpack.js.org/guides/asset-modules/) (or [raw-loader](https://v4.webpack.js.org/loaders/raw-loader/)) OR set up React-Native's Metro bundler to import `.mdx` files as text. Be warned, as this is finicky and may break between React-Native versions.

### Set up metro to handle .mdx files

Follow these steps to set up Metro such that you can `import` MDX and MD files as plain text in your app. This is Expo compatible!

1. First make an `mdx` file with some content and import it in the `App.js` (or similar) module. Console.log the result. It won't work yet, but if you do this first you know when it starts working!
2. Install `babel-plugin-inline-import`.
3. Make a `babel.config.js` file in the root of your project. Set up the `inline-import` plugin to import `.md` and `.mdx` files. Example:

```
module.exports = function (api) {
  api.cache(false)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'inline-import',
        {
          extensions: ['.md', '.mdx'],
        },
      ],
    ],
  }
}
```
4. Create a `metro.config.js` file in the root of your project. Add this content to tell Metro that md and mdx files are _fine_ to eat:

```
module.exports = {
  resolver: {
    sourceExts: ['js', 'ts', 'tsx', 'jsx', 'json', 'md', 'mdx'],
  },
}
```
I took the liberty of not concating the file extensions with the default ones since installing `metro-config` or using `@expo/metro-config` seemed to open up a can of icky worms I didn't want to deal with. But it's better this way, just add any file extensions you may want to import in the future to this array.
5. If you are not using Typescript, your MDX import should work now! Congrats... well, limited congrats since you don't have any type safety. Oh well.
6. You must also tell Typescript that md and mdx files are safe to eat. You can try the "airplane" tactic, or, if that doesn't work, create a `globals.d.ts` file in the root of your project and add the following content:

```
declare module '*.mdx'
declare module '*.md'
```

7. And NOW it should work for typesafe peeps as well!

### Use Repack

If you don't want to use Metro (or if it broke), you may want to set up Webpack. I am not a Webpack expert so I won't provide a nice guide, but you can start by looking at [Repack](https://github.com/callstack/repack). It seems nice!

## Pre-compiled

You can also pre-compile the MDX into Javascript or Typescript files which can be imported directly. This needs to be done using React-Native components, and this library provides a CLI for this.

I mean, it WILl provide a CLI for this. It is not yet done.
