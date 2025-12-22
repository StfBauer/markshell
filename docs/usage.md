# Usage

```bash
   markshell [filepath | -f [filepath] | --filepath [filepath]]
   markshell --example [example-name]
   markshell --help
```

## Options

**filepath or -f**
: path to markdown file

**--example [name]**
: run interactive examples and demos
  - `dynamic-loading` - Shows dynamic language loading with statistics
  - `syntax-colors` - Visual demonstration of syntax highlighting colors
  - `demo` - Comprehensive showcase of all markdown features

**--help**
: display usage information

## Examples

```sh
   # Render a markdown file
   markshell ./my/markdownfile.md
   markshell --filepath './my/markdownfile.md'

   # Run interactive examples
   markshell --example dynamic-loading
   markshell --example syntax-colors
   markshell --example demo
```
