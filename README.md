# Slush Wordpress-bootstrap-sass [![Build Status](https://secure.travis-ci.org/row-n/slush-wordpress-bootstrap-sass.png?branch=master)](https://travis-ci.org/rowan.parkinson/slush-wordpress-bootstrap-sass) [![NPM version](https://badge-me.herokuapp.com/api/npm/slush-wordpress-bootstrap-sass.png)](http://badges.enytc.com/for/npm/slush-wordpress-bootstrap-sass)

> Bare bones Wordpress theme using Bootstrap-Sass and _s theme

[![NPM](https://nodei.co/npm/slush-wordpress-bootstrap-sass.png)](https://nodei.co/npm/slush-wordpress-bootstrap-sass/)

## Getting Started

Set up a [WordPress](https://wordpress.org) instance.

Install `slush` globally:

```bash
$ npm install -g slush
```

Install `slush-wordpress-bootstrap-sass` globally:

```bash
$ npm install -g slush-wordpress-bootstrap-sass
```

### Usage

Create a new theme folder for your project within your WordPress instance:

```bash
$ mkdir my-wordpress-bootstrap-theme
```

Run the generator from within the new folder:

```bash
$ cd my-wordpress-bootstrap-theme && slush wordpress-bootstrap-sass
```

## Commands

For previewing your site on a local environment, execute:

```bash
$ gulp
```

_If this is the first time running the theme you will need to asign it within Wordpress admin_

## Todos

- [ ] Boostrap CSS
- [x] Boostrap SASS
- [ ] Boostrap LESS
- [ ] Add Bower for frontend dependencies

## Getting To Know Slush

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/slushjs/slush).

## Contributing

See the [CONTRIBUTING Guidelines](https://github.com/rowan.parkinson/slush-wordpress-bootstrap-sass/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/rowan.parkinson/slush-wordpress-bootstrap-sass/issues).

## License

The MIT License

Copyright (c) 2016, Rowan Parkinson

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
